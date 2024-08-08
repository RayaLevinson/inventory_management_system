import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { BiSolidEdit } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import useEffectOnce from 'hooks/useEffectOnce'
import SubscriptionService from '@redux/services/subscription.service'
import MaterialTypeService from '@redux/services/material/parts/materialType.service'
import AddMaterialType from './AddMaterialType'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { modalActions } from '@redux/slices/modal'
import { config as configs } from 'config'

const MaterialType = () => {
  const [addMaterialType, setAddMaterialType] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useAppDispatch()
  const materialTypes = useAppSelector((state) => state.materialType.materialTypes)

  useEffectOnce(() => {
    MaterialTypeService.getMaterialTypes()
  })

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between shadow-sm p-3 mb-2 rounded'>
        <div className='d-flex align-items-center'>
          <h3 style={{ margin: 0 }}>Material Types</h3>
        </div>
        <div className='d-flex align-items-center'>
          {configs.SHOW_DELETE_ALL_BUTTON && (
            <>
              <div className='me-2'>
                <Button variant='primary' type='button' onClick={() => MaterialTypeService.deleteAllMaterialTypes()}>
                  Delete All Types
                </Button>
              </div>
            </>
          )}
          <div>
            <Button variant='primary' type='button' onClick={() => setAddMaterialType(true)}>
              Add Material Type
            </Button>
          </div>
        </div>
      </div>
      <Table striped hover>
        <thead>
          <tr key={0}>
            <th key={1} className='bg-primary text-white py-3'>
              #
            </th>
            <th key={2} className='bg-primary text-white py-3'>
              Material Type
            </th>
            <th key={4} className='text-end bg-primary text-white py-3 pe-4'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {materialTypes?.map((item, index) => (
            <tr key={item?._id}>
              <td key={item?._id + 1}>{index + 1}</td>
              <td key={item?._id + 2}>{item.name}</td>
              <td key={item?._id + 3} className='text-end'>
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
                      MaterialTypeService.deleteMaterialType(item._id)
                    })
                    dispatch(
                      modalActions.openModal({
                        width: '500px',
                        type: 'CONFIRMATION_FORM',
                        data: {
                          heading: `Delete Material Type`,
                          message: `Are you sure you want to remove this Material Type?`
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

      {addMaterialType && <AddMaterialType setShow={setAddMaterialType} show={addMaterialType} />}

      {isEdit && (
        <AddMaterialType
          setShow={() => {
            setAddMaterialType(false)
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

export default MaterialType
