import { useState } from "react";
import axios from "axios";

const AddJob = () => {

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleAddJob = async () => {

    try {

      const token = localStorage.getItem("token");
            console.log(token);

      const res = await axios.post(
        "https://job-tracker-api-bupk.onrender.com/add-job",
        {
          company,
          role,
          status
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Job Added");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Add Job</h1>

      <input
        type="text"
        placeholder="Company"
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Status"
        onChange={(e) => setStatus(e.target.value)}
      />

      <button onClick={handleAddJob}>
        Add Job
      </button>

    </div>
  );
};

export default AddJob;