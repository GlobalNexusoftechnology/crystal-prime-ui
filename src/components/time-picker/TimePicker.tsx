"use client";

import React, { useState, useEffect, useRef } from "react";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = "00:00",
  onChange,
}) => {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [showHourList, setShowHourList] = useState(false);
  const [showMinuteList, setShowMinuteList] = useState(false);
  const [openUpward, setOpenUpward] = useState(false); // For upward opening

  const hourBtnRef = useRef<HTMLButtonElement | null>(null);
  const minuteBtnRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 🕐 sync initial value
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHour(h.padStart(2, "0"));
      setMinute(m.padStart(2, "0"));
    }
  }, [value]);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  // 🧭 check dropdown position dynamically
  const checkDropdownPosition = (btnRef: HTMLButtonElement | null) => {
    if (!btnRef) return;
    const rect = btnRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const dropdownHeight = 200;
    setOpenUpward(spaceBelow < dropdownHeight);
  };

  const handleSelect = (type: "hour" | "minute", val: string) => {
    if (type === "hour") {
      setHour(val);
      setShowHourList(false);
      onChange(`${val}:${minute}`);
    } else {
      setMinute(val);
      setShowMinuteList(false);
      onChange(`${hour}:${val}`);
    }
  };

  // 🧹 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHourList(false);
        setShowMinuteList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-1 relative"
    >
      {/* Hour selector */}
      <div className="relative">
        <button
          ref={hourBtnRef}
          type="button"
          onClick={() => {
            checkDropdownPosition(hourBtnRef.current);
            setShowHourList((prev) => !prev);
            setShowMinuteList(false);
          }}
          className="border rounded-md px-2 py-1 text-sm w-14 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {hour}
        </button>

        {showHourList && (
          <ul
            className={`absolute z-50 bg-white border rounded-md w-14 max-h-48 overflow-y-auto shadow-md ${
              openUpward ? "bottom-full mb-1" : "mt-1"
            }`}
          >
            {hours.map((h) => (
              <li
                key={h}
                onClick={() => handleSelect("hour", h)}
                className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                  h === hour ? "bg-blue-50 font-medium" : ""
                }`}
              >
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span>:</span>

      {/* Minute selector */}
      <div className="relative">
        <button
          ref={minuteBtnRef}
          type="button"
          onClick={() => {
            checkDropdownPosition(minuteBtnRef.current);
            setShowMinuteList((prev) => !prev);
            setShowHourList(false);
          }}
          className="border rounded-md px-2 py-1 text-sm w-14 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {minute}
        </button>

        {showMinuteList && (
          <ul
            className={`absolute z-50 bg-white border rounded-md w-14 max-h-48 overflow-y-auto shadow-md ${
              openUpward ? "bottom-full mb-1" : "mt-1"
            }`}
          >
            {minutes.map((m) => (
              <li
                key={m}
                onClick={() => handleSelect("minute", m)}
                className={`px-2 py-1 text-sm cursor-pointer hover:bg-blue-100 ${
                  m === minute ? "bg-blue-50 font-medium" : ""
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
