import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add } from "./todo_logic.js"

const todoDailySlice = set => ({
  title: "Daily Goals",
  completed: "23%",
  todos: [],
  dones: [],
  add: (input) => add(set, input),
  markAsCompleted: (item) => set(state=>({}))
})

export const Store = create(devtools(set => ({
  daily: todoDailySlice(set)
})))