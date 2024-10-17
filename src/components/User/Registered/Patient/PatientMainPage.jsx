import React from "react"
import { Outlet, useLocation } from "react-router-dom"

import Search from "../../../Search/Search"
import { useSelector } from "react-redux"
import TodayAppointment from "./Appointment/TodayAppointment"
import StarredMedicalReport from "./MedicalReport/StarredMedicalReport"
export default function PatientMainPage(){
   const loc=useLocation()
   const userInfo=useSelector(state=>state.userInfo)
   return(
      <div style={{fontFamily: 'miriam-libre'}} className="flex flex-row gap-3">
         <div className="w-full m-5 flex items-center justify-center flex-col">
            <TodayAppointment/>
            <StarredMedicalReport/>
            <Outlet />
         </div>
      </div>
   )
}