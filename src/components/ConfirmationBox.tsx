import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface ConfirmationProps {
    isOpen:boolean;
    type: 'create' | 'update' | 'delete' | 'redeem';
    object: 'post' | 'content' | 'profile';
    ok:()=> void;
    cancel:()=>void
}

const ConfirmationBox = (props:ConfirmationProps) =>{
    const {
        isOpen, type, object, ok, cancel
    } = props
    const [messagetype, setMessageType] = useState('');
    if (!isOpen) {
        return null
    }
    return (
        <div>
            <div className="fixed z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
                <div className="absolute inset-0"></div>
                <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="bg-white rounded-md p-6">
                        {/* ... (confirmation box content) */}
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {type} {object}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Are you sure you want to {type} this {object}? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EF4800] text-base font-medium text-white hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                onClick={ok}
                            >
                                {type}
                            </button>
                            <button
                                type="button"
                                className="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConfirmationBox;