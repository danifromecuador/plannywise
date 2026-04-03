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

export const addCT = (set, input) => set((state) => {
  const trimmed = maybePrettifyCollapsedLabel(String(input).trim())
  if (!trimmed) return state
  const key = normalizeCommonTaskKey(trimmed)
  const currents = [...state.configs.commonTasks.currents]
  const idx = currents.findIndex((c) => normalizeCommonTaskKey(c) === key)
  if (idx === -1) {
    return {
      configs: {
        ...state.configs,
        commonTasks: {
          ...state.configs.commonTasks,
          currents: [...currents, trimmed],
        },
      },
    }
  }
  const merged = maybePrettifyCollapsedLabel(preferCommonTaskLabel(currents[idx], trimmed))
  if (merged === currents[idx]) return state
  currents[idx] = merged
  return {
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents,
      },
    },
  }
}, false, 'configs/commonTasks/add')

export const removeCT = (set, index) => set(state => {
  const CTArray = state.configs.commonTasks.currents
  const filteredCTArray = CTArray.filter((e,i) => i !== index)
  return ({
    configs: {
      ...state.configs,
      commonTasks: {
        ...state.configs.commonTasks,
        currents: filteredCTArray
      }
    }
  })
}, false, 'configs/commonTasks/remove')