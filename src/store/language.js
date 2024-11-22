export const text = {
  spanish: {
    todo: {
      title: "Por Hacer",
      completed: "Completado",
      deleteAll: "Borrar los completados",
      placeHolder: "Escribe un objetivo y presiona Enter"

    },
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
    todo: {
      title: "Todo",
      completed: "Completed",
      deleteAll: "Delete All Completed",
      placeHolder: "Type a goal and press Enter"

    },
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

