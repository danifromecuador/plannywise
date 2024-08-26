import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { add, completed, markAsDone, markAsTodo, deleteDones } from "./todo_logic.js"

const todoDailySlice = (set, get) => ({
  title: "Daily Goals",
  completed: () => completed(get, "daily"),
  todos: JSON.parse(localStorage.getItem("Daily Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Daily Goals Dones")) || [],
  add: (input) => add(set, input, "daily"),
  markAsDone: (item) => markAsDone(set, item, "daily"),
  markAsTodo: (item) => markAsTodo(set, item, "daily"),
  deleteDones: () => deleteDones(set, "daily")
})

const todoWeeklySlice = (set, get) => ({
  title: "Weekly Goals",
  completed: () => completed(get, "weekly"),
  todos: JSON.parse(localStorage.getItem("Weekly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Weekly Goals Dones")) || [],
  add: (input) => add(set, input, "weekly"),
  markAsDone: (item) => markAsDone(set, item, "weekly"),
  markAsTodo: (item) => markAsTodo(set, item, "weekly"),
  deleteDones: () => deleteDones(set, "weekly")
})

const todoMonthlySlice = (set, get) => ({
  title: "Monthly Goals",
  completed: () => completed(get, "monthly"),
  todos: JSON.parse(localStorage.getItem("Monthly Goals Todos")) || [],
  dones: JSON.parse(localStorage.getItem("Monthly Goals Dones")) || [],
  add: (input) => add(set, input, "monthly"),
  markAsDone: (item) => markAsDone(set, item, "monthly"),
  markAsTodo: (item) => markAsTodo(set, item, "monthly"),
  deleteDones: () => deleteDones(set, "monthly")
})

export const Store = create(devtools((set, get) => ({
  daily: todoDailySlice(set, get),
  weekly: todoWeeklySlice(set, get),
  monthly: todoMonthlySlice(set, get)
})))