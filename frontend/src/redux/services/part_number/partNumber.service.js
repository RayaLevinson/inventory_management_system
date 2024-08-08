import http from '@redux/services/http.service'
import Promisable from '@redux/services/promisable.service'
import { getAppDispatch } from 'utils/dispatch.util'
import { partNumberActions } from '@redux/slices/part_number/partNumber.slice'
import { modalActions } from '@redux/slices/modal'

const url = '/part_numbers'

const PartNumberService = {
  getPartNumbers: async () => {
    const dispatch = getAppDispatch()
    dispatch?.(partNumberActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.get(`${url}`))

    if (success) {
      const { part_numbers } = success.data.data
      dispatch?.(partNumberActions.setPartNumbers(part_numbers))
    }

    dispatch?.(partNumberActions.setLoading(false))
    return [success, error]
  },
  addPartNumber: async (data) => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.post(`${url}`, data))

    if (success) {
      const { part_number } = success.data.data
      dispatch?.(partNumberActions.addPartNumber(part_number))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  updatePartNumber: async (data) => {
    const { _id } = data
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.put(`${url}/${_id}`, data))

    if (success) {
      const { part_number } = success.data.data
      dispatch?.(
        partNumberActions.updatePartNumber({
          id: part_number._id,
          partNumber: part_number
        })
      )
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  deletePartNumber: async (_id) => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.delete(`${url}/${_id}`))

    if (success) {
      const { partNumber } = success.data.data
      dispatch?.(partNumberActions.removePartNumber({ id: _id }))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  }
}

export default PartNumberService
