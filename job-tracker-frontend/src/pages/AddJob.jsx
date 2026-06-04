import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleAddJob = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) {
        alert("No token found. Please login again.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "https://job-tracker-api-bupk.onrender.com/add-job",
        {
          company,
          role,
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("SUCCESS:", res.data);

      alert("Job Added");

      navigate("/dashboard");
    } catch (error) {
      console.log("ERROR RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Request failed. Check backend auth."
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "100px auto", gap: "10px" }}>
      <h1>Add Job</h1>

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <button onClick={handleAddJob}>
        Add Job
      </button>
    </div>
  );
};

export default AddJob;