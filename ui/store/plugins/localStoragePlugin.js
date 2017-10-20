export const STORAGE_KEY = 'sacredview-';

const localStoragePlugin = store => {

  store.state.filters = JSON.parse(localStorage.getItem(STORAGE_KEY + 'filters'))
  store.subscribe((mutation, { filters }) => {
    localStorage.setItem(STORAGE_KEY + 'filters', JSON.stringify(filters))
  })

}

export default localStoragePlugin
