const sumCommonTaskHours = (commonTasks) =>
  Object.values(commonTasks || {}).reduce((a, n) => a + (typeof n === 'number' ? n : 0), 0)

export const addCompletedTask = (set, input) => set(state => ({
  tasks: {
    ...state.tasks,
    completed: [...state.tasks.completed, { id: Date.now(), content: input }]
  }
}), false, 'tasks/add')

export const deleteAllCompletedTasks = (set, get) => set(state => {
  const commonTasksCounter = sumCommonTaskHours(get().tasks.commonTasks)
  const workedHoursHistoryArray = [(get().tasks.completed.length * 15 / 60) + commonTasksCounter, ...state.tasks.workedHoursHistory]
  workedHoursHistoryArray.length > 30 && workedHoursHistoryArray.pop()
  const currents = get().configs.commonTasks.currents
  const resetHours = Object.fromEntries(currents.map(({ id }) => [id, 0]))
  return ({
    tasks: {
      ...state.tasks,
      completed: [],
      workedHoursHistory: workedHoursHistoryArray,
      commonTasks: resetHours
    }
  })
}, false, 'tasks/deleteAllCompleted')

export const workedHours = get => {
  const commonTasksCounter = sumCommonTaskHours(get().tasks.commonTasks)
  const day = (get().tasks.completed.length * 15 / 60) + commonTasksCounter
  const week = get().tasks.workedHoursHistory.slice(0, 7).reduce((a, b) => a + b, 0)
  const month = get().tasks.workedHoursHistory.reduce((a, b) => a + b, 0)
  return ({ "day": day, "week": week, "month": month })
}

export const addCommonTaskCompleted = (get, set, taskId) => set(state => {
  const prev = get().tasks.commonTasks[taskId] ?? 0
  return ({
    tasks: {
      ...state.tasks,
      commonTasks: {
        ...state.tasks.commonTasks,
        [taskId]: prev + 0.25
      }
    }
  })
}, false, `tasks/addCommonTask/add_${taskId}`)

export const commonTasksCounter = get => sumCommonTaskHours(get().tasks.commonTasks)

export const resetWorkedHoursHistory = set => set(state => ({
  tasks: {
    ...state.tasks,
    workedHoursHistory: []
  }
}))
