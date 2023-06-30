import React from 'react';
import { Link } from "react-router-dom";
import UsersTable from './components/UsersTable';
import Panel from './components/Panel';

export const App = () => <Panel title="User List" content={<UsersTable />} buttons={<Link to={`/add-new`} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" type="button" className="text-white font-bold bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:outline-none focus:ring-sky-300 rounded-lg px-4 py-2">Add new</Link>} />;

export default App;
