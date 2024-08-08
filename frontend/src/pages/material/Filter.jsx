import React, { useState } from 'react'
import SearchIcon from 'assets/search.svg'
import useEffectOnce from 'hooks/useEffectOnce'
import MaterialTypeService from '@redux/services/material/parts/materialType.service'
import PartNumberService from '@redux/services/part_number/partNumber.service'
import RevisionService from '@redux/services/part_number/parts/revision.service'
// import StateService from 'services/state.service'
// import StatusService from 'services/status.service'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { Button } from 'react-bootstrap'
import { materialActions } from '@redux/slices/material'
import { config as configs } from 'config'

const default_page_size = configs.PAGE_SIZE

const Filter = () => {
  const [revisionsOfSelectedPartNumbers, setRevisionsOfSelectedPartNumbers] = useState([])
  const dispatch = useAppDispatch()
  const materials = useAppSelector((state) => state.material.materials)
  const materialTypes = useAppSelector((state) => state.materialType.materialTypes)
  const partNumbers = useAppSelector((state) => state.partNumber.partNumbers)
  const revisions = useAppSelector((state) => state.revision.revisions)

  const [data, setData] = useState({
    type_id: '',
    part_number_id: '',
    revision_id: ''
  })

  const onSubmit = () => {
    let values = { page: 1, page_size: default_page_size }
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== '') {
        values[key] = data[key]
      }
    })
    dispatch(materialActions.setFilters(values))
  }

  const onReset = () => {
    dispatch(materialActions.setFiltered(materials))
    setData({
      type_id: '',
      part_number_id: '',
      revision_id: ''
    })
    dispatch(materialActions.resetFilters())
  }
  useEffectOnce(async () => {
    await MaterialTypeService.getMaterialTypes()
    await PartNumberService.getPartNumbers()
    await RevisionService.getRevisions()
  })

  const onPartNumberChange = async (event) => {
    const revFilter = revisions.filter((item) => item.part_number_id?._id == event.target.value)
    setRevisionsOfSelectedPartNumbers(revFilter)
    setData({ ...data, part_number_id: event.target.value })
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        onReset={(event) => {
          event.preventDefault()
          onReset()
        }}
        className='row  g-3'
      >
        <div className='row g-3'>
          <div className='col-2'>
            <label htmlFor='selectType' className='form-label'>
              Material Type
            </label>
            <select
              value={data.type_id}
              onChange={(event) => setData({ ...data, type_id: event.target.value })}
              className='form-select'
              id='selectType'
              aria-label='Default select example'
            >
              <option value={''}>Select Material Type</option>
              {materialTypes?.map((item, index) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <>
            <div className='col-2'>
              <label htmlFor='selectPart' className='form-label'>
                Part Number
              </label>
              <select
                value={data.part_number_id}
                onChange={onPartNumberChange}
                // onChange={(event) => {
                //   setData({ ...data, part_number_id: event.target.value })
                // }}
                className='form-select'
                id='selectPart'
                aria-label='Default select example'
              >
                <option value={''}>Select Part Number</option>
                {partNumbers?.map((item, index) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=' col-2'>
              <label htmlFor='selectRevision' className='form-label'>
                Revision
              </label>
              <select
                value={data?.revision_id}
                onChange={(event) => setData({ ...data, revision_id: event.target.value })}
                className='form-select'
                id='selectRevision'
                aria-label='Default select example'
              >
                <option value={''}>Select Revision</option>
                {revisionsOfSelectedPartNumbers?.length > 0
                  ? revisionsOfSelectedPartNumbers?.map((item, index) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))
                  : revisions?.map((item, index) => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
              </select>
            </div>
          </>
          <div className='col-2  d-flex align-items-end'>
            <Button variant='outline-primary' type='reset' className='w-50 me-1' onClick={() => {}}>
              Reset
            </Button>
            <Button variant='primary' type='submit' className='w-50'>
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Filter
