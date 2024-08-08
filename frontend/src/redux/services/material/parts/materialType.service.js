import http from '@redux/services/http.service'
import Promisable from '@redux/services/promisable.service'
import { getAppDispatch } from 'utils/dispatch.util'
import { materialTypeActions } from '@redux/slices/material/parts/materialType.slice'
import { modalActions } from '@redux/slices/modal'
import { moduleActions } from '@redux/slices/module/module'

const url = '/materials/types'

const MaterialTypeService = {
  getMaterialTypes: async () => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()
    const [success, error] = await Promisable.asPromise(http.get(`${url}`))

    if (success) {
      const { materialTypes } = success.data.data

      dispatch?.(materialTypeActions.setMaterialTypes(materialTypes))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  addMaterialType: async (data) => {
    const dispatch = getAppDispatch()
    dispatch?.(materialTypeActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.post(`${url}`, data))

    if (success) {
      const { materialType } = success.data.data
      dispatch?.(materialTypeActions.addMaterialType(materialType))
    }

    dispatch?.(materialTypeActions.setLoading(false))
    dispatch?.(modalActions.closeModal())
    return [success, error]
  },
  updateMaterialType: async (data) => {
    const { _id } = data
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.put(`${url}/${_id}`, data))

    if (success) {
      const { materialType } = success.data.data
      dispatch?.(
        materialTypeActions.updateMaterialType({
          id: materialType._id,
          materialType
        })
      )
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  deleteMaterialType: async (_id) => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.delete(`${url}/${_id}`))

    if (success) {
      const { materialType } = success.data.data
      dispatch?.(materialTypeActions.removeMaterialType({ id: _id }))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  deleteAllMaterialTypes: async () => {
    const dispatch = getAppDispatch()

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.delete(`${url}/all`))

    if (success) {
      dispatch?.(materialTypeActions.removeAllMaterialTypes())
    }
    return [success, error]
  }
}

export default MaterialTypeService
