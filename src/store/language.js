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
            warning: "Esta acción borrará el historial de todos los contadores. Estás seguro?",
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
            inputPlaceHolder: "Escribe una tarea común y presiona Enter",
            edit: "Editar",
            remove: "Quitar",
          },
        }
      }
    },
    done: {
      title: "Hecho",
      totalWorkedHours: {
        title: "Total de Horas Trabajadas",
        last30: "últimos 30 días",
        last7: "últimos 7 días",
        today: "hoy día"
      },
      todayCompletedTasks: {
        title: "Tareas Completadas Hoy Día",
        warning: "Borrar las tareas completadas de hoy día guardará las horas trabajadas hoy día en los contadores de Total de Horas Trabajadas y empezará un nuevo día. Estás seguro?",
        cancel: "Cancelar",
        confirm: "Sí, empezar un nuevo día",
        delete: "Borrar Todo",
        input: "Escribe una tarea completada y presiona Enter"
      }
    }
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
            inputPlaceHolder: "Type a common task and press Enter",
            edit: "Edit",
            remove: "Remove",
          },
        }
      }
    },
    done: {
      title: "Done",
      totalWorkedHours: {
        title: "Total Worked Hours",
        last30: "last 30 days",
        last7: "last 7 days",
        today: "today"
      },
      todayCompletedTasks: {
        title: "Today's Completed Tasks",
        warning: "Deleting today's completed tasks will log today's worked hours in the Total Worked Hours counters and will start a new day. Are you sure?",
        cancel: "Cancel",
        confirm: "Yes, I want to start a new day",
        delete: "Delete All",
        input: "Type a completed task and press Enter"
      }
    }
  }
}

export const setCurrent = (set, language) => set(state => ({
  configs: {
    ...state.configs,
    language: {
      ...state.configs.language,
      current: language
    }
  }
}), false, 'configs/language/setCurrent')

