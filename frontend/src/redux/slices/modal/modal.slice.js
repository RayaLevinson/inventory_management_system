import { createSlice } from '@reduxjs/toolkit'
import SubscriptionService from '@redux/services/subscription.service'

const initialState = {
  type: '',
  data: null,
  open: false,
  width: '50%',
  loading: false,
  size: 'md',
  closeBackdropClick: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateData(state, action) {
      const data = action.payload
      state.data = state.data ? { ...state.data, ...data } : data
    },
    openModal(state, action) {
      const { type, data, width, size, closeBackdropClick = false } = action.payload
      state.data = data
      state.type = type
      state.open = true
      state.width = width
      state.size = size
      state.closeBackdropClick = closeBackdropClick
    },
    closeModal(state) {
      SubscriptionService.unsubscribe()
      state.type = ''
      state.data = null
      state.open = false
      state.width = '50%'
      state.size = 'md'
      state.closeBackdropClick = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

const modalReducer = modalSlice.reducer

export const modalActions = modalSlice.actions
export default modalReducer
