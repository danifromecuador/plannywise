import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add, markAsDone, markAsTodo } from "./todo_logic.js"

const todoDailySlice = set => ({
  title: "Daily Goals",
  completed: "23%",
  todos: [],
  dones: [],
  add: (input) => add(set, input),
  markAsDone: (item) => markAsDone(set, item),
  markAsTodo: (item) => markAsTodo(set, item)
})

export const Store = create(devtools(set => ({
  daily: todoDailySlice(set)
})))