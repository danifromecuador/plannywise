export const add = (set, input) => set((state) => ({
  daily: {
    ...state.daily,
    todos: [...state.daily.todos, { id: Date.now(), content: input }]
  }
}))

export const markAsDone = (set, item) => set((state) => {
  const updatedArray = state.daily.todos.filter(i => i.id !== item.id)
  return ({
    daily: {
      ...state.daily,
      todos: updatedArray
    }
  })
})


