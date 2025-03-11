import React from "react";

export function Button({ onClick, children }) {
  return (
    <button style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={onClick}>
      {children}
    </button>
  );
}
