// import React from 'react'
import React, { useState, useRef } from 'react';

export const Notice = () => {

  const [reason_for_leave, setReason_for_leave] = useState('')

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Basic validation (you can add more robust checks)
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
      } else {
        alert('Please select an image file.');
        event.target.value = ''; // Clear the invalid file
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input as well
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*" // Accept only image files
        style={{ display: 'none' }} // Hide the input visually
        ref={fileInputRef} // Ref for programmatic access
        onChange={handleImageChange}
      />

      <button onClick={handleUploadClick}>Choose Image</button>

      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img
            src={URL.createObjectURL(selectedImage)} // Create a URL for the image
            alt={selectedImage.name}
            style={{ maxWidth: '400px', maxHeight: '400px' }}
          />
          {/* <p>File Name: {selectedImage.name}</p> */}
          <p>File Size: {selectedImage.size} bytes</p>
          <button onClick={handleClearImage}>Clear Image</button>

        </div>

      )}
    </div>
  );
}
