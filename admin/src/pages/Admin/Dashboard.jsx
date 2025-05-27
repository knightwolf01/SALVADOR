import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const { aToken, cancelAppointment, dashData, getDashData } = useContext(AdminContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      {/* Quick Action Buttons */}
      <div className='flex gap-4 mb-6'>
        <button 
          onClick={() => navigate('/add-doctor')}
          className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all'
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5 invert" />
          Register New Doctor
        </button>
        <button 
          onClick={() => navigate('/doctor-list')}
          className='flex items-center gap-2 bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-all'
        >
          <img src={assets.people_icon} alt="" className="w-5 h-5" />
          View Doctors List
        </button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border-2 border-gray-100 hover:shadow-lg transition-all'>          <div className='p-4 bg-green-50 rounded-full'>
            <img className='w-10 h-10' src={assets.doctor_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.doctors}</p>
            <p className='text-gray-500'>Total Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border-2 border-gray-100 hover:shadow-lg transition-all'>
          <div className='p-4 bg-green-50 rounded-full'>
            <img className='w-10 h-10' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.appointments}</p>
            <p className='text-gray-500'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border-2 border-gray-100 hover:shadow-lg transition-all'>
          <div className='p-4 bg-yellow-50 rounded-full'>
            <img className='w-10 h-10' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{dashData.patients}</p>
            <p className='text-gray-500'>Total Patients</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 rounded-lg border-2 border-gray-100 hover:shadow-lg transition-all'>
          <div className='p-4 bg-purple-50 rounded-full'>
            <img className='w-10 h-10' src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold text-gray-700'>{currency}{dashData.totalEarnings || 0}</p>
            <p className='text-gray-500'>Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white mt-8 rounded-lg shadow-sm'>
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <div className='flex items-center gap-2'>
            <img src={assets.list_icon} alt="" className="w-5 h-5" />
            <p className='font-semibold text-gray-700'>Latest Bookings</p>
          </div>
          <button 
            onClick={() => navigate('/all-appointments')}
            className='text-primary text-sm hover:underline'
          >
            View All
          </button>
        </div>

        <div className='divide-y'>
          {dashData.lastestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-4 hover:bg-gray-50 transition-all' key={index}>
              <img 
                className='w-10 h-10 rounded-full object-cover'
                src={item.docData.image}
                alt={item.docData.name} 
              />

              <div className='ml-4 flex-1'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-500 text-sm'>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>

              <div className='flex items-center gap-3'>
                <p className='text-gray-700 font-medium'>{currency}{item.amount}</p>
                {item.cancelled ? (
                  <p className='text-red-500 text-sm font-medium'>Cancelled</p>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='p-2 hover:bg-red-50 rounded-full transition-all'
                  >
                    <img className='w-6 h-6' src={assets.cancel_icon} alt="Cancel" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard