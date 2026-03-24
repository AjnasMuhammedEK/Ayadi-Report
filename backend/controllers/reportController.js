import axios from 'axios';
 

const getStudentsA = async (req, res) => {
  try {
    const { class: studentClass, roll, phone } = req.body;

    // Normalize inputs
    const searchClass = String(studentClass || '').trim();
    const searchRoll  = String(roll || '').trim();
    const searchPhone = String(phone || '').trim();

    if (!searchClass || !searchRoll || !searchPhone) {
      return res.status(400).json({ message: "Class, Roll Number and Phone Number are required." });
    }

    // Fetch data from Google Sheet (public link via opensheet)
    const response = await axios.get(process.env.SHEET_A);

    const students = response.data;

    // Find matching student - case insensitive + trim
    const student = students.find((s) => {
      return (
        String(s["Grade"] || "").trim() === searchClass &&
        String(s["Roll Number"] || "").trim() === searchRoll &&
        String(s["Contact Number"] || "").trim() === searchPhone
      );
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found. Please check Class, Roll Number and Phone Number."
      });
    }

    // ───────────────────────────────────────────────────────────────
    // Build clean, structured response object using REAL column names
    // ───────────────────────────────────────────────────────────────
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
        term2: student["Discipline"]?.trim() || "",   // same column for both terms
      },

      remarks: {
        term1: student["Remarks"]?.trim() || "",
        term2: student["Remarks"]?.trim() || "",     // same column
      },

      term1: {
        english: {
          periodicTest: student["English T1 PT (5)"]?.trim() || "",
          noteBook:     student["English T1 NB (5)"]?.trim() || "",
          oralExam:     student["English T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["English T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["English T1 Out of 50"]?.trim() || "",
          outOf100:     student["English T1 Out of 100"]?.trim() || "",
          grade:        student["English T1 Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam T1 PT (5)"]?.trim() || "",
          noteBook:     student["Malayalam T1 NB (5)"]?.trim() || "",
          oralExam:     student["Malayalam T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["Malayalam T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Malayalam T1 Out of 50"]?.trim() || "",
          outOf100:     student["Malayalam T1 Out of 100"]?.trim() || "",
          grade:        student["Malayalam T1 Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi T1 PT (5)"]?.trim() || "",
          noteBook:     student["Hindi T1 NB (5)"]?.trim() || "",
          oralExam:     student["Hindi T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["Hindi T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Hindi T1 Out of 50"]?.trim() || "",
          outOf100:     student["Hindi T1 Out of 100"]?.trim() || "",
          grade:        student["Hindi T1 Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics T1 PT (5)"]?.trim() || "",
          noteBook:     student["Mathematics T1 NB (5)"]?.trim() || "",
          oralExam:     student["Mathematics T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["Mathematics T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Mathematics T1 Out of 50"]?.trim() || "",
          outOf100:     student["Mathematics T1 Out of 100"]?.trim() || "",
          grade:        student["Mathematics T1 Grade"]?.trim() || "",
        },
        evs: {
          periodicTest: student["EVS T1 PT (5)"]?.trim() || "",
          noteBook:     student["EVS T1 NB (5)"]?.trim() || "",
          oralExam:     student["EVS T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["EVS T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["EVS T1 Out of 50"]?.trim() || "",
          outOf100:     student["EVS T1 Out of 100"]?.trim() || "",
          grade:        student["EVS T1 Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education T1 PT (5)"]?.trim() || "",
          noteBook:     student["Value Education T1 NB (5)"]?.trim() || "",
          oralExam:     student["Value Education T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["Value Education T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Value Education T1 Out of 50"]?.trim() || "",
          outOf100:     student["Value Education T1 Out of 100"]?.trim() || "",
          grade:        student["Value Education T1 Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT T1 PT (5)"]?.trim() || "",
          noteBook:     student["IT T1 NB (5)"]?.trim() || "",
          oralExam:     student["IT T1 Oral Exam (10)"]?.trim() || "",
          term1:        student["IT T1 Term Exam (30)"]?.trim() || "",
          outOf50:      student["IT T1 Out of 50"]?.trim() || "",
          outOf100:     student["IT T1 Out of 100"]?.trim() || "",
          grade:        student["IT T1 Grade"]?.trim() || "",
        },
      },

      term2: {
        english: {
          periodicTest: student["English T2 PT (5)"]?.trim() || "",
          noteBook:     student["English T2 NB (5)"]?.trim() || "",
          oralExam:     student["English T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["English T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["English T2 Out of 50"]?.trim() || "",
          outOf100:     student["English T2 Out of 100"]?.trim() || "",
          grade:        student["English T2 Grade"]?.trim() || "",
        },
        malayalam: {
          periodicTest: student["Malayalam T2 PT (5)"]?.trim() || "",
          noteBook:     student["Malayalam T2 NB (5)"]?.trim() || "",
          oralExam:     student["Malayalam T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["Malayalam T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Malayalam T2 Out of 50"]?.trim() || "",
          outOf100:     student["Malayalam T2 Out of 100"]?.trim() || "",
          grade:        student["Malayalam T2 Grade"]?.trim() || "",
        },
        hindi: {
          periodicTest: student["Hindi T2 PT (5)"]?.trim() || "",
          noteBook:     student["Hindi T2 NB (5)"]?.trim() || "",
          oralExam:     student["Hindi T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["Hindi T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Hindi T2 Out of 50"]?.trim() || "",
          outOf100:     student["Hindi T2 Out of 100"]?.trim() || "",
          grade:        student["Hindi T2 Grade"]?.trim() || "",
        },
        mathematics: {
          periodicTest: student["Mathematics T2 PT (5)"]?.trim() || "",
          noteBook:     student["Mathematics T2 NB (5)"]?.trim() || "",
          oralExam:     student["Mathematics T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["Mathematics T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Mathematics T2 Out of 50"]?.trim() || "",
          outOf100:     student["Mathematics T2 Out of 100"]?.trim() || "",
          grade:        student["Mathematics T2 Grade"]?.trim() || "",
        },
        evs: {
          periodicTest: student["EVS T2 PT (5)"]?.trim() || "",
          noteBook:     student["EVS T2 NB (5)"]?.trim() || "",
          oralExam:     student["EVS T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["EVS T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["EVS T2 Out of 50"]?.trim() || "",
          outOf100:     student["EVS T2 Out of 100"]?.trim() || "",
          grade:        student["EVS T2 Grade"]?.trim() || "",
        },
        valueeducation: {
          periodicTest: student["Value Education T2 PT (5)"]?.trim() || "",
          noteBook:     student["Value Education T2 NB (5)"]?.trim() || "",
          oralExam:     student["Value Education T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["Value Education T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["Value Education T2 Out of 50"]?.trim() || "",
          outOf100:     student["Value Education T2 Out of 100"]?.trim() || "",
          grade:        student["Value Education T2 Grade"]?.trim() || "",
        },
        it: {
          periodicTest: student["IT T2 PT (5)"]?.trim() || "",
          noteBook:     student["IT T2 NB (5)"]?.trim() || "",
          oralExam:     student["IT T2 Oral Exam (10)"]?.trim() || "",
          term2:        student["IT T2 Term Exam (30)"]?.trim() || "",
          outOf50:      student["IT T2 Out of 50"]?.trim() || "",
          outOf100:     student["IT T2 Out of 100"]?.trim() || "",
          grade:        student["IT T2 Grade"]?.trim() || "",
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