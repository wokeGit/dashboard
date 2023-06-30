import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteUser, sortByUserName } from '../usersReducer';
import { toast } from 'react-toastify';

const UsersList = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [sortOrder, setSortOrder] = useState('ASC');

    return (
        <>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Name
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center" onClick={() => {
                                dispatch(sortByUserName(sortOrder));
                                setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC') 
                            }}>
                                Username
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg>
                                </div>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Email
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                City
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!user.loading && user.users.length ? (
                        user.users.map((user) => (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.address?.city}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/edit?userId=${user.id}`} className="text-white font-bold bg-amber-400 hover:bg-amber-500 focus:ring-2 focus:outline-none focus:ring-amber-300 rounded-lg px-4 py-2">Edit</Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => {
                                        setShowModal(true);
                                        setUserToDelete(user)
                                    }} className="text-white font-bold bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg px-4 py-2">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan="7" className="px-6 py-4">List is Empty</td>
                            </tr>
                        )}
                </tbody>
            </table>

            {user?.loading && <div className="p-4">Loading...</div>}

            {/* Modal */}
            <div tabIndex="-1" aria-hidden="true" className={`${showModal ? '' : 'hidden'} fixed bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0`}>
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={() => setShowModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Delete</h3>
                            <p>Are you sure you want to delete: {userToDelete?.name}?</p>
                            <div className="px-6 py-4 text-right">
                                <button onClick={() => setShowModal(false)} className="text-amber-500 font-bold border border-amber-500 focus:outline-none focus:ring-amber-300 rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                                <button onClick={() => {
                                    dispatch(deleteUser(userToDelete));
                                    setShowModal(false);
                                    toast(`User ${userToDelete.name} was deleted!`);
                                }} className="ml-4 text-white font-bold bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg px-4 py-2">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UsersList;