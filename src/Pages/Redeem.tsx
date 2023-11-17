import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

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
    const [userToken, setUserToken] = useState<userJwt|null>(null)
    const [coins, setCoins] = useState(0);
    const [promoCards, setPromoCards] = useState<PromoCard[]|null>(null);
    const _tempToken = Cookies.get('token')
    const getCoinUser = async (uuid:string)=>{
        axios.get(`${host}/coin/${uuid}`,{withCredentials: true}).then(response=>{
            setCoins(response.data.coin)
        })
    }

    const postRequestRedeem = async (id: number)=>{
        axios.post(`${host}/redeem/user`,{
            redeem_id: id
        }, {withCredentials: true}).then(()=>{
            console.log('successfully redeem')
            window.location.reload()
        }).catch((e)=>{
            console.log(e)
        })
    }

    const getRequestRedeem = async ()=>{
        await axios.get(`${host}/redeem`,{withCredentials: true}).then(response=>{
            setPromoCards(response.data.data)
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
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={()=>{postRequestRedeem(promoCard.id)}}
                                >
                                    Redeem
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Redeem;
