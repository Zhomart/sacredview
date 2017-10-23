// Gets element from object using dot notation
export const safeDotGet = (obj, dotKeys) => {
  try {
    return dotKeys.split('.').reduce((obj, k) => obj[k], obj)
  } catch (e) {
    return undefined
  }
}

