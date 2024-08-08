import { Button, Table } from 'react-bootstrap'
import React, { useState } from 'react'
import AddRevision from './AddRevision'
import useEffectOnce from 'hooks/useEffectOnce'
import RevisionService from '@redux/services/part_number/parts/revision.service'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import CircleLoader from 'components/atoms/CircleLoader'
import { BiSolidEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { modalActions } from '@redux/slices/modal'
import SubscriptionService from '@redux/services/subscription.service'
const Revisions = () => {
  const [addRevision, setAddRevision] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useAppDispatch()

  const revisions = useAppSelector((state) => state.revision.revisions)
  const loading = useAppSelector((state) => state.revision.loading)
  
  useEffectOnce(() => {
    RevisionService.getRevisions()
  })
  return (
    <div>
      {loading && <CircleLoader />}

      <div className='d-flex align-items-center justify-content-between shadow-sm p-3 mb-1 rounded'>
        <div>
          <h3 style={{ margin: 0 }}>Revisions</h3>
        </div>
        <div>
          <Button variant='primary' type='button' onClick={() => setAddRevision(true)}>
            Add Revision
          </Button>
        </div>
      </div>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th className='bg-primary text-white py-3'>#</th>
            <th className='bg-primary text-white py-3'>Name</th>
            <th className='bg-primary text-white py-3'>Part Number</th>
            <th className='text-end bg-primary text-white py-3  pe-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {revisions?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.part_number_id?.name}</td>
              <td className='text-end'>
                {' '}
                <button
                  type='button'
                  style={{ border: 'none', background: 'transparent' }}
                  onClick={() => {
                    setEditData(item)
                    setIsEdit(true)
                  }}
                >
                  <BiSolidEdit size={23} color='blue' />
                </button>{' '}
                |{' '}
                <button
                  type='button'
                  style={{ border: 'none', background: 'transparent' }}
                  onClick={() => {
                    SubscriptionService.subscribe(() => {
                      RevisionService.deleteRevision(item._id)
                    })
                    dispatch(
                      modalActions.openModal({
                        width: '500px',
                        type: 'CONFIRMATION_FORM',
                        data: {
                          heading: `Delete Revision`,
                          message: `Are you sure you want to remove this revision?`
                        }
                      })
                    )
                  }}
                >
                  <BsTrash size={20} color='red' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {addRevision && <AddRevision setShow={setAddRevision} show={addRevision} />}
      {editData && (
        <AddRevision
          setShow={() => {
            setAddRevision(false)
            setEditData(null)
            setIsEdit(false)
          }}
          show={isEdit}
          editData={editData}
        />
      )}
    </div>
  )
}

export default Revisions
