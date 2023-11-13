import {useState, useEffect} from 'react'
import {BiImageAdd} from 'react-icons/bi'

import profPic from "../assets/default.svg"
import Navbar from "../components/Navbar";
import PhotoContent from "../assets/contoh.jpg"
import Modal from "../components/Modal";


const ConstainerContent = () => {
    const [likes, setLikes] = useState(0);
    const [commentsCount, setCommentsCount] = useState(3);
    const [isLike, setIsLike] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [views, setViews] = useState(0);
    const [comments, setComments] = useState(["Coment 1","Koment 2","Koment 3"]);
    
    const handleLike = () => {
        setIsLike(!isLike);
        isLike? setLikes(likes-1) : setLikes(likes+1);
    }
    
    const handleComment = () => {
        setIsComment(!isComment);
    }
    
    const CommentSection = () => {
        const [newComment, setNewComment] = useState("")
        
        const handleSubmit = (e: any) => {
            e.preventDefault();
            setComments([...comments, newComment]);
            setCommentsCount(commentsCount+1);
            setNewComment("");
        }
    
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
                        <p key={index} className="border-b border-gray-300 py-2">{comment}</p>
                    ))}
                </div>
            </div>
        );
    }

    return(
        <div>
            <div className="flex flex-col bg-blue-200 p-3 my-4 md:m-6 md:my-8" >
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
                    <div className='flex justify-start gap-2'>
                        <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Like {likes}
                        </button>
                        <button onClick= {handleComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Comment {commentsCount}
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


const TitleContent = () => {
    return(
        <div className='bg-yellow-200 h-full'>
            <h1>ini buat judul-judul konten</h1>
        </div>
    );
}

const Stats = () => {
    return(
        <div className='bg-yellow-200 h-full'>
            <h1>ini buat statistik User</h1>
        </div>
    );
}

const Forum = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');

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
            <div className='flex'>
                <div className='hidden md:block w-1/5'>
                    <Stats/>
                </div>
                <div className='w-full md:w-3/5'>
                <div>
                    <div className="flex items-center justify-center bg-red-100 p-3 mt-0 md:m-6">
                        <img src={profPic} alt="" className="h-10 mr-3"/>
                        <input name="" className="w-4/5 h-10 " placeholder="Create Post" onClick={openModal}></input>
                        <Modal isOpen={isModalOpen} className="no-scroll modal"> 
                            <form className="mb-4 flex flex-col">
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
                                
                                <div className='flex flex-row gap-3 justify-between mt-4'>
                                    <label htmlFor="fileInput" className='mt-2 text-[30px] cursor-pointer transition-transform transform hover:scale-110'>
                                        <BiImageAdd/>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className='flex flex-row gap-3'>
                                        <button
                                            className="bg-gray-200 text-gray rounded-md hover:bg-gray-600 transition duration-200 w-16 h-8 self-end hidden md:block"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-16 h-8 self-end hidden md:block"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                                
                                </form>
                        </Modal>
                    </div>
                </div>
                    <ConstainerContent/>
                    <ConstainerContent/>
                    <ConstainerContent/>
                    <ConstainerContent/>
                </div>
                <div className='hidden md:block w-1/5'>
                    <TitleContent/>
                </div>
            </div>
        </div>
    )
}
export default Forum;