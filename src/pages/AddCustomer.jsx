import { useEffect, useState } from "react";
import API from "../services/api";
import Swal from "sweetalert2";

function AddCustomer() {

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {

    const customer = localStorage.getItem("editCustomer");

    if (customer) {

      const data = JSON.parse(customer);

      setEditingId(data.id);

      setForm({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

    } else {

      setEditingId(null);

      setForm({
        full_name: "",
        email: "",
        phone: "",
        address: "",
      });

    }

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await API.put(`customers/${editingId}/`, form);

        Swal.fire({
          icon: "success",
          title: "Customer Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {

        await API.post("customers/", form);

        Swal.fire({
          icon: "success",
          title: "Customer Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

      }

      localStorage.removeItem("editCustomer");

      setForm({
        full_name: "",
        email: "",
        phone: "",
        address: "",
      });

      setTimeout(() => {
        window.location.href = "/customers";
      }, 1500);

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Please try again.",
      });

    }

  };

  return (

    <div className="container mt-5" style={{ maxWidth: "600px" }}>

      <div className="card shadow-lg border-0">

        <div className="card-body p-4">

          <h2 className="text-center text-primary mb-4">

            {editingId ? "✏ Edit Customer" : "➕ Add Customer"}

          </h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-4"
              rows="3"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`btn w-100 ${
                editingId ? "btn-warning" : "btn-primary"
              }`}
            >
              {editingId ? "Update Customer" : "Add Customer"}
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddCustomer;