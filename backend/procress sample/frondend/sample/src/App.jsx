import { useState } from "react";
import axios from "axios";

function App() {
  const [phoneNum, setPhoneNum] = useState("");
  const [roll, setRoll] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

const handleFetch = async (e) => {
  e.preventDefault();
  setError("");
  setData(null);

  try {
    const response = await axios.get("http://localhost:3000/report", {
      params: {
        phoneNum,
        roll,
      },
    });

  
    if (response.data.success) {
      setData(response.data.data);
    }

  } catch (err) {
    if (err.response) {
      setError(err.response.data.message);
    } else {
      setError("Server not responding");
    }
  }
};


  return (
    <>
      <h1>Ayadi Process - (Sample)</h1>

      <form onSubmit={handleFetch}>
        <label>Mobile Number</label>
        <input
          type="text"
          placeholder="Mobile Number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />

        <br /><br />

        <label>Roll Number</label>
        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <br /><br />

        <button type="submit">Generate Report</button>
      </form>

      <hr />

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {data && (
        <div>
          <h2>Student Report</h2>
          <p><strong>Name:</strong> {data["Name"]}</p>
          <p><strong>Father Name:</strong> {data["Father Name"]}</p>
          <p><strong>Mother Name:</strong> {data["Mother Name "]}</p>
          <p><strong>Phone:</strong> {data["Phone Number"]}</p>
          <p><strong>Roll:</strong> {data["roll number"]}</p>
          <p><strong>English:</strong> {data["English"]}</p>
          <p><strong>Maths:</strong> {data["Maths"]}</p>
        </div>
      )}
    </>
  );
}

export default App;
