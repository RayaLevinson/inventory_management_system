import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppSelector } from '@redux/hooks'
import useEffectOnce from 'hooks/useEffectOnce'
import MaterialService from '@redux/services/material/material.service'
import MaterialTypeService from '@redux/services/material/parts/materialType.service'
import PartNumberService from '@redux/services/part_number/partNumber.service'
import RevisionService from '@redux/services/part_number/parts/revision.service'

function AddMaterial({ show, setShow, editData }) {
  const [revisionsOfSelectedPartNumbers, setRevisionsOfSelectedPartNumbers] = useState([])
  const materialTypes = useAppSelector((state) => state.materialType.materialTypes)
  const partNumbers = useAppSelector((state) => state.partNumber.partNumbers)
  const revisions = useAppSelector((state) => state.revision.revisions)

  const [data, setData] = useState({
    name: '',
    type_id: '',
    quantity: 1,
    part_number_id: null, // Only for existing part number
    revision_id: null, // Only for existing revision
    part_number_name: null, // Only for new part number
    revision_name: null // Only for new revision
  })
  const handleClose = () => setShow(false)

  useEffectOnce(() => {
    MaterialTypeService.getMaterialTypes()
    PartNumberService.getPartNumbers()
    RevisionService.getRevisions()
  })

  useEffect(() => {
    if (editData) {
      setData({
        name: editData?.name,
        type_id: editData?.type_id?._id,
        quantity: editData?.quantity ? editData?.quantity : 1,
        part_number_id: editData?.part_number_id, // Only for existing part number
        revision_id: editData?.revision_id, // Only for existing revision
        part_number_name: editData?.part_number_name, // Only for new part number
        revision_name: editData?.revision_name // Only for new revision
      })
    }
  }, [editData])

  const onSubmit = async () => {
    if (editData) {
      const [success] = await MaterialService.updateMaterial({
        ...data,
        _id: editData._id
      })
      if (success) setShow(false)
    } else {
      const [success] = await MaterialService.addMaterial(data)
      if (success) setShow(false)
    }
  }

  const onPartNumberChange = async (event) => {
    const revFilter = revisions.filter((item) => item.part_number_id?._id == event.target.value)
    setRevisionsOfSelectedPartNumbers(revFilter)
    setData({ ...data, part_number_id: event.target.value })
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop='static' keyboard={false} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Update' : 'Add'} Material</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Modal.Body>
            <div className='mb-3'>
              <label htmlFor='inputMaterial' className='form-label'>
                Material Name
              </label>
              <input
                type='text'
                required
                value={data.name}
                onChange={(event) => setData({ ...data, name: event.target.value })}
                className='form-control'
                id='inputMaterial'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='selectType' className='form-label'>
                Material Type
              </label>
              <select
                value={data.type_id}
                onChange={(event) => setData({ ...data, type_id: event.target.value })}
                className='form-select'
                id='selectType'
                aria-label='Default select example'
                required
              >
                <option value={''}>Select Material Type</option>
                {materialTypes?.map((item, index) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='inputQuantity' className='form-label'>
                Quantity
              </label>
              <input
                type='number'
                min={0}
                defaultValue={1}
                value={data.quantity}
                onChange={(event) => setData({ ...data, quantity: event.target.value })}
                className='form-control'
                id='inputQuantity'
              />
            </div>
            {/* Part Number */}
            <div className='row g-3'>
              <div className='mb-3 col-md-6'>
                <label htmlFor='selectPartNumber' className='form-label'>
                  Part Number
                </label>
                <select
                  value={data.part_number_id}
                  onChange={onPartNumberChange}
                  // onChange={(event) => {
                  //   // let revFilter = revisions.filter((item) => item.part_number_id?._id == event.target.value)
                  //   // setRevisionsOfSelectedPartNumbers(revFilter)
                  //   setData({ ...data, part_number_id: event.target.value })
                  // }}
                  className='form-select'
                  id='selectPartNumber'
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
              <div className='mb-3 col-md-6'>
                <label htmlFor='inputPartNumber' className='form-label'>
                  Part Number
                </label>
                <input
                  type='text'
                  value={data.part_number_id?.name}
                  onChange={(event) => setData({ ...data, part_number_name: event.target.value })}
                  className='form-control'
                  id='inputPartNumber'
                />
              </div>
            </div>
            <div className='row g-3'>
              {/* Part Number Revision */}
              <div className='mb-3 col'>
                <label htmlFor='selectRevision' className='form-label'>
                  Part Number Revision
                </label>
                <select
                  value={data.revision_id}
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

              <div className='mb-3 col-md-6'>
                <label htmlFor='inputRevisionsOfPartNumber' className='form-label'>
                  Part Number Revision
                </label>
                <input
                  type='text'
                  value={data.revision_id?.name}
                  onChange={(event) => setData({ ...data, revision_name: event.target.value })}
                  className='form-control'
                  id='inputRevisionsOfPartNumber'
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              {editData ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <></>
    </>
  )
}

export default AddMaterial
