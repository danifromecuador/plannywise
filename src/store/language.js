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
      footer: {
        info: {
          btnTitle: "INFO",
          created: "Creado por",
          star: "Si te gustó esta app,",
          starLink: " dame una ⭐",
          issue: "Si no escuchas el sonido de la alarma, revisa",
          issueLink: " este issue",
          suggest: "Si te gustaría dar feedback, reportar issues o sugerir mejoras,",
          suggestLink: " clic aquí"
        },
        settings: {
          btnTitle: "CONFIGURACIÓN",
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
      footer: {
        info: {
          btnTitle: "INFO",
          created: "Created by",
          star: "If you enjoy this app, please",
          starLink: " give it a ⭐",
          issue: "If you're not hearing the alarm sound, check out",
          issueLink: " this issue",
          suggest: "If you'd like to provide feedback, report issues, or suggest improvements,",
          suggestLink: " click here"
        },
        settings: {
          btnTitle: "CONFIGURATION",
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

