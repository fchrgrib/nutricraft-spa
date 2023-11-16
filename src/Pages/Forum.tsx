import React, {ChangeEvent, useEffect, useState} from 'react'
import {BiImageAdd} from 'react-icons/bi'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import Cookies from "js-cookie";
import "../style/forum.css"

import profPic from "../assets/default.svg"
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}

interface like{
    id: number
    id_creator: number
    id_user: number
}

interface forumUser{
    id: number
    title: string
    body: string
    id_file: number
    id_creator: number
}

interface forum{
    id: number
    title: string
    body: string
    id_file: number
    id_creator: number
    created_at: string
    updated_at: string
    like: like[]
    comment: comment[]
}

interface comment{
    id: number
    id_forum: number
    id_user: number
    id_creator: number
    comment: string
    created_at: string
}

interface user{
    id:number
    uuid: string
    name: string
    email: string
    title: string
    phone_number: string
    description: string
    id_file: number
    created_at: string
    updated_at: string
    like_from_id_creator: like[]
    forum: forumUser[]
}

const host = process.env.URL||'http://localhost:8080'

const EachComment: React.FC<{comment: comment, index:number}> = ({comment,index})=>{

    const [userComment, setUserComment] = useState<user|null>()

    const requestUser = async () => {
        await axios.get(`${host}/user/${comment.id_user}`, {withCredentials: true}).then(response => {
            if (response.data.data) {
                setUserComment(response.data.data)
            }
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(()=>{
        requestUser()
    },[])

    return(
        <div key={index} className="border-b border-gray-300 py-2">
            <p>
                <span className="font-bold">{(userComment)?userComment.name:''} </span>
                {comment.comment}
            </p>
        </div>
    )
}

const ContainerContent: React.FC<{forum: forum, setLisForum: any}> = ({forum,setLisForum}) => {

    const [isComment, setIsComment] = useState(false);
    const [userData, setUserData] = useState<user|null>(null)
    const [urlPhotoUser, setUrlPhotoUser] = useState('')
    const [urlPhotoForum, setUrlPhotoForum] = useState('')


    const handleDislike = async ()=>{
        await axios.delete(`${host}/like/${forum.id}`,{withCredentials: true}).then(()=>{
            console.log('successfully dislike')
            handleForumRequest()
        }).catch(()=>{
        })
    }

    const handleForumRequest = async () =>{
        await axios.get(`${host}/forum`,{withCredentials: true}).then(response=>{
            if (response.data.data)
                setLisForum(response.data.data)
        })
    }

    
    const handleLike = async () => {
        await axios.post(`${host}/like`,{
            id: forum.id,
            id_creator: forum.id_creator
        },{withCredentials:true}).then(()=>{
            console.log('success like')
            handleForumRequest()
        }).catch(()=>{
            handleDislike()
        })
    }

    const requestUser = async () => {
        await axios.get(`${host}/user/${forum.id_creator}`,{withCredentials: true}).then(response =>{
            if (response.data.data) {
                setUserData(response.data.data)
                requestPhotoProfile(response.data.data.id_file)
            }
        }).catch(e =>{
            console.log(e)
        })

        await axios.get(`${host}/image/${forum.id_file}`,{withCredentials: true}).then(response =>{
            if (response.data.data)
                setUrlPhotoForum(response.data.data.url)
        })
    }

    const requestPhotoProfile = async (id: number) =>{
        await axios.get(`${host}/image/${id}`,{withCredentials: true}).then(response =>{
            if (response.data.data)
                setUrlPhotoUser(response.data.data.url)
        })
    }
    
    const handleComment = () => {
        setIsComment(!isComment);
    }

    useEffect(()=>{
        requestUser()
    },[])

    
    const CommentSection = () => {
        const [newComment, setNewComment] = useState("");

        const handleSubmit = async () => {
            if (!newComment)
                return

            await axios.post(`${host}/comment`,{
                id_forum: forum.id,
                id_creator: forum.id_creator,
                comment: newComment
            }, {withCredentials: true}).then(()=>{
                handleForumRequest()
            })
          };





    
        return (
            <div className="mt-4">
                <h1 className="font-bold text-lg">Comments</h1>
                {/* <form className="mt-2"> */}
                    <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Write a comment..."
                    />
                    <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                        Submit
                    </button>
                {/* </form> */}
                <div className="mt-4">
                    {forum.comment.map((comment, index) => (
                        <EachComment key={index} comment={comment} index={index}/>
                    ))}
                </div>
            </div>
        );
    }

    return(
        <div>
            <div className="flex flex-col justify-center bg-white rounded-md shadow-md p-4 m-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>
                <div className="flex flex-row items-center justify-start">
                    <img src={urlPhotoUser} alt="" className="h-10 mr-3"/>
                    <div className="flex flex-col items-start">
                        <p className="text-sm font-bold">{(userData)?userData.name:''}</p>
                        <div className="flex gap-2">
                            <p className="text-xs">{(userData)?userData.title:''}</p>
                            <p className="text-xs">{forum.created_at}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-sm font-bold">{forum.title}</p>
                    <p className="text-xs">{forum.body}</p>
                    <div className='max-h-96 overflow-hidden'>
                        <img src={urlPhotoForum} alt="" className='object-cover w-full h-full' />
                    </div>
                </div>
                <div className='flex items-center justify-between my-3'>
                    <div className='flex justify-start gap-4 items-center mt-2'>
                        <button onClick={handleLike} className="flex items-center">
                            <img src={like} alt="" className="w-8 h-8" />
                            <span className="text-sm font-semibold  text-gray-600 mt-1 ml-2">{forum.like.length}</span>
                        </button>
                        <button onClick={handleComment} className="flex items-center">
                            <img src={comment} alt="" className="w-8 h-8" />
                            <span className="text-sm font-semibold text-gray-600 mt-1 ml-2">{forum.comment.length}</span>
                        </button>
                    </div>
                </div>
                <div className={isComment? "flex" : "hidden"}>
                    <CommentSection/>
                </div>
            </div>
        </div>
    );
}

const Toptitle = () => {


    return (
        <div className='flex flex-row items-center'>
                        <p className='font-bold text-lg mr-5 mt-0.5'>1</p>
                        <p className='font-bold text-lg mt-1'>Title</p>
        </div>
    );
    }




const TitleContent = () => {
    return(
        <div className='trendingpost bg-[#fffcf1] h-full'>
            <div className='flex flex-col justify-center items-center pl-5 w-full'>
                <p className='font-bold text-xl mt-5'>Trending Posts</p>
                <div className='flex flex-col gap-4 justify-start mt-5 w-full'>
                    <Toptitle/>
                    <Toptitle/>
                </div>
            </div>
        </div>
    );
}

const Stats: React.FC<any> = ({userName, profPic, post, like}) => {
    return(
        <div className='profilecontainer pt-10 bg-[#fffcf1] h-full'>
            <div className='flex flex-col justify-center items-center'>
                <img src={profPic} alt="" className=' mt-10 rounded-full w-[100px] h-[100px]'/>
                <p className='font-bold text-xl mt-5'>{userName}</p>
            </div>
            <div className='flex flex-col justify-center items-center mt-10'>
                <p className='font-bold text-xl'>Stats</p>
                <div className='flex flex-row justify-center items-center mt-5'>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='font-bold text-xl'>{post}</p>
                        <p className='font-bold text-xl'>Posts</p>
                    </div>
                    <div className='flex flex-col justify-center items-center ml-10'>
                        <p className='font-bold text-xl'>{like}</p>
                        <p className='font-bold text-xl'>Likes</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Forum = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const [userInfo, setUserInfo] = useState<userJwt|null>(null)
    const [userData, setUserData] = useState<user|null>(null)
    const [photoProfile, setPhotoProfile] = useState('')
    const [listForum, setListForum] = useState<forum[]|null>(null)
    const _tempToken = Cookies.get('token')
    let file: File|null = null



    const postForm = async (id: number)=>{
        await axios.post(`${host}/forum`,{
            title:title,
            body: body,
            id_file: id
        },{withCredentials: true}).then(async ()=>{
            console.log('successfully upload form')
            await forumRequest()
        })
    }

    const postFile = async () =>{

        if (!title) {
            return
        }

        if (!body)
            return

        if (!file) {
            return
        }

        closeModal()
        const formData = new FormData();
        formData.append('file', file)
        await axios.post(`${host}/image`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }).then(response=>{
            console.log('successfully upload file')
            postForm(response.data.id)
        })
    }

    const urlPhoto = async (uuid:string)=>{
        await axios.get(`${host}/image/profile/${uuid}`)
            .then(response => {
                setPhotoProfile(response.data.url)
            }).catch(e => {
                console.log(e)
            })
    }

    const forumRequest = async () =>{
        await axios.get(`${host}/forum`,{withCredentials: true}).then(response =>{
            setListForum(response.data.data)
        }).catch(e =>{
            console.log(e)
        })
    }

    const requestUser = async (uuid: string) => {
        await axios.post(`${host}/user`,{
            uuid: uuid
        },{withCredentials: true}).then(response =>{
            if (response.data.data)
                setUserData(response.data.data)
        }).catch(e =>{
            console.log(e)
        })
    }

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            file = fileInput.files[0]
        } else {
            console.log('No file selected');
        }
    }

    useEffect(() => {
        if (_tempToken) {
            setUserInfo(jwtDecode(_tempToken));
        }
    }, [_tempToken])

    useEffect(()=>{
        forumRequest()
        if (userInfo && userInfo.uuid) {
            urlPhoto(userInfo.uuid)
            requestUser(userInfo.uuid)
            console.log(userData)
        }
    }, [userInfo])

    useEffect(()=>{

    },[])

    const handleTextChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleBodyChange = (event: any)=>{
        setBody(event.target.value)
    }

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "scroll"
    };

    return (
        <div >
            <Navbar/>
            <div className='flex overflow-hidden' style={{ height: 'calc(100vh - 115px)' }}>
                <div className='hidden md:block w-1/5'>
                    <Stats userName={(userInfo)?userInfo.name:''} profPic={(photoProfile)?photoProfile:profPic} post={(userData)?userData.forum.length:0} like={(userData)?userData.like_from_id_creator.length:0}/>
                </div>
                <div className=' md:w-3/5 overflow-y-auto scrollbar-thin '>
                <div className='mr-5 ml-5'>
                    <div className="flex items-center flex-start border border-[#EF4800] rounded-[20px] p-3 m-4 md:m-4 hover:border-[aqua]">
                        <img src={profPic} alt="" className="h-10 mr-3"/>
                        <button name="" className="w-4/5 h-10 outline-none text-left "  onClick={openModal}>Create Post</button>
                        <Modal isOpen={isModalOpen} className="no-scroll modal"> 
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
                                    <input className='border border-gray-300 p-2 rounded w-full mt-4' type="text" placeholder="Type something..." value={body} onChange={handleBodyChange}/>
                                </div>
                                <h2 className="text-[20px] font-bold mt-4">Body</h2>
                                <textarea
                                    value={title}
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
                                            onClick={postFile}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                                
                        </Modal>
                    </div>
                    {(listForum ?? []).map((data, index) => (
                        <ContainerContent key={index} forum={data}  setLisForum={setListForum}/>
                    ))}
                </div>
                </div>
                <div className='hidden md:block w-1/5'>
                    {/* <TitleContent/> */}
                </div>
            </div>
        </div>
    )
}
export default Forum;