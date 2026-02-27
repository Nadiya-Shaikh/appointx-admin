import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const DoctorAppointments = () => {
const { docId } = useParams()
const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (dToken) {
//       getAppointments()
//     }
//   }, [dToken])
// useEffect(() => {
//   getAppointments()
// }, [])
useEffect(() => {
  if (aToken) {
    getAllAppointments()

    const interval = setInterval(() => {
      getAllAppointments()
    }, 5000) // every 5 sec refresh

    return () => clearInterval(interval)
  }
}, [aToken])

// const filteredAppointments = appointments.filter(
//   (item) => item.docId === docId
// )
const filteredAppointments = appointments.filter(
  (item) => item.docId.toString() === docId
)

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {filteredAppointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
           {item.cancelled ? (
  <div className="flex flex-col">

    <p className='text-red-400 text-xs font-medium'>
      Cancelled
    </p>

    {item.refundStatus === "processing" && (
      <p className="text-yellow-500 text-xs">
        Refund Processing...
      </p>
    )}

    {item.refundStatus === "refunded" && (
      <p className="text-green-600 text-xs">
        Refunded
      </p>
    )}

  </div>
) : item.isCompleted ? (
  <p className='text-green-500 text-xs font-medium'>
    Completed
  </p>
) : (
  <div className='flex'>
    <button
      onClick={() => cancelAppointment(item._id)}
      className='cursor-pointer text-red-400 text-xs font-medium border border-red-400 px-2 py-1 rounded hover:bg-red-50'
    >
      Force Cancel
    </button>
  </div>
)}
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments