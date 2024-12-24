import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import UseContext from '../../Context/CustomHook/UseContext';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const AddVolunteer = () => {
  const { user } = UseContext()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date());
  const [volunteerNumber,setVolunteerNumber]=useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    const datas = new FormData(e.target)
    const formData = Object.fromEntries(datas.entries())
    formData.organizer_name = user?.displayName,
      formData.organizer_email = user?.email,
      formData.date = startDate
      formData.volunteersNeeded=parseInt(volunteerNumber)

    const { data } = axios.post(`${import.meta.env.VITE_API_URL}/addVolunteers`, formData)
      .then(res => {
        if (res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Volunteer post successfully Done!",
            showConfirmButton: false,
            timer: 2000
          });
        }
        navigate('/allVolunteers')
      })
      e.target.reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add Volunteer Need Post</h2>
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
            className="block w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Title</label>
          <input
            type="text"
            name="title"
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
            onChange={(e)=>setVolunteerNumber(e.target.value)}
            // name='volunteersNeeded'
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
              value={user?.email}
              readOnly
              className="block w-full border border-gray-300 rounded-lg p-2 mt-1 bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium w-full py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddVolunteer