import axios from 'axios';
 
 
const getStudentsA = async (req, res) => {
  try {
    const { class: studentClass, roll, phone } = req.body;

    const searchClass = String(studentClass || '').trim();
    const searchRoll  = String(roll || '').trim();
    const searchPhone = String(phone || '').trim();

    if (!searchClass || !searchRoll || !searchPhone) {
      return res.status(400).json({ 
        message: "Class, Roll Number and Phone Number are required." 
      });
    }

    const response = await axios.get(process.env.SHEET_A);
    const students = response.data;

    if (!students || students.length === 0) {
      return res.status(500).json({ message: "No data found in Google Sheet." });
    }

    // Find student using latest headers
    const student = students.find((s) => {
      const grade = String(s["4.Grade"] || s["4. Grade"] || "").trim();
      const rno   = String(s["5.Roll Number"] || s["5. Roll Number"] || "").trim();
      const ph    = String(s["8.Contact Number"] || s["8. Contact Number"] || "").trim();

      return grade === searchClass && rno === searchRoll && ph === searchPhone;
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found. Please check Class, Roll Number and Phone Number."
      });
    }

    // ====================== FINAL CORRECT FORMATTED DATA ======================
    const formattedData = {
      name:        String(student["1.Name of the student"] || "").trim(),
      fatherName:  String(student["2.Father's Name"] || "").trim(),
      motherName:  String(student["3.Mother's Name"] || "").trim(),
      class:       String(student["4.Grade"] || "").trim(),
      roll:        String(student["5.Roll Number"] || "").trim(),
      section:     String(student["6.Section (A,B,C ,D etc)"] || "").trim(),
      dob:         String(student["7.Date of Birth"] || "").trim(),
      phone:       String(student["8.Contact Number"] || "").trim(),
      result:      String(student["111.Result"] || "").trim(),

      discipline: {
        term1: String(student["107.Term 1 Discipline Grade"] || "").trim(),
        term2: String(student["108.Term 2 Discipline Grade"] || "").trim(),
      },

      remarks: {
        term1: String(student["109.Term 1 Remarks"] || "").trim(),
        term2: String(student["110.Term 2 Remarks"] || "").trim(),
      },

      term1: {
        english: {
          periodicTest: String(student["9.Term 1 English Periodic Test(5)"] || "").trim(),
          noteBook:     String(student["10.Term 1 English Notebook (5)"] || "").trim(),
          oralExam:     String(student["11.Term 1 English Oral Exam (10)"] || "").trim(),
          term1:        String(student["12.Term 1 English Term Exam (30)"] || "").trim(),
          outOf50:      String(student["13.Term 1 English Out of (50)"] || "").trim(),
          outOf100:     String(student["14.Term 1 English Out of (100)"] || "").trim(),
          grade:        String(student["15. Term 1 English Grade"] || "").trim(),
        },
        malayalam: {
          periodicTest: String(student["16.Term 1 Malayalam Periodic Test(5)"] || "").trim(),
          noteBook:     String(student["17.Term 1 Malayalam Notebook (5)"] || "").trim(),
          oralExam:     String(student["18.Term 1 Malayalam Oral Exam (10)"] || "").trim(),
          term1:        String(student["19.Term 1 Malayalam Term Exam (30)"] || "").trim(),
          outOf50:      String(student["20.Term 1 Malayalam Out of (50)"] || "").trim(),
          outOf100:     String(student["21.Term 1 Malayalam Out of (100)"] || "").trim(),
          grade:        String(student["22.Term 1 Malayalam Grade"] || "").trim(),
        },
        hindi: {
          periodicTest: String(student["23.Term 1 Hindi Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["24. Term 1 Hindi Notebook (5) "] || "").trim(),
          oralExam:     String(student["25. Term 1 Hindi Oral Exam (10) "] || "").trim(),
          term1:        String(student["26. Term 1 Hindi  Term Exam (30) "] || "").trim(),
          outOf50:      String(student["27. Term 1 Hindi Out of (50)"] || "").trim(),
          outOf100:     String(student["28.  Term 1 Hindi Out of (100)"] || "").trim(),
          grade:        String(student["29.Term 1 Hindi Grade"] || "").trim(),
        },
        mathematics: {
          periodicTest: String(student["30. Term 1 Mathematics Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["31. Term 1 Mathematics Notebook (5) "] || "").trim(),
          oralExam:     String(student["32. Term 1 Mathematics Oral Exam (10) "] || "").trim(),
          term1:        String(student["33. Term 1 Mathematics Term Exam (30) "] || "").trim(),
          outOf50:      String(student["34.Term 1 Mathematics Out of (50)"] || "").trim(),
          outOf100:     String(student["35. Term 1 Mathematics Out of (100)"] || "").trim(),
          grade:        String(student["36.Term 1 Mathematics Grade"] || "").trim(),
        },
        evs: {
          periodicTest: String(student["37. Term 1 EVS Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["38. Term 1 EVS Notebook (5) "] || "").trim(),
          oralExam:     String(student["39. Term 1 EVS Oral Exam (10) "] || "").trim(),
          term1:        String(student["40. Term 1 EVS Term Exam (30) "] || "").trim(),
          outOf50:      String(student["41. Term 1 EVS  Exam Out of (50)"] || "").trim(),
          outOf100:     String(student["42.Term 1 EVS  Exam Out of (100)"] || "").trim(),
          grade:        String(student["43.Term 1 EVS  Grade"] || "").trim(),
        },
        valueeducation: {
          periodicTest: String(student["44. Term 1 Value Education Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["45. Term 1 Value Education Notebook (5) "] || "").trim(),
          oralExam:     String(student["46. Term 1 Value Education Oral Exam (10) "] || "").trim(),
          term1:        String(student["47. Term 1 Value Education Term Exam (30) "] || "").trim(),
          outOf50:      String(student["48.Term 1 Value Education Out of (50) "] || "").trim(),
          outOf100:     String(student["49.Term 1 Value Education Out of (100)"] || "").trim(),
          grade:        String(student["50.Term 1 Value Education Grade"] || "").trim(),
        },
        it: {
          periodicTest: String(student["51. Term 1 IT Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["52. Term 1 IT Notebook (5) "] || "").trim(),
          oralExam:     String(student["53. Term 1 IT Oral Exam (10) "] || "").trim(),
          term1:        String(student["54. Term 1 IT Term Exam (30) "] || "").trim(),
          outOf50:      String(student["55. Term 1 IT Out of (50) "] || "").trim(),
          outOf100:     String(student["56. Term 1 IT Out of (100)"] || "").trim(),
          grade:        String(student["57. Term 1 IT Grade"] || "").trim(),
        },
      },

      term2: {
        english: {
          periodicTest: String(student["58. Term 2 English Periodic Test(5)"] || "").trim(),
          noteBook:     String(student["59.  Term 2 English Notebook (5)"] || "").trim(),
          oralExam:     String(student["60. Term 2 English Oral Exam (10)"] || "").trim(),
          term2:        String(student["61 Term 2 English Term Exam (30)"] || "").trim(),   // note space
          outOf50:      String(student["62. Term 2 English Out of (50)"] || "").trim(),
          outOf100:     String(student["63. Term 2 English Out of (100)"] || "").trim(),
          grade:        String(student["64. Term 2 English Grade"] || "").trim(),
        },
        malayalam: {
          periodicTest: String(student["65.Term 2 Malayalam Periodic Test(5)"] || "").trim(),
          noteBook:     String(student["66.Term 2 Malayalam Notebook (5)"] || "").trim(),
          oralExam:     String(student["67. Term 2 Malayalam Oral Exam (10)"] || "").trim(),
          term2:        String(student["68.Term 2 Malayalam Term Exam (30)"] || "").trim(),
          outOf50:      String(student["69.Term 2 Malayalam out of (50)"] || "").trim(),
          outOf100:     String(student["70.Term 2 Malayalam Out of (100)"] || "").trim(),
          grade:        String(student["71.Term 2 Malayalam Grade"] || "").trim(),
        },
        hindi: {
          periodicTest: String(student["72.Term 2 Hindi Periodic Test(5)"] || "").trim(),
          noteBook:     String(student["73.Term 2 Hindi Note book (5)"] || "").trim(),
          oralExam:     String(student["74.Term 2 Hindi Oral exam(10)"] || "").trim(),
          term2:        String(student["75.Term 2 Hindi Term Exam (30)"] || "").trim(),
          outOf50:      String(student["76.Term 2 Hindi out of (50)"] || "").trim(),
          outOf100:     String(student["77.Term 2 Hindi Out of (100)"] || "").trim(),
          grade:        String(student["78.Term 2 Hindi Grade"] || "").trim(),
        },
        mathematics: {
          periodicTest: String(student["79. Term 2 Mathematics Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["80.Term 2 Mathematics Notebook (5) "] || "").trim(),
          oralExam:     String(student["81. Term 2 Mathematics Oral Exam (10)"] || "").trim(),
          term2:        String(student["82.  Term 2 Mathematics Term Exam (30)  "] || "").trim(),
          outOf50:      String(student["83. Term 2 Mathematics Out of (50)"] || "").trim(),
          outOf100:     String(student["84.  Term 2 Mathematics Out of (100)   "] || "").trim(),
          grade:        String(student["85. Term 2 Mathematics Grade"] || "").trim(),
        },
        evs: {
          periodicTest: String(student["86. Term 2 EVS Periodic Test (5) "] || "").trim(),
          noteBook:     String(student["87. Term 2 EVS Notebook (5) "] || "").trim(),
          oralExam:     String(student["88. Term 2 EVS Oral Exam (10) "] || "").trim(),
          term2:        String(student["89.  Term 2 EVS Term Exam (30) "] || "").trim(),
          outOf50:      String(student["90.Term 2 EVS Out of (50)"] || "").trim(),
          outOf100:     String(student["91.Term 2 EVS Out of (100) "] || "").trim(),
          grade:        String(student["92. Term 2 EVS Grade "] || "").trim(),
        },
        valueeducation: {
          periodicTest: String(student["93. Term 2 Value Education Periodic Test (5)"] || "").trim(),
          noteBook:     String(student["94.  Term 2 Value Education Notebook (5)"] || "").trim(),
          oralExam:     String(student["95.Term 2 Value Education Oral Exam (10)\n"] || "").trim(),
          term2:        String(student["96. Term 2 Value Education Term Exam (30) "] || "").trim(),
          outOf50:      String(student["97. Term 2 Value Education Out of (50) "] || "").trim(),
          outOf100:     String(student["98. Term 2 Value Education Out of (100) "] || "").trim(),
          grade:        String(student["99. Term 2 Value Education Grade"] || "").trim(),
        },
        it: {
          periodicTest: String(student["100.  Term 2 IT Periodic Test (5)"] || "").trim(),
          noteBook:     String(student["101. Term 2 IT Notebook (5) "] || "").trim(),
          oralExam:     String(student["102. Term 2 IT Oral Exam (10) "] || "").trim(),
          term2:        String(student["103. Term 2 IT Term Exam (30)"] || "").trim(),
          outOf50:      String(student["104. Term 2 IT Out of (50) "] || "").trim(),
          outOf100:     String(student["105. Term 2 IT Out of (100) "] || "").trim(),
          grade:        String(student["106. Term 2 IT Grade"] || "").trim(),
        },
      },
    };

    return res.json(formattedData);

  } catch (error) {
    console.error("Error fetching student data:", error.message);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

 
 
 
// getStudentsB controller (rename function if needed)
const getStudentsB = async (req, res) => {
  try {
    const { class: studentClass, roll, phone } = req.body;

    const searchClass = String(studentClass).trim();
    const searchRoll  = String(roll).trim();
    const searchPhone = String(phone).trim();

    const response = await axios.get(process.env.SHEET_B);

    const students = response.data;

    const student = students.find(
      (s) =>
        String(s["Grade"] || "").trim() === searchClass &&
        String(s["Roll Number"] || "").trim() === searchRoll &&
        String(s["Contact Number"] || "").trim() === searchPhone
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found. Please check Roll Number and Phone." });
    }

    // ────────────────────────────────────────────────
    //   Clean & structured data — keys match your SUBJECTS array
    // ────────────────────────────────────────────────
    const formattedData = {
      name:        student["Student Name"]?.trim() || "",
      fatherName:  student["Father's Name"]?.trim() || "",
      motherName:  student["Mother's Name"]?.trim() || "",
      class:       student["Grade"]?.trim() || "",
      roll:        student["Roll Number"]?.trim() || "",
      section:     student["Section"]?.trim() || "",
      dob:         student["Date of Birth"]?.trim() || "",
      phone:       student["Contact Number"]?.trim() || "",
      result:      student["Result"]?.trim() || "",

      discipline: {
        term1: student["Discipline"]?.trim() || "",
        term2: student["Discipline"]?.trim() || "",   // same column
      },

      remarks: {
        term1: student["Remarks"]?.trim() || "",
        term2: student["Remarks"]?.trim() || "",     // same column
      },

      term1: {
        english: {
          periodicTest: student["English PT (5)"]?.trim() || "",
          noteBook:     student["English NB (5)"]?.trim() || "",
          term1:        student["English Term1 (40)"]?.trim() || "",
          outOf50:      student["English Out of 50"]?.trim() || "",
          outOf100:     student["English Out of 100"]?.trim() || "",
          grade:        student["English Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam PT (5)"]?.trim() || "",
          noteBook:     student["Malayalam NB (5)"]?.trim() || "",
          term1:        student["Malayalam Term1 (40)"]?.trim() || "",
          outOf50:      student["Malayalam Out of 50"]?.trim() || "",
          outOf100:     student["Malayalam Out of 100"]?.trim() || "",
          grade:        student["Malayalam Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi PT (5)"]?.trim() || "",
          noteBook:     student["Hindi NB (5)"]?.trim() || "",
          term1:        student["Hindi Term1 (40)"]?.trim() || "",
          outOf50:      student["Hindi Out of 50"]?.trim() || "",
          outOf100:     student["Hindi Out of 100"]?.trim() || "",
          grade:        student["Hindi Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics PT (5)"]?.trim() || "",
          noteBook:     student["Mathematics NB (5)"]?.trim() || "",
          term1:        student["Mathematics Term1 (40)"]?.trim() || "",
          outOf50:      student["Mathematics Out of 50"]?.trim() || "",
          outOf100:     student["Mathematics Out of 100"]?.trim() || "",
          grade:        student["Mathematics Grade"]?.trim() || "",
        },
        science: {   // ← changed from evs to science
          periodicTest: student["Science PT (5)"]?.trim() || "",
          noteBook:     student["Science NB (5)"]?.trim() || "",
          term1:        student["Science Term1 (40)"]?.trim() || "",
          outOf50:      student["Science Out of 50"]?.trim() || "",
          outOf100:     student["Science Out of 100"]?.trim() || "",
          grade:        student["Science Grade"]?.trim() || "",
        },
        socialscience: {
          periodicTest: student["Social Science PT (5)"]?.trim() || "",
          noteBook:     student["Social Science NB (5)"]?.trim() || "",
          term1:        student["Social Science Term1 (40)"]?.trim() || "",
          outOf50:      student["Social Science Out of 50"]?.trim() || "",
          outOf100:     student["Social Science Out of 100"]?.trim() || "",
          grade:        student["Social Science Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education PT (5)"]?.trim() || "",
          noteBook:     student["Value Education NB (5)"]?.trim() || "",
          term1:        student["Value Education Term1 (40)"]?.trim() || "",
          outOf50:      student["Value Education Out of 50"]?.trim() || "",
          outOf100:     student["Value Education Out of 100"]?.trim() || "",
          grade:        student["Value Education Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT PT (5)"]?.trim() || "",
          noteBook:     student["IT NB (5)"]?.trim() || "",
          term1:        student["IT Term1 (40)"]?.trim() || "",
          outOf50:      student["IT Out of 50"]?.trim() || "",
          outOf100:     student["IT Out of 100"]?.trim() || "",
          grade:        student["IT Grade"]?.trim() || "",
        },
      },

      term2: {
        english: {
          periodicTest: student["English PT2 (5)"]?.trim() || "",
          noteBook:     student["English NB2 (5)"]?.trim() || "",
          term2:        student["English Term2 (40)"]?.trim() || "",
          outOf50:      student["English Out of 50"]?.trim() || "",   // same column reused?
          outOf100:     student["English Out of 100"]?.trim() || "",
          grade:        student["English Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam PT2 (5)"]?.trim() || "",
          noteBook:     student["Malayalam NB2 (5)"]?.trim() || "",
          term2:        student["Malayalam Term2 (40)"]?.trim() || "",
          outOf50:      student["Malayalam Out of 50"]?.trim() || "",
          outOf100:     student["Malayalam Out of 100"]?.trim() || "",
          grade:        student["Malayalam Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi PT2 (5)"]?.trim() || "",
          noteBook:     student["Hindi NB2 (5)"]?.trim() || "",
          term2:        student["Hindi Term2 (40)"]?.trim() || "",
          outOf50:      student["Hindi Out of 50"]?.trim() || "",
          outOf100:     student["Hindi Out of 100"]?.trim() || "",
          grade:        student["Hindi Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics PT2 (5)"]?.trim() || "",
          noteBook:     student["Mathematics NB2 (5)"]?.trim() || "",
          term2:        student["Mathematics Term2 (40)"]?.trim() || "",
          outOf50:      student["Mathematics Out of 50"]?.trim() || "",
          outOf100:     student["Mathematics Out of 100"]?.trim() || "",
          grade:        student["Mathematics Grade"]?.trim() || "",
        },
        science: {
          periodicTest: student["Science PT2 (5)"]?.trim() || "",
          noteBook:     student["Science NB2 (5)"]?.trim() || "",
          term2:        student["Science Term2 (40)"]?.trim() || "",
          outOf50:      student["Science Out of 50"]?.trim() || "",
          outOf100:     student["Science Out of 100"]?.trim() || "",
          grade:        student["Science Grade"]?.trim() || "",
        },
        socialscience: {
          periodicTest: student["Social Science PT2 (5)"]?.trim() || "",
          noteBook:     student["Social Science NB2 (5)"]?.trim() || "",
          term2:        student["Social Science Term2 (40)"]?.trim() || "",
          outOf50:      student["Social Science Out of 50"]?.trim() || "",
          outOf100:     student["Social Science Out of 100"]?.trim() || "",
          grade:        student["Social Science Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education PT2 (5)"]?.trim() || "",
          noteBook:     student["Value Education NB2 (5)"]?.trim() || "",
          term2:        student["Value Education Term2 (40)"]?.trim() || "",
          outOf50:      student["Value Education Out of 50"]?.trim() || "",
          outOf100:     student["Value Education Out of 100"]?.trim() || "",
          grade:        student["Value Education Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT PT2 (5)"]?.trim() || "",
          noteBook:     student["IT NB2 (5)"]?.trim() || "",
          term2:        student["IT Term2 (40)"]?.trim() || "",
          outOf50:      student["IT Out of 50"]?.trim() || "",
          outOf100:     student["IT Out of 100"]?.trim() || "",
          grade:        student["IT Grade"]?.trim() || "",
        },
      },
    };

    return res.json(formattedData);

  } catch (error) {
    console.error("Error fetching student data:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


const getStudentsC = async (req, res) => {
  try {
    const { class: studentClass, roll, phone } = req.body;

    const searchClass = String(studentClass).trim();
    const searchRoll  = String(roll || '').trim();
    const searchPhone = String(phone || '').trim();

    // Note: You are using the WRONG sheet ID here!
    // Previous classes used different sheets. For 6-8 it's a new one:
   const response = await axios.get(process.env.SHEET_C);

    const students = response.data;

    const student = students.find(
      (s) =>
        String(s["Grade"] || "").trim() === searchClass &&
        String(s["Roll Number"] || "").trim() === searchRoll &&
        String(s["Contact Number"] || "").trim() === searchPhone
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found. Please check Roll Number and Phone Number." });
    }

    const formattedData = {
      name:        student["Student Name"]?.trim() || "",
      fatherName:  student["Father's Name"]?.trim() || "",
      motherName:  student["Mother's Name"]?.trim() || "",
      class:       student["Grade"]?.trim() || "",
      roll:        student["Roll Number"]?.trim() || "",
      section:     student["Section"]?.trim() || "",
      dob:         student["Date of Birth"]?.trim() || "",
      phone:       student["Contact Number"]?.trim() || "",
      result:      student["Result"]?.trim() || "",

      discipline: {
        term1: student["Discipline"]?.trim() || "",
        term2: student["Discipline"]?.trim() || "", // same column
      },

      remarks: {
        term1: student["Remarks"]?.trim() || "",
        term2: student["Remarks"]?.trim() || "",
      },

      term1: {
        english: {
          periodicTest: student["English T1 PT (10)"]?.trim() || "",
          noteBook:     student["English T1 NB (5)"]?.trim() || "",
          subEnrichment: student["English T1 SE (5)"]?.trim() || "",
          termExam:     student["English T1 Exam (80)"]?.trim() || "",
          outOf100:     student["English T1 Out of 100"]?.trim() || "",
          grade:        student["English T1 Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam T1 PT (10)"]?.trim() || "",
          noteBook:     student["Malayalam T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Malayalam T1 SE (5)"]?.trim() || "",
          termExam:     student["Malayalam T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Malayalam T1 Out of 100"]?.trim() || "",
          grade:        student["Malayalam T1 Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi T1 PT (10)"]?.trim() || "",
          noteBook:     student["Hindi T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Hindi T1 SE (5)"]?.trim() || "",
          termExam:     student["Hindi T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Hindi T1 Out of 100"]?.trim() || "",
          grade:        student["Hindi T1 Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics T1 PT (10)"]?.trim() || "",
          noteBook:     student["Mathematics T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Mathematics T1 SE (5)"]?.trim() || "",
          termExam:     student["Mathematics T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Mathematics T1 Out of 100"]?.trim() || "",
          grade:        student["Mathematics T1 Grade"]?.trim() || "",
        },
        science: {
          periodicTest: student["Science T1 PT (10)"]?.trim() || "",
          noteBook:     student["Science T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Science T1 SE (5)"]?.trim() || "",
          termExam:     student["Science T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Science T1 Out of 100"]?.trim() || "",
          grade:        student["Science T1 Grade"]?.trim() || "",
        },
        socialscience: {
          periodicTest: student["Social Science T1 PT (10)"]?.trim() || "",
          noteBook:     student["Social Science T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Social Science T1 SE (5)"]?.trim() || "",
          termExam:     student["Social Science T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Social Science T1 Out of 100"]?.trim() || "",
          grade:        student["Social Science T1 Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education T1 PT (10)"]?.trim() || "",
          noteBook:     student["Value Education T1 NB (5)"]?.trim() || "",
          subEnrichment: student["Value Education T1 SE (5)"]?.trim() || "",
          termExam:     student["Value Education T1 Exam (80)"]?.trim() || "",
          outOf100:     student["Value Education T1 Out of 100"]?.trim() || "",
          grade:        student["Value Education T1 Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT T1 PT (10)"]?.trim() || "",
          noteBook:     student["IT T1 NB (5)"]?.trim() || "",
          subEnrichment: student["IT T1 SE (5)"]?.trim() || "",
          termExam:     student["IT T1 Exam (80)"]?.trim() || "",
          outOf100:     student["IT T1 Out of 100"]?.trim() || "",
          grade:        student["IT T1 Grade"]?.trim() || "",
        },
      },

      term2: {
        english: {
          periodicTest: student["English T2 PT (10)"]?.trim() || "",
          noteBook:     student["English T2 NB (5)"]?.trim() || "",
          subEnrichment: student["English T2 SE (5)"]?.trim() || "",
          termExam:     student["English T2 Exam (80)"]?.trim() || "",
          outOf100:     student["English T2 Out of 100"]?.trim() || "",
          grade:        student["English T2 Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam T2 PT (10)"]?.trim() || "",
          noteBook:     student["Malayalam T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Malayalam T2 SE (5)"]?.trim() || "",
          termExam:     student["Malayalam T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Malayalam T2 Out of 100"]?.trim() || "",
          grade:        student["Malayalam T2 Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi T2 PT (10)"]?.trim() || "",
          noteBook:     student["Hindi T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Hindi T2 SE (5)"]?.trim() || "",
          termExam:     student["Hindi T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Hindi T2 Out of 100"]?.trim() || "",
          grade:        student["Hindi T2 Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics T2 PT (10)"]?.trim() || "",
          noteBook:     student["Mathematics T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Mathematics T2 SE (5)"]?.trim() || "",
          termExam:     student["Mathematics T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Mathematics T2 Out of 100"]?.trim() || "",
          grade:        student["Mathematics T2 Grade"]?.trim() || "",
        },
        science: {
          periodicTest: student["Science T2 PT (10)"]?.trim() || "",
          noteBook:     student["Science T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Science T2 SE (5)"]?.trim() || "",
          termExam:     student["Science T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Science T2 Out of 100"]?.trim() || "",
          grade:        student["Science T2 Grade"]?.trim() || "",
        },
        socialscience: {
          periodicTest: student["Social Science T2 PT (10)"]?.trim() || "",
          noteBook:     student["Social Science T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Social Science T2 SE (5)"]?.trim() || "",
          termExam:     student["Social Science T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Social Science T2 Out of 100"]?.trim() || "",
          grade:        student["Social Science T2 Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education T2 PT (10)"]?.trim() || "",
          noteBook:     student["Value Education T2 NB (5)"]?.trim() || "",
          subEnrichment: student["Value Education T2 SE (5)"]?.trim() || "",
          termExam:     student["Value Education T2 Exam (80)"]?.trim() || "",
          outOf100:     student["Value Education T2 Out of 100"]?.trim() || "",
          grade:        student["Value Education T2 Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT T2 PT (10)"]?.trim() || "",
          noteBook:     student["IT T2 NB (5)"]?.trim() || "",
          subEnrichment: student["IT T2 SE (5)"]?.trim() || "",
          termExam:     student["IT T2 Exam (80)"]?.trim() || "",
          outOf100:     student["IT T2 Out of 100"]?.trim() || "",
          grade:        student["IT T2 Grade"]?.trim() || "",
        },
      },
    };

    return res.json(formattedData);

  } catch (error) {
    console.error("Error in getStudentsC:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
export { getStudentsA , getStudentsB , getStudentsC};