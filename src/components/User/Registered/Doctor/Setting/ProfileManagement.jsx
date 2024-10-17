import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
export default function ProfileManagement() {
   const userInfo=useSelector(state=>state.userInfo)
  const [formData, setFormData] = useState(userInfo);
  const [image, setImage] = useState(null);
   const baseUrl=useSelector(state=>state.baseUrl).backend
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? null : value, // Set to null if input is empty
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   const data = new FormData(); 
   for (const key in formData) {
      if(formData[key]!==null&&formData[key]!==""){
         data.append(key,formData[key]);
      }
   }
   if (image) {
     data.append("profile_image", image);
   }
   try {
     const response = await axios.patch(baseUrl+'api/doctor/profile/'+userInfo.id+'/',data,{headers:{'Authorization':userInfo.token}})
     console.log(response.data)
     toast.success('successfully updated')
   } catch (error) {
      toast.error('unable to update')
     console.error("Error:", error);
   }
 };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="w-full flex items-center justify-center">
         <input id='user-profile-image' type="file" accept=".jpg,.jpeg,.png" onChange={(e)=>{setImage(e.target.files[0])}}></input>
         {image&&
         <img 
         src={URL.createObjectURL(image)}
         className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center rounded-full"
         ></img>}
      </div>
      <h2 className="text-2xl font-bold mb-4">Profile Management Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="middle_name"
            placeholder="Middle Name"
            value={formData.middle_name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name || ""}
            onChange={handleChange}
            
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age !== null ? formData.age : ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <select
            name="sex"
            value={formData.sex || ""}
            onChange={handleChange}
            
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            name="primary_address"
            placeholder="Primary Address"
            value={formData.primary_address || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="secondary_address"
            placeholder="Secondary Address"
            value={formData.secondary_address || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="number"
            name="pin_code"
            placeholder="Pin Code"
            value={formData.pin_code !== null ? formData.pin_code : ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no || ""}
            onChange={handleChange}
            
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={formData.gmail || ""}
            onChange={handleChange}
            
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
