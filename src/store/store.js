import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { add, completed, markAsDone, markAsTodo, deleteDones } from "./todo_logic.js"
import {
  addCompletedTask,
  deleteAllCompletedTasks,
  workedHours,
  addCommonTaskCompleted,
  commonTasksCounter,
  resetWorkedHoursHistory
} from './tasks_logic.js'
import { text, setCurrent } from "./language.js"
import {
  addCT,
  removeCT,
  updateCT,
  migrateCommonTasksCatalog,
  migrateCommonTasksHours,
} from "./common_tasks_logic.js"

const defaultCatalog = migrateCommonTasksCatalog(null)
const defaultCommonTaskHours = migrateCommonTasksHours({}, defaultCatalog)

const createTodoSlice = (set, get, sliceId, title) => ({
  title,
  todos: [],
  dones: [],
  completed: () => completed(get, sliceId),
  add: input => add(set, input, sliceId),
  markAsDone: item => markAsDone(set, item, sliceId),
  markAsTodo: item => markAsTodo(set, item, sliceId),
  deleteDones: () => deleteDones(set, sliceId),
})

const tasksSlice = (set, get) => ({
  completed: [],
  workedHoursHistory: [],
  commonTasks: defaultCommonTaskHours,
  commonTasksCounter: () => commonTasksCounter(get),
  add: input => addCompletedTask(set, input),
  deleteCompleted: () => deleteAllCompletedTasks(set, get),
  workedHours: () => workedHours(get),
  addCommonTask: task => addCommonTaskCompleted(get, set, task),
  resetWorkedHoursHistory: () => resetWorkedHoursHistory(set)
})

const configurationOptionsSlice = (set) => ({
  language: {
    current: "english",
    setCurrent: language => setCurrent(set, language),
    text: () => text
  },
  commonTasks: {
    currents: defaultCatalog,
    add: input => addCT(set, input),
    remove: index => removeCT(set, index),
    update: (id, input) => updateCT(set, id, input),
  }
})

const buildStore = (set, get) => ({
  ui: {
    footerInfoOpen: false,
    footerSettingsOpen: false,
  },
  toggleFooterInfo: () => set((state) => ({
    ui: {
      footerInfoOpen: !state.ui.footerInfoOpen,
      footerSettingsOpen: false,
    },
  })),
  toggleFooterSettings: () => set((state) => ({
    ui: {
      footerSettingsOpen: !state.ui.footerSettingsOpen,
      footerInfoOpen: false,
    },
  })),
  daily: createTodoSlice(set, get, "daily", "Daily Goals"),
  weekly: createTodoSlice(set, get, "weekly", "Weekly Goals"),
  monthly: createTodoSlice(set, get, "monthly", "Monthly Goals"),
  tasks: tasksSlice(set, get),
  configs: configurationOptionsSlice(set)
})

const mergePersistedState = (persistedState, currentState) => {
  if (!persistedState || typeof persistedState !== "object") return currentState
  const p = persistedState
  return {
    ...currentState,
    ui: { ...currentState.ui, ...p.ui },
    daily: {
      ...currentState.daily,
      todos: p.daily?.todos ?? currentState.daily.todos,
      dones: p.daily?.dones ?? currentState.daily.dones,
    },
    weekly: {
      ...currentState.weekly,
      todos: p.weekly?.todos ?? currentState.weekly.todos,
      dones: p.weekly?.dones ?? currentState.weekly.dones,
    },
    monthly: {
      ...currentState.monthly,
      todos: p.monthly?.todos ?? currentState.monthly.todos,
      dones: p.monthly?.dones ?? currentState.monthly.dones,
    },
    tasks: {
      ...currentState.tasks,
      completed: p.tasks?.completed ?? currentState.tasks.completed,
      workedHoursHistory: p.tasks?.workedHoursHistory ?? currentState.tasks.workedHoursHistory,
      commonTasks: p.tasks?.commonTasks ?? currentState.tasks.commonTasks,
    },
    configs: {
      ...currentState.configs,
      language: {
        ...currentState.configs.language,
        current: p.configs?.language?.current ?? currentState.configs.language.current,
      },
      commonTasks: {
        ...currentState.configs.commonTasks,
        currents: p.configs?.commonTasks?.currents ?? currentState.configs.commonTasks.currents,
      },
    },
  }
}

export const Store = create(
  devtools(
    persist(buildStore, {
      name: "plannywise-storage",
      partialize: (state) => ({
        ui: state.ui,
        daily: { todos: state.daily.todos, dones: state.daily.dones },
        weekly: { todos: state.weekly.todos, dones: state.weekly.dones },
        monthly: { todos: state.monthly.todos, dones: state.monthly.dones },
        tasks: {
          completed: state.tasks.completed,
          workedHoursHistory: state.tasks.workedHoursHistory,
          commonTasks: state.tasks.commonTasks,
        },
        configs: {
          language: { current: state.configs.language.current },
          commonTasks: { currents: state.configs.commonTasks.currents },
        },
      }),
      merge: (persistedState, currentState) =>
        mergePersistedState(persistedState, currentState),
    }),
    { name: "PlannywiseStore" },
  ),
)
