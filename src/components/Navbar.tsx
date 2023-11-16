
    import { useState, useEffect } from 'react';
    import logo from '../assets/NutriCraft.svg'
    import defaultPict from "../assets/default.svg"
    import { Link , useNavigate} from 'react-router-dom';
    import Cookies from 'js-cookie';
    import {jwtDecode} from 'jwt-decode';
    import lodash from 'lodash';
    import axios from "axios";

    interface userJwt{
        uuid: string
        name: string
        email: string
        iat: number
    }

    const host = process.env.URL||'http://localhost:8080'

    const Navbar = () =>{
        const [nav, setNav] = useState(false);
        const [login, setLogin] = useState(true);
        const [textLogin,setTextLogin] = useState("Login");
        const [open, setOpen] = useState(false);
        const [admin, setAdmin] = useState(false);
        const [loggedIn, setLoggedIn] = useState(false);
        const [userInfo, setUserInfo] = useState<userJwt|null>(null)
        const navigate = useNavigate()

        const handleLogout = async ()=>{
            await axios.delete(`${host}/logout`,{withCredentials:true}).then(()=>{
                navigate('/',{replace: true})
                window.location.reload()
            }).catch((e)=>{
                console.log(e)
            })
        }

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


        useEffect(() => {
            const token = Cookies.get('token');
            if (token) {
                setLoggedIn(true);
                setUserInfo(jwtDecode(token));
            }
        }, []);

        useEffect(() => {
            console.log(userInfo?.name)
            if (userInfo && userInfo.name) {
                setTextLogin(userInfo.name);
            }
        }, [userInfo]);

        const truncatedText = lodash.truncate(textLogin, { length: 17 });

        window.addEventListener('resize', checkNavbar);

        if (admin === true) return (
            <div className='bg-[#10A5A5] h-full w-full font-sans'>
               <div className="hidden md:flex items-center justify-between">
                    <div className='flex flex-row space-x-9 justify-start items-center font-bold cursor-pointer transform text-xl'>
                        <Link to="/home">
                            <img src={logo} alt="" className='flex w-[174px] h-[55px] ml-[25px] text-white'/>
                        </Link>
                        <Link to="/home">
                            <button type="button" className="home hover:scale-125">Home</button>
                        </Link>
                        <Link to="/forum">
                            <button type="button" className="meals hover:scale-125">Forum</button>
                        </Link>
                        <Link to="/content">
                            <button type="button" className="fact hover:scale-125">Content</button>
                        </Link>
                        <Link to="/redeem">
                            <button type="button" className="fact hover:scale-125">Redeem</button>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-end items-center'>
                        <div onMouseLeave={() => setOpen(false)} className="relative">
                            <button onMouseOver={() => setOpen(true)} className="meals bg-[#FF6B00] border-none rounded-2xl w-[154px] h-[35px] text-white font-bold cursor-pointer hover:bg-[#ff6a00cc]">{truncatedText}</button>
                            <ul className={`absolute right-0 w-40 drop-shadow-lg ${open&&login ? "block" : "hidden"}`}>
                                <Link to="/profile">
                                    <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100">Profile</li>
                                </Link>
                                <a href=''>
                                    <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100" >Logout</li>
                                </a>
                            </ul>
                        </div>
                        <img src={defaultPict} alt="" className='h-[40px] m-5 '/>
                    </div>
                </div>
            </div>
        )

        return(
            <div className='bg-[#10A5A5] h-full w-full font-sans'>
               <div className="hidden md:flex items-center justify-between">
                    <div className='flex flex-row space-x-9 justify-start items-center font-bold cursor-pointer transform text-xl text-white'>
                        <Link to="/">
                            <img src={logo} alt="" className='flex w-[174px] h-[55px] ml-[25px]'/>
                        </Link>
                        <Link to="/">
                            <button type="button" className="home hover:scale-125">Home</button>
                        </Link>
                        <Link to="/forum">
                            <button type="button" className="meals hover:scale-125">Forum</button>
                        </Link>
                        <Link to="/content">
                            <button type="button" className="fact hover:scale-125">Content</button>
                        </Link>
                        <Link to="/redeem">
                            <button type="button" className="fact hover:scale-125">Redeem</button>
                        </Link>
                    </div>
                    {loggedIn ? (
                    <div className='flex items-center'>
                        <div onMouseLeave={() => setOpen(false)} className="relative">
                            <button onMouseOver={() => setOpen(true)} className="meals bg-[#FF6B00] border-none rounded-2xl w-[154px] h-[35px] text-white cursor-pointer hover:bg-[#ff6a00cc]">{truncatedText}</button>
                            <ul className={`absolute right-0 w-40 drop-shadow-lg ${open&&login ? "block" : "hidden"}`}>
                                <Link to="/profile">
                                    <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100">Profile</li>
                                </Link>
                                <a onClick={handleLogout}>
                                    <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-100">Logout</li>
                                </a>
                            </ul>
                        </div>
                        <img src={defaultPict} alt="" className='h-[40px] m-5 '/>
                        </div>
                        
                    ) : (
                        <Link to="/login">
                            <button
                                type="button"
                                className="loginbtn bg-[#EF4800] border-none rounded-[30px] w-[154px] h-[35px] text-white text-center text-lg font-bold cursor-pointer mr-8 transition duration-300 hover:bg-[#FF6B00] transform scale-110 shadow-md m-0"
                            >
                                Login
                            </button>
                        </Link>
                    )}
                </div>
                
                <div className='items-center justify-between flex  md:hidden'>
                    <div onClick={handleNav} className='m-5 text-3xl justify-start items-center'>
                        <button className="hamburger">&#9776;</button>
                    </div>
                </div>
            </div>
        )
    }
    //             <div className='flex flex-row justify-end items-center'>
    //                 <div onClick={handleDropDown} className="relative">
    //                     <button onClick={handleDropDown} className="meals bg-[#FF6B00] border-none rounded-2xl w-[154px] h-[35px] text-white cursor-pointer hover:bg-[#ff6a00cc]">{textLogin}</button>
    //                     <ul className={`absolute right-0 w-40 drop-shadow-lg ${open&&login ? "block" : "hidden"}`}>
    //                         <a href="">
    //                             <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200">Profile</li>
    //                         </a>
    //                         <a href=""><li className={admin? "flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200": "hidden" }>CMS</li>
    //                         </a>
    //                         <a href="">
    //                             <li className="flex w-full items-center px-3 py-2 text-sm bg-white hover:bg-gray-200">Logout</li>
    //                         </a>
    //                     </ul>
    //                 </div>
    //                 <img src={defaultPict} alt="" className='h-[40px] m-5'/>
    //             </div>
    //         </div>

    //         <div className={nav ? 'fixed flex flex-col w-full justify-between text-center bg-[#10A5A5] text-white' : 'hidden'}>
    //             <a href="/home">
    //                 <button type="button" className="home p-4 m-0">Home</button>
    //             </a>
    //             <a href="/meals">
    //                 <button type="button" className="meals p-4 m-0">Forum</button>
    //             </a>
    //             <a href="/fact">
    //                 <button type="button" className="fact p-4 m-0">Content</button>
    //             </a>
    //         </div>
    //     </div>
        
    // );
// }

export default Navbar;