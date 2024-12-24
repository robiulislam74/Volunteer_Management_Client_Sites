import React, { useEffect, useState } from 'react'
import UseContext from '../../Context/CustomHook/UseContext'
import axios from 'axios'
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import UpdateForm from '../../components/UpdateForm';
import Swal from 'sweetalert2';


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

const ManageMyPost = () => {
    const { user, myPosts, setMyPosts } = UseContext()
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState([])
    const [run, setRun] = useState(false)


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

    useEffect(() => {
        const manageMyPostFunc = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/manageMyPost?email=${user?.email}`)
            setMyPosts(data)
        }
        manageMyPostFunc()
    }, [run])

    const handleUpdate = async (_id) => {
        openModal()
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/manageMyPost/${_id}`)
        setUpdateData(data)
    }

    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/manageMyPost/${_id}`)
                    .then(res => 
                    {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Volunteer post has been deleted.",
                                icon: "success"
                            });
                        }
                        const withOutDeleteData = myPosts.filter(volunteer=>volunteer._id !== _id)
                        setMyPosts(withOutDeleteData)
                    }
                    )
            }
        });

    }


    return (
        <div className="p-4 max-w-screen-lg mx-auto mt-12 pb-24">
            <h1 className="text-2xl font-bold text-center mb-4">My Volunteer Need Posts</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Serial</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Volunteers Needed</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPosts.map((post, idx) => (
                            <tr key={post._id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-800">{idx + 1}</td>
                                <td className="px-6 py-3 text-sm text-gray-800">{post.title}</td>
                                <td className="px-6 py-3 text-sm text-gray-800">{post.description}</td>
                                <td className="px-6 py-3 text-sm font-bold text-rose-400">{post.volunteersNeeded}</td>
                                <td className="px-6 py-3 flex space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                        onClick={() => handleUpdate(post._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                    {
                        updateData.map(volunteer =>
                            <UpdateForm key={volunteer._id}
                                volunteer={volunteer}
                                closeModal={closeModal}
                                setRun={setRun}
                                run={run}
                            />
                        )
                    }
                </Modal>
            </div>
        </div>
    )
}

export default ManageMyPost