export const add = (set, input) => set((state) => ({
  daily: {
    ...state.daily,
    todos: [...state.daily.todos, { id: Date.now(), content: input }]
  }
}))

export const markAsDone = (set, item) => set((state) => ({
  daily: {
    ...state.daily,
    todos: state.daily.todos.filter(i => i.id !== item.id),
    dones: [...state.daily.dones, item].sort((a, b) => a.id - b.id)
  }
}))

export const markAsTodo = (set, item) => set((state) => ({
  daily: {
    ...state.daily,
    todos: [...state.daily.todos, item].sort((a, b) => a.id - b.id),
    dones: state.daily.dones.filter(i => i.id !== item.id)
  }
}))
