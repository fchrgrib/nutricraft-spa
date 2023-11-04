import { useState, useEffect } from 'react';
import logo from '../assets/NutriCraft.svg'
import defaultPict from "../assets/default.svg"


const Navbar = () =>{
    const [nav, setNav] = useState(false);
    const [login, setLogin] = useState(true);
    const [textLogin,setTextLogin] = useState("Login");
    const [open, setOpen] = useState(false);
    const [admin, setAdmin] = useState(false);

    const handleNav = () => {
        setNav(!nav);
        setOpen(false)
    };

    const handleDropDown =()=>{
        setOpen(!open)
        setNav(false)
    }

    const checkNavbar = () =>{
        if(window.innerWidth>768 && nav){
            setNav(false)
        }
    }

    window.addEventListener('resize', checkNavbar);



    return(
        <div className='bg-[#10A5A5] h-full w-full font-sans'>
           <div className="hidden md:flex items-center justify-between">
                <div className='flex flex-row space-x-9 justify-start items-center font-bold cursor-pointer transform text-xl'>
                    <a href="/home">
                        <img src={logo} alt="" className='flex w-[174px] h-[55px] ml-[25px]'/>
                    </a>
                    <a href="/home">
                        <button type="button" className="home hover:scale-125">Home</button>
                    </a>
                    <a href="/meals">
                        <button type="button" className="meals hover:scale-125">Forum</button>
                    </a>
                    <a href="/fact">
                        <button type="button" className="fact hover:scale-125">Content</button>
                    </a>
                </div>
                <div className='flex flex-row justify-end items-center'>
                    <div onMouseLeave={() => setOpen(false)} className="relative">
                        <button onMouseOver={() => setOpen(true)} className="meals bg-[#FF6B00] border-none rounded-2xl w-[154px] h-[35px] text-white cursor-pointer hover:bg-[#ff6a00cc]">{textLogin}</button>
                        <ul className={`absolute right-0 w-40 drop-shadow-lg ${open&&login ? "block" : "hidden"}`}>
                            <a href="">
                                <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100">Profile</li>
                            </a>
                            <a href=""><li className={admin? "flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100": "hidden" }>CMS</li>
                            </a>
                            <a href="">
                                <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100">Logout</li>
                            </a>
                        </ul>
                    </div>
                    <img src={defaultPict} alt="" className='h-[40px] m-5 '/>
                </div>
            </div>
            
            <div className='items-center justify-between flex  md:hidden'>
                <div onClick={handleNav} className='m-5 text-3xl justify-start items-center'>
                    <button className="hamburger">&#9776;</button>
                </div>
                <div className='flex flex-row justify-end items-center'>
                    <div onClick={handleDropDown} className="relative">
                        <button onClick={handleDropDown} className="meals bg-[#FF6B00] border-none rounded-2xl w-[154px] h-[35px] text-white cursor-pointer hover:bg-[#ff6a00cc]">{textLogin}</button>
                        <ul className={`absolute right-0 w-40 drop-shadow-lg ${open&&login ? "block" : "hidden"}`}>
                            <a href="">
                                <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200">Profile</li>
                            </a>
                            <a href=""><li className={admin? "flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200": "hidden" }>CMS</li>
                            </a>
                            <a href="">
                                <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200">Logout</li>
                            </a>
                        </ul>
                    </div>
                    <img src={defaultPict} alt="" className='h-[40px] m-5'/>
                </div>
            </div>

            <div className={nav ? 'fixed flex flex-col w-full justify-between text-center bg-[#10A5A5] text-white' : 'hidden'}>
                <a href="/home">
                    <button type="button" className="home p-4 m-0">Home</button>
                </a>
                <a href="/meals">
                    <button type="button" className="meals p-4 m-0">Forum</button>
                </a>
                <a href="/fact">
                    <button type="button" className="fact p-4 m-0">Content</button>
                </a>
            </div>
        </div>
        
    );
}

export default Navbar;