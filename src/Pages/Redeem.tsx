import { useState } from "react";
import Navbar from "../components/Navbar";

interface PromoCard {
    id: number;
    title: string;
    from: string;
    cost: number;
}

const Redeem = () => {
    const [coins, setCoins] = useState(100);
    const [promoCards, setPromoCards] = useState<PromoCard[]>([
        {
            id: 1,
            title: "Free Shipping",
            from: "Tokped",
            cost: 50,
        },
        {
            id: 2,
            title: "10% Discount",
            from: "Gojek",
            cost: 75,
        },
        {
            id: 3,
            title: "20% Discount",
            from: "XL",
            cost: 100,
        },
    ]);

    const handleRedeem = (promoCard: PromoCard) => {
        if (coins >= promoCard.cost) {
            setCoins(coins - promoCard.cost);
            // TODO: redeem promo card
        } else {
            alert("Not enough coins to redeem this promo card");
        }
    };

    const numCards = promoCards.length;
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
                    {promoCards.map((promoCard) => (
                        <div
                            key={promoCard.id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-bold">{promoCard.title}</h3>
                                <p className="text-sm font-light">{promoCard.from}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm font-bold mr-5">{promoCard.cost} coins</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleRedeem(promoCard)}
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
