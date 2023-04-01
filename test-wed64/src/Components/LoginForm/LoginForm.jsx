import React, { useState } from "react";
import "./LoginForm.css";
import Card from "../Card/Card";
import { database } from "../../utils/database";


const LoginForm = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState("");

    const error = {
        username: "Invalid username",
        password: "Invalid password",
        noUsername:"Please enter your username",
        noPassword:"Please enter your password"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username) {
            setErrorMessages({ name: "noUsername", message: error.noUsername})
            return;
        }

        if (!password) {
            setErrorMessages({ name: "noPassword", message: error.noPassword})
            return;
        }

        const currentUser = database.find((user) => user.username === username);

        if(currentUser) {
            if(currentUser.password !== password) {
                setErrorMessages({ name: "password", message: error.password})
                
            } else {
                setErrorMessages({});
                // console.log("Dang nhap thanh cong")
                setIsLoggedIn(true);

            }

        } else {
            setErrorMessages({ name: "username", message: error.username})
            
        }
    };

    const renderErrorMsg = (name) =>
        name === errorMessages.name && (
            <p className="error_msg">{errorMessages.message}</p>
        );

    return <Card>
        <h1 className="title">Sign In</h1>
        <p className="sudtitle">Please log in using your username and password</p>
        <form onSubmit={handleSubmit}>
            <div className="inputs_container">
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                {renderErrorMsg("username")}
                {renderErrorMsg("noUsername")}
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                {renderErrorMsg("password")}
                {renderErrorMsg("noPassword")}
            </div>
            <input type="submit" value="Log In" className="login_button"/>
        </form>
        <div>
            <a className="link_container">
                Forgot Password?
            </a>
        </div>
        <div className="icons">
            
            
        </div>
    </Card>
}


export default LoginForm;
