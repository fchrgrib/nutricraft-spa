import React from 'react';

function Modal({type }:any) {
    const [isOpen, setIsOpen] = React.useState(true);
    const closeConfirmationBox = () => setIsOpen(false);


  if (!isOpen) return null;

//   return (
//     <div className="fixed z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
//                     <div className="absolute inset-0"></div>
//                     <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
//                         <div className="bg-white rounded-md p-6">
//                             {/* ... (confirmation box content) */}
//                             <h3 className="text-lg leading-6 font-medium text-gray-900">
//                                 Delete Content
//                             </h3>
//                             <p className="text-sm text-gray-500 mt-2">
//                                 Are you sure you want to delete this content? All of your data will be permanently removed. This action cannot be undone.
//                             </p>
//                             <div className="mt-4 flex justify-end">
//                                 <button
//                                     type="button"
//                                     className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EF4800] text-base font-medium text-white hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
//                                     onClick={handleDelete}
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
//                                     onClick={closeConfirmationBox}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//   );
}

export default Modal;