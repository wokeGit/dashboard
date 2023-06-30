import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import { store } from './store';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layouts';
import App from './App';
import AddNew from './AddNew';
import Edit from './Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index path="/" element={<App />} />
                        <Route exact path="/add-new" element={<AddNew />} />
                        <Route path="/edit" element={<Edit />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
