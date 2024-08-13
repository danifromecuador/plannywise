import { create } from "zustand"
import { devtools } from "zustand/middleware"

const bearSlice = set => ({
  amount: 42,
  add: () => set(state => ({
    bears: { ...state.bears, amount: state.bears.amount + 1 }
  }))
})

const cowSlice = () => ({
  amount: 21
})

const todoDailySlice = set => ({
  title: "Daily Goals",
  achievedText: "Completed: ",
  completed: "23%",
  deleteBtnText: "Delete All Completed",
  inputText: "Type a new goal and press Enter",
  todos: [1, 2, 3],
  dones: [4, 5, 6],
  add: (input) => set(state => ({
    daily: { ...state.daily, todos: [...state.daily.todos, input] }
  }))
})

const taskSlice = set => ({
  title: "Completed Tasks",
  achievedText: "Worked Hours: ",
  completed: 5.25,
  deleteBtnText: "Delete All Tasks",
  inputText: "Type a completed task and press Enter",
  todos: [],
  dones: [4, 5, 6],
  add: (input) => set(state => ({
    tasks: { ...state.tasks, dones: [...state.tasks.dones, input] }
  }))
})

export const Store = create(devtools(set => ({
  bears: bearSlice(set),
  cows: cowSlice(),
  daily: todoDailySlice(set),
  tasks: taskSlice(set)
})))