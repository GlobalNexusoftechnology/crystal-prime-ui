"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  isValid,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // ISO string YYYY-MM-DD
  onChange: (val: string) => void;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  filterDate?: (date: Date) => boolean; // Return true if date is selectable
  error?: string;
}

export function CustomDatePicker({
  value,
  onChange,
  label,
  isRequired,
  placeholder = "Select date",
  minDate,
  maxDate,
  filterDate,
  error,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && isValid(parseISO(value))) {
      setCurrentMonth(parseISO(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    onChange(format(day, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
          type="button"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-700">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded-full"
          type="button"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-xs font-medium text-gray-500 text-center w-8"
        >
          {format(addDays(startDate, i), "EEEEE")}
        </div>
      );
    }

    return <div className="flex justify-between mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        const isSelected = value ? isSameDay(day, parseISO(value)) : false;
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        let isDisabled = false;
        if (minDate && isBefore(day, parseISO(minDate))) isDisabled = true;
        if (maxDate && isAfter(day, parseISO(maxDate))) isDisabled = true;
        if (filterDate && !filterDate(day)) isDisabled = true;

        days.push(
          <button
            key={day.toString()}
            disabled={isDisabled}
            onClick={() => !isDisabled && onDateClick(cloneDay)}
            type="button"
            className={`
              w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors
              ${!isCurrentMonth ? "text-gray-300" : ""}
              ${
                isSelected
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : isDisabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {formattedDate}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="flex justify-between mb-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full border rounded-md px-4 py-3 flex items-center justify-between cursor-pointer bg-white
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
            focus:outline-none focus:ring-1
          `}
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {value ? format(parseISO(value), "dd/MM/yyyy") : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 text-gray-500" />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 p-4 bg-white rounded-lg shadow-xl border border-gray-200 w-[18rem]">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
