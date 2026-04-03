// CT stands for Common Tasks

/** Treat labels that only differ by spaces or casing as the same (e.g. "learn code apply" vs "learncodeapply"). */
export const normalizeCommonTaskKey = (name) =>
  String(name).trim().toLowerCase().replace(/\s+/g, '')

const spaceCount = (s) => (String(s).match(/\s/g) || []).length

/** Single-token spellings that should show as spaced words (e.g. legacy "learncodeapply"). */
const PRETTY_BY_NORMALIZED_KEY = {
  learncodeapply: 'learn code apply',
}

const maybePrettifyCollapsedLabel = (label) => {
  const pretty = PRETTY_BY_NORMALIZED_KEY[normalizeCommonTaskKey(label)]
  if (!pretty) return label
  if (/\s/.test(label)) return label
  return pretty
}

/** Prefer spaced/readable labels over one concatenated word when both match the same key. */
export const preferCommonTaskLabel = (a, b) => {
  const sa = spaceCount(a)
  const sb = spaceCount(b)
  if (sb !== sa) return sb > sa ? b : a
  if (b.length !== a.length) return b.length > a.length ? b : a
  return a
}

export const dedupeCommonTaskNames = (names) => {
  const byKey = new Map()
  for (const raw of names) {
    const label = String(raw).trim()
    if (!label) continue
    const key = normalizeCommonTaskKey(label)
    if (!byKey.has(key)) {
      byKey.set(key, label)
      continue
    }
    byKey.set(key, preferCommonTaskLabel(byKey.get(key), label))
  }
  return [...byKey.values()].map(maybePrettifyCollapsedLabel)
}

export const generateCommonTaskId = () =>
  `ct_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 11)}`

const DEFAULT_CATALOG = [
  { id: 'learn', label: 'LEARN' },
  { id: 'code', label: 'CODE' },
  { id: 'apply', label: 'APPLY' },
]

/** Migrate localStorage payload to `{ id, label }[]`. */
export const migrateCommonTasksCatalog = (parsed) => {
  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) return [...DEFAULT_CATALOG]
  if (typeof parsed[0] === 'string') {
    const names = dedupeCommonTaskNames(parsed)
    return names.map((label) => {
      const nk = normalizeCommonTaskKey(label)
      const id =
        nk === 'learn' || nk === 'code' || nk === 'apply' ? nk : generateCommonTaskId()
      return { id, label: maybePrettifyCollapsedLabel(label) }
    })
  }
  const rows = parsed
    .map((row) => {
      const id =
        row.id != null && String(row.id).trim() !== '' ? String(row.id) : generateCommonTaskId()
      const label = maybePrettifyCollapsedLabel(String(row.label ?? '').trim())
      return label ? { id, label } : null
    })
    .filter(Boolean)
  return rows.length > 0 ? rows : [...DEFAULT_CATALOG]
}

/** Build hours map keyed by task id; reads legacy `{ learn, code, apply }` values. */
export const migrateCommonTasksHours = (parsed, catalog) => {
  const legacy = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  const out = {}
  for (const { id } of catalog) {
    const v = legacy[id]
    out[id] = typeof v === 'number' && !Number.isNaN(v) ? v : 0
  }
  return out
}

const nextUniqueId = (currents) => {
  const used = new Set(currents.map((c) => c.id))
  let id
  do {
    id = generateCommonTaskId()
  } while (used.has(id))
  return id
}

export const addCT = (set, input) => set((state) => {
  const trimmed = maybePrettifyCollapsedLabel(String(input).trim())
  if (!trimmed) return state
  const key = normalizeCommonTaskKey(trimmed)
  const currents = [...state.configs.commonTasks.currents]
  const idx = currents.findIndex((c) => normalizeCommonTaskKey(c.label) === key)
  if (idx === -1) {
    const nk = normalizeCommonTaskKey(trimmed)
    const id =
      nk === 'learn' || nk === 'code' || nk === 'apply' ? nk : nextUniqueId(currents)
    return {
      configs: {
        ...state.configs,
        commonTasks: {
          ...state.configs.commonTasks,
          currents: [...currents, { id, label: trimmed }],
        },
      },
      tasks: {
        ...state.tasks,
        commonTasks: {
          ...state.tasks.commonTasks,
          [id]: state.tasks.commonTasks[id] ?? 0,
        },
      },
    }
  }
  const merged = maybePrettifyCollapsedLabel(preferCommonTaskLabel(currents[idx].label, trimmed))
  if (merged === currents[idx].label) return state
  const next = [...currents]
  next[idx] = { ...next[idx], label: merged }
  return {
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents: next,
      },
    },
  }
}, false, 'configs/commonTasks/add')

export const removeCT = (set, index) => set((state) => {
  const currents = [...state.configs.commonTasks.currents]
  const removed = currents[index]
  if (!removed) return state
  currents.splice(index, 1)
  const restHours = { ...state.tasks.commonTasks }
  delete restHours[removed.id]
  return {
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents,
      },
    },
    tasks: {
      ...state.tasks,
      commonTasks: restHours,
    },
  }
}, false, 'configs/commonTasks/remove')

export const updateCT = (set, id, input) => set((state) => {
  const trimmed = maybePrettifyCollapsedLabel(String(input).trim())
  if (!trimmed) return state
  const currents = [...state.configs.commonTasks.currents]
  const idx = currents.findIndex((c) => c.id === id)
  if (idx === -1) return state
  const key = normalizeCommonTaskKey(trimmed)
  const dupIdx = currents.findIndex((c, i) => i !== idx && normalizeCommonTaskKey(c.label) === key)
  let hours = { ...state.tasks.commonTasks }

  if (dupIdx !== -1) {
    const dupId = currents[dupIdx].id
    const mergedLabel = preferCommonTaskLabel(
      preferCommonTaskLabel(currents[idx].label, currents[dupIdx].label),
      trimmed,
    )
    currents.splice(dupIdx, 1)
    const newIdx = currents.findIndex((c) => c.id === id)
    currents[newIdx] = { ...currents[newIdx], label: mergedLabel }
    hours[id] = (hours[id] ?? 0) + (hours[dupId] ?? 0)
    delete hours[dupId]
  } else {
    const merged = preferCommonTaskLabel(currents[idx].label, trimmed)
    if (merged === currents[idx].label) return state
    currents[idx] = { ...currents[idx], label: merged }
  }

  return {
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents,
      },
    },
    tasks: {
      ...state.tasks,
      commonTasks: hours,
    },
  }
}, false, 'configs/commonTasks/update')
