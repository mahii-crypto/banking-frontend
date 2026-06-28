import { useState } from "react";
import API from "../services/api";

function Withdraw() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    try {
      await API.post("transactions/", {
        transaction_type: "WITHDRAW",
        amount: amount,
        account: account,
      });

      setMessage("✅ Withdrawal Successful!");
      setAccount("");
      setAmount("");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage("❌ " + JSON.stringify(error.response.data));
      } else {
        setMessage("❌ Withdrawal Failed!");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center text-danger mb-4">
          💸 Withdraw Money
        </h2>

        <form onSubmit={handleWithdraw}>

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

          <button className="btn btn-danger w-100">
            Withdraw
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

export default Withdraw;