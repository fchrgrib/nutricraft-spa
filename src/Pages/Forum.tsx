import {useState} from 'react'

import profPic from "../assets/default.svg"
import Navbar from "../components/Navbar";
import PhotoContent from "../assets/contoh.jpg"

const ContainerPost = ()=> {
    return(
        <div>
            <div className="flex items-center justify-center bg-red-100 p-3 mt-0 md:m-6" >
                <img src={profPic} alt="" className="h-10 mr-3"/>
                <input name="" className="w-4/5 h-10" placeholder="Create Post"></input>
            </div>
        </div>
    );
}

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
                    <div className='flex justify-end'>
                        <span className="text-gray-700">Total Views: {views}</span>
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

const Forum = () => {
    return (
        <div>
            <Navbar/>
            <ContainerPost/>
            <ConstainerContent/>
            <ConstainerContent/>
            <ConstainerContent/>
            <ConstainerContent/>
            <h1>Forum</h1>
        </div>
    )
}
export default Forum;