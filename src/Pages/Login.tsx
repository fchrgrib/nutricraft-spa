import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/NutriCraft.svg";
import { Link } from "react-router-dom";

interface LoginData {
    emailLog: string;
    passLog: string;
}

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        emailLog: "",
        passLog: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        // axios
        console.log(loginData);
    };

    return (
        <div>
            <div className="back">
                <div className="logincontainer">
                    <div className="header">
                        <img src= {logo} alt="" />
                        <h2>Login</h2>
                        <h5>Don't have an account? <Link to="/register">Register</Link></h5>
                    </div>
                    <div className="forms">
                        {/* <form action="../../../server/controller/auth/Login.php" method="POST"> */}
                            <h4>Email</h4>
                            <div className="emailcontainer" id="emailcontainer">
                                <i className="fas fa-envelope"></i>
                                <input className="emailinput" type="email" placeholder="Email" name="emailLog" value={loginData.emailLog} id="emailinput"  required onChange={handleChange}/>
                            </div>
                            <p id="emailInvalid"></p>
                            <h4>Password</h4>
                            <div className="passwordcontainer">
                                <i className="fas fa-lock"></i>
                                <input className="passwordinput" type="password" placeholder="Password" name="passLog" value={loginData.passLog} required onChange={handleChange}/>
                            </div>
                            <button className="login" id="login" onClick={handleLogin}>Login</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;