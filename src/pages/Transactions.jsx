import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import API from "../services/api";
import Swal from "sweetalert2";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTransactions = () => {
    setLoading(true);

    API.get("transactions/")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Unable to load transactions.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transaction_type
      .toLowerCase()
      .includes(search.toLowerCase())
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

      <h2 className="text-center text-primary mb-4">
        💳 Transactions
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search Deposit / Withdraw..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <table className="table table-hover table-striped align-middle">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Account Number</th>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length > 0 ? (

                filteredTransactions.map((transaction) => (

                  <tr key={transaction.id}>

                    <td>{transaction.id}</td>

                    <td>
                      <span className="fw-bold text-success">
                        🏦 {transaction.account_number}
                      </span>
                    </td>

                    <td>

                      {transaction.transaction_type === "DEPOSIT" ? (

                        <span className="badge bg-success">
                          💰 Deposit
                        </span>

                      ) : (

                        <span className="badge bg-danger">
                          💸 Withdraw
                        </span>

                      )}

                    </td>

                    <td className="fw-bold text-success">
                      ₹{Number(transaction.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {new Date(
                        transaction.created_at
                      ).toLocaleString("en-IN")}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center text-danger fw-bold"
                  >
                    No Transactions Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Transactions;