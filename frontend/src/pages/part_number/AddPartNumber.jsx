import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useEffectOnce from 'hooks/useEffectOnce'
import { useAppSelector } from '@redux/hooks'
import PartNumberService from '@redux/services/part_number/partNumber.service'
import MaterialTypeService from '@redux/services/material/parts/materialType.service'

function AddPartNumber({ show, setShow, editData }) {
  const materialTypes = useAppSelector((state) => state.materialType.materialTypes)
  const materials = useAppSelector((state) => state.material.materials)
  const [materialsOfSelectedTypes, setMaterialsOfSelectedTypes] = useState([])

  const [data, setData] = useState({ name: '', type_id: null, material_id: null })
  const handleClose = () => setShow(false)

  useEffectOnce(() => {
    MaterialTypeService.getMaterialTypes()
  })

  useEffect(() => {
    if (editData) {
      setData({
        name: editData?.name,
        type_id: editData?.type_id,
        material_id: editData?.material_id
      })
    }
  }, [editData])

  const onSubmit = async () => {
    if (editData) {
      const [success] = await PartNumberService.updatePartNumber({
        ...data,
        _id: editData._id
      })
      if (success) setShow(false)
    } else {
      const [success] = await PartNumberService.addPartNumber(data)
      if (success) setShow(false)
    }
  }
  const onMaterialTypeChange = (event) => {
    const filtered = materials.filter((item) => item.type_id._id == event.target.value)
    console.log('!!!!!!!!!!!!', event.target.value, filtered)
    setMaterialsOfSelectedTypes(filtered)
    setData({ ...data, type_id: event.target.value })
  }

  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Update' : 'Add'} Part Number</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Modal.Body>
            <div className='mb-3'>
              <label htmlFor='inputPartNumber' className='form-label'>
                Name
              </label>
              <input
                type='text'
                required
                value={data.name}
                onChange={(event) => setData({ ...data, name: event.target.value })}
                className='form-control'
                id='inputPartNumber'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='selectType' className='form-label'>
                Material Type
              </label>
              <select
                value={data.type_id}
                onChange={onMaterialTypeChange}
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
              <label htmlFor='selectMaterial' className='form-label'>
                Material
              </label>
              <select
                value={data.material_id}
                onChange={(event) => setData({ ...data, type_id: event.target.value })}
                className='form-select'
                id='selectMaterial'
                aria-label='Default select example'
              >
                <option value={''}>Select Material</option>
                {/* {materials?.map((item, index) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))} */}
                {materialsOfSelectedTypes?.map((item, index) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
    </>
  )
}

export default AddPartNumber
