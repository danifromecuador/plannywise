export const setHeight = (set) => set(state => ({
  footer: {
    ...state.footer,
    mainSectionHeight: "Full"
  }
}))