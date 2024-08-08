import { Button, Table } from 'react-bootstrap'
import React, { useState } from 'react'
import AddPartNumber from './AddPartNumber'
import useEffectOnce from 'hooks/useEffectOnce'
import PartNumberService from '@redux/services/part_number/partNumber.service'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import CircleLoader from 'components/atoms/CircleLoader'
import { BiSolidEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { modalActions } from '@redux/slices/modal'
import SubscriptionService from '@redux/services/subscription.service'
const PartNumbers = () => {
  const [addPartNumber, setAddPartNumber] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useAppDispatch()

  const partNumbers = useAppSelector((state) => state.partNumber.partNumbers)
  const loading = useAppSelector((state) => state.partNumber.loading)
  useEffectOnce(() => {
    PartNumberService.getPartNumbers()
  })
  return (
    <div>
      {loading && <CircleLoader />}

      <div className='d-flex align-items-center justify-content-between shadow-sm p-3 mb-1 rounded'>
        <div>
          <h3 style={{ margin: 0 }}>Part Numbers</h3>
        </div>
        <div>
          <Button variant='primary' type='button' onClick={() => setAddPartNumber(true)}>
            Add Part Number
          </Button>
        </div>
      </div>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th key={1} className='bg-primary text-white py-3'>
              #
            </th>
            <th key={2} className='bg-primary text-white py-3'>
              Name
            </th>
            <th key={3} className='bg-primary text-white py-3'>
              Material
            </th>
            <th key={4} className='bg-primary text-white py-3'>
              Type
            </th>
            <th key={5} className='text-end bg-primary text-white py-3 pe-4'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {partNumbers?.map((item, index) => (
            <tr key={item._id}>
              <td key={item?._id + 1}>{index + 1}</td>
              <td key={item?._id + 2}>{item.name}</td>
              <td key={item?._id + 4}>{item.material_id?.name}</td>
              <td key={item?._id + 3}>{item.type_id?.name}</td>
              <td key={item?._id + 5} className='text-end'>
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
                      PartNumberService.deletePartNumber(item._id)
                    })
                    dispatch(
                      modalActions.openModal({
                        width: '500px',
                        type: 'CONFIRMATION_FORM',
                        data: {
                          heading: `Delete Part Number`,
                          message: `Are you sure you want to remove this Part Number?`
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
      {addPartNumber && <AddPartNumber setShow={setAddPartNumber} show={addPartNumber} />}
      {isEdit && (
        <AddPartNumber
          setShow={() => {
            setAddPartNumber(false)
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

export default PartNumbers
