"use client";
import React, { useState } from "react";

/**
 * List of notification types to be displayed in the settings panel.
 */
const notifications = [
  "New Task Assigned",
  "Project Status Update",
  "Comment/Note Added on Task",
  "Follow-up Reminder",
  "Milestone Achieved Notification",
  "Staff Project Alert",
  "Staff Follow Up Progress",
  "Staff Lead Progress",
];

/**
 * Settings component for managing individual notification preferences.
 * Provides toggle buttons for "Email" and "In App" (assumed to be SMS or internal alerts).
 */
export function Settings() {
  /**
   * State array to manage the toggle status of "Email" notifications per item.
   * Initially set to `false` (disabled) for all.
   */
  const [emailStates, setEmailStates] = useState(
    Array(notifications.length).fill(false)
  );

  /**
   * State array to manage the toggle status of "In App" (SMS/internal) notifications per item.
   * Initially set to `true` (enabled) for all.
   */
  const [smsStates, setSmsStates] = useState(
    Array(notifications.length).fill(true)
  );

  /**
   * Toggle the "Email" notification state for a specific index.
   * @param index - The index of the notification item to update.
   */
  const toggleEmail = (index: number) => {
    setEmailStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  /**
   * Toggle the "In App" (SMS/internal) notification state for a specific index.
   * @param index - The index of the notification item to update.
   */
  const toggleSMS = (index: number) => {
    setSmsStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="bg-white rounded-lg pb-2 2xl:pb-3">
      <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium ml-5 py-5">
        Setting
      </h1>
      <div className="p-6 sm:w-[42rem] 2xl:w-[42vw] bg-[#F8F8F8] rounded-xl shadow-md space-y-4 border-[#D7D7D7] m-5">
        {notifications.map((name, idx) => (
          <div key={idx} className="flex justify-between items-center pb-3 2xl:pb-8">
            <div className="text-[0.7rem] sm:text-[1rem] 2xl:text-[1vw] font-medium text-gray-800 w-1/2">
              {name}
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-1">
                {/* SMS/In App Toggle */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSMS(idx)}
                    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 ${
                      smsStates[idx]
                        ? "bg-purple-600"
                        : "bg-gray-300 border-2 border-purple-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        smsStates[idx] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="flex items-start gap-2 text-[0.7rem] sm:text-[1rem] 2xl:text-[1vw]">
                    Email
                  </div>
                </div>

                {/* Email Toggle */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleEmail(idx)}
                    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 ${
                      emailStates[idx]
                        ? "bg-purple-600"
                        : "bg-gray-300 border-2 border-purple-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        emailStates[idx] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="flex items-start gap-2 text-[0.7rem] sm:text-[1rem] 2xl:text-[1vw]">
                    In App
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
