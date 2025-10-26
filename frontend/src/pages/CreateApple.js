import React, { useState } from 'react';
import './createApple.css';
import axios from 'axios';
import Papa from 'papaparse'; // CSV parser

export default function CreateApple() {
  const [step, setStep] = useState(0);
  const [uploadMethod, setUploadMethod] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState('');

  // Handle file selection with CSV validation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalidFiles = files.filter(file => !file.name.toLowerCase().endsWith('.csv'));

    if (invalidFiles.length > 0) {
      setError(`❌ Invalid file type: ${invalidFiles.map(f => f.name).join(', ')}. Only CSV files are allowed.`);
      setSelectedFiles([]);
    } else {
      setError('');
      setSelectedFiles(files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      setError('⚠️ Please select at least one CSV file to upload.');
      return;
    }

    setUploadedFiles((prev) => [...prev, ...selectedFiles]);
    setUploadComplete(true);
    setSelectedFiles([]);
    setError('');
  };

  const handleRestart = () => {
    setStep(0);
    setUploadMethod(null);
    setSelectedFiles([]);
    setUploadedFiles([]);
    setUploadComplete(false);
    setError('');
  };

  // Function to read CSV contents and send to backend
  const submitToBackend = async () => {
    try {
      let apples = [];

      // Read each uploaded CSV file
      for (const file of uploadedFiles) {
        const text = await file.text();
        const parsed = Papa.parse(text, { header: true });

        // ✅ Validation: Only include rows with both name and color
        parsed.data.forEach(row => {
          if (row.name && row.color) {
            apples.push({ name: row.name, color: row.color });
          }
        });
      }

      if (apples.length === 0) {
        alert("❌ No valid apple data found in CSV files.");
        return;
      }

      // Send valid apples to backend
      const response = await axios.post("http://localhost:5000/add-apple", { apples });
      console.log(response.data);
      alert("🎉 Resources submitted successfully to backend!");
      handleRestart(); // Reset after successful submit
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting to backend");
    }
  };

  return (
    <div className="create-apple-container">
      <h1 className="page-title">Create New Apple Resource 🍎</h1>

      {/* Timeline */}
      <div className="timeline">
        {['Start', 'Upload', 'Confirmation', 'Review'].map((label, idx) => (
          <div key={idx} className={`timeline-step ${step === idx ? 'active' : ''}`}>
            <div className="circle">{idx + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="step-content-card">
        {step === 0 && (
          <div className="step">
            <h2>Step 0: Start</h2>
            <div className="instructions-card">
              <h3>How to Use:</h3>
              <ul>
                <li>Choose <b>Single Upload</b> for one CSV file.</li>
                <li>Choose <b>Multiple Upload</b> for batch uploading CSV files.</li>
                <li>Use <b>Download Template</b> to get the sample CSV structure.</li>
              </ul>
            </div>
            <div className="upload-options">
              <button
                className="upload-btn single"
                onClick={() => {
                  setUploadMethod('single');
                  setStep(1);
                }}
              >
                Single Upload
              </button>

              <button
                className="upload-btn multiple"
                onClick={() => {
                  setUploadMethod('multiple');
                  setStep(1);
                }}
              >
                Multiple Upload
              </button>

              <button
                className="upload-btn template"
                onClick={() => alert('📄 Template downloaded successfully!')}
              >
                Download Template
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step">
            <h2>Step 1: Upload</h2>
            <div className="instructions-card">
              <h3>Instructions:</h3>
              <ul>
                <li>Only <b>.csv</b> files are accepted.</li>
                <li>Make sure each row follows the correct format: <b>name,color</b>.</li>
              </ul>
            </div>

            <input
              type="file"
              accept=".csv"
              multiple={uploadMethod === 'multiple'}
              onChange={handleFileChange}
            />

            {error && <p style={{ color: 'red', fontWeight: '500', marginTop: '10px' }}>{error}</p>}

            {selectedFiles.length > 0 && (
              <ul>
                {selectedFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}

            <div className="navigation-buttons">
              <button className="btn-secondary" onClick={() => setStep(0)}>
                Back
              </button>
              <button className="btn-primary" onClick={handleUpload}>
                Upload
              </button>
              {uploadComplete && (
                <button className="btn-primary" onClick={() => setStep(2)}>
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h2>Step 2: Confirmation</h2>
            <p>✅ Your file(s) have been uploaded successfully!</p>
            <ul>
              {uploadedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
            <div className="navigation-buttons">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h2>Step 3: Review & Submit</h2>
            <p>📦 Uploaded files:</p>
            <ul>
              {uploadedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
            <div className="navigation-buttons">
              <button className="btn-secondary" onClick={handleRestart}>
                Restart
              </button>
              <button
                className="btn-primary"
                onClick={submitToBackend} // ✅ Sends only valid rows to backend
              >
                Final Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
