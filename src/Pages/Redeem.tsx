
import { useState } from "react";

function Redeem() {
  const [coins, setCoins] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/redeem-coins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coins }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Successfully redeemed ${data.redeemedCoins} coins!`);
        setCoins(0);
      } else {
        setErrorMessage("Failed to redeem coins.");
      }
    } catch (error) {
      setErrorMessage("Failed to redeem coins.");
    }
  };

  return (
    <div>
      <h1>Redeem Coins</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Coins to redeem:
          <input
            type="number"
            value={coins}
            onChange={(event) => setCoins(parseInt(event.target.value))}
          />
        </label>
        <button type="submit">Redeem</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Redeem;
