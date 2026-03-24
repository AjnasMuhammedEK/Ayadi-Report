import React, { useState, useEffect } from 'react';
import './Home.css';
import schoolLogo from '../../assets/logo.png';
import { ToastContainer, toast } from "react-toastify";
import ReportCardModal from '../Class 1 & 2/ReportCardModalA';    
import ReportCardThreeFive from '../class 3 , 4 & 5/ReportCardModalB'
import ReportCardSixEight from '../class 6 , 7 & 8/ReportCardModalC'

const IconClass = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
)

const IconHash = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/>
    <line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
)

const IconPhone = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
)

const Home = () => {
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!triggerFetch) return;

    const fetchStudent = async () => {
      try {
        setIsLoading(true);

        const BASE_URL = "https://ayadi-report-backend.onrender.com";
        let apiUrl = "";

        if (section === "1" || section === "2") {
          apiUrl = `${BASE_URL}/getStudentsA`;
        } 
        else if (section === "3" || section === "4" || section === "5") {
          apiUrl = `${BASE_URL}/getStudentsB`;
        } 
        else {
          apiUrl = `${BASE_URL}/getStudentsC`;
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            class: section,
            roll: rollNumber,
            phone: phoneNumber,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Student not found");
          return;
        }

        setStudentData(data);
        setShowModal(true);

      } catch (error) {
        console.error(error);
        toast.error("Server error. Try again later.");
      } finally {
        setIsLoading(false);
        setTriggerFetch(false);
      }
    };

    fetchStudent();
  }, [triggerFetch, section, rollNumber, phoneNumber]);

  // ==================== UPDATED PHONE VALIDATION ====================
  const handleSubmit = () => {
    const trimmedRoll = rollNumber.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!section) return toast.error("Please select the class / section.");
    if (!trimmedRoll) return toast.error("Please enter the roll number.");
    if (!trimmedPhone) return toast.error("Please enter the phone number.");

    // Supports:
    // - Indian 10-digit numbers (e.g. 9876543210)
    // - UAE numbers with +971, 00971, or 971 (9 to 12 digits total)
    const phoneRegex = /^(\+971|00971|971)?[0-9]{9,12}$/;

    if (!phoneRegex.test(trimmedPhone.replace(/\s+/g, ''))) {   // remove spaces if any
      return toast.error("Please enter a valid Indian or UAE phone number");
    }

    // Clear old data before new fetch
    setStudentData(null);
    setShowModal(false);

    setTriggerFetch(true);
  };

  return (
    <>
      <div className="home-wrapper">
        <div className="deco deco-1" />
        <div className="deco deco-2" />

        <nav className="home-navbar">
          <img src={schoolLogo} alt="Ayadi Glocal School" />
        </nav>

        <header className="home-header">
          <div className="badge">🏫 School Certificate Management System</div>
          <h1>Access Student <span>Certificates</span></h1>
          <p>
            Please enter the student's academic details to securely
            retrieve and download the official school certificate.
          </p>
        </header>

        <div className="home-card">
          <div className="form-group">
            <label>Class / Section <span className="required">*</span></label>
            <div className="input-wrap select-wrap">
              <IconClass />
              <select
                className="form-control"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                disabled={isLoading}
              >
                <option value="" disabled>Select your class</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Roll Number <span className="required">*</span></label>
            <div className="input-wrap">
              <IconHash />
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 1"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="divider">verify with</div>

          <div className="form-group">
            <label>Phone Number <span className="required">*</span></label>
            <div className="input-wrap">
              <IconPhone />
              <input
                type="tel"
                className="form-control"
                placeholder="e.g. 9876543210 or +971501234567 "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={15}           
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            className={`btn-submit ${isLoading ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="btn-spinner"></span>
                Loading Certificate...
              </>
            ) : (
              <>🔍 View Certificate</>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loader"></div>
            <p>Fetching student certificate...</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            {(section === "1" || section === "2") && (
              <ReportCardModal
                studentData={studentData}
                onClose={() => setShowModal(false)}
              />
            )}

            {(section === "3" || section === "4" || section === "5") && (
              <ReportCardThreeFive
                studentData={studentData}
                onClose={() => setShowModal(false)}
              />
            )}

            {(section === "6" || section === "7" || section === "8") && (
              <ReportCardSixEight
                studentData={studentData}
                onClose={() => setShowModal(false)}
              />
            )}

            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
              Close
            </button>

          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Home;