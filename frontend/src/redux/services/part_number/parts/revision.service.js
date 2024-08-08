import http from '@redux/services/http.service'
import Promisable from '@redux/services/promisable.service'
import { getAppDispatch } from 'utils/dispatch.util'
import { revisionActions } from '@redux/slices/part_number/parts/revision.slice'
import { modalActions } from '@redux/slices/modal'

const url = '/part_numbers/revisions'

const RevisionService = {
  getRevisions: async () => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.get(`${url}`))

    if (success) {
      const { revisions } = success.data.data

      dispatch?.(revisionActions.setRevisions(revisions))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  addRevision: async (data) => {
    const dispatch = getAppDispatch()
    dispatch?.(revisionActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.post(`${url}`, data))

    if (success) {
      const { revision } = success.data.data
      dispatch?.(revisionActions.addRevision(revision))
    }

    dispatch?.(revisionActions.setLoading(false))
    return [success, error]
  },
  updateRevision: async (data) => {
    const { _id } = data
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.put(`${url}/${_id}`, data))

    if (success) {
      const { revision } = success.data.data
      dispatch?.(
        revisionActions.updateRevision({
          id: revision._id,
          revision
        })
      )
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  },
  deleteRevision: async (_id) => {
    const dispatch = getAppDispatch()
    dispatch?.(modalActions.setLoading(true))

    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.delete(`${url}/${_id}`))

    if (success) {
      const { revision } = success.data.data
      dispatch?.(revisionActions.removeRevision({ id: _id }))
      dispatch?.(modalActions.closeModal())
    }

    dispatch?.(modalActions.setLoading(false))
    return [success, error]
  }
}

export default RevisionService
