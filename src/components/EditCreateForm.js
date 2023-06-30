import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, editUser } from '../usersReducer';

const EditCreateForm = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const isEditForm = !!searchParams.get('userId');

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user.users && searchParams.get('userId')) {
            const userToEdit = user.users.find(x => x.id === +searchParams.get('userId'))
            setValue('name', userToEdit ? userToEdit.name : '');
            setValue('email', userToEdit ? userToEdit.email : '');
        }
    }, [searchParams, user, setValue])

    const takeHighestId = () => {
        if (user.users) {
            const idList = user.users.map(user => user.id);
            const theHighest = Math.max(...idList)
            return theHighest;
        }
        return Math.floor(Math.random() * 100000) + 10;
    }

    const submitForm = ({ name, email }) => {
        if (isEditForm) {
            const userToEdit = user.users.find(x => x.id === +searchParams.get('userId'))
            dispatch(editUser({ ...userToEdit, name, email }))
        } else {
            const highestExistingId = takeHighestId()
            dispatch(addUser({ id: highestExistingId ? highestExistingId + 1 : 1, name, username: name, email, phone: '', website: '', address: {}, company: {} }))
        }
        navigate("/");
    }

    return (
        <div>
            <div className="px-6 py-6 lg:px-8">
                <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-20 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <div className="flex flex-col w-full">
                            <input
                                type="name"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                {...register("name", {
                                    required: true,
                                    validate: {
                                        minLength: (v) => v.length >= 3
                                    },
                                })} />
                            {errors.name?.type === "required" && (
                                <small>The name is required</small>
                            )}

                            {errors.name?.type === "minLength" && (
                                <small>The name should have at least 3 characters</small>
                            )}
                        </div>

                    </div>
                    <div className="flex items-center">
                        <label htmlFor="email" className="w-20 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <div className="flex w-full">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        maxLength: (v) =>
                                            v.length <= 50 || "The email should have at most 50 characters",
                                        matchPattern: (v) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                            "Email address must be a valid address",
                                    },
                                })} />
                            {errors.email?.message && (
                                <small>{errors.email.message}</small>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Link to="/" type="button" className="text-amber-500 font-bold border border-amber-500 focus:outline-none focus:ring-amber-300 rounded-lg text-sm px-5 py-2.5 text-center">Cancel</Link>
                        <button type="submit" className="ml-4 text-white font-bold bg-green-500 hover:bg-green-600 focus:ring-2 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCreateForm;