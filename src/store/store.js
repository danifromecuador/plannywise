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
  todos: [1, 2, 3],
  dones: [4, 5, 6],
  addTodo: ()=>set(state => ({
    todoDaily: {...state.todoDaily, todos: state.todos.push(23)}
  }))
})

export const Store = create(devtools(set => ({
  bears: bearSlice(set),
  cows: cowSlice(),
  todoDaily: todoDailySlice(),
})))