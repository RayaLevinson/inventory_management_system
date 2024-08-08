import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import ModuleService from '@redux/services/module/module.service'
import { moduleActions } from '@redux/slices/module/module'
import moment from 'moment'

export default function ViewModules() {
  const dispatch = useAppDispatch()
  const { ids } = useAppSelector((state) => state.modal.data)
  const modules = useAppSelector((state) => state.module.module)

  useEffect(() => {
    ModuleService.getModulesById({ ids })

    return () => {
      moduleActions.setModule(null)
    }
  }, [ids])

  return (
    <div>
      <div className='p-4 row mx-0 gy-3'>
        {modules?.map((item, index) => (
          <CardView item={item} key={index} />
        ))}
      </div>
    </div>
  )
}

const Heading = ({ title, value }) => (
  <div className='col-4 pt-1'>
    <p className='text-secondary p-0 m-0'>{title}</p>
    <p className='text-dark  p-0 m-0 fw-bolder'>{value || '--'}</p>
  </div>
)
export const CardView = ({ item }) => {
  return (
    <>
      <div
        className='  row g-2 p-3 shadow bg-white rounded  position-relative h-100'
        // style={{ boxShadow: "1px 1px 1px 1px #663399" }}
      >
        <>
          <Heading title='Description ' value={item.description_id?.name} />
          <Heading title='Part Number' value={item.pn_id?.name} />
          <Heading title='Revision ID' value={item.revision_id?.name} />
          <Heading title='Serial Number' value={item.serial_number} />
          <Heading title='Firmware 1' value={item.firmware1} />
          <Heading title='Firmware 2' value={item.firmware2} />
          <Heading title='Firmware 3' value={item.firmware3} />
          <Heading title='Quantity' value={item.quantity} />
          <Heading title='Date' value={moment(item.date).format('L')} />
          <Heading title='State ID' value={item.state_id?.name} />
          <Heading title='Status ID' value={item.status_id?.name} />
          <Heading title='Comments' value={item.comments} />
          <Heading title='System' value={item.system?.map((item) => item.serial_number?.name)?.join(',')} />
        </>
      </div>
    </>
  )
}
