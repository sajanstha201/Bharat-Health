import React from "react"
import Select from 'react-select'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faCar, faClose, faBars} from '@fortawesome/free-solid-svg-icons';
import { useNavigate,Link } from "react-router-dom";
export default function SideBar({navElements}){
    const navigate=useNavigate()
   return(
    <div className={`h-screen flex flex-col gap-10 p-4 top-0 w-[20%] fixed left-0 rounded-md  bg-blue-50 shadow-lg transition-all duration-200`}>
        {navElements.map(element =>(       
        <Link key={element.url} to={element.url} className="flex items-center gap-5">
            <FontAwesomeIcon icon={element.icon} size="2x"/>
            {element.name}
        </Link>))}

        <div className="flex">
            <Select
            value={'null'}
            options={[
                {value:'',label:'Guest'},
                {value:'patient',label:'Patient'},
                {value:'doctor',label:'Doctor'},
                {value:'testlab',label:'Test Lab'},
                {value:'pharmacy',label:'Pharmacy'}
            ]}
            onChange={(selected)=>{
                console.log(selected)
                navigate("/"+selected['value'])
            }}
            />
        </div>

    </div>
   )
}