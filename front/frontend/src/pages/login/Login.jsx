import React, { useContext, useState } from "react";
import "./Login.css"; // Your provided CSS file
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/Context";

function LoginRegister() {
  const { url, getProfileData } = useContext(AppContext);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleToggle = () => {
    setIsRegister((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const endpoint = `${url}/user/${isRegister ? "register" : "login"}`;
      const res = await axios.post(endpoint, formData, { withCredentials: true });

      if (res.data.success) {
        toast.success(isRegister ? "Account created successfully" : "Login successful");
        if (!isRegister) {
          getProfileData();
        }
      } else {
        toast.error(res.data.message || "An error occurred");
      }
    } catch {
      toast.error("An error occurred while submitting the form");
    }
  }

  return (
    <div className={`sex ${isRegister ? "active" : ""}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required={isRegister}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div className="role-selector">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleInputChange}
              />
              USER
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={formData.role === "doctor"}
                onChange={handleInputChange}
              />
              DOCTOR
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 style={{color:"white"}}>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal details</p>
            <button className="hidden" onClick={handleToggle}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 style={{color:"white"}}>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="hidden" onClick={handleToggle}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
