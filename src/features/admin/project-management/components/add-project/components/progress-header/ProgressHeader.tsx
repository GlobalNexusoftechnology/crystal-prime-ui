import React from "react";
import "./ProgressHeader.css";

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Milestone Setup" },
  { id: 3, title: "Upload Document" },
  { id: 4, title: "Preview" },
];

export function ProgressHeader({ step }: { step: number }) {
  return (
    <ul className="progress">
      {steps.map((item, idx) => {
        const isActive = step === item.id;
        const isBefore = step > item.id;
        return (
          <li
            key={item.id}
            className={
              isActive
                ? "active"
                : isBefore
                ? "before"
                : ""
            }
            style={{
              borderTopLeftRadius: idx === 0 ? "10px" : undefined,
              borderBottomLeftRadius: idx === 0 ? "10px" : undefined,
              borderTopRightRadius: idx === steps.length - 1 ? "10px" : undefined,
              borderBottomRightRadius: idx === steps.length - 1 ? "10px" : undefined,
            }}
          >
            <span className={`circle${isActive ? " active" : ""}${isBefore ? " before" : ""}`}>
              {String(item.id).padStart(2, "0")}
            </span>
            <span className="label">{item.title}</span>
            {idx !== steps.length - 1 && (
              <span className={`chevron${isActive ? " active" : ""}`} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

