import CircleLoader from 'components/atoms/CircleLoader'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAppSelector } from '@redux/hooks'
import PartNumberService from '@redux/services/part_number/partNumber.service'
import useEffectOnce from 'hooks/useEffectOnce'
import RevisionService from '@redux/services/part_number/parts/revision.service'

function AddPartNumber({ show, setShow, editData }) {
  const { loading } = useAppSelector((state) => state.modal)
  const partNumbers = useAppSelector((state) => state.partNumber.partNumbers)

  const [data, setData] = useState({ name: '', part_number_id: '' })
  const handleClose = () => setShow(false)

  useEffectOnce(() => {
    PartNumberService.getPartNumbers()
  })

  useEffect(() => {
    if (editData) {
      setData({ name: editData?.name, part_number_id: editData?.part_number?._id })
    }
  }, [editData])

  const onSubmit = async () => {
    if (editData) {
      const [success] = await RevisionService.updateRevision({
        ...data,
        _id: editData._id
      })
      if (success) setShow(false)
    } else {
      const [success] = await RevisionService.addRevision(data)
      if (success) setShow(false)
    }
  }
  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        {loading && <CircleLoader />}
        <Modal.Header closeButton>
          <Modal.Title>{editData ? 'Update' : 'Add'} Revision</Modal.Title>
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
              <label htmlFor='selectCategory' className='form-label'>
                Part Number
              </label>
              <select
                value={data.part_number_id}
                onChange={(event) => setData({ ...data, part_number_id: event.target.value })}
                className='form-select'
                id='selectCategory'
                aria-label='Default select example'
                required
              >
                <option value={''}>Select Part Number</option>
                {partNumbers?.map((item, index) => (
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
