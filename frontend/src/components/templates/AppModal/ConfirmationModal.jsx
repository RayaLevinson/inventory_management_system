import { useEffect, useState } from 'react'
import { modalActions } from '@redux/slices/modal'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import SubscriptionService from '@redux/services/subscription.service'
import { Button, Modal } from 'react-bootstrap'

export default function ConfirmationModal() {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.modal.data)
  // useEffect(() => {
  //   return () => {
  //     SubscriptionService.unsubscribe();
  //   };
  // }, []);

  const onClickYes = () => SubscriptionService.call()

  return (
    <div>
      <p style={{ padding: '20px 20px' }}>{data.message}</p>

      <Modal.Footer>
        <Button variant='secondary' type='button' className='px-5' onClick={() => dispatch(modalActions.closeModal())}>
          {' '}
          {data.closeBtn || 'No'}
        </Button>
        <Button variant='primary' onClick={onClickYes} type='button' className='px-5'>
          {data.btn || 'Yes'}
        </Button>
      </Modal.Footer>
    </div>
  )
}
