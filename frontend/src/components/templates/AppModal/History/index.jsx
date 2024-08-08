import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { systemHistoryActions } from '@redux/slices/system/systemHistory.slice'
import CircleLoader from 'components/atoms/CircleLoader'
import moment from 'moment'
import React, { useEffect } from 'react'
import SystemHistoryService from '@redux/services/system/parts/systemHistory.service'
import { Table } from 'react-bootstrap'

const SystemHistory = () => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.modal.data)

  const histories = useAppSelector((state) => state.systemHistory.histories)
  const loading = useAppSelector((state) => state.modal.loading)
  const filters = useAppSelector((state) => state.systemHistory.filters)
  const refresh = useAppSelector((state) => state.systemHistory.refresh)

  useEffect(() => {
    return () => {
      dispatch(systemHistoryActions.resetPage())
    }
  }, [dispatch])

  useEffect(() => {
    SystemHistoryService.getHistories(id, filters)
  }, [refresh, filters, id])
  return (
    <div className='p-3'>
      {loading && <CircleLoader />}
      {!loading && histories?.length == 0 ? (
        <div style={{ height: '300px' }} className='d-flex align-items-center justify-content-center'>
          <h3>No history found</h3>
        </div>
      ) : (
        <Table striped borderless hover responsive>
          <thead className='border-bottom '>
            <tr className='bg-primary'>
              <th className='bg-primary text-white py-3'>Type</th>
              <th className='bg-primary text-white py-3'>Date</th>
              <th className='bg-primary text-white py-3'>Attribute</th>
              <th className='bg-primary text-white py-3'>Current Value</th>
              <th className='bg-primary text-white py-3'>Previous Value</th>
              <th className='bg-primary text-white py-3'>User</th>
            </tr>
          </thead>
          <tbody>
            {histories?.map((item, index) => (
              <tr key={index}>
                <td>{item.changeType}</td>
                <td>{moment(item.createdAt).calendar()}</td>
                <td>{item.attribute}</td>
                <td>{item.currentValue}</td>
                <td>{item.previousValue}</td>
                <td>admin</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default SystemHistory
