import React, { useRef } from "react";
import { Upload, Download } from "lucide-react";

const FileOptions = ({ code, setCode }) => {
  const fileInputRef = useRef(null);

  // Handle File Import
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setCode(event.target.result); // set imported code into editor
    };

    reader.readAsText(file);
  };

  // Export File
  const handleExport = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "room-code.txt"; // default filename
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex gap-3 mx-5 my-3">

      {/* Import Button */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-700 transition"
      >
        <Upload size={18} />
        Import
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.js,.ts,.py,.cpp,.c,.java,.json"
        className="hidden"
        onChange={handleImport}
      />

      {/* Export Button */}
      <button
        onClick={handleExport}
        className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl text-white hover:bg-green-700 transition"
      >
        <Download size={18} />
        Export
      </button>
    </div>
  );
};

export default FileOptions;
