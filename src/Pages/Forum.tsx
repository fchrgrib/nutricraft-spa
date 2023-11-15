import {useEffect, useState} from 'react'
import {BiImageAdd} from 'react-icons/bi'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import Cookies from "js-cookie";
import "../style/forum.css"

import profPic from "../assets/default.svg"
import Navbar from "../components/Navbar";
import PhotoContent from "../assets/contoh.jpg"
import Modal from "../components/Modal";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}


const ConstainerContent = () => {
    const [likes, setLikes] = useState(0);
    const [commentsCount, setCommentsCount] = useState(3);
    const [isLike, setIsLike] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [comments, setComments] = useState([
        { user: "User1", comment: "Comment 1" },
        { user: "User2", comment: "Comment 2" },
        { user: "User3", comment: "Comment 3" },
      ]);
    
    const handleLike = () => {
        setIsLike(!isLike);
        isLike? setLikes(likes-1) : setLikes(likes+1);
    }
    
    const handleComment = () => {
        setIsComment(!isComment);
    }
    
    const CommentSection = () => {
        const [newComment, setNewComment] = useState("");
        const [newCommentUser, setNewCommentUser] = useState("NewUser");
        
        const handleSubmit = (e: any) => {
            e.preventDefault();
            const newCommentObject = { user: newCommentUser, comment: newComment };
            setComments([...comments, newCommentObject]);
            setCommentsCount(commentsCount+1);
            setNewComment("");
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
                    {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-300 py-2">
                        <p>
                        <span className="font-bold">{comment.user}: </span>
                        {comment.comment}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        );
    }

    return(
        <div>
            <div className="flex flex-col justify-center bg-white rounded-md shadow-md p-4 m-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)' }}>
                <div className="flex flex-row items-center justify-start">
                    <img src={profPic} alt="" className="h-10 mr-3"/>
                    <div className="flex flex-col items-start">
                        <p className="text-sm font-bold">Username Creator</p>
                        <div className="flex gap-2">
                            <p className="text-xs">Title Creator</p>    
                            <p className="text-xs">Date Upload</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-sm font-bold">Title Content</p>
                    <p className="text-xs">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, itaque? Nemo a quibusdam perferendis amet cum sequi deleniti hic, nisi optio cumque? Deserunt natus molestiae nulla modi harum odio doloremque!</p>
                    <div className='max-h-96 overflow-hidden'>
                        <img src={PhotoContent} alt="" className='object-cover w-full h-full' />
                    </div>
                </div>
                <div className='flex items-center justify-between my-3'>
                    <div className='flex justify-start gap-4 items-center mt-2'>
                        <button onClick={handleLike} className="flex items-center">
                            <img src={like} alt="" className="w-8 h-8" />
                            <span className="text-sm font-semibold  text-gray-600 mt-1 ml-2">{likes}</span>
                        </button>
                        <button onClick={handleComment} className="flex items-center">
                            <img src={comment} alt="" className="w-8 h-8" />
                            <span className="text-sm font-semibold text-gray-600 mt-1 ml-2">{commentsCount}</span>
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
    const [posts, setPosts] = useState([]);
    

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
                <img src="https://picsum.photos/200/300" alt="" className=' mt-10 rounded-full w-[100px] h-[100px]'/>
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
    const [text, setText] = useState('');
    const [userInfo, setUserInfo] = useState<userJwt|null>(null)
    const [photoProfile, setPhotoProfile] = useState('')
    const _tempToken = Cookies.get('token')
    const host = process.env.URL||'http://localhost:8080'

    const urlPhoto = async (uuid:string)=>{
        return await axios.get(`${host}/image/profile/${uuid}`)
            .then(response => {
                setPhotoProfile(response.data.url)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (_tempToken) {
            setUserInfo(jwtDecode(_tempToken));
        }
    }, [_tempToken]);

    useEffect(() => {
        if (userInfo && userInfo.uuid) {
            urlPhoto(userInfo.uuid);
        }
    }, [userInfo]);

    const handleTextChange = (event: any) => {
        setText(event.target.value);
    };

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
                    <Stats userName={(userInfo)?userInfo.name:''} profPic={(photoProfile)?photoProfile:profPic} post={0} like={0}/>
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
                                <div className='hidden md:flex flex-row items-center'>
                                    <img src={profPic} alt="" className="h-10 mr-3"/>
                                    <p>NAME</p>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Type something..."
                                    className='border border-gray-300 p-2 rounded w-full h-44 mt-4'
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
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                                
                        </Modal>
                    </div>
                    <ConstainerContent/>
                    <ConstainerContent/>
                    <ConstainerContent/>
                    <ConstainerContent/>
                </div>
                </div>
                <div className='hidden md:block w-1/5'>
                    <TitleContent/>
                </div>
            </div>
        </div>
    )
}
export default Forum;