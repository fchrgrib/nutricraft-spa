
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import React, {ChangeEvent, useEffect} from 'react';
import {BiImageAdd} from 'react-icons/bi'
import { toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import {identity} from "lodash";
import useToast from "../hooks/useToast";

const host = process.env.URL||'http://localhost:8080'

interface ContentData {
    title: string;
    highlight: string;
    description: string;
}

interface viewer{
    id: number
    id_content: number
    ip_address: string
}

interface content{
    id: number
    title: string
    highlight: string
    body: string
    id_creator: number
    id_photo: number
    created_at: string,
    updated_at: string
    viewers: viewer[]
}

const Card: React.FC<{content: content, setListContent: any}> = ({content, setListContent}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [urlPhoto, setUrlPhoto] = useState('')
    const {showToast} = useToast()

    useEffect(()=>{
        requestUrlPhoto()
    },[])
    const requestUrlPhoto = async ()=>{
        axios.get(`${host}/image/${content.id_photo}`,{withCredentials: true}).then(response=>{
            setUrlPhoto(response.data.data.url)
        })
    }
    const openConfirmationBox = () => {
        setShowConfirmation(true);
    };

    const closeConfirmationBox = () => {
        setShowConfirmation(false);
    };

    const handleDelete = async () => {
        closeConfirmationBox()

        await axios.delete(`${host}/content/${content.id}`,{withCredentials: true}).then(()=>{
            window.location.reload()
            showToast('Content deleted', 'success')
        }).catch((e)=>{
            showToast('Failed to delete content', 'error')
        })
    };



    return (
        <div className="contentcard flex flex-col p-5 justify-center items-center border-[#EF4800] border-[1px] rounded-xl shadow-md hover:border-[aqua] transition duration-300">
            <div className="contentcardheader flex flex-row justify-between items-center">
                <h1 className="font-bold text-2xl">{content.title}</h1>
            </div>
            <div className="contentcardbody flex flex-row justify-between items-center">
                <div className="contentcardimage mr-5">
                    <img src={(urlPhoto)?urlPhoto:"https://picsum.photos/200/300"} alt="" className="w-[100px] h-[100px] rounded-full"/>
                </div>
                <div className="contentcardtext mr-5">
                    <p>{content.highlight}</p>
                </div>
                <div className="contentcardbutton flex flex-col gap-5">
                    <Link to={`/content/${content.id}`}>
                    <button className="bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md">Edit</button>
                    </Link>
                    <button className=" border-[#EF4800] border-[1px] rounded-[30px] w-[120px] h-[30px] text-[red] text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[red] hover:text-[#FFFFFF] transform scale-110 shadow-md" onClick={openConfirmationBox}>Delete</button>
                </div>

            </div>
            {showConfirmation && (
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
                                    onClick={closeConfirmationBox}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
            
}


const Content = () => {
    const {showToast} = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationBoxCreate, setIsConfirmationBoxCreate] = useState(false)
    const [contentData, setContentData] = useState<ContentData>({
        title: "",
        highlight: "",
        description: "",
    });
    const [listContent, setListContent] = useState<content[]|null>(null)
    let file: File|null = null


    const handleContentRequest = async ()=>{
        await axios.get(`${host}/content`,{withCredentials: true}).then(response=>{
            setListContent(response.data.data)
        }).catch((e)=>{
            showToast('Failed to get content', 'error')
        })
    }

    useEffect(()=>{
        handleContentRequest()
    },[])

    const handlerPostFile = async ()=>{
        console.log(contentData)
        if (!contentData.description)
            return

        if (!contentData.title)
            return

        if (!contentData.highlight)
            return

        if (file == null)
            return
        console.log('masuk')
        const formData = new FormData();
        formData.append('file', file)
        await axios.post(`${host}/image`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(response=>{
            console.log('successfully upload file')
            postRequestContent(response.data.id)
        }).catch(()=>{
            showToast('Failed to upload file', 'error')
        })
        closeBox()
    }

    const postRequestContent = async (id: number)=>{

        await axios.post(`${host}/content`,{
            title: contentData.title,
            highlight: contentData.highlight,
            body: contentData.description,
            id_photo: id
        },{withCredentials: true}).then(()=>{
            showToast('Content posted', 'success')
            setContentData({title:'',description:'',highlight:''})
            window.location.reload()
        }).catch((e)=>{
            console.log(e)
            showToast('Failed to post content', 'error')
        })
        closeModal()
    }

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openBox = () => {
        closeModal()
        setIsConfirmationBoxCreate(true)
    }

    const closeBox = () => {
        setIsConfirmationBoxCreate(false)
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentData({
            ...contentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContentData({
            ...contentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
         file = selectedFile
          // You can perform additional actions with the selected file
          console.log(selectedFile);
        }
        else{
            showToast('Failed to upload file', 'error')
      };
    }

    return (
        <div>
            <Navbar/>
            <div className="contents">
                <div className="contentheader flex flex-col justify-center items-center mt-10">
                    <h1 className="font-semibold text-3xl">Content</h1>
                    <div className="searchBar flex items-center mt-5 ml-10 p-2 rounded-full border border-gray-300 focus-within:ring focus-within:border-blue-500">
                    <button name="" className="w-4/5 h-10 outline-none text-left "  onClick={openModal}>Create Content</button>
                        <Modal isOpen={isModalOpen} className=" no-scroll modal" id='createcontainer'>
                                <div className='hidden md:flex justify-between'>
                                    <button
                                        className="text-gray-600 hover:text-gray-800 text-[30px] "
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </button>
                                    <h2 className="text-[30px] font-bold">Create Post</h2>
                                    <div></div>
                                </div>
                                
                                <div className='mb-8 flex justify-between items-center md:hidden'>
                                    <button
                                        className='text-gray-600 hover:text-gray-800 text-[30px]'
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </button>
                                    <h2 className="text-[30px] font-bold">Create Post</h2>
                                    <button
                                        type="submit"
                                        className='bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-16 h-8'
                                    >
                                        Post
                                    </button>
                                </div>
                                <div className='hidden md:flex flex-col items-start'>
                                    <h2 className="text-[20px] font-bold">Title</h2>
                                    <input className='border border-gray-300 p-2 rounded w-full mt-4' type="text" placeholder="Type something..." name="title" value={contentData.title} onChange={handleChange}/>
                                </div>
                                <div className='hidden md:flex flex-col items-start'>
                                    <h2 className="text-[20px] font-bold">Highlight</h2>
                                    <input className='border border-gray-300 p-2 rounded w-full mt-4' type="text" placeholder="Type something..." name="highlight" value={contentData.highlight} onChange={handleChange}/>
                                </div>
                                <h2 className="text-[20px] font-bold mt-4">Description</h2>
                                <textarea
                                    name="description"
                                    value={contentData.description}
                                    onChange={handleTextChange}
                                    placeholder="Type something..."
                                    className='border border-gray-300 p-2 rounded w-full h-44 mt-4 max-h-[80px] min-h-[30px]'
                                />
                                <div className='flex flex-row gap-3 justify-between mt-4 mb-10'>
                                    <label htmlFor="fileInput" className='mt-2 text-[30px] cursor-pointer transition-transform transform hover:scale-110'>
                                        <BiImageAdd/>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        name="Image"
                                        onChange={handleFileSelect}
                                    />
                                    <div className='flex flex-row gap-3 mb-10'>
                                        <button
                                            className="bg-gray-200 text-gray rounded-md hover:bg-gray-600 transition duration-200 w-16 h-8 self-end hidden md:block"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-16 h-8 self-end hidden md:block"
                                            onClick={handlerPostFile}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                        </Modal>
                    </div>
                </div>
                <div className="contentbody flex flex-col justify-center items-center mt-10 gap-8">
                    {(listContent ?? []).map((data,index)=>(
                        <Card key={index} content={data} setListContent={setListContent}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Content;