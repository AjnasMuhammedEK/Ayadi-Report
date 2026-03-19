const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SHEET_URL =
  "https://opensheet.elk.sh/1LnZeYtf1Idiq0aFtEELpH7LxmXktkWXSAFrZLK6wO78/Sheet1";
app.get("/report", async (req, res) => {
  try {
    const { phoneNum, roll } = req.query;

    const response = await fetch(SHEET_URL);
    const data = await response.json();

    const student = data.find((item) =>
      String(item["Phone Number"]).trim() === phoneNum.trim() &&
      String(item["roll number"]).trim() === roll.trim()
    );


    if(!student){
      return res.status(404).json({message:'Student Not Found'})
    }


    return res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
