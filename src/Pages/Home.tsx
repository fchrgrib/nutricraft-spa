import Navbar from "../components/Navbar";
import "../style/home.css";
import { Link } from 'react-router-dom';
import nutricraft from "../assets/Mesa de trabajo 1.svg";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="homecontent mt-20 flex flex-row justify-between items-center">
                <div className="tagline ml-8 w-[40vw]">
                    <h1 className="font-semibold text-4xl">Empower Your Plate Discover Nutrition, Craft Meals, Flourish</h1>
                    <h3 className="font-light text-1xl">Welcome to a world where you take control of your plate and your well-being. At Empower Your Plate, we're your guides on a journey to uncover the secrets of nutrition</h3>
                    <Link to="/register">
                        <button className="bg-orange-500 rounded-full text-white text-center text-lg px-6 py-2 mt-4 hover:bg-orange-600 transform transition duration-300 shadow-md">
                            Get started!
                        </button>
                    </Link>
                </div>
                <div className="image">
                    <img
                        src={nutricraft}
                        alt=""
                        className="w-[20vw] h-[20vw] mr-40 transform rotate-30 transition-transform duration-400 animate-back-and-forth"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
