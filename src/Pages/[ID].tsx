import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import Navbar from '../components/Navbar';


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
                console.log(e)
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
          console.log(selectedFile);
        }
      };

      const openFileExplorer = () => {
        // Trigger click event on the hidden file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
      };

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
                    <div className="facttitle w-[50vw]">
                        <input type='text' value={contentData.title} name='title'  className=' w-[100%] text-[2rem] font-bold flex' onChange={handleChange}/>
                    </div>
                    <div className='facthighlight w-[50vw]'>
                        <input type='text' name='highlight' value={contentData.highlight} className='w-[50vw] text-[1.5rem] font-bold' onChange={handleChange}/>
                    </div>
                    <div className="facttext">
                        <textarea name="description" id="" cols={70} rows={10} value={contentData.description} className='text-[1.1rem] font-normal' onChange={handleChangedesc}></textarea>
                    </div>
                </div>
                <div className='buttoncontainer flex flex-row justify-center items-center mb-10'>
                    <button className="bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md">Save</button>
                    <button className='bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md'>Delete</button>
                </div>
            </div>
        </div>);
};

export default IDPage;
