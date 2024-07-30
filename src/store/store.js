import { create } from "zustand"
import { devtools } from "zustand/middleware"

const createBearSlice = set => ({
  amount: 42,
  add: () => set(state => ({
    bears: { ...state.bears, amount: state.bears.amount + 1 }
  }))
})

const createCowSlice = () => ({
  amount: 21
})

export const Store = create(devtools(set => ({
  bears: createBearSlice(set),
  cows: createCowSlice()
})))