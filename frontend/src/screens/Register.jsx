import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../config/axios";
import { UserContext } from "../context/user.context";

const FloatingBlobs = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute w-72 h-72 bg-green-500 opacity-20 rounded-full filter blur-3xl"
      animate={{ x: [0, 200, -200, 0], y: [0, -200, 200, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    />
    <motion.div
      className="absolute w-96 h-96 bg-yellow-500 opacity-20 rounded-full filter blur-3xl"
      animate={{ x: [200, -200, 0, 200], y: [-100, 100, -100, 100] }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
    />
  </div>
);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("/users/register", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative px-6">
      <FloatingBlobs />
      <motion.div
        className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md relative z-10 border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Create an Account
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={email}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={password}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-bold text-lg shadow-md transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
