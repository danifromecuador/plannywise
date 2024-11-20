const spanish = {
  todo: {},
  doing: {
    title: "Haciendo",
    startBtn: "INICIAR"
  },
  done: {}
}

const english = {
  todo: {},
  doing: {
    title: "Doing",
    startBtn: "START"
  },
  done: {}
}

export const setCurrent = (set, language) => set(state => ({
  language: {
    ...state.language,
    current: language
  }
}), false, 'language/setCurrent')