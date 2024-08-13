import { create } from "zustand"
import { devtools } from "zustand/middleware"

const todoDailySlice = set => ({
  title: "Daily Goals",
  completed: "23%",
  todos: [1, 2, 3],
  dones: [4, 5, 6],
  add: (input) => set(state => ({
    daily: { ...state.daily, todos: [...state.daily.todos, input] }
  }))
})

export const Store = create(devtools(set => ({
  daily: todoDailySlice(set)
})))