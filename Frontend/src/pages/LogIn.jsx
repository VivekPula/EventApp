import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function LogIn() {
  // To get back to the page that triggered login page
  const location = useLocation();
  const { redirectPath } = location.state || {};
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        alert(data.message);

        return;
      }

      login({ data: { token: data.token, name: data.name,id:data.id } });

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-10 px-15 w-1/3 rounded-2xl shadow-2xl">
        <form action="post" onSubmit={handleLogIn} className="flex-col flex">
          <span className="flex mb-5">
            <p className="text-3xl font-bold text-(--primaryColor)">Log</p>
            &nbsp;
            <p className="text-3xl font-bold text-(--primaryColor)">In</p>
            &nbsp; &nbsp;
            <p className="text-3xl font-bold ">To</p>
            &nbsp; &nbsp;
            <p className="text-3xl font-bold ">Continue</p>
          </span>
          <label htmlFor="email">Email</label>
          <input
            className="rounded-lg mb-3 placeholder:opacity-50 focus:border-(--primaryColor)"
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="rounded-lg mb-8 placeholder:opacity-50 focus:border-(--primaryColor)"
            type="password"
            id="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="bg-(--primaryColor) mb-3 text-white p-2 rounded-lg cursor-pointer hover:opacity-80 active:opacity-90"
          >
            Log In
          </button>
          <span className="flex m-auto">
            <p>Never signed up?</p>
            <Link to={"/signup"} replace state={{ redirectPath }}>
              <p className="text-blue-500 ">&nbsp;signup</p>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
