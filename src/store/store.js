import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add, completed, markAsDone, markAsTodo, deleteDones } from "./todo_logic.js"
import {
  addCompletedTask,
  deleteAllCompletedTasks,
  workedHours,
  addCommonTask,
  commonTasksCounter,
  resetWorkedHoursHistory
} from './tasks_logic.js'
import { text, setCurrent } from "./language.js"

const todoDailySlice = (set, get) => ({
  title: "Daily Goals",
  todos: JSON.parse(localStorage.getItem("Daily Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Daily Goals Dones")) || [],
  completed: () => completed(get, "daily"),
  add: input => add(set, input, "daily"),
  markAsDone: item => markAsDone(set, item, "daily"),
  markAsTodo: item => markAsTodo(set, item, "daily"),
  deleteDones: () => deleteDones(set, "daily")
})

const todoWeeklySlice = (set, get) => ({
  title: "Weekly Goals",
  todos: JSON.parse(localStorage.getItem("Weekly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Weekly Goals Dones")) || [],
  completed: () => completed(get, "weekly"),
  add: input => add(set, input, "weekly"),
  markAsDone: item => markAsDone(set, item, "weekly"),
  markAsTodo: item => markAsTodo(set, item, "weekly"),
  deleteDones: () => deleteDones(set, "weekly")
})

const todoMonthlySlice = (set, get) => ({
  title: "Monthly Goals",
  todos: JSON.parse(localStorage.getItem("Monthly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Monthly Goals Dones")) || [],
  completed: () => completed(get, "monthly"),
  add: input => add(set, input, "monthly"),
  markAsDone: item => markAsDone(set, item, "monthly"),
  markAsTodo: item => markAsTodo(set, item, "monthly"),
  deleteDones: () => deleteDones(set, "monthly")
})

const tasksSlice = (set, get) => ({
  completed: JSON.parse(localStorage.getItem("Completed Tasks")) || [],
  workedHoursHistory: JSON.parse(localStorage.getItem("Worked Hours History")) || [],
  commonTasks: JSON.parse(localStorage.getItem("Common Tasks")) || { "learn": 0, "code": 0, "apply": 0 },
  commonTasksCounter: () => commonTasksCounter(get),
  add: input => addCompletedTask(set, input),
  deleteCompleted: () => deleteAllCompletedTasks(set, get),
  workedHours: () => workedHours(get),
  addCommonTask: task => addCommonTask(get, set, task),
  resetWorkedHoursHistory: () => resetWorkedHoursHistory(set)
})

const configurationOptionsSlice = (set) => ({
  language: {
    current: localStorage.getItem("currentLanguage") || "english",
    setCurrent: (language) => setCurrent(set, language),
    text: () => text
  },
  commonTasks: {
    // currents: [],
    // add: ()=>(),
    // remove: ()=>() 
  }
})

export const Store = create(devtools((set, get) => ({
  daily: todoDailySlice(set, get),
  weekly: todoWeeklySlice(set, get),
  monthly: todoMonthlySlice(set, get),
  tasks: tasksSlice(set, get),
  configs: configurationOptionsSlice(set)
})))