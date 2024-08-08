import { createSlice } from '@reduxjs/toolkit'
import { config as configs } from 'config'

const default_page_size = configs.PAGE_SIZE

const initialState = {
  materials: [],
  loading: false,
  material: null,
  filtered: [],
  refresh: 0,
  count: 0,
  refreshLoader: false,
  current_filters: {},
  filters: { page: 1, page_size: default_page_size }
}

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setMaterial: (state, action) => {
      state.material = action.payload
    },
    addMaterial: (state, action) => {
      let materials = state.materials
      materials.unshift(action.payload)
      state.materials = materials
      state.filtered = materials
      state.count = state.count + 1;
    },
    setMaterials: (state, action) => {
      const { materials, count } = action.payload;    
      state.materials = materials;
      state.count = count;      
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload;
    },    
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    updateMaterial: (state, action) => {
      const { id, material } = action.payload
      state.materials.every(({ _id }, i) => {
        if (id === _id) {
          state.materials[i] = material
          return false
        }
        return true
      })
      state.filtered = state.materials;
    },
    removeMaterial: (state, action) => {
      const { id } = action.payload
      state.materials.every(({ _id }, i) => {
        if (id === _id) {
          state.materials.splice(i, 1)
          return false
        }
        return true
      })
      state.filtered = state.materials;
      state.count = state.count - 1;      
    },
    setFilters: (state, action) => {
      state.filters = action.payload
      state.refreshLoader = true
    },
    resetFilters: (state) => {
      state.refresh += 1
      state.refreshLoader = true
      state.filters = initialState.filters
      state.current_filters = initialState.current_filters
    },
    setCurrentFilters: (state, action) => {
      state.current_filters = action.payload
    },
    setPage: (state, action) => {
      state.refresh += 1
      state.refreshLoader = true
      state.filters.page = action.payload
    },
    resetPage: (state) => {
      state.filters.page = 1
    },
    removeAllMaterials: (state, action) => {
      state.materials = []
    },    
  }
})

const materialReducer = materialSlice.reducer

export const materialActions = materialSlice.actions
export default materialReducer
