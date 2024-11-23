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
        start: "INICIAR",
        pause: "PAUSAR",
        continue: "CONTINUAR",
        reset: "RESETEAR"
      },
      cuote: {
        error: "Error al obtener la frase"
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
        start: "START",
        pause: "PAUSE",
        continue: "CONTINUE",
        reset: "RESET"
      },
      cuote: {
        error: "Error fetching the quote"
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

