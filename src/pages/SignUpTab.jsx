import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpTab.module.css";

const SignUp = () => {
  const [role, setRole] = useState("citizen");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "citizen",
    // Citizen
    address: "",
    city: "",
    ward: "",
    // Authority
    department: "",
    // Admin
    adminCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setForm({ ...form, role: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      alert("Account created successfully!");
      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "citizen",
        address: "",
        city: "",
        ward: "",
        department: "",
        adminCode: "",
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className={`max-w-md mx-auto p-6 shadow rounded ${styles.forms}`}>
        <h2 className="text-xl font-bold mb-4 text-center">
          Smart Civic Complaint – Signup
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Mobile Number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Select Role</label>
            <select
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="citizen">Citizen</option>
              <option value="authority">Authority</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Citizen Fields */}
          {role === "citizen" && (
            <>
              <Input
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
              <Input
                label="Ward / Zone"
                name="ward"
                value={form.ward}
                onChange={handleChange}
              />
            </>
          )}

          {/* Authority Fields */}
          {role === "authority" && (
            <>
              <Input
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
              />
            </>
          )}

          {/* Admin Fields */}
          {role === "admin" && (
            <>
              <Input
                label="Admin Secret Code"
                name="adminCode"
                value={form.adminCode}
                onChange={handleChange}
              />
            </>
          )}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-50 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", name, value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      required
      onChange={onChange}
      className={`form-control ${styles.inputs}`}
    />
  </div>
);

export default SignUp;
