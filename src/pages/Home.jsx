import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("customers/"),
      API.get("bank-accounts/"),
      API.get("transactions/")
    ])
      .then(([customersRes, accountsRes, transactionsRes]) => {
        setCustomers(customersRes.data);
        setAccounts(accountsRes.data);
        setTransactions(transactionsRes.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalBalance = accounts.reduce(
    (sum, account) => sum + Number(account.balance),
    0
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <ClipLoader color="#0d6efd" size={70} />
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h1 className="text-center fw-bold mb-5">
        🏦 Banking Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow-lg border-0 text-center p-4">
            <h2>{customers.length}</h2>
            <h5 className="text-primary">
              👥 Total Customers
            </h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 text-center p-4">
            <h2>{accounts.length}</h2>
            <h5 className="text-success">
              🏦 Bank Accounts
            </h5>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 text-center p-4">
            <h2>₹{totalBalance.toLocaleString("en-IN")}</h2>
            <h5 className="text-danger">
              💰 Total Balance
            </h5>
          </div>
        </div>

      </div>

      {/* Recent Transactions */}

      <div className="card shadow-lg border-0 mt-5">

        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            📋 Recent Transactions
          </h4>
        </div>

        <div className="card-body">

          {transactions.length === 0 ? (

            <div className="text-center text-muted py-4">
              <h5>No Transactions Yet</h5>
            </div>

          ) : (

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {transactions
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((transaction) => (

                    <tr key={transaction.id}>

                      <td>
                        🏦 <strong>{transaction.account_number}</strong>
                      </td>

                      <td>

                        {transaction.transaction_type === "DEPOSIT" ? (
                          <span className="badge bg-success">
                            Deposit
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            Withdraw
                          </span>
                        )}

                      </td>

                      <td className="fw-bold">
                        ₹{Number(transaction.amount).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {new Date(transaction.created_at).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="text-center mt-5">

        <h4 className="mb-4">
          🚀 Quick Actions
        </h4>

        <Link to="/customers" className="btn btn-primary m-2">
          👥 Customers
        </Link>

        <Link to="/accounts" className="btn btn-success m-2">
          🏦 Accounts
        </Link>

        <Link to="/transactions" className="btn btn-dark m-2">
          💳 Transactions
        </Link>

        <Link to="/deposit" className="btn btn-info m-2">
          💰 Deposit
        </Link>

        <Link to="/withdraw" className="btn btn-danger m-2">
          💸 Withdraw
        </Link>

      </div>

      

    </div>
  );
}

export default Home;