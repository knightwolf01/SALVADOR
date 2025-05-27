import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '')
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [dashData, setDashData] = useState(false)
  const [doctorData, setDoctorData] = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getDoctorProfile = async () => {
    try {
      if (!dToken) return;
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { token: dToken }
      });
      if (data.success) {
        setDoctorData(data.doctorData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, { 
        headers: { aToken } 
      });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const endpoint = dToken 
        ? `${backendUrl}/api/doctor/appointments`
        : `${backendUrl}/api/admin/appointments`;
      
      const headers = dToken 
        ? { token: dToken }
        : { aToken };

      const { data } = await axios.get(endpoint, { headers });
      console.log(data);
      

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const endpoint = dToken
        ? `${backendUrl}/api/doctor/cancel-appointment`
        : `${backendUrl}/api/admin/cancel-appointment`;
      
      const headers = dToken
        ? { token: dToken }
        : { aToken };

      const { data } = await axios.post(endpoint, { appointmentId }, { headers });

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const endpoint = dToken
        ? `${backendUrl}/api/doctor/dashboard`
        : `${backendUrl}/api/admin/dashboard`;
      
      const headers = dToken
        ? { token: dToken }
        : { aToken };

      const { data } = await axios.get(endpoint, { headers });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken, setAToken,
    dToken, setDToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    doctorData,
    getDoctorProfile
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider