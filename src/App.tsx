import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import TransactionOverview from "./components/TransactionOverview.tsx";
import TransactionDetailsBySchool from "./components/TransactionDetailsBySchool.tsx";
import TransactionStatusCheck from "./components/TransactionStatusCheck.tsx";

const App = () => {
  return (
    <Router>
      <div className="p-6">
        {/* Navbar */}
        <NavBar />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<TransactionOverview />} />
          <Route
            path="/details-by-school"
            element={<TransactionDetailsBySchool />}
          />
          <Route path="/status-check" element={<TransactionStatusCheck />} />
        </Routes>
      </div>
    </Router>
  );
};

const NavBar = () => {
  const location = useLocation(); // To track active route

  return (
    <nav className="mb-6 flex justify-center md:justify-start space-x-6 border-b border-gray-300 pb-4">
      <Link
        className={`text-lg font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
          location.pathname === "/"
            ? "text-white bg-blue-600"
            : "text-blue-500 hover:text-blue-700"
        }`}
        to="/"
      >
        Transaction Overview
      </Link>
      <Link
        className={`text-lg font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
          location.pathname === "/details-by-school"
            ? "text-white bg-blue-600"
            : "text-blue-500 hover:text-blue-700"
        }`}
        to="/details-by-school"
      >
        Details by School
      </Link>
      <Link
        className={`text-lg font-semibold py-2 px-4 rounded-lg transition-colors duration-300 ${
          location.pathname === "/status-check"
            ? "text-white bg-blue-600"
            : "text-blue-500 hover:text-blue-700"
        }`}
        to="/status-check"
      >
        Status Check
      </Link>
    </nav>
  );
};

export default App;
