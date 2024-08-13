import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add, completed, markAsDone, markAsTodo} from "./todo_logic.js"

const todoDailySlice = (set, get) => ({
  title: "Daily Goals",
  completed: () => completed(get),
  todos: [],
  dones: [],
  add: (input) => add(set, input),
  markAsDone: (item) => markAsDone(set, item),
  markAsTodo: (item) => markAsTodo(set, item)
})

export const Store = create(devtools((set, get) => ({
  daily: todoDailySlice(set, get)
})))