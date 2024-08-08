import React, { useEffect, useState } from 'react'
import { Accordion, Button, Table } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
import { BiSolidEdit } from 'react-icons/bi'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import MaterialService from '@redux/services/material/material.service'
import SubscriptionService from '@redux/services/subscription.service'
import { config as configs } from 'config'
import AddMaterial from './AddMaterial'
import Filter from './Filter'

const default_page_size = configs.PAGE_SIZE

const Material = () => {
  const [addMaterial, setAddMaterial] = useState(false)
  const [editData, setEditData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.material.count)
  const materials = useAppSelector((state) => state.material.materials)
  const filters = useAppSelector((state) => state.material.filters)
  const refresh = useAppSelector((state) => state.material.refresh)

  useEffect(() => {
    MaterialService.getMaterialsByFilter(filters)
  }, [refresh, filters])

  const startIndex = (filters.page - 1) * default_page_size

  const keyMapping = {
    'Part Number': 'part_number_id',
    Revision: 'revision_id',
    Quantity: 'quantity'
  }
  const requiredKeys = Object.keys(keyMapping)

  const updateKeys = (obj, mapping) => {
    return obj.map((item) => {
      const updatedItem = {}
      for (const key in item) {
        if (mapping.hasOwnProperty(key)) {
          updatedItem[mapping[key]] = item[key]
        } else {
          updatedItem[key] = item[key]
        }
      }
      return updatedItem
    })
  }

  const validateKeys = (obj, requiredKeys) => {
    let missingKeys = []
    obj.forEach((item) => {
      requiredKeys.forEach((key) => {
        if (!item.hasOwnProperty(key)) {
          if (!missingKeys.includes(key)) {
            missingKeys.push(key)
          }
        }
      })
    })
    return missingKeys
  }

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between shadow-sm p-3 mb-2 rounded'>
        <div className='d-flex align-items-center'>
          <h3 style={{ margin: 0, marginRight: '10px' }}>Materials</h3>
        </div>
        <div className='d-flex align-items-center'>
          {configs.SHOW_DELETE_ALL_BUTTON && (
            <div className='me-2'>
              <Button variant='primary' type='button' onClick={() => MaterialService.deleteAllMaterials()}>
                Delete All Materials
              </Button>
            </div>
          )}
          <div>
            <Button variant='primary' type='button' onClick={() => setAddMaterial(true)}>
              Add Material
            </Button>
          </div>
        </div>
      </div>
      <div className=' shadow-sm mb-3 rounded'>
        <Accordion flush>
          <Accordion.Item eventKey='0'>
            <Accordion.Header bsPrefix='Accordion-filter-header'>
              <h3 className='p-0 m-0'>Filters</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Filter />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='text-secondary py-4'>{count} Materials</h5>
        <PaginationControl
          page={filters.page}
          between={4}
          total={count}
          limit={default_page_size}
          changePage={(page) => {
            dispatch(moduleActions.setPage(page))
          }}
          ellipsis={1}
        />
      </div>
      <Table striped borderless hover responsive>
        <thead>
          <tr className='border-bottom'>
            <th key={1} className='bg-primary text-white py-3'>
              #
            </th>
            <th key={2} className='bg-primary text-white py-3'>
              Material
            </th>
            <th key={3} className='bg-primary text-white py-3'>
              Type
            </th>
            <th key={4} className='bg-primary text-white py-3'>
              Quantity
            </th>
            <th key={5} className='bg-primary text-white py-3'>
              Part Number
            </th>
            <th key={6} className='bg-primary text-white py-3'>
              Part Number Revision
            </th>
            <th key={7} className='text-end bg-primary text-white py-3 pe-4'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {materials?.map((item, index) => (
            <tr key={item?._id}>
              <td key={item?._id + 1}>{item?.id}</td>
              <td key={item?._id + 2}>{item?.name}</td>
              <td key={item?._id + 3}>{item?.type_id?.name}</td>
              <td key={item?._id + 4}>{item?.quantity}</td>
              <td key={item?._id + 5}>{item?.part_number_id?.name}</td>
              <td key={item?._id + 6}>{item?.revision_id?.name}</td>
              <td key={item?._id + 7} className='text-end'>
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
                      MaterialService.deleteMaterial(item._id)
                    })
                    dispatch(
                      modalActions.openModal({
                        width: '00px',
                        type: 'CONFIRMATION_FORM',
                        data: {
                          heading: `Delete Material`,
                          message: `Are you sure you want to remove this Material?`
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
      {addMaterial && <AddMaterial setShow={setAddMaterial} show={addMaterial} />}
      {isEdit && (
        <AddMaterial
          setShow={() => {
            setAddMaterial(false)
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

export default Material
