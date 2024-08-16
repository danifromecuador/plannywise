export const add = (set, input, sliceID) => set((state) => ({
  [sliceID]: {
    ...state[sliceID],
    todos: [...state[sliceID].todos, { id: Date.now(), content: input }]
  }
}), false, 'todo/add')

export const markAsDone = (set, item, sliceID) => set((state) => ({
  [sliceID]: {
    ...state[sliceID],
    todos: state[sliceID].todos.filter(i => i.id !== item.id),
    dones: [...state[sliceID].dones, item].sort((a, b) => a.id - b.id)
  }
}), false, 'todo/markAsDone')

export const markAsTodo = (set, item, sliceID) => set((state) => ({
  [sliceID]: {
    ...state[sliceID],
    todos: [...state[sliceID].todos, item].sort((a, b) => a.id - b.id),
    dones: state[sliceID].dones.filter(i => i.id !== item.id)
  }
}), false, 'todo/markAsTodo')

export const completed = (get, sliceID) => (
  `${(Math.floor((get()[sliceID].dones.length / (get()[sliceID].todos.length + get()[sliceID].dones.length))*100)).toString()}%`
)

export const deleteDones = (set, sliceID) => set((state)=>({
  [sliceID]: {
    ...state[sliceID],
    dones: []
  }
}), false, 'todo/deleteDones')