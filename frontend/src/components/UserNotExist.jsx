
import React from "react";
import { XCircle } from "lucide-react";

const UserNotExist = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 animate-fadeIn">
      
      {/* Modal */}
      <div className="bg-white p-8 rounded-lg w-[90%] max-w-sm text-center shadow-xl transform transition-all animate-slideUp">
        
        <div className="mb-5">
          <XCircle size={64} className="text-red-500 mx-auto animate-scaleIn" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          User Not Found
        </h2>

        <p className="text-gray-600 mb-6 text-base leading-relaxed">
          Please check your email or create a new account.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200 text-white font-semibold shadow-md hover:shadow-lg"
        >
          Close
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserNotExist;