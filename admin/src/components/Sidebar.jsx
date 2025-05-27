import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {
  const { aToken, dToken } = useContext(AdminContext)

  const renderAdminLinks = () => (
    <>      <NavLink 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200 hover:bg-green-50 ${isActive ? 'bg-green-100 border-r-4 border-primary' : ''}`} 
        to={'/admin-dashboard'}
      >
        <img src={assets.home_icon} alt="" />
        <p>Dashboard</p>
      </NavLink>

      <NavLink 
        className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}
        to={'/all-appointments'}
      >
        <img src={assets.appointment_icon} alt="" />
        <p>All Appointments</p>
      </NavLink>

      <NavLink 
        className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}
        to={'/add-doctor'}
      >
        <img src={assets.add_icon} alt="" />
        <p>Add Doctor</p>
      </NavLink>

      <NavLink 
        className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}
        to={'/doctor-list'}
      >
        <img src={assets.people_icon} alt="" />
        <p>Doctors List</p>
      </NavLink>
    </>
  )

  const renderDoctorLinks = () => (
    <>
      <NavLink 
        className={({ isActive }) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} 
        to={'/doctor-dashboard'}
      >
        <img src={assets.home_icon} alt="" />
        <p>Dashboard</p>
      </NavLink>

      <NavLink 
        className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}
        to={'/all-appointments'}
      >
        <img src={assets.appointment_icon} alt="" />
        <p>My Appointments</p>
      </NavLink>
    </>
  )

  return (
    <div className='min-h-screen bg-white border-r'>
      {(aToken || dToken) && (
        <ul className='text-[#515151] mt-5'>
          {aToken ? renderAdminLinks() : renderDoctorLinks()}
        </ul>
      )}
    </div>
  )
}

export default Sidebar