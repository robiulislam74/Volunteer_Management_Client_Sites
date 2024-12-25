import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import UseContext from '../Context/CustomHook/UseContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { div } from 'motion/react-client';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "90%", 
        maxWidth: "600px", 
        maxHeight: "80vh", 
        overflowY: "auto", 
        padding: "10px", 
        borderRadius: "6px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1000, 
    },
};


const VolunteerDetailsCard = ({ volunteer }) => {
    const { _id, thumbnail, title, description, category, location, date, volunteersNeeded, organizer_name, organizer_email } = volunteer || {}
    const { user,theme } = UseContext()
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(date);
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const locations = useLocation()
    const path = locations.pathname.split("/")[1]


    function openModal() {
        if(volunteersNeeded === 0){
            return toast.error(`No volunteers are needed at the moment. VolunteerNeed: ${volunteersNeeded}`, {
                      position: 'top-center',
                    });
        }
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const datas = new FormData(e.target)
        const formData = Object.fromEntries(datas.entries())
        formData.volunteersNeeded = parseInt(formData.volunteersNeeded)
        formData.date = startDate
        formData.status = "requested"

        axios.post(`${import.meta.env.VITE_API_URL}/requestVolunteer?id=${_id}`, formData)
            .then(res => {
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Send Successfully!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    closeModal()
                    navigate('/manageMyPost')
                }
            })
        e.target.reset();
    };


    return (
        <div>
            <Helmet>
                <title>Volunteer | {path}</title>
            </Helmet>
            <div className={`max-w-4xl ${theme==='light'?"bg-white":"bg-gray-800"} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto p-6`}>
                {/* Thumbnail */}
                <img
                    src={volunteer.thumbnail}
                    alt={volunteer.title}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg"
                />

                {/* Card Content */}
                <div className="mt-6">
                    {/* Title */}
                    <h2 className={`text-2xl sm:text-3xl font-bold ${theme==='light'?"text-black":"text-white"}`}>
                        {volunteer.title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-600 mt-4">
                        {volunteer.description}
                    </p>

                    {/* Category, Location and Date */}
                    <div className="mt-4">
                        <p className="text-sm sm:text-base text-gray-500">
                            <span className="font-semibold">Category:</span> {volunteer.category}
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            <span className="font-semibold">Location:</span> {volunteer.location}
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            <span className="font-semibold">Deadline:</span> {new Date(volunteer.date).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Organizer Information */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">Organizer Information</h3>
                        <p className="text-sm sm:text-base text-gray-500 mt-2">
                            <span className="font-semibold">Organizer:</span> {volunteer.organizer_name}
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            <span className="font-semibold">Email:</span> {volunteer.organizer_email}
                        </p>
                    </div>

                    {/* Volunteers Needed */}
                    <div className="mt-6">
                        <p className="text-sm sm:text-base text-gray-500">
                            <span className="font-semibold">Volunteers Needed:</span> {volunteer.volunteersNeeded}
                        </p>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-6">
                        <button
                            onClick={openModal}
                            className="w-full sm:w-auto text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                        >
                            Be a Volunteer
                        </button>
                    </div>
                </div>
                {/* Modal */}
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <h2 className={`text-2xl font-bold text-center lg:mb-6 ${theme==="light"?"text-black":"text-black"}`}>
                                Volunteer Request Form
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className={`${theme==="light"?"bg-white":"bg-gray-900"} shadow-lg rounded-lg p-6 space-y-4`}
                            >
                                {/* Thumbnail */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Thumbnail
                                    </label>
                                    <input
                                        type="url"
                                        name="thumbnail"
                                        defaultValue={thumbnail}
                                        disabled
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                </div>

                                {/* Post Title */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Post Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={title}
                                        disabled
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        defaultValue={description}
                                        disabled
                                        rows="4"
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    ></textarea>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        defaultValue={category}
                                        disabled
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    >
                                        <option>{category}</option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={location}
                                        disabled
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                </div>

                                {/* Volunteers Needed */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Volunteers Needed
                                    </label>
                                    <input
                                        type="number"
                                        name="volunteersNeeded"
                                        defaultValue={volunteersNeeded}
                                        disabled
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                </div>

                                {/* Deadline */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Deadline
                                    </label>
                                    <div>
                                        <DatePicker
                                            showIcon
                                            disabled
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                </div>

                                {/* Organizer  Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                            Organizer Name
                                        </label>
                                        <input
                                            type="text"
                                            name="organizer_name"
                                            value={organizer_name}
                                            disabled
                                            className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                            Organizer Email
                                        </label>
                                        <input
                                            type="email"
                                            name="organizer_email"
                                            value={organizer_email}
                                            disabled
                                            className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                </div>
                                {/*Volunteer Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Volunteer Name
                                        </label>
                                        <input
                                            type="text"
                                            name="volunteer_name"
                                            value={user?.displayName}
                                            disabled
                                            className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Volunteer Email
                                        </label>
                                        <input
                                            type="email"
                                            name="volunteer_email"
                                            value={user?.email}
                                            disabled
                                            className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                        />
                                    </div>
                                </div>

                                {/* Suggestion */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-400"}`}>
                                        Suggestion (editable)
                                    </label>
                                    <textarea
                                        name="suggestion"
                                        placeholder="Enter your suggestion"
                                        rows="4"
                                        className={`${theme==="light"?"bg-white":"bg-gray-700"} block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500`}
                                        required
                                    ></textarea>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-error w-full sm:w-1/2 btn-outline btn-md"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full sm:w-1/2 btn-outline btn-md"
                                    >
                                        Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>

            </div>
        </div>
    )
}

export default VolunteerDetailsCard