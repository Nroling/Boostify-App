import React from "react";

export function Card({ children }) {
  return <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
