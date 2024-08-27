export const addCompletedTask = (set, input) => set(state => ({
  tasks: {
    ...state.tasks,
    completed: [...state.tasks.completed, { id: Date.now(), content: input }]
  }
}), false, 'tasks/add')

export const deleteAllCompletedTasks = (set, get) => set(state => {
  const workedHoursHistoryArray = [get().tasks.completed.length * 15 / 60, ...state.tasks.workedHoursHistory]
  workedHoursHistoryArray.length > 30 && workedHoursHistoryArray.pop()
  return ({
    tasks: {
      ...state.tasks,
      workedHoursHistory: workedHoursHistoryArray,
      completed: []
    }
  })
}, false, 'tasks/deleteAllCompleted')

export const workedHours = get => {
  const day = get().tasks.completed.length * 15 / 60
  const week = get().tasks.workedHoursHistory.slice(0, 7).reduce((a, b) => a + b, 0)
  const month = get().tasks.workedHoursHistory.reduce((a, b) => a + b, 0)
  return ({ "day": day, "week": week, "month": month })
}
