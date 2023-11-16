
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import Navbar from '../components/Navbar';
import { get } from 'http';
import { profile } from 'console';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}

interface ProfileData {
  id: number;
  name: string;
  email: string;
  title: string;
  phone: string;
  description: string;
  password: string
  // add any other fields you need for the user's profile
}

interface LevelBarProps {
    level: number;
    xp: number;
}




const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userJwt|null>(null);
  const [showConfirmationBox, setConfirmationBox] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    id: 0,
    name: '',
    email: '',
    title: '',
    phone: '',
    description: '',
    password: ''
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [photo, setPhoto] = useState('');
  const [exp, setExp] = useState(0)





  const host = process.env.URL||'http://localhost:8080'

  const fetchProfileData = async (uuid:string) => {
    await axios.post(`${host}/user`, {
      uuid: uuid
    }, {withCredentials: true}).then(response=>{
        console.log(response.data.data)
        const data = {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            title: response.data.data.title,
            phone: response.data.data.phone_number,
            description: response.data.data.description,
            password: response.data.data.password
        }
        setProfileData(data);
        fetchPhoto(response.data.data.id_file)
    })

}



    const fetchPhoto = async (id:string) => {
        return await axios.get(`${host}/image/${id}`)
            .then(response => {
                setPhoto(response.data.data.url)
            }).catch(e => {
                console.log(e)
            })
    }
    
    const Subscriber = () => {
        const [subscriber , setSubscriber] = useState('0');

        return (
            <div className='mt-15 bg-[#EF4800] rounded-xl'>
                <div className="m-15 flex flex-row items-center justify-center gap-5 text-white">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold">{subscriber}</p>
                        <p className="text-lg font-bold">Subscriber</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-lg font-bold">Content</p>
                    </div>
                </div>
            </div>
        )
        
    }


const LevelBar: React.FC<LevelBarProps> = ({xp}) => {
    const currentLevel = Math.floor(xp / 100);
    const currentPercentage = xp - (currentLevel * 100)

    return (
        <div>
            <h3 className="text-lg font-bold">Level {currentLevel}</h3>
            <div className="relative w-full h-4 bg-gray-300 rounded-full">
                <div
                    className="absolute h-full bg-[#EF4800] rounded-full"
                    style={{ width: `${currentPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};
    

      useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
          return;
        }
        else {
            setUserInfo(jwtDecode(token));
        }
        }, []);


      const expRequest = async (uuid:string)=>{
          await axios.get(`${host}/exp/${uuid}`,{withCredentials: true}).then(response=>{
              setExp(response.data.exp)
          })
      }
    
    useEffect(() => {
        if (userInfo && userInfo.uuid) {
            fetchProfileData(userInfo.uuid);
            expRequest(userInfo.uuid)
        }
    }, [userInfo]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSave = async () => {
        console.log(profileData)
        await axios.put(`${host}/user/${profileData.id}`,{
            name: profileData.name,
            email: profileData.email,
            title: profileData.title,
            phone_number: profileData.phone,
            description: profileData.description,
            password: profileData.password
        }, {withCredentials: true}).then(() => {
            console.log("success update profile")
        }).catch((e:any) => {
            console.log(e)
        })
        
    }

    const handleDelete = async () => {
        await axios.delete(`${host}/user/${profileData.id}`, {withCredentials: true}).then(() => {
            console.log("success delete user")
        }).catch((e:any) => {
            console.log(e)
        })
    }

    const openBox = () => {
        setConfirmationBox(true)
        document.body.style.overflow = "hidden"
    }

    const closeBox = () => {
        setConfirmationBox(false)
        document.body.style.overflow = "scroll"
    }

    const PostCard = () => {
        return (
            <div className='flex flex-row justify-between pr-5 gap-5 w-[100%]'>
                <div className='flex flex-row'>
                    <p className='text-[20px]'>1</p>
                    <div className='flex flex-col gap-5'>
                        <p className='text-[20px] font-bold'>Title</p>
                        <p className='text-[16px]'>Body</p>
                    </div>
                </div>
                <div className='buttons delete'>
                    <i className="fas fa-trash-alt"></i>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        )
    }
    
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
          fetchProfileData(userInfo!.uuid)
          
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
            <div className="flex flex-col items-center justify-start w-[95vw] pt-10 ml-10">
                <div className="profileContainer flex flex-col items-center gap-12  border border-[#EF4800] rounded-xl p-10 mb-10">
                    <h1 className='text-[30px] font-extrabold'>Profile</h1>
                    <div className='flex flex-row items-start gap-12'>
                        <div className="profileImage flex flex-col gap-20">
                            <img src={(photo)?photo:''} alt="profile" className='h-[200px] w-[200px]' />
                            {/* <Subscriber/> */}
                            <LevelBar level={1} xp={exp} />
                        </div>
                        <div className='profileData flex flex-col justify-center items-start'>
                            <p className="labelProfile">Name</p>
                            <div className='flex'>
                                <input type="text" value={profileData.name} className="textField bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="name" name="name" disabled onChange={handleChange}/>
                                <i className="fas fa-edit editIcon" ></i>
                            </div>
                            <hr/>
                            <p className="labelProfile">Email</p>
                            <div id="emailcontainer" className='flex'>
                                <input type="email" value={profileData.email} className="textField bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="email" name="email" disabled onChange={handleChange}/>
                                <i className="fas fa-edit editIcon" ></i>
                                <p id="emailInvalid"></p>
                            </div>
                            <hr/>
                            <p className="labelProfile">Title</p>
                            <div className='flex'>
                                <input type="text" value={profileData.title} className="textField bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="title" name="title" disabled onChange={handleChange}/>
                                <i className="fas fa-edit editIcon"></i>
                            </div>
                            <hr/>
                            <p className="labelProfile">Description</p>
                            <div className='flex'>
                                <textarea value={profileData.description} className="textField max-h-[200px] min-h-[20px] bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="description" name="description" disabled onChange={handleChangeDesc}/>
                                <i className="fas fa-edit editIcon"></i>
                            </div>
                            <p className="labelProfile">Phone Number</p>
                            <div id="phonenumbercontainer" className='flex'>
                                <input type="text" value={profileData.phone} className="textField bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="phoneNumber" name="phone"  disabled onChange={handleChange}/>
                                <i className="fas fa-edit editIcon"></i>
                                <p id="phoneNumberInvalid"></p>
                            </div>
                            <hr/>
                            <p className="labelProfile">Password</p>
                            <div className='flex'>
                                <input type="text" value={profileData.password} className="textField bg-white border-none w-[90%] h-35 text-black no-underline text-16 font-semibold  shadow-none outline-none  mb-2" id="editPassword"  name="password" disabled onChange={handleChange}/>
                                <i className="fas fa-edit editIcon"></i>
                            </div>
                            <hr/>
                            <div className="flex flex-row justify-center items-center gap-5 mt-5">
                            <button type="button" className="editButton bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" name="edit" id="edit" onClick={buttons} >Edit</button>
                            <button type="button" className="saveButton bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" style={{display: 'none' }} name="save" id="save" onClick={handleSave}>Save</button>
                            <button type="button" className="deleteButton bg-[red] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" name="delete" id="delete" onClick={openBox}>Delete</button>
                            <button type="button" className="cancelButton bg-white rounded-[30px] w-[120px] h-[30px] text-[#EF4800]  border border-[#EF4800] text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] hover:text-white transform scale-110 shadow-md" style={{display: 'none' }} onClick={buttons} name="cancel" id="cancel">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='PostContainer flex flex-col items-center justify-center gap-5 p-10 border border-[#EF4800] rounded-xl mb-10 w-[50%]'>
                    <h1 className='text-[30px] font-extrabold'>Post</h1>
                    <div className='flex flex-col items-start gap-10 overflow-y-auto w-[100%] max-h-[200px]'>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                    </div>
                </div>
            </div>    
        </div>
        {showConfirmationBox && (
            <div className="fixed z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
                <div className="absolute inset-0"></div>
                <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="bg-white rounded-md p-6">
                        {/* ... (confirmation box content) */}
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Delete Content
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Are you sure you want to delete this content? All of your data will be permanently removed. This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EF4800] text-base font-medium text-white hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                onClick={closeBox}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Profile;
