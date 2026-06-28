import { useState } from "react";
import API from "../services/api";

function Deposit() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await API.post("transactions/", {
        transaction_type: "DEPOSIT",
        amount: amount,
        account: account,
      });

      setMessage("✅ Deposit Successful!");
      setAmount("");
      setAccount("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Deposit Failed!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center text-success mb-4">
          💰 Deposit Money
        </h2>

        <form onSubmit={handleDeposit}>

          <div className="mb-3">
            <label className="form-label">
              Account ID
            </label>

            <input
              type="number"
              className="form-control"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Amount
            </label>

            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Deposit
          </button>

        </form>

        {message && (
          <div className="alert alert-info mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Deposit;