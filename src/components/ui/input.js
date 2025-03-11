import React from "react";

export function Input({ value, onChange, placeholder }) {
  return <input style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "100%" }} value={value} onChange={onChange} placeholder={placeholder} />;
}
