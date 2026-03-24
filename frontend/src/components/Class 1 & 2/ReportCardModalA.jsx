import React, { useRef, useState, useEffect } from 'react';
import './ReportCardModalA-unique.css';   // ← renamed file
import sealImg from '../../assets/school_seal.png.png';
import signatureImg from '../../assets/principal_signature.png';
import lowerTable from '../../assets/lowerTable.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';   // ← Add this import at the top


/* ─────────────────────────────────────────────────────
   SUBJECTS (7 rows)
───────────────────────────────────────────────────── */
const SUBJECTS = [
  { label: 'ENGLISH',          key: 'english',        wrap: false },
  { label: 'MALAYALAM',        key: 'malayalam',      wrap: false },
  { label: 'HINDI',            key: 'hindi',          wrap: false },
  { label: 'MATHEMATICS',      key: 'mathematics',    wrap: false },
  { label: 'EVS',              key: 'evs',            wrap: false },
  { label: 'VALUE\nEDUCATION', key: 'valueeducation', wrap: true  },
  { label: 'IT',               key: 'it',             wrap: false },
];

const safe = (v) => (v !== undefined && v !== null && v !== '') ? v : '';

/* ─────────────────────────────────────────────────────
   DOWNLOAD OVERLAY
───────────────────────────────────────────────────── */
const DownloadOverlay = ({ status }) => {
  const isSuccess = status === 'success';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.60)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      backdropFilter: 'blur(3px)',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '44px 52px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '18px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        minWidth: '260px',
        textAlign: 'center',
        animation: 'dlCardIn 0.25s ease',
      }}>
        {isSuccess ? (
          <>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
              animation: 'dlPopIn 0.3s cubic-bezier(.34,1.56,.64,1)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>
                Download Complete!
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                Report card saved successfully.
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '5px solid #e5e7eb',
              borderTop: '5px solid #6366f1',
              animation: 'dlSpin 0.75s linear infinite',
            }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
                Generating PDF...
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                Please wait a moment.
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes dlSpin   { to { transform: rotate(360deg); } }
        @keyframes dlPopIn  { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes dlCardIn { from { transform: scale(0.92) translateY(12px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────── */
const ReportCardModalA = ({ studentData, onClose }) => {
  const sd = studentData || {};
  const t1 = sd.term1 || {};
  const t2 = sd.term2 || {};
  const pageRef = useRef(null);
  const bodyRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [dlStatus, setDlStatus] = useState(null);

  useEffect(() => {
    const updateScale = () => {
      if (!bodyRef.current) return;
      const available = bodyRef.current.clientWidth - 40;
      const next = Math.min(1, available / 794);
      setScale(Math.round(next * 1000) / 1000);
    };

    updateScale();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateScale);
      if (bodyRef.current) ro.observe(bodyRef.current);
    } else {
      window.addEventListener('resize', updateScale);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', updateScale);
    };
  }, []);


const handleDownloadPDF = async () => {
  const el = pageRef.current;
  if (!el) return;

  setDlStatus('loading');

  const prevTransform = el.style.transform;
  const prevTransformOrigin = el.style.transformOrigin;

  try {
    el.style.transform = 'scale(1)';
    el.style.transformOrigin = 'top left';

    const canvas = await html2canvas(el, {
      scale: 1.8,                    // Balanced for mobile
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 5000,
      removeContainer: true,
    });

    const imgData = canvas.toDataURL('image/png', 0.95);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

    // Better way for mobile
    const pdfBlob = pdf.output('blob');
    saveAs(pdfBlob, `ReportCard_${safe(sd.name) || 'Student'}.pdf`);

    setDlStatus('success');
    setTimeout(() => setDlStatus(null), 2000);

  } catch (err) {
    console.error("PDF Error:", err);
    setDlStatus(null);
    toast.error("Failed to generate PDF on this device. Try on laptop.");
  } finally {
    el.style.transform = prevTransform;
    el.style.transformOrigin = prevTransformOrigin;
  }
};

  return (
    <>
      {dlStatus && <DownloadOverlay status={dlStatus} />}

      <div className="rca-overlay" onClick={(e) => { if (e.target.classList.contains('rca-overlay')) onClose(); }}>
        <div className="rca-container">

          <div className="rca-modal-header">
            <span className="rca-modal-title">Student Report Card</span>
            <div className="rca-modal-actions">
              <button
                className="rca-btn-pdf"
                onClick={handleDownloadPDF}
                disabled={!!dlStatus}
                style={{ opacity: dlStatus ? 0.6 : 1, cursor: dlStatus ? 'not-allowed' : 'pointer' }}
              >
                ⬇ Download PDF
              </button>
              <button className="rca-btn-close" onClick={onClose}>✕ Close</button>
            </div>
          </div>

          <div className="rca-modal-body" ref={bodyRef}>
            <div className="rca-preview-wrapper" style={{ height: `${Math.ceil(1123 * scale)}px` }}>
              <div className="rca-page" ref={pageRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>

                {/* SCHOOL HEADER */}
                <div className="rca-school-header">
                  <div className="rca-school-name">CHELAKKARA CENTRAL SCHOOL</div>
                  <div className="rca-school-affil">(Affiliated to CBSE, New Delhi. No: 930928)</div>
                  <div className="rca-school-addr">Thrissur, Kerala, India - 680610</div>
                  <div className="rca-annual-badge">ANNUAL REPORT CARD</div>
                </div>

                {/* STUDENT DETAILS */}
                <div className="rca-details">
                  <div className="rca-detail-row">
                    <span className="rca-detail-label">Name of the student :</span>
                    <span className="rca-detail-line">{safe(sd.name)}</span>
                  </div>
                  <div className="rca-detail-row">
                    <span className="rca-detail-label">Father's name :</span>
                    <span className="rca-detail-line">{safe(sd.fatherName)}</span>
                  </div>
                  <div className="rca-detail-row">
                    <span className="rca-detail-label">Mother's name :</span>
                    <span className="rca-detail-line">{safe(sd.motherName)}</span>
                  </div>
                  <div className="rca-detail-row rca-detail-multi">
                    <span className="rca-detail-label">Grade :</span>
                    <span className="rca-detail-line rca-detail-short">{safe(sd.class)}</span>
                    <span className="rca-detail-label rca-detail-mid">Roll Number :</span>
                    <span className="rca-detail-line rca-detail-short">{safe(sd.roll)}</span>
                    <span className="rca-detail-label rca-detail-mid">Section :</span>
                    <span className="rca-detail-line rca-detail-short">{safe(sd.section)}</span>
                  </div>
                  <div className="rca-detail-row rca-detail-multi">
                    <span className="rca-detail-label">Date of Birth :</span>
                    <span className="rca-detail-line rca-detail-short">{safe(sd.dob)}</span>
                    <span className="rca-detail-label rca-detail-mid">Contact Number :</span>
                    <span className="rca-detail-line rca-detail-long">{safe(sd.phone)}</span>
                  </div>
                </div>

                {/* ACADEMIC AREA */}
                <div className="rca-academic-area">

                  {/* TERM TABS */}
                  <div className="rca-term-tabs-row">
                    <div className="rca-left-block">
                      <div className="rca-tab-left-inner">
                        <div className="rca-tab-subj-space" />
                        <div className="rca-tab-scores-area">
                          <span className="rca-term-tab">TERM 1</span>
                        </div>
                        <div className="rca-tab-grade-space-l" />
                      </div>
                    </div>
                    <div className="rca-table-gap" />
                    <div className="rca-right-block">
                      <div className="rca-tab-right-inner">
                        <div className="rca-tab-scores-area-r">
                          <span className="rca-term-tab">TERM 2</span>
                        </div>
                        <div className="rca-tab-grade-space-r" />
                      </div>
                    </div>
                  </div>

                  {/* TABLES */}
                  <div className="rca-tables-row">

                    {/* TERM 1 TABLE */}
                    <div className="rca-left-block">
                      <table className="rca-table">
                        <colgroup>
                          <col className="rca-col-subj" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-gr" />
                        </colgroup>
                        <thead>
                          <tr className="rca-thead-row">
                            <th className="rca-th rca-th-subj" rowSpan="2">SUBJECT</th>
                            <th className="rca-th">PERIODIC<br />TEST<br />(5)</th>
                            <th className="rca-th">NOTE<br />BOOK<br />(5)</th>
                            <th className="rca-th">ORAL<br />EXAM<br />(10)</th>
                            <th className="rca-th">TERM 1<br />(30)</th>
                            <th className="rca-th">OUT<br />OF<br />(50)</th>
                            <th className="rca-th">OUT<br />OF<br />(100)</th>
                            <th className="rca-th rca-th-gr" rowSpan="2">GRADE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SUBJECTS.map((s) => {
                            const d = t1[s.key] || {};
                            return (
                              <tr key={s.key} className={`rca-tr${s.wrap ? ' rca-tr-tall' : ''}`}>
                                <td className="rca-td rca-td-subj">
                                  {s.wrap
                                    ? s.label.split('\n').map((ln, i) => (
                                        <span key={i}>{ln}{i === 0 ? <br /> : ''}</span>
                                      ))
                                    : s.label}
                                </td>
                                <td className="rca-td rca-td-c">{safe(d.periodicTest)}</td>
                                <td className="rca-td rca-td-c">{safe(d.noteBook)}</td>
                                <td className="rca-td rca-td-c">{safe(d.oralExam)}</td>
                                <td className="rca-td rca-td-c">{safe(d.term1)}</td>
                                <td className="rca-td rca-td-c">{safe(d.outOf50)}</td>
                                <td className="rca-td rca-td-c">{safe(d.outOf100)}</td>
                                <td className="rca-td rca-td-c">{safe(d.grade)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="rca-table-gap" />

                    {/* TERM 2 TABLE */}
                    <div className="rca-right-block">
                      <table className="rca-table">
                        <colgroup>
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-sm" />
                          <col className="rca-col-gr" />
                        </colgroup>
                        <thead>
                          <tr className="rca-thead-row">
                            <th className="rca-th">PERIODIC<br />TEST<br />(5)</th>
                            <th className="rca-th">NOTE<br />BOOK<br />(5)</th>
                            <th className="rca-th">ORAL<br />EXAM<br />(10)</th>
                            <th className="rca-th">TERM 2<br />(30)</th>
                            <th className="rca-th">OUT<br />OF<br />(50)</th>
                            <th className="rca-th">OUT<br />OF<br />(100)</th>
                            <th className="rca-th rca-th-gr">GRADE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SUBJECTS.map((s) => {
                            const d = t2[s.key] || {};
                            return (
                              <tr key={s.key} className={`rca-tr${s.wrap ? ' rca-tr-tall' : ''}`}>
                                <td className="rca-td rca-td-c">{safe(d.periodicTest)}</td>
                                <td className="rca-td rca-td-c">{safe(d.noteBook)}</td>
                                <td className="rca-td rca-td-c">{safe(d.oralExam)}</td>
                                <td className="rca-td rca-td-c">{safe(d.term2)}</td>
                                <td className="rca-td rca-td-c">{safe(d.outOf50)}</td>
                                <td className="rca-td rca-td-c">{safe(d.outOf100)}</td>
                                <td className="rca-td rca-td-c">{safe(d.grade)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                  </div>

                  {/* DISCIPLINE + REMARKS */}
                  <div className="rca-lower-row">
                    <div className="rca-left-block">
                      <table className="rca-table">
                        <colgroup>
                          <col style={{ width: '21%' }} />
                          <col />
                        </colgroup>
                        <tbody>
                          <tr className="rca-tr-lower">
                            <td className="rca-td rca-td-lower-lbl">DISCIPLINE</td>
                            <td className="rca-td">{safe(sd.discipline?.term1)}</td>
                          </tr>
                          <tr className="rca-tr-lower">
                            <td className="rca-td rca-td-lower-lbl">REMARKS</td>
                            <td className="rca-td">{safe(sd.remarks?.term1)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="rca-table-gap" />

                    <div className="rca-right-block">
                      <table className="rca-table">
                        <tbody>
                          <tr className="rca-tr-lower">
                            <td className="rca-td">{safe(sd.discipline?.term2)}</td>
                          </tr>
                          <tr className="rca-tr-lower">
                            <td className="rca-td">{safe(sd.remarks?.term2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RESULT */}
                  <div className="rca-result-outer">
                    <div className="rca-result-left-space" />
                    <span className="rca-result-badge">RESULT</span>
                    <div className="rca-result-right-block">
                      <span className="rca-result-val">{safe(sd.result)}</span>
                    </div>
                  </div>

                </div>

                {/* PRINCIPAL + SEAL */}
                <div className="rca-principal-area">
                  <img src={sealImg} alt="School Seal" className="rca-seal-img" />
                  <div className="rca-principal-block">
                    <div className="rca-principal-label">PRINCIPAL</div>
                    <img src={signatureImg} alt="Signature" className="rca-signature-img" />
                  </div>
                </div>

                {/* GRADING SCALE */}
                <div>
                  <img
                    src={lowerTable}
                    alt="Grading Scale"
                    style={{ width: '100%', marginTop: '30px', display: 'block' }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCardModalA;