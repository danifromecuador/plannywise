export const text = {
  spanish: {
    todo: {},
    doing: {
      title: "Haciendo",
      pomodoro: {
        button: "INICIAR"
      },
      footer: {
        info: {},
        settings: {
          btnTitle: "CONFIGURACIÓN",
        }
      }
    },
    done: {}
  },
  english: {
    todo: {},
    doing: {
      title: "Doing",
      pomodoro: {
        button: "START"
      },
      footer: {
        info: {},
        settings: {
          btnTitle: "SETTINGS",
        }
      }
    },
    done: {}
  }
}

export const setCurrent = (set, language) => set(state => ({
  language: {
    ...state.language,
    current: language
  }
}), false, 'language/setCurrent')

