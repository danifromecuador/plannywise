// CT stands for Common Tasks
export const addCT = (set, input) => set(state => ({
  configs: {
    ...state.configs,
    commonTasks: {
      ...state.configs.commonTasks,
      currents: [...state.configs.commonTasks.currents, input]
    }
  }
}), false, 'configs/commonTasks/add')

export const removeCT = (set, index) => set(state => {
  const CTArray = state.configs.commonTasks.currents
  const filteredCTArray = CTArray.filter((e,i) => i !== index)
  return ({
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents: filteredCTArray
      }
    }
  })
}, false, 'configs/commonTasks/remove')