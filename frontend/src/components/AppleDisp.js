import React, { useState } from 'react';
import { Download, Upload, X, Save, Edit2 } from 'lucide-react';
import './AppleDisp.css';

const AppleDisp = ({ appleData, onClose, isEditing: initialIsEditing = false, isAdmin = false, onSave }) => {
  const [apple, setApple] = useState(appleData || {});
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619546952812-070d0a45ae0e?w=400&h=400&fit=crop'
  ]);
  const [isEditing, setIsEditing] = useState(initialIsEditing);

  // Handle field change
  const handleFieldChange = (field, value) => {
    setApple(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(apple);
    }
    setIsEditing(false);
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(231, 111, 81);
    doc.text(`Apple Variety: ${apple.cultivar_name || apple.name}`, 20, yPosition);
    yPosition += 15;
    
    // Add a line
    doc.setDrawColor(231, 111, 81);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    // Helper function to add section
    const addSection = (title, data) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(44, 62, 80);
      doc.text(title, 20, yPosition);
      yPosition += lineHeight;
      
      doc.setFontSize(10);
      doc.setTextColor(85, 85, 85);
      
      Object.entries(data).forEach(([key, value]) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        const formattedKey = key.replace(/_/g, ' ').toUpperCase();
        doc.text(`${formattedKey}: ${value || 'N/A'}`, 25, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += 5;
    };
    
    // Add sections
    addSection('IDENTITY & INVENTORY', {
      'Accession Number': apple.acno,
      'Accession': apple.accession,
      'Cultivar Name': apple.cultivar_name
    });
    
    addSection('GEOGRAPHY & ORIGIN', {
      'Country': apple.e_origin_country,
      'Province/State': apple.e_origin_province,
      'City': apple.e_origin_city
    });
    
    addSection('BIOLOGY & TAXONOMY', {
      'Genus': apple.e_genus,
      'Species': apple.e_species,
      'Pedigree': apple.e_pedigree
    });
    
    addSection('ADDITIONAL INFORMATION', {
      'Description': apple.description,
      'Taste': apple.taste,
      'Texture': apple.texture,
      'Uses': apple.uses,
      'Harvest Season': apple.harvestSeason,
      'Hardiness': apple.hardiness,
      'Storage': apple.storage
    });
    
    // Save the PDF
    doc.save(`${apple.cultivar_name || apple.name}_Details_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Organize data by sections
  const sections = [
    {
      title: 'Identity & Inventory',
      fields: [
        { label: 'Accession Number', key: 'acno' },
        { label: 'Accession', key: 'accession' },
        { label: 'Cultivar Name', key: 'cultivar_name' }
      ]
    },
    {
      title: 'Geography & Origin',
      fields: [
        { label: 'Country', key: 'e_origin_country' },
        { label: 'Province/State', key: 'e_origin_province' },
        { label: 'City', key: 'e_origin_city' }
      ]
    },
    {
      title: 'Biology & Taxonomy',
      fields: [
        { label: 'Genus', key: 'e_genus' },
        { label: 'Species', key: 'e_species' },
        { label: 'Pedigree', key: 'e_pedigree' }
      ]
    },
    {
      title: 'People & Custodians',
      fields: [
        { label: 'Breeder', key: 'e_breeder' },
        { label: 'Collector', key: 'e_collector' }
      ]
    },
    {
      title: 'Additional Information',
      fields: [
        { label: 'Description', key: 'description', multiline: true },
        { label: 'Taste', key: 'taste' },
        { label: 'Texture', key: 'texture' },
        { label: 'Uses', key: 'uses' },
        { label: 'Harvest Season', key: 'harvestSeason' },
        { label: 'Hardiness Zone', key: 'hardiness' },
        { label: 'Storage Period', key: 'storage' }
      ]
    }
  ];

  return (
    <div className="apple-disp-overlay">
      <div className="apple-disp-container">
        <div className="apple-disp-header">
          <h1>🍎 {apple.cultivar_name || apple.name}</h1>
          <div className="header-actions">
            {isAdmin && !isEditing && (
              <button className="edit-mode-btn" onClick={() => setIsEditing(true)}>
                <Edit2 size={20} />
                Edit Mode
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="apple-disp-content">
          {/* Left side - Details */}
          <div className="details-section">
            {sections.map((section, idx) => (
              <div key={idx} className="detail-section">
                <h2 className="section-title">{section.title}</h2>
                <table className="details-table">
                  <tbody>
                    {section.fields.map(field => (
                      <tr key={field.key}>
                        <td className="field-name">{field.label}</td>
                        <td className="field-value">
                          {isEditing ? (
                            field.multiline ? (
                              <textarea
                                value={apple[field.key] || ''}
                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                rows={3}
                                className="edit-textarea"
                              />
                            ) : (
                              <input
                                type="text"
                                value={apple[field.key] || ''}
                                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                className="edit-input"
                              />
                            )
                          ) : (
                            apple[field.key] || 'N/A'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Right side - Images */}
          <div className="images-section">
            <h2 className="section-title">Images</h2>
            
            {isEditing && (
              <div className="image-upload">
                <label htmlFor="image-upload" className="upload-btn">
                  <Upload size={18} />
                  Upload Images
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            )}

            <div className="images-grid">
              {images.map((img, idx) => (
                <div key={idx} className="image-card">
                  <img src={img} alt={`Apple ${idx + 1}`} />
                  {isEditing && (
                    <button 
                      className="remove-img-btn"
                      onClick={() => removeImage(idx)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="no-images">
                <p>No images uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="apple-disp-footer">
          {isEditing ? (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                <Save size={20} />
                Save Changes
              </button>
            </div>
          ) : (
            <button className="download-pdf-btn" onClick={handleDownloadPDF}>
              <Download size={20} />
              Download as PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppleDisp;