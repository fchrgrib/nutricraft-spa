import React, { useState } from "react";
import "../style/register.css";
import logo from "../assets/NutriCraft.svg";
import axios, {AxiosError} from 'axios';
import { Link, useNavigate } from "react-router-dom";

interface RegisterData {
    nameLog: string;
    emailLog: string;
    titleLog: string;
    phoneLog: string;
    descLog: string;
    passLog: string;
}

const Register = () => {

    // TODO: Change this is you want to deploy in docker as your container name
    const url = process.env.URL||'http://localhost:8080'
    const navigate = useNavigate()

    const [registerData, setRegisterData] = useState<RegisterData>({
        nameLog: "",
        emailLog: "",
        titleLog: "",
        phoneLog: "",
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

    const handleRegister = async () => {
        if (!registerData.descLog) {
            // TODO: notified user
            console.log("desc log doesn't fill")
            return
        }

        if (!registerData.titleLog) {
            // TODO: notified user
            console.log("title doesn't fill")
            return
        }

        if (!registerData.passLog){
            // TODO: notified user
            console.log("password doesn't fill")
            return
        }

        if (!registerData.nameLog){
            // TODO: notified user
            console.log("name doesn't fill")
            return
        }

        if (!registerData.emailLog){
            // TODO: notified user
            console.log("email doesn't fill")
            return
        }

        if (!registerData.phoneLog){
            // TODO: notified user
            console.log("phone doesn't fill")
            return
        }


        try {
            const postRegister = await axios.post(`${url}/register`,{
                full_name: registerData.nameLog,
                email: registerData.emailLog,
                title: registerData.titleLog,
                password: registerData.passLog,
                phone_number: registerData.phoneLog,
                description: registerData.descLog,
                id_file:1
            })
            if (postRegister.status<400) {
                console.log('successfully registered user')
                navigate('/login')
                return
            }
            console.log('failed to registered user')
        }catch (e : any) {
            console.log(e.response.data.status)
            return
        }
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
                            <h4>Phone Number</h4>
                            <div className="phonecontainer" id="phonecontainer">
                                <i className="fas fa-envelope"></i>
                                <input className="phoneinput" type="text" placeholder="Phone Number" name="phoneLog" value={registerData.phoneLog}  required onChange={handleChange}/>
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
