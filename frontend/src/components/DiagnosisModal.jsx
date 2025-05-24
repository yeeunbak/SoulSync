import React from "react";

export default function DiagnosisModal({ visible, onClose, children }) {
  if (!visible) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <span style={closeButtonStyle} onClick={onClose}>✕</span>
        {children}
      </div>
    </div>
  );
}
