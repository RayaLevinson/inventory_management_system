import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  partNumbers: [],
  loading: false,
  partNumber: null
}

export const partNumberSlice = createSlice({
  name: 'partNumber',
  initialState,
  reducers: {
    setPartNumber: (state, action) => {
      state.partNumber = action.payload
    },
    addPartNumber: (state, action) => {
      let partNumbers = state.partNumbers
      partNumbers.unshift(action.payload)
      state.partNumbers = partNumbers
    },
    setPartNumbers: (state, action) => {
      state.partNumbers = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    updatePartNumber: (state, action) => {
      const { id, partNumber } = action.payload
      state.partNumbers.every(({ _id }, i) => {
        if (id === _id) {
          state.partNumbers[i] = partNumber
          return false
        }
        return true
      })
    },
    removePartNumber: (state, action) => {
      const { id } = action.payload
      state.partNumbers.every(({ _id }, i) => {
        if (id === _id) {
          state.partNumbers.splice(i, 1)
          return false
        }
        return true
      })
    }
  }
})

const partNumberReducer = partNumberSlice.reducer

export const partNumberActions = partNumberSlice.actions
export default partNumberReducer
