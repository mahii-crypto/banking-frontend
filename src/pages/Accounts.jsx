import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import API from "../services/api";
import Swal from "sweetalert2";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAccounts = () => {
    setLoading(true);

    API.get("bank-accounts/")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Unable to load accounts.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const deleteAccount = async (id) => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`bank-accounts/${id}/`);

      loadAccounts();

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to delete account.",
      });
    }
  };

  const editAccount = (account) => {
    localStorage.setItem("editAccount", JSON.stringify(account));
    window.location.href = "/add-account";
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.account_number
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      account.account_type
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      account.customer_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <ClipLoader color="#198754" size={70} />
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <h2 className="text-center text-success mb-4">
        🏦 Bank Accounts
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search by Account Number, Type or Customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <table className="table table-hover table-striped align-middle">

            <thead className="table-success">

              <tr>
                <th>ID</th>
                <th>Account Number</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Customer</th>
                <th className="text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredAccounts.length > 0 ? (

                filteredAccounts.map((account) => (

                  <tr key={account.id}>

                    <td>{account.id}</td>

                    <td>
                      <strong>{account.account_number}</strong>
                    </td>

                    <td>{account.account_type}</td>

                    <td className="fw-bold text-success">
                      ₹{Number(account.balance).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span className="fw-bold text-primary">
                        👤 {account.customer_name}
                      </span>
                    </td>

                    <td>

                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => editAccount(account)}
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteAccount(account.id)}
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center text-danger fw-bold"
                  >
                    No Account Found
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

export default Accounts;