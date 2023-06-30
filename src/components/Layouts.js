import { Outlet, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { fetchUsers } from '../usersReducer';

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div className="block my-8 md:my-20">
            <div className="max-w-screen-lg mx-auto">
                <Link to="/">
                    <h1 className="text-4xl mb-8 font-black mx-6 md:mx-0">Dashboard</h1>
                </Link>
                <Outlet />
            </div>
        </div>
    )
};

export default Layout;