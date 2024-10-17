import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AppointmentCard from "./AppointmentCard"
import { toast } from "react-toastify"
export default function TodayAppointment(){
    const [appointments,setAppointments]=useState([])
    const baseUrl=useSelector(state=>state.baseUrl).backend
    const userInfo=useSelector(state=>state.userInfo)
    const fetchTodayAppointment=async()=>{
        try{
            console.log('fetching today apppointment')
            const response=await axios.get(`${baseUrl}api/doctor/appointments/${userInfo.id}/?status=${'today'}`,{'headers':{'Authorization':userInfo.token}})
            console.log(response.data)
            setAppointments(response.data)
        }
        catch(error){
            console.log(error)
            toast.error("Error Fetching Today Appointment Data")
        }
    }
    useEffect(()=>{
        fetchTodayAppointment()
    },[])
   return(
   <>   
   <h1 className="text-[30px] font-bold">Today Appointments</h1>
   {appointments.length===0&&<h1 className="text-sm">No Appointment Today</h1>}
    <div className='flex flex-wrap gap-10 p-5 items-center justify-center'>
    {appointments.map((e,i)=>(
         <AppointmentCard key={i} 
            date={e.appointment_date} 
            time={e.appointment_time} 
            status={e.appointment_status} 
            patientId={e.patient} 
            appointmentId={e.appointment_id}
            appointmentType={e.appointment_type}
            fetchAppointments={fetchTodayAppointment}
            />))}
    </div>
   </>)
}