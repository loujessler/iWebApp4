import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";

import withAuthProtection from "../Utils/withAuthProtection";

import Login from "./Auth/Login";
import Register from "./Auth/Register";
import UserList from "./UserList";


class Body extends Component {
    render() {
        const ProtectedUserList = withAuthProtection(UserList);

        return (<>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user_list" element={<ProtectedUserList />} />
                {/* Другие маршруты вашего приложения */}
            </Routes>
        </>);
    }
}

export default Body;