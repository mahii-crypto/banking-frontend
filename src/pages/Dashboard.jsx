import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    API.get("customers/").then((res) => {
      setCustomerCount(res.data.length);
    });

    API.get("bank-accounts/").then((res) => {
      setAccountCount(res.data.length);

      const balance = res.data.reduce(
        (sum, account) => sum + Number(account.balance),
        0
      );

      setTotalBalance(balance);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🏦 Banking Dashboard</h1>

      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>Customers</h4>
            <h2>{customerCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>Accounts</h4>
            <h2>{accountCount}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>Total Balance</h4>
            <h2>₹{totalBalance}</h2>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/customers" className="btn btn-primary m-2">
          Customers
        </Link>

        <Link to="/accounts" className="btn btn-success m-2">
          Accounts
        </Link>

        <Link to="/transactions" className="btn btn-warning m-2">
          Transactions
        </Link>

        <Link to="/deposit" className="btn btn-info m-2">
          Deposit
        </Link>

        <Link to="/withdraw" className="btn btn-danger m-2">
          Withdraw
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;