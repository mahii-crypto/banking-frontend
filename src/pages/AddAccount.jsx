import { useState } from "react";
import API from "../services/api";

function AddAccount() {

  const [form, setForm] = useState({
    customer: "",
    account_number: "",
    account_type: "SAVINGS",
    balance: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("bank-accounts/", form);

      setMessage("✅ Bank Account Created Successfully!");

      setForm({
        customer: "",
        account_number: "",
        account_type: "SAVINGS",
        balance: "",
      });

    } catch (error) {

      console.error(error);

      setMessage("❌ Failed to Create Account");

    }

  };

  return (

    <div className="container mt-5" style={{ maxWidth: "600px" }}>

      <div className="card shadow-lg p-4">

        <h2 className="text-center text-success mb-4">
          🏦 Add Bank Account
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Customer ID
            </label>

            <input
              type="number"
              name="customer"
              className="form-control"
              value={form.customer}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Account Number
            </label>

            <input
              type="text"
              name="account_number"
              className="form-control"
              value={form.account_number}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Account Type
            </label>

            <select
              name="account_type"
              className="form-control"
              value={form.account_type}
              onChange={handleChange}
            >
              <option value="SAVINGS">Savings</option>
              <option value="CURRENT">Current</option>
            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Opening Balance
            </label>

            <input
              type="number"
              name="balance"
              className="form-control"
              value={form.balance}
              onChange={handleChange}
              required
            />

          </div>

          <button className="btn btn-success w-100">
            Create Account
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

export default AddAccount;