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
        info: {
          reset: {
            message: "resetear todos los contadores: ",
            button: "Resetear",
            warning: "Esta acción borrará el historial de todos los contadores, está seguro?",
            cancel: "Cancelar",
            confirm: "Sí, resetear todo"
          },
          language: {
            message: "cambiar idioma: ",
          },
          theme: {
            message: "cambiar tema: ",
            dark: "OSCURO",
            light: "CLARO"
          },
          commonTasks: {
            message: "tareas comunes: ",
            addNew: "NUEVA TAREA"
          },
          timer: {
            message: "elegir temporizador: "
          }
        },
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
        info: {
          reset: {
            message: "reset Total Worked Hours counters: ",
            button: "Reset",
            warning: "This action will reset all your stats, are you sure?",
            cancel: "Cancel",
            confirm: "Yes, Reset All"
          },
          language: {
            message: "change language: ",
          },
          theme: {
            message: "change theme: ",
            dark: "DARK",
            light: "LIGHT"
          },
          commonTasks: {
            message: "common tasks: ",
            addNew: "ADD NEW"
          },
          timer: {
            message: "set timer: "
          }
        },
        settings: {
          btnTitle: "CONFIGURACIÓN",
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

