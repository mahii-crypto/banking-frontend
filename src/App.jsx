import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import AddCustomer from "./pages/AddCustomer";
import AddAccount from "./pages/AddAccount";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/deposit" element={<Deposit />} />

        <Route path="/withdraw" element={<Withdraw />} />

        <Route path="/add-customer" element={<AddCustomer />} />

        <Route path="/add-account" element={<AddAccount />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;