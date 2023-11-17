import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useToast from '../hooks/useToast';


interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}

interface ContentData {
    title: string;
    highlight: string;
    description: string;
}

const host = process.env.URL||'http://localhost:8080'



const IDPage = () => {
    const {showToast} = useToast()
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userInfo, setUserInfo] = useState<userJwt|null>(null)
    const { id } = useParams<{ id: string }>();
    const [photo , setPhoto] = useState('');
    const [contentData, setContentData] = useState<ContentData>({
        title: "",
        highlight: "",
        description: "",
    });


    const requestPhoto = async (id: number)=>{
        axios.get(`${host}/image/${id}`,{withCredentials: true}).then(response=>{
            setPhoto(response.data.data.url)
        })
    }

    const getContentData = async () => {
        await axios.get(`${host}/content/${id}`,{withCredentials: true})
            .then(response => {
                setContentData({
                    title:response.data.data[0].title,
                    highlight: response.data.data[0].highlight,
                    description: response.data.data[0].body
                })
                requestPhoto(response.data.data[0].id_photo)
                console.log(response.data.data[0])
            }).catch(e => {
               showToast('Failed to get content', 'error')
            })
    }


    useEffect(() => {
        getContentData()
    }, []);



    useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      return;
    }
    else {
        setUserInfo(jwtDecode(token));
        if (userInfo && userInfo.uuid) {
        }
    }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleChangedesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
          alert('Selected file: ' + selectedFile.name);
          // You can perform additional actions with the selected file
          
        }
        else {
            showToast('No photo selected', 'error')
        }
      };

      const handleSave = async () => {
        if (!contentData.title){
            return
        }
        if (!contentData.highlight){
            return
        }
        if (!contentData.description){
            return
        }
        if (!photo){
            return
        }
        await axios.put(`${host}/content/${id}`,{
            title: contentData.title,
            highlight: contentData.highlight,
            body: contentData.description,
            photo: photo
        },{withCredentials: true}).then(()=>{
            showToast('Content successfully updated', 'success')
        }).catch((e)=>{
            showToast('Failed to update content', 'error')
        })
    }

      const openFileExplorer = () => {
        // Trigger click event on the hidden file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
      };

      const openConfirmation = () => {
        setShowConfirmation(true);
      }

        const closeConfirmation = () => {
            setShowConfirmation(false);
        }

    return (
        <div>
            <Navbar />
            <div className="content flex flex-col gap-[20px]">
                <div className="factcontainer mt-[50px] ml-[50px] flex flex-col gap-[20px] align-start justify-start">
                    <img src={(photo)?photo:"https://picsum.photos/200/300"} alt="" className="w-[50vw] h-[30vw] rounded-xl shadow-md" />
                    <button onClick={openFileExplorer} className="bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md">Upload</button>
                    <input
        type="file"
        id="fileInput"
        accept="*"
        style={{ display: 'none' }}
        onChange={handleFileSelection}
      />
                    <div className="facttitle w-[50vw] border border-[#EF4800]">
                        <input type='text' value={contentData.title} name='title'  className=' w-[100%] text-[2rem] font-bold flex' onChange={handleChange}/>
                    </div>
                    <div className='facthighlight w-[50vw] border border-[#EF4800]'>
                        <input type='text' name='highlight' value={contentData.highlight} className='w-[50vw] text-[1.5rem] font-bold' onChange={handleChange}/>
                    </div>
                    <div className="facttext border border-[#EF4800]">
                        <textarea name="description" id="" cols={70} rows={10} value={contentData.description} className='text-[1.1rem] font-normal' onChange={handleChangedesc}></textarea>
                    </div>
                </div>
                <div className='buttoncontainer flex flex-row justify-center items-center mb-10'>
                    <button className="bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md" onClick={openConfirmation}>Save</button>
                    <button className='bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md'>Delete</button>
                </div>
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
                    <div className="absolute inset-0"></div>
                    <div className="relative z-30 bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="bg-white rounded-md p-6">
                            {/* ... (confirmation box content) */}
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Edit Content
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Are you sure you want to save this edit?
                            </p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EF4800] text-base font-medium text-white hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                    onClick={closeConfirmation}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>);
};

export default IDPage;
