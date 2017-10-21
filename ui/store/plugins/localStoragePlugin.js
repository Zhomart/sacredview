export const STORAGE_KEY = 'sacredview-';

const localStoragePlugin = store => {

  store.state.resultsByConfig = JSON.parse(localStorage.getItem(STORAGE_KEY + 'resultsByConfig')) || {}
  store.subscribe((mutation, { resultsByConfig }) => {
    localStorage.setItem(STORAGE_KEY + 'resultsByConfig', JSON.stringify(resultsByConfig))
  })

}

export default localStoragePlugin
