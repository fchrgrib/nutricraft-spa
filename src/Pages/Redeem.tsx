import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import useToast from "../hooks/useToast";

interface PromoCard {
    id: number;
    title: string;
    from: string;
    coin: number;
}

interface userJwt{
    uuid: string
    name: string
    email: string
    iat: number
}


const host = process.env.URL||'http://localhost:8080'

const Redeem = () => {
    const {showToast} = useToast()
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const [userToken, setUserToken] = useState<userJwt|null>(null)
    const [coins, setCoins] = useState(0);
    const [promoCards, setPromoCards] = useState<PromoCard[]|null>(null);
    const _tempToken = Cookies.get('token')
    const getCoinUser = async (uuid:string)=>{
        axios.get(`${host}/coin/${uuid}`,{withCredentials: true}).then(response=>{
            setCoins(response.data.coin)
        }).catch(e=>{
            showToast('Failed to get coin', 'error')
        })
    }

    const postRequestRedeem = async (id: number)=>{
        axios.post(`${host}/redeem/user`,{
            redeem_id: id
        }, {withCredentials: true}).then(()=>{
            showToast('Redeem success', 'success')
            window.location.reload()
        }).catch((e)=>{
            showToast('Failed to redeem', 'error')
        })
    }

    const getRequestRedeem = async ()=>{
        await axios.get(`${host}/redeem`,{withCredentials: true}).then(response=>{
            setPromoCards(response.data.data)
        }).catch(e=>{
            showToast('Failed to get redeem', 'error')
        })
    }

    useEffect(()=>{
        getRequestRedeem()
    },[])


    useEffect(()=>{
        if (_tempToken)
            setUserToken(jwtDecode(_tempToken))
    },[_tempToken])

    useEffect(()=>{
        if (userToken)
            getCoinUser(userToken.uuid)

    },[userToken])

    const openBox = () => {
        setShowConfirmationBox(true);
    }

    const closeBox = () => {
        setShowConfirmationBox(false);
    }


    const numCards = (promoCards)?promoCards.length:0;
    const numCols = numCards > 3 ? 3 : numCards;

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-10">
                <div className="header">
                    <h1 className="text-4xl font-bold">Redeem</h1>
                    <h3 className="text-2xl font-light">Redeem your rewards!</h3>
                    <h5 className="text-xl font-light">
                        You have <span className="font-bold">{coins}</span> coins
                    </h5>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-3" style={{ gridAutoFlow: "dense" }}>
                    {(promoCards ?? []).map((promoCard) => (
                        <div
                            key={promoCard.id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{promoCard.title}</h3>
                                <p className="text-sm font-light">{promoCard.from}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm font-bold mr-5">{promoCard.coin} coins</p>
                                <button
                                    className="bg-[#EF4800] hover:bg-[#FF6B00] text-white rounded-lg px-4 py-2 font-bold"
                                    onClick={openBox}
                                >
                                    Redeem
                                </button>
                            </div>
                            {showConfirmationBox && (
                            <div className="fixed z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
                                <div className="absolute inset-0"></div>
                                <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                                    <div className="bg-white rounded-md p-6">
                                        {/* ... (confirmation box content) */}
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Redeem Voucher
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Are you sure you want to redeem this voucher?
                                        </p>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#EF4800] text-base font-medium text-white hover:bg-[#FF6B00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                                onClick={()=>{postRequestRedeem(promoCard.id)}}
                                            >
                                                Redeem
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4800]"
                                                onClick={closeBox}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Redeem;
