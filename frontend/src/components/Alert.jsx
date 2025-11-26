import React from "react";

const Alert = ({ message, type = "success", onClose }) => {
  const color =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-blue-500";

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`${color} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white font-bold hover:opacity-80"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Alert;
