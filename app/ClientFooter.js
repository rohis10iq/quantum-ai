"use client"; // This directive makes the component a Client Component

import React, { useState } from "react";

export default function ClientFooter() {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    window.location.href = `mailto:leorohi10@gmail.com?subject=Feedback&body=${encodeURIComponent(
      feedback
    )}`;
  };

  return (
    <footer className="py-4 bg-gray-800 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Quantum AI. All rights reserved.</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Your feedback"
            className="p-2 rounded-md bg-gray-700 text-white"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            onClick={handleFeedbackSubmit}
            className="ml-2 p-2 rounded-md bg-pink-600 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </footer>
  );
}
