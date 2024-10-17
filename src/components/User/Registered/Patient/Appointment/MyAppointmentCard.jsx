import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyAppointmentCard = ({ appointmentDetail, fetchAppointment }) => {
    const navigate = useNavigate();
    const baseUrl = useSelector(state => state.baseUrl).backend;
    const userInfo = useSelector(state => state.userInfo);
    const {
        appointment_id,
        appointment_date,
        appointment_time,
        doctor
    } = appointmentDetail;

    const {
        doctor_id,
        profile_image,
        first_name,
        last_name,
        specialization
    } = doctor;

    const handleReschedule = () => {
        navigate(`/patient/appointments/book?doctor=${JSON.stringify({doctor_id: doctor_id, specialization: specialization, image: baseUrl + profile_image, name: first_name + last_name})}`);
    };

    const handleCancel = async () => {
        try {
            const deleteUrl = `${baseUrl}api/patient/appointments/${appointment_id}/`;
            await axios.delete(deleteUrl, {
                headers: { 'Authorization': `${userInfo.token}` }
            });
            toast.success('Appointment cancelled successfully');
            fetchAppointment();
        } catch (error) {
            if (error.response) {
                toast.error(`Error: ${error.response.data.detail || 'An error occurred'}`);
            } else {
                toast.error('Failed to cancel appointment: Network error');
            }
        }
    };

    return (
        <div className="bg-white shadow-x-md overflow-hidden flex items-start p-6 w-full border-y">
            {/* Profile Image */}
            <div className='flex-shrink-0'>
                <img 
                    className="w-24 h-24 object-cover rounded-md" 
                    src={baseUrl + profile_image} 
                    alt={`${first_name} ${last_name}'s profile`} 
                />
            </div>

            {/* Doctor Details */}
            <div className="ml-6 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{`Dr. ${first_name} ${last_name}`}</h2>
                <p className="text-gray-600">{specialization}</p>
                <p className="mt-2 text-sm text-gray-600">
                    <strong>Date & Time:</strong> {appointment_date} | {appointment_time}
                </p>

                {/* Buttons */}

            </div>
            <div className="mt-4 flex gap-4 flex-col">
                    <button
                        onClick={handleReschedule}
                        className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-100"
                    >
                        Reschedule
                    </button>
                    <button
                        onClick={handleCancel}
                        className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-100"
                    >
                        Cancel appointment
                    </button>
                </div>
        </div>
    );
};

export default MyAppointmentCard;
