import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <div className='overflow-hidden h-28 w-28'>
        <img onClick={() => navigate('/')} className='cursor-pointer scale-[2] object-cover object-center' src={assets.logo} alt="" />
      </div>
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <div className='flex items-center gap-3'>                <button onClick={() => {
                  localStorage.setItem('authState', 'Login')
                  navigate('/login')
                }} className='text-primary hover:text-primary/80 transition-colors hidden md:block'>Login</button>
                <button onClick={() => {
                  localStorage.setItem('authState', 'Sign Up')
                  navigate('/login')
                }} className='bg-primary text-white px-8 py-3 rounded-full font-light hover:shadow-lg hover:scale-105 transition-all duration-300'>Create Account</button>
              </div>
        }

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---------- Mobile Menu ---------- */}        <div className={`${showMenu ? 'fixed' : 'hidden'} md:hidden left-0 right-0 top-0 bottom-0 z-20 bg-white`}>
          <div className='flex items-center justify-between px-5 py-6 border-b'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7 cursor-pointer hover:opacity-80 transition-opacity' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-3 py-3 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-3 py-3 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-3 py-3 rounded inline-block'>CONTACT</p></NavLink>
            
            {!token && (
              <div className='flex flex-col w-full gap-3 mt-4 px-4'>
                <button onClick={() => {
                  navigate('/login')
                  localStorage.setItem('authState', 'Login')
                  setShowMenu(false)
                }} className='w-full py-2.5 text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors'>
                  Login
                </button>
                <button onClick={() => {
                  navigate('/login')
                  localStorage.setItem('authState', 'Sign Up')
                  setShowMenu(false)
                }} className='w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'>
                  Create Account
                </button>
              </div>
            )}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar