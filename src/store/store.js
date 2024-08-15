import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add, completed, markAsDone, markAsTodo, deleteDones } from "./todo_logic.js"

const todoDailySlice = (set, get) => ({
  title: "Daily Goals",
  completed: (sliceID) => completed(get, sliceID),
  todos: JSON.parse(localStorage.getItem("Daily Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Daily Goals Dones")) || [],
  add: (input, sliceID) => add(set, input, sliceID),
  markAsDone: (item, sliceID) => markAsDone(set, item, sliceID),
  markAsTodo: (item, sliceID) => markAsTodo(set, item, sliceID),
  deleteDones: (sliceID) => deleteDones(set, sliceID)
})

const todoWeeklySlice = (set, get) => ({
  title: "Weekly Goals",
  completed: (sliceID) => completed(get, sliceID),
  todos: JSON.parse(localStorage.getItem("Weekly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Weekly Goals Todos")) || [],
  add: (input, sliceID) => add(set, input, sliceID),
  markAsDone: (item, sliceID) => markAsDone(set, item, sliceID),
  markAsTodo: (item, sliceID) => markAsTodo(set, item, sliceID),
  deleteDones: (sliceID) => deleteDones(set, sliceID)
})

const todoMonthlySlice = (set, get) => ({
  title: "Monthly Goals",
  completed: (sliceID) => completed(get, sliceID),
  todos: JSON.parse(localStorage.getItem("Monthly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Monthly Goals Todos")) || [],
  add: (input, sliceID) => add(set, input, sliceID),
  markAsDone: (item, sliceID) => markAsDone(set, item, sliceID),
  markAsTodo: (item, sliceID) => markAsTodo(set, item, sliceID),
  deleteDones: (sliceID) => deleteDones(set, sliceID)
})

export const Store = create(devtools((set, get) => ({
  daily: todoDailySlice(set, get),
  weekly: todoWeeklySlice(set, get),
  monthly: todoMonthlySlice(set, get)
})))