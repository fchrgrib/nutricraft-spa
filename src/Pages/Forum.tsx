import {useState, ChangeEvent, FormEvent} from 'react'
import ReactQuill from 'react-quill';

import profPic from "../assets/default.svg"
import Navbar from "../components/Navbar";
import PhotoContent from "../assets/contoh.jpg"
import Modal from "../components/Modal";

const ConstainerContent = () => {
    const [likes, setLikes] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [comments, setComments] = useState(0);
    const [isComment, setIsComment] = useState(false);
    const [views, setViews] = useState(0);

    const handleLike = () => {
        setIsLike(!isLike);
        isLike? setLikes(likes-1) : setLikes(likes+1);
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
                        <button onClick= {()=>setIsComment(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Comment {comments}
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

const CommentSection = () => {
    const [comments, setComments] = useState(["Coment 1","Koment 2","Koment 3"]);
    const [newComment, setNewComment] = useState('');


    return (
        <div className="mt-4">
            <h1 className="font-bold text-lg">Comments</h1>
            <form className="mt-2">
                <input 
                    type="text" 
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="Write a comment..."
                />
                <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
            <div className="mt-4">
                {comments.map((comment, index) => (
                    <p key={index} className="border-b border-gray-300 py-2">{comment}</p>
                ))}
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

    const handleTextChange = (value:any) => {
        setText(value);
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
        <div>
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
                        <Modal isOpen={isModalOpen} className="no-scroll"> 
                            <form className="mt-8 mb-4 flex flex-col justify-between">
                            <h2 className="text-[30px] font-bold mt-4 md:mt-0">Create Post</h2>
                                <button
                                    className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 text-[30px] hidden md:block"
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                                <div className='mb-8 md:hidden'>
                                    <button
                                        className="absolute top-[80px] left-2 text-gray-600 hover:text-gray-800 text-[30px] "
                                        onClick={closeModal}
                                    >
                                        &times;
                                    </button>
                                    <button
                                        type="submit"
                                        className="absolute top-[80px] mt-2 right-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 w-16 h-8"
                                    >
                                        Post
                                    </button>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Type something..."
                                    className='border border-gray-300 p-2 rounded w-full h-32'
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2"
                                />
                                <div className='flex flex-row gap-3 justify-end'>
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