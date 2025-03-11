import React, { useRef, useState } from "react";
import styles from "./UploadPage.module.css";

const UploadPage = ({ closeModal }) => {
  const modalRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={handleOutsideClick}>
        <div className={styles.modalContent} ref={modalRef}>
          <button className={styles.closeButton} onClick={closeModal}>
            ✕
          </button>
          <div className={styles.addImageSection}>
            <div className={styles.addImageBox}>
              <input
                type="file"
                accept="image/*"
                multiple
                className={styles.fileInput}
                onChange={handleImageChange}
              />
              <div className={styles.addIcon}>+</div>
              <p>Upload Images</p>
            </div>
            {selectedImages.length > 0 && (
              <div className={styles.imagePreviewContainer}>
                {selectedImages.map((image, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      className={styles.removeImageButton}
                      onClick={() => handleRemoveImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.workshopTypeSection}>
            <h3>Product Type</h3>
            <label>
              <input type="radio" name="workshopType" defaultChecked />
              <span className={styles.radioLabel}>Product</span>
            </label>
            <label>
              <input type="radio" name="workshopType" />
              <span className={styles.radioLabel}>Skill</span>
            </label>
          </div>
          <div className={styles.workshopInfoSection}>
            <h3>Product Info</h3>
            <div>
              <label>Name:</label>
              <input type="text" className={styles.inputField} />
            </div>
            <div>
              <label>Description:</label>
              <textarea className={styles.textareaField}></textarea>
            </div>
            <div>
              <label>Price:</label>
              <input type="number" className={styles.inputField} />
            </div>
          </div>
          <button className={styles.enlistButton}>Add Product →</button>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
