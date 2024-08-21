export const addCompletedTask = (set, input) => set(state => ({
  tasks: {
    ...state.tasks,
    completed: [...state.tasks.completed, { id: Date.now(), content: input }]
  }
}), false, 'tasks/add')

export const deleteAllCompletedTasks = set => set(state => ({
  tasks: {
    ...state.tasks,
    completed: []
  }
}), false, 'tasks/deleteAllCompleted')

export const workedHours = get => {
  const day = get().tasks.completed.length*15/60
  return ({ "day": day, "week": 123, "month": 400 })
}