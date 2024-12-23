import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import UseContext from '../Context/CustomHook/UseContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",  // Modal width
        maxWidth: "600px",  // Maximum width
        maxHeight: "80vh",  // Maximum height
        overflowY: "auto",  // Enable vertical scrolling
        padding: "20px",  // Padding inside the modal
    },
};

const VolunteerDetailsCard = ({ volunteer }) => {
    const {_id, thumbnail, title, description, category, location, date, volunteersNeeded, organizer_name, organizer_email } = volunteer || {}
    const { user } = UseContext()
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(date);
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
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
        formData.date = startDate
        formData.status = "requested"

        axios.post(`${import.meta.env.VITE_API_URL}/requestVolunteer?id=${_id}`, formData)
            .then(res => {
                if (res.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Request Data Stored Successfully!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    closeModal()
                    navigate('/allVolunteers')
                }
            })
        e.target.reset();
    };


    return (
        <div className="max-w-4xl bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-auto p-6">
            {/* Thumbnail */}
            <img
                src={volunteer.thumbnail}
                alt={volunteer.title}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover rounded-lg"
            />

            {/* Card Content */}
            <div className="mt-6">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
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
                    <div className="max-w-4xl mx-auto px-4 py-8">
                        <h2 className="text-2xl font-bold text-center mb-6">Volunteer Request Form</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-lg rounded-lg p-6 space-y-4"
                        >
                            {/* Thumbnail */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                                <input
                                    type="url"
                                    name="thumbnail"
                                    defaultValue={thumbnail}
                                    readOnly
                                    className="block cursor-not-allowed bg-gray-100 w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Post Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Post Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter post title"
                                    defaultValue={title}
                                    readOnly
                                    className="block cursor-not-allowed bg-gray-100 w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter post description"
                                    defaultValue={description}
                                    readOnly
                                    className="block cursor-not-allowed bg-gray-100 w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    readOnly
                                    className="block cursor-not-allowed bg-gray-100 w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option defaultValue={category} >{category}</option>
                                    {/* <option value="healthcare">Healthcare</option>
                                    <option value="education">Education</option>
                                    <option value="social service">Social Service</option>
                                    <option value="animal welfare">Animal Welfare</option> */}
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter location"
                                    readOnly
                                    defaultValue={location}
                                    className="block w-full cursor-not-allowed bg-gray-100 border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* No. of Volunteers Needed */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    No. of Volunteers Needed
                                </label>
                                <input
                                    type="number"
                                    name='volunteersNeeded'
                                    readOnly
                                    defaultValue={volunteersNeeded}
                                    placeholder="Enter number of volunteers"
                                    className="block cursor-not-allowed bg-gray-100 w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                <div>
                                    <DatePicker
                                        showIcon
                                        readOnly
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className='cursor-not-allowed'
                                    />
                                </div>
                            </div>

                            {/* Organizer Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Organizer Name
                                    </label>
                                    <input
                                        type="text"
                                        name='organizer_name'
                                        value={organizer_name}
                                        readOnly
                                        className="block w-full border cursor-not-allowed border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Organizer Email
                                    </label>
                                    <input
                                        type="email"
                                        name='organizer_email'
                                        value={organizer_email}
                                        readOnly
                                        className="block w-full cursor-not-allowed border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                                    />
                                </div>
                            </div>
                            {/* Volunteer Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Volunteer Name
                                    </label>
                                    <input
                                        type="text"
                                        name='volunteer_name'
                                        value={user?.displayName}
                                        readOnly
                                        className="block w-full border cursor-not-allowed border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Volunteer Email
                                    </label>
                                    <input
                                        type="email"
                                        name='volunteer_email'
                                        value={user?.email}
                                        readOnly
                                        className="block w-full cursor-not-allowed border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                                    />
                                </div>
                            </div>
                            {/* Suggestion */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Suggestion (editable) </label>
                                <textarea
                                    name="suggestion"
                                    placeholder="Enter your Suggestion"
                                    className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <div className="text-center flex gap-3">
                                <button className='btn btn-error w-1/2 btn-outline btn-md' onClick={closeModal}>Cancel</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-1/2 btn-outline btn-md"
                                >
                                    Request
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default VolunteerDetailsCard