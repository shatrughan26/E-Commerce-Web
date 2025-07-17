import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModel";

function LoginModal() {
  const navigate = useNavigate();
  const [isLogin, setIslogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //localStorage.setItem("token", response.data.token); // added for the MyProfile component


  const handleSignUp = () => {
    if (!signupEmail || !signupPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
      email: signupEmail,
      password: signupPassword,
      type: "signup",
      time: new Date().toLocaleString(),
    };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    setMessage("Registration successful. Please log in");
    setIslogin(true);
  };

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );
    if (user) {
      setMessage(`Welcome back, ${loginEmail}!`);
      const loginEntry = {
        email: loginEmail,
        type: "login",
        time: new Date().toLocaleString(),
      };
      storedUsers.push(loginEntry);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      localStorage.setItem("token","dummy-token");
      localStorage.setItem("userName",loginEmail)

      window.dispatchEvent(new Event("storage"))

      document.querySelector('#loginModal .btn-close')?.click();
      navigate("/");

    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginModalLabel">
              Shri Shyam Enterprises
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="btn-group d-flex mb-4" role="group">
              <button
                className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setIslogin(true)}
              >
                Login
              </button>
              <button
                className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setIslogin(false)}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                <div className="text-end mb-3">
                  <button
                        type="button"
                        className="btn btn-link text-decoration-none p-0"
                        data-bs-toggle="modal"
                        data-bs-target="#forgotPasswordModal"
                        >
                        Forgot Password?
                    </button>
                </div>
                <button className="btn btn-success w-100" onClick={handleLogin}>
                  Login
                </button>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <div className="input-group mb-3">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                <button className="btn btn-primary w-100" onClick={handleSignUp}>
                  Sign Up
                </button>
              </>
            )}

            {message && (
              <div className="alert alert-info mt-3 text-center" role="alert">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;