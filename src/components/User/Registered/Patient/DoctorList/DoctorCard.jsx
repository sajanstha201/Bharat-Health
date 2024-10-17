import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ name, specialization, rating, image, gmail, phoneNo, doctor_id }) => {
  return (
    <div className="relative bg-white shadow-md border rounded-lg text-center w-60 h-80 cursor-pointer hover:scale-105 transition-all duration-300">
      {/* Doctor Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-t-md"
      />
      
      {/* Doctor Info */}
      <div className="flex flex-col h-40 items-center justify-between p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-500">{specialization}</p>

        {/* Rating */}
        <div className="flex justify-center mb-2">
          {Array(rating).fill().map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
          {Array(5 - rating).fill().map((_, i) => (
            <span key={i} className="text-gray-300">★</span>
          ))}
        </div>

        {/* Book Appointment Button */}
        <Link
          to={`/patient/appointments/book/?doctor=${JSON.stringify({
            doctor_id: doctor_id,
            specialization: specialization,
            image: image,
            name: name,
          })}`}
          className="w-full py-2 mt-2 border rounded-lg bg-blue-50 text-lg font-semibold hover:bg-blue-100 transition duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
