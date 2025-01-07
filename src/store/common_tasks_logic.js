export const addCT = (set, input) => set(state => ({
  configs: {
    ...state.configs,
    commonTasks: {
      ...state.configs.commonTasks,
      currents: [...state.configs.commonTasks.currents, input]
    }
  }
}))
