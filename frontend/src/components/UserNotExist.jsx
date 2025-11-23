// import React from "react";

// const UserNotExist = () => {
//   return (
//     <div className="p-4 mt-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//       <p className="font-semibold">❌ User does not exist</p>
//       <p className="text-sm">Please check your username or create a new account.</p>
//     </div>
//   );
// };

// export default UserNotExist;


import React from "react";
import { XCircle, X } from "lucide-react";

const UserNotExist = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      
      {/* Modal Box */}
      <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-sm text-center shadow-xl animate-pop">
        
        <XCircle size={50} className="text-red-500 mx-auto mb-3" />

        <h2 className="text-xl font-semibold text-white mb-2">
          User does not exist
        </h2>
        <p className="text-gray-400 mb-4">
          Please check your email or create a new account.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 mt-2 rounded-lg bg-white hover:bg-red-700 transition text-black font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserNotExist;
