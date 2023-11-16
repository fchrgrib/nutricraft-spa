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



const IDPage = () => {
    const [userInfo, setUserInfo] = useState<userJwt|null>(null)
    const { id } = useParams<{ id: string }>();
    const [photo , setPhoto] = useState('');
    const [contentData, setContentData] = useState<ContentData>({
        title: "",
        highlight: "",
        description: "",
    });

    const host = process.env.URL||'http://localhost:8080'

    const getContentData = async (id:string) => {
        // return await axios.get(`${host}/content/${id}`)
        //     .then(response => {
        //         setTitle(response.data.title);
        //         setHighlight(response.data.highlight);
        //         setDescription(response.data.description);
        //     }).catch(e => {
        //         console.log(e)
        //     })
        const data = {
            title: "How to make a website",
            highlight: "Learn how to make a website in 5 minutes",
            // long desc
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, mauris sed consectetur fringilla, nunc turpis interdum nisl, et varius libero mauris sed justo. Sed ac semper sapien. Sed vitae mi euismod, aliquam nisl ac, aliquet nisl. Donec nec semper nunc. Nulla facilisi. Nullam auctor, ligula eu aliquam maximus, nulla nisl consequat libero, non maximus magna nisl vitae nunc. Sed auctor, quam nec luctus ultrices, tellus ipsum ultricies urna, vel vulputate nisl nulla vitae elit. Integer vel erat sit amet libero tempor aliquam. Sed auctor, quam nec luctus ultrices, tellus ipsum ultricies urna, vel vulputate nisl nulla vitae elit. Integer vel erat sit amet libero tempor aliquam.",
        }
        setContentData(data);
    }


    useEffect(() => {
        if (id) {
            console.log(id);
            getContentData(id);
        }
    }, [id]);



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
                    <img src="https://picsum.photos/200/300" alt="" className="w-[50vw] h-[30vw] rounded-xl shadow-md" />
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
