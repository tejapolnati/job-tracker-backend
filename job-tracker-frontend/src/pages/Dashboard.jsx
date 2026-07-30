import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://job-tracker-api-bupk.onrender.com/jobs",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const newStatus = prompt("Enter new status");

      await axios.put(
        `https://job-tracker-api-bupk.onrender.com/update-job/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://job-tracker-api-bupk.onrender.com/delete-job/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Job Dashboard
      </h1>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <button
    onClick={() => navigate("/add-job")}
    style={{
      padding: "10px 20px",
      cursor: "pointer",
    }}
  >
    Add Job
  </button>

  <button
    onClick={handleLogout}
    style={{
      padding: "10px 20px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{job.company}</h2>

            <p>
              <strong>Role:</strong> {job.role}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

            <button
              onClick={() => updateJob(job.id)}
              style={{
                marginRight: "10px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Update
            </button>

            <button
              onClick={() => deleteJob(job.id)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;