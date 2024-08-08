import CircleLoader from "components/atoms/CircleLoader";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppSelector } from "@redux/hooks";
import MaterialTypeService from "@redux/services/material/parts/materialType.service";

function AddMaterialType({ show, setShow, editData }) {
  const { loading } = useAppSelector((state) => state.modal)
  const [name, setName] = useState('')
  const handleClose = () => setShow(false)
  useEffect(() => {
    if (editData) {
      setName(editData.name)
    }
  }, [editData])

  const onSubmit = async () => {
    if (editData) {
      const [success] = await MaterialTypeService.updateMaterialType({
        name,
        _id: editData._id
      })
      if (success) setShow(false)
    } else {
      const [success] = await MaterialTypeService.addMaterialType({ name })
      if (success) setShow(false)
    }
  }
  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        {loading && <CircleLoader />}
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Update' : 'Add'} Material Type</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Modal.Body>
            <div className='mb-3'>
              <label htmlFor='inputMaterialType' className='form-label'>
                Name
              </label>
              <input
                type='text'
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className='form-control'
                id='inputMaterialType'
              />
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

export default AddMaterialType;
