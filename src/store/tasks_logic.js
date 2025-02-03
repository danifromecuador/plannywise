export const addCompletedTask = (set, input) => set(state => ({
  tasks: {
    ...state.tasks,
    completed: [...state.tasks.completed, { id: Date.now(), content: input }]
  }
}), false, 'tasks/add')

export const deleteAllCompletedTasks = (set, get) => set(state => {
  const commonTasksCounter = get().tasks.commonTasks.learn + get().tasks.commonTasks.code + get().tasks.commonTasks.apply
  const workedHoursHistoryArray = [(get().tasks.completed.length * 15 / 60) + commonTasksCounter, ...state.tasks.workedHoursHistory]
  workedHoursHistoryArray.length > 30 && workedHoursHistoryArray.pop()
  return ({
    tasks: {
      ...state.tasks,
      completed: [],
      workedHoursHistory: workedHoursHistoryArray,
      commonTasks: {}
    }
  })
}, false, 'tasks/deleteAllCompleted')

export const workedHours = get => {
  const commonTasksCounter = get().tasks.commonTasks.learn + get().tasks.commonTasks.code + get().tasks.commonTasks.apply
  const day = (get().tasks.completed.length * 15 / 60) + commonTasksCounter
  const week = get().tasks.workedHoursHistory.slice(0, 7).reduce((a, b) => a + b, 0)
  const month = get().tasks.workedHoursHistory.reduce((a, b) => a + b, 0)
  return ({ "day": day, "week": week, "month": month })
}

export const addCommonTaskCompleted = (get, set, task) => set(state => {
  let commonTasks = { "learn": get().tasks.commonTasks.learn, "code": get().tasks.commonTasks.code, "apply": get().tasks.commonTasks.apply }
  task === "learn" ? commonTasks.learn += 0.25 : task === "code" ? commonTasks.code += 0.25 : commonTasks.apply += 0.25
  return ({
    tasks: {
      ...state.tasks,
      commonTasks: commonTasks
    }
  })
}, false, `tasks/addCommonTask/add_${task}`)

export const commonTasksCounter = get => get().tasks.commonTasks.learn + get().tasks.commonTasks.code + get().tasks.commonTasks.apply

export const resetWorkedHoursHistory = set => set(state => ({
  tasks: {
    ...state.tasks,
    workedHoursHistory: []
  }
}))
