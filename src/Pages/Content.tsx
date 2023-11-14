
import Navbar from "../components/Navbar";
import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { useState } from "react";




const Card = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const openConfirmationBox = () => {
        setShowConfirmation(true);
    };

    const closeConfirmationBox = () => {
        setShowConfirmation(false);
    };

    const handleDelete = () => {
        // Add your delete logic here
        console.log('Deleting content...');
        // Close the confirmation box after deletion or cancel
        closeConfirmationBox();
    };

    

    return (
        <div className="contentcard flex flex-col p-5 justify-center items-center border border-[#EF4800] border-[1px] rounded-xl shadow-md hover:border-[aqua] transition duration-300">
            <div className="contentcardheader flex flex-row justify-between items-center">
                <h1 className="font-bold text-2xl">TitleContent</h1>
            </div>
            <div className="contentcardbody flex flex-row justify-between items-center">
                <div className="contentcardimage mr-5">
                    <img src="https://picsum.photos/200/300" alt="" className="w-[100px] h-[100px] rounded-full"/>
                </div>
                <div className="contentcardtext mr-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas.</p>
                </div>
                <div className="contentcardbutton flex flex-col gap-5">
                    <Link to="/editcontent">
                    <button className="bg-[#EF4800] border-none rounded-[30px] w-[120px] h-[30px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md">Edit</button>
                    </Link>
                    <button className=" border border-[#EF4800] border-[1px] rounded-[30px] w-[120px] h-[30px] text-[red] text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[red] hover:text-[#FFFFFF] transform scale-110 shadow-md" onClick={openConfirmationBox}>Delete</button>
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
        </div>
    );
            
}


const Content = () => {
    return (
        <div>
            <Navbar/>
            <div className="contents">
                <div className="contentheader flex flex-col justify-center items-center mt-10">
                    <h1 className="font-semibold text-3xl">Content</h1>
                    <div className="searchBar flex items-center mt-5 ml-10 p-2 rounded-full border border-gray-300 focus-within:ring focus-within:border-blue-500">
                        <FontAwesomeIcon icon={faSearch} className="searchIcon mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="searchInput outline-none bg-transparent focus:outline-none"
                        />
                    </div>
                </div>
                <div className="contentbody flex flex-col justify-center items-center mt-10 gap-8">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
    );
};

export default Content;