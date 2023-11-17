import React from 'react';

function Modal({ isOpen, children }:any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden bg-black bg-opacity-50  " >
      <div className='w-screen h-screen md:hidden'>
        <div className="relativ p-4 mt-[80px] w-screen h-[95vh] bg-white rounded-xl shadow-lg overflow-hidden md:max-w-md md:m-4">
          {children}
        </div>
      </div>
      <div className='hidden md:flex w-screen items-center justify-center'>
        <div className="relative w-2/5 p-4 m-4 bg-white shadow-lg h-[50vh] rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;