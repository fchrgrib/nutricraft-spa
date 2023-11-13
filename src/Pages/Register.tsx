import React, { useState } from "react";
import "../style/register.css";
import logo from "../assets/NutriCraft.svg";
import { Link } from "react-router-dom";

interface RegisterData {
    nameLog: string;
    emailLog: string;
    titleLog: string;
    descLog: string;
    passLog: string;
}

const Register = () => {

    const [registerData, setRegisterData] = useState<RegisterData>({
        nameLog: "",
        emailLog: "",
        titleLog: "",
        descLog: "",
        passLog: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleChangedesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = () => {
        // axios
        console.log(registerData);
    };

    return (
        <div>
            <div className="back">
                <div className="registercontainer">
                    <div className="header">
                        <img src= {logo} alt="" />
                        <h2>Register For Author</h2>
                        <h5>Already have an account? <Link to="/login">Login</Link></h5>
                    </div>
                    <div className="forms">
                        {/* <form action="../../../server/controller/auth/Login.php" method="POST"> */}
                            <h4>Name</h4>
                            <div className="namecontainer">
                                <i className="fas fa-lock"></i>
                                <input className="nameinput" type="text" placeholder="Name" name="nameLog" value={registerData.nameLog} required onChange={handleChange}/>
                            </div>
                            <h4>Email</h4>
                            <div className="emailcontainer" id="emailcontainer">
                                <i className="fas fa-envelope"></i>
                                <input className="emailinput" type="email" placeholder="Email" name="emailLog" value={registerData.emailLog} id="emailinput"  required onChange={handleChange}/>
                            </div>
                            <h4>Title</h4>
                            <div className="titlecontainer" id="titlecontainer">
                                <i className="fas fa-envelope"></i>
                                <input className="titleinput" type="text" placeholder="Title" name="titleLog" value={registerData.titleLog}  required onChange={handleChange}/>
                            </div>
                            <h4>Description</h4>
                            <div className="desccontainer">
                                <i className="fas fa-lock"></i>
                                <textarea className="descinput" placeholder="Description" name="descLog" value={registerData.descLog} required onChange={handleChangedesc}/>
                            </div>
                            <h4>Password</h4>
                            <div className="passwordcontainer">
                                <i className="fas fa-lock"></i>
                                <input className="passwordinput" type="password" placeholder="Password" name="passLog" value={registerData.passLog} required onChange={handleChange}/>
                            </div>
                            <button className="login" id="login" onClick={handleRegister}>Register</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
