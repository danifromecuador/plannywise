export const addCT = (set, input) => set(state=>{
  console.log(input);
  
  return ({
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents: [...state.configs.commonTasks.currents, input]
      }
    }
  })

})