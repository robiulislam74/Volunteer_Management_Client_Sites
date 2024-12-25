import React, { useEffect, useState } from 'react'
import UseContext from '../../Context/CustomHook/UseContext'
import axios from 'axios'
import Modal from 'react-modal';
import UpdateForm from '../../components/UpdateForm';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';


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

const ManageMyPost = () => {
    const { user, myPosts, setMyPosts,theme } = UseContext()
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState([])
    const [run, setRun] = useState(false)
    const [myRequest, setMyRequest] = useState([])
    const locations = useLocation()
    const path = locations.pathname.split("/")[1]


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
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/manageMyPost?email=${user?.email}`,{
                withCredentials:true
            })
            setMyPosts(data)
        }
        manageMyPostFunc()
    }, [run])

    useEffect(() => {
        const manageMyRequestFunc = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/manageMyRequest?email=${user?.email}&name=${user?.displayName}`,{
                withCredentials: true
            })
            setMyRequest(data)
        }
        manageMyRequestFunc()
    }, [])


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
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Volunteer post has been deleted.",
                                icon: "success"
                            });
                        }
                        const withOutDeleteData = myPosts.filter(volunteer => volunteer._id !== _id)
                        setMyPosts(withOutDeleteData)
                    }
                    )
            }
        });

    }

    const handleCancelBtn = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/manageMyRequest?email=${user?.email}&name=${user?.displayName}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: "Your Volunteer Request has been removed.",
                                icon: "success"
                            });
                        }
                        const withOutDeleteData = myRequest.filter(volunteer => volunteer._id !== _id)
                        setMyRequest(withOutDeleteData)
                    }
                    )
            }
        });
    }


    return (
        <div className="p-4 max-w-screen-lg mx-auto mt-12 pb-24">
            <Helmet>
                <title>Volunteer | {path}</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-4">My Volunteer Need Posts</h1>
            <div className="overflow-x-auto">
                <table className={`min-w-full ${theme==="light"?"bg-white":"bg-gray-900"} border border-gray-200`}>
                    <thead>
                        <tr className={`${theme==="light"?"bg-gray-200":"bg-gray-800"} border-b`}>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Serial</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Title</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Description</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Volunteers Needed</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Actions</th>
                        </tr>
                    </thead>
                    {
                        myPosts.length > 0
                        &&
                        <tbody>
                            {myPosts.map((post, idx) => (
                                <tr key={post._id} className={`border-b ${theme==="light"?"hover:bg-gray-100":"hover:bg-gray-800"} `}>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{idx + 1}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.title}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.description}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.volunteersNeeded}</td>
                                    <td className={`px-6 py-3 flex space-x-2 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>
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
                    }
                </table>
                {
                    myPosts.length === 0 &&
                    <div className={`${theme==="light"?"bg-green-100":"bg-gray-900"}`}>
                        <h2 className={`h-32 text-3xl font-bold ${theme==="light"?"text-gray-300":"text-gray-700"} w-full grid col-span-4 justify-center items-center`}>
                            Not Found Volunteer ...
                        </h2>
                    </div>
                }
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
            {/* My Request Volunteers */}
            <h1 className="text-2xl font-bold text-center mt-24 mb-4">Manage and Review Your Volunteer Requests</h1>
            <div className="overflow-x-auto">
                <table className={`min-w-full ${theme==="light"?"bg-white":"bg-gray-900"} border border-gray-200`}>
                    <thead>
                        <tr className={`${theme==="light"?"bg-gray-200":"bg-gray-800"} border-b`}>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Serial</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Title</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Description</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Category</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Volunteers Needed</th>
                            <th className={`px-6 py-3 text-left text-sm font-medium ${theme==="light"?"text-gray-700":"text-gray-300"}`}>Actions</th>
                        </tr>
                    </thead>

                    {
                        myRequest.length > 0
                        &&
                        <tbody>
                            {myRequest.map((post, idx) => (
                                <tr key={post._id} className={`border-b ${theme==="light"?"hover:bg-gray-100":"hover:bg-gray-800"} `}>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{idx + 1}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.title}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.description}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.category}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>{post.volunteersNeeded}</td>
                                    <td className={`px-6 py-3 text-sm ${theme==="light"?"text-gray-800":"text-gray-400"}`}>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => handleCancelBtn(post._id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    }


                </table>
                {
                    myRequest.length === 0 &&
                    <div className={`${theme==="light"?"bg-green-100":"bg-gray-900"}`}>
                        <h2 className={`h-32 text-3xl font-bold ${theme==="light"?"text-gray-300":"text-gray-700"} w-full grid col-span-4 justify-center items-center`}>
                            Not Found Request !
                        </h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default ManageMyPost