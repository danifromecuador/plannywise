export const add = (set, input) => set((state) => ({
  daily: {
    ...state.daily,
    todos: [...state.daily.todos, { id: Date.now(), content: input }]
  }
}))

