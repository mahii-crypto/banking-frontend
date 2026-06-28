import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import API from "../services/api";
import Swal from "sweetalert2";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCustomers = () => {
    setLoading(true);

    API.get("customers/")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Unable to load customers.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await API.delete(`customers/${id}/`);

      loadCustomers();

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
        text: "Unable to delete customer.",
      });
    }
  };

  const editCustomer = (customer) => {
    localStorage.setItem("editCustomer", JSON.stringify(customer));
    window.location.href = "/add-customer";
  };

  const addCustomer = () => {
    localStorage.removeItem("editCustomer");
    window.location.href = "/add-customer";
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
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

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="text-primary mb-0">
          👥 Customers
        </h2>

        <button
          className="btn btn-success"
          onClick={addCustomer}
        >
          ➕ Add Customer
        </button>

      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search by Name, Email or Phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="card shadow-lg border-0">

        <div className="card-body">

          <table className="table table-hover table-striped align-middle">

            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>

                    <td>{customer.id}</td>
                    <td><strong>{customer.full_name}</strong></td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>

                    <td className="text-center">

                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => editCustomer(customer)}
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteCustomer(customer.id)}
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
                    No Customer Found
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

export default Customers;