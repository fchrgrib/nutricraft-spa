
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import Navbar from '../components/Navbar';

interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}

interface ProfileData {
  name: string;
  email: string;
  title: string;
  phone: string;
  description: string;
  password: string;
  // add any other fields you need for the user's profile
}

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userJwt|null>(null)
  const [profileData, setProfileData] = useState<ProfileData|null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);





  const host = process.env.URL||'http://localhost:8080'

  
  
  
  
  const fetchProfileData = async (uuid:string) => {
    // const response = await axios.get(`${host}/user/${uuid}`);
    // const data = await response.data;
    const data = {
        name: "Kelvin Rayhan",
        email: "ajikule@gmail.com",
        title: "Software Engineer",
        phone: "081234567890",
        description: "I am a software engineer with 5 years of experience",
        password: "12345678",
    }
    setProfileData(data);
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    else {
        setUserInfo(jwtDecode(token));
    }
    }, []);
    
    useEffect(() => {
        if (userInfo && userInfo.uuid) {
            fetchProfileData(userInfo.uuid);
        }
    }, [userInfo]);


    
    
    const buttons = () => {
      if (!isEdit) {
          console.log("masuk")
          document.getElementById("name")!.removeAttribute("disabled");
          document.getElementById("email")!.removeAttribute("disabled");
          document.getElementById("title")!.removeAttribute("disabled");
          document.getElementById("description")!.removeAttribute("disabled");
          document.getElementById("phoneNumber")!.removeAttribute("disabled");
          document.getElementById("editPassword")!.removeAttribute("disabled");
          document.getElementById("save")!.style.display = "block";
          document.getElementById("cancel")!.style.display = "block";
          document.getElementById("edit")!.style.display = "none";
          document.getElementById("delete")!.style.display = "none";
          
      } else {
          console.log("m")
          document.getElementById("name")!.setAttribute("disabled", "true");
        //   set value to none
            document.getElementById("name")!.setAttribute('value', "");
          document.getElementById("email")!.setAttribute("disabled", "true");
          document.getElementById("title")!.setAttribute("disabled", "true");
          document.getElementById("description")!.setAttribute("disabled", "true");
          document.getElementById("phoneNumber")!.setAttribute("disabled", "true");
          document.getElementById("editPassword")!.setAttribute("disabled", "true");
          document.getElementById("save")!.style.display = "none";
          document.getElementById("cancel")!.style.display = "none";
          document.getElementById("edit")!.style.display = "block";
          document.getElementById("delete")!.style.display = "block";
          
      }
      setIsEdit(!isEdit);
      }
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar/>
        <div>
            <div className="flex flex-col items-center justify-center w-screen" style={{ height: 'calc(100vh - 115px)' }}>
                <div className="profileContainer flex flex-row items-start gap-12  border border-[#EF4800] rounded-xl p-10">
                    <div className="profileImage">
                        <img src="https://i.imgur.com/8Km9tLL.png" alt="profile" className='h-[200px] w-[200px]' />

                    </div>
                    <div className='profileData flex flex-col justify-center items-start'>
                        <p className="labelProfile">Name</p>
                        <div>
                            <input type="text" placeholder={profileData.name} className="textField bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="name" name="name" disabled/>
                            <i className="fas fa-edit editIcon" ></i>
                        </div>
                        <hr/>
                        <p className="labelProfile">Email</p>
                        <div id="emailcontainer">
                            <input type="email" placeholder={profileData.email} className="textField bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="email" name="email" disabled/>
                            <i className="fas fa-edit editIcon" ></i>
                            <p id="emailInvalid"></p>
                        </div>
                        <hr/>
                        <p className="labelProfile">Title</p>
                        <div>
                            <input type="text" placeholder={profileData.title} className="textField bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="title" name="title" disabled/>
                            <i className="fas fa-edit editIcon"></i>
                        </div>
                        <hr/>
                        <p className="labelProfile">Description</p>
                        <div>
                            <textarea placeholder={profileData.description} className="textField max-h-[200px] min-h-[20px] bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="description" name="description" disabled/>
                            <i className="fas fa-edit editIcon"></i>
                        </div>
                        <p className="labelProfile">Phone Number</p>
                        <div id="phonenumbercontainer">
                            <input type="text" placeholder={profileData.phone} className="textField bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="phoneNumber" name="phone"  disabled/>
                            <i className="fas fa-edit editIcon"></i>
                            <p id="phoneNumberInvalid"></p>
                        </div>
                        <hr/>
                        <p className="labelProfile">Password</p>
                        <div>
                            <input type="password" placeholder={profileData.password} className="textField bg-white border-none w-[420px] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="editPassword"  name="password" disabled/>
                            <i className="fas fa-edit editIcon"></i>
                        </div>
                        <hr/>
                        <div className="flex flex-row justify-center items-center gap-5 mt-5">
                        <button type="button" className="editButton bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" name="edit" id="edit" onClick={buttons} >Edit</button>
                        <button type="button" className="saveButton bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" style={{display: 'none' }} name="save" id="save">Save</button>
                        <button type="button" className="deleteButton bg-[red] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" name="delete" id="delete">Delete</button>
                        <button type="button" className="cancelButton bg-white rounded-[30px] w-[120px] h-[30px] text-[#EF4800]  border border-[#EF4800] text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] hover:text-white transform scale-110 shadow-md" style={{display: 'none' }} onClick={buttons} name="cancel" id="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;
