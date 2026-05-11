import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function SignUp() {
  // To get back to the page that triggered login/signup page
  const location = useLocation();
  const { redirectPath } = location.state || {};

  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        alert(data.message);
        return;
      }

      login({ data: { token: data.token, name: data.name, id: data.id } });

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log("SignUp failed", e);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img
        src="bgimg.png"
        alt=""
        className="absolute inset-0 h-screen w-screen object-cover"
      />
      <div className="p-10 px-15 z-100 w-1/3 rounded-2xl shadow-2xl">
        <span className="flex mb-5">
          <p className="text-3xl font-bold text-(--primaryColor)">Sign</p>
          &nbsp;
          <p className="text-3xl font-bold text-(--primaryColor)">Up</p>
          &nbsp; &nbsp;
          <p className="text-3xl font-bold ">To</p>
          &nbsp; &nbsp;
          <p className="text-3xl font-bold ">Continue</p>
        </span>
        <form onSubmit={handleSignUp} className="flex-col flex">
          <label htmlFor="name">Username</label>
          <input
            className="rounded-lg mb-3 placeholder:opacity-50 focus:border-(--primaryColor)"
            type="text"
            id="username"
            required
            placeholder="Enter the username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
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
            Sign Up
          </button>
          <span className="flex m-auto">
            <p>Already a user?</p>
            <Link to={"/login"} replace state={{ redirectPath }}>
              <p className="text-blue-500 ">&nbsp;login</p>
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
