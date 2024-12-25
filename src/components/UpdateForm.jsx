import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import UseContext from '../Context/CustomHook/UseContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateForm = ({ volunteer, closeModal, setRun, run }) => {
    const { user } = UseContext()
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(volunteer?.date);


    const handleSubmit = (e) => {
        e.preventDefault();
        const datas = new FormData(e.target)
        const formData = Object.fromEntries(datas.entries())
        // formData.volunteersNeeded = parseInt(volunteerNumber)
        formData.volunteersNeeded = parseInt(formData.volunteersNeeded)

        axios.patch(`${import.meta.env.VITE_API_URL}/manageMyPost/update/${volunteer?._id}`, formData)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully update Volunteer Need Post!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setRun(!run)
                    // navigate('/manageMyPost')
                    closeModal()
                }
            })
        e.target.reset();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center lg:mb-6">Update Volunteer Need Post</h2>
            <form
                onSubmit={handleSubmit}
                key={volunteer._id}
                className="bg-white shadow-lg rounded-lg p-6 space-y-4"
            >
                {/* Thumbnail */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                    <input
                        type="url"
                        name="thumbnail"
                        defaultValue={volunteer?.thumbnail}
                        placeholder='Enter thumbnail Url'
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Post Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={volunteer?.title}
                        placeholder="Enter post title"
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        defaultValue={volunteer?.description}
                        placeholder="Enter post description"
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        defaultValue={volunteer?.category}
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="social service">Social Service</option>
                        <option value="animal welfare">Animal Welfare</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={volunteer?.location}
                        placeholder="Enter location"
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
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
                        defaultValue={volunteer?.volunteersNeeded}
                        // onChange={(e) => setVolunteerNumber(e.target.value)}
                        placeholder="Enter number of volunteers"
                        className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Deadline</label>
                    {/* <DatePicker
                                className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                                required
                              /> */}
                    <div>
                        <DatePicker
                            showIcon
                            name='date'
                            // defaultValue={formatDate(volunteer?.date)}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
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
                            value={user?.displayName}
                            readOnly
                            className="block w-full border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Organizer Email
                        </label>
                        <input
                            type="email"
                            name='organizer_email'
                            value={user?.email}
                            readOnly
                            className="block w-full border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center flex gap-3">
                    <button className='btn btn-error w-1/2 btn-outline btn-md' onClick={closeModal}>Cancel</button>
                    <button
                        type="submit"
                        className="btn btn-primary w-1/2 btn-outline btn-md"
                    >
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateForm