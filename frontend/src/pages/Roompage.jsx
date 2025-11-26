// import React, { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import { useAuth } from "../context/AuthContext";

// // const socket = io("http://localhost:5000");

// const RoomPage = () => {
//   const { roomId } = useParams();
//   const { user } = useAuth();
//   const [socket, setsocket] = useState(null);
//   if (!user) {
//     return <div className="text-white p-4">Loading...</div>;
//   }
//   // const user = JSON.parse(localStorage.getItem("user"));
//   const savedCode = localStorage.getItem("code") || "";

//   const [code, setCode] = useState(savedCode)
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [editorUser, setEditorUser] = useState(null); // who is editing?

//   const isEditor = editorUser?.id === user.id;
//   // N6FDJA

//   useEffect(() => {
//     socket.emit("join-room", { roomId, user });
//     const newSocket = io("http://localhost:5000", {
//       transports: ["websocket"],
//       forceNew: true,
//     });
//     setsocket(newSocket);

//     newSocket.emit("join-room", { roomId, user });

//     // socket.on("online-users", (users) => setOnlineUsers(users));

//     //   socket.on("load-existing-code", (existingCode) => {
//     //     // setCode(existingCode);
//     //     // localStorage.setItem("code", code)
//     //     const saved = localStorage.getItem(`code_${roomId}`);

//     // if (!saved || saved !== serverCode) {
//     //   setCode(serverCode);
//     //   localStorage.setItem(`code_${roomId}`, serverCode);
//     // }
//     //   });

//     // socket.on("update-code", (updatedCode) => {
//     //   setCode(updatedCode);
//     //   localStorage.setItem(`code_${roomId}`, updatedCode);
//     // });

//     // socket.on("editor-updated", (newEditor) => {
//     //   setEditorUser(newEditor);
//     // }); 
//     newSocket.on("online-users", (users) => {
//       setOnlineUsers(users);
//     });

//     newSocket.on("update-code", (updatedCode) => {
//       setCode(updatedCode);
//     });

//     return () => {
//       socket.emit("release-editor", { roomId });
//       socket.disconnect();
//     };
//   }, []);

//   const requestEditAccess = () => {
//     socket.emit("request-edit", { roomId, user });
//   };

//   const handleCodeChange = (value) => {
//     if (!isEditor) return;
//     setCode(value);
//     localStorage.setItem(`code_${roomId}`, value);
//     socket.emit("code-change", { roomId, code: value });
//   };

//   const stopEditing = () => {
//     socket.emit("release-editor", { roomId });
//   };

//   return (
//     <div className="flex h-screen">
//       {/* LEFT SIDEBAR */}
//       <div className="w-1/4 bg-gray-900 text-white p-4">
//         <h2 className="text-xl font-bold mb-4">Online Users</h2>

//         {onlineUsers.map((u) => (

//           <div key={u.id}>
//             <h3>Online Users</h3>
//             <ul>
//               {onlineUsers.map(u => (
//                 <li key={u.id}>
//                   {u.name} {editorUser?.id === u.id && "✏️ (editing)"}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}

//         {!isEditor ? (
//           <button
//             onClick={requestEditAccess}
//             className="mt-4 bg-blue-600 p-2 rounded"
//           >
//             Request Edit Access
//           </button>
//         ) : (
//           <button onClick={stopEditing} className="mt-4 bg-red-600 p-2 rounded">
//             Stop Editing
//           </button>
//         )}
//       </div>

//       {/* EDITOR */}
//       <div className="flex-1">
//         <Editor
//           height="100vh"
//           theme="vs-dark"
//           defaultLanguage="javascript"
//           value={code}
//           onChange={handleCodeChange}
//           options={{
//             readOnly: !isEditor,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default RoomPage;
// // import React, { useEffect, useState } from "react";
// // import Editor from "@monaco-editor/react";
// // import { useParams } from "react-router-dom";
// // import io from "socket.io-client";
// // import { useAuth } from "../context/AuthContext";

// // const RoomPage = () => {
// //   const { roomId } = useParams();
// //   const { user } = useAuth();

// //   const [socket, setSocket] = useState(null);
// //   const [code, setCode] = useState("");
// //   const [onlineUsers, setOnlineUsers] = useState([]);
// //   const [editorUser, setEditorUser] = useState(null);

// // // const isEditor = editorUser?.id && user?.id ? editorUser.id === user.id : false;

// // // const isEditor = editorUser?.id === user.id;

// //   const isEditor = editorUser?.id === user.id;

// //   useEffect(() => {

// //     if (!user) {
// //   return <div className="text-white p-4">Loading...</div>;
// // }
// //     // Create NEW socket for each tab
// //     const newSocket = io("http://localhost:5000", {
// //       transports: ["websocket"],
// //       forceNew: true,
// //     });

// //     setSocket(newSocket);

// //     newSocket.emit("join-room", { roomId, user });

// //     newSocket.on("online-users", (users) => setOnlineUsers(users));

// //     newSocket.on("load-existing-code", (existingCode) => {
// //       setCode(existingCode);
// //     });

// //     newSocket.on("update-code", (updatedCode) => {
// //       setCode(updatedCode);
// //     });

// //     newSocket.on("editor-updated", (newEditor) => {
// //       setEditorUser(newEditor);
// //     });

// //     return () => {
// //       newSocket.emit("release-editor", { roomId });
// //       newSocket.disconnect();
// //     };
// //   }, [roomId, user]);

// //   const requestEditAccess = () => {
// //     if (socket) socket.emit("request-edit", { roomId, user });
// //   };

// //   const handleCodeChange = (value) => {
// //     if (!isEditor) return;
// //     setCode(value);
// //     socket.emit("code-change", { roomId, code: value });
// //   };

// //   const stopEditing = () => {
// //     socket.emit("release-editor", { roomId });
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       <div className="w-1/4 bg-gray-900 text-white p-4">
// //         <h2 className="text-xl font-bold mb-4">Online Users</h2>

// //         {onlineUsers.map((u) => (
// //           <div key={u.id} className="p-2 bg-gray-700 rounded mb-2">
// //             {u.name}
// //           </div>
// //         ))}

// //         {!isEditor ? (
// //           <button onClick={requestEditAccess} className="mt-4 bg-blue-600 p-2 rounded">
// //             Request Edit Access
// //           </button>
// //         ) : (
// //           <button onClick={stopEditing} className="mt-4 bg-red-600 p-2 rounded">
// //             Stop Editing
// //           </button>
// //         )}
// //       </div>

// //       <div className="flex-1">
// //         <Editor
// //           height="100vh"
// //           theme="vs-dark"
// //           defaultLanguage="javascript"
// //           value={code}
// //           onChange={handleCodeChange}
// //           options={{
// //             readOnly: !isEditor,
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default RoomPage;
// import React, { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import { useAuth } from "../context/AuthContext";

// const RoomPage = () => {
//   const { roomId } = useParams();
//   const { user } = useAuth();

//   const [socket, setSocket] = useState(null);
//   const [code, setCode] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [editorUser, setEditorUser] = useState(null);

//   const isEditor = editorUser?.id === user?.id;

//   useEffect(() => {
//     if (!user) return;

//     // Always create a NEW socket per tab
//     const newSocket = io("http://localhost:5000", {
//       transports: ["websocket"],
//       forceNew: true,
//     });

//     setSocket(newSocket);

//     newSocket.emit("join-room", { roomId, user });

//     newSocket.on("online-users", (users) => {
//       setOnlineUsers(users);
//     });

//     newSocket.on("load-existing-code", (existingCode) => {
//       setCode(existingCode);
//       localStorage.setItem(`code_${roomId}`, existingCode);
//     });

//     newSocket.on("update-code", (updatedCode) => {
//       setCode(updatedCode);
//       localStorage.setItem(`code_${roomId}`, updatedCode);
//     });

//     newSocket.on("editor-updated", (newEditor) => {
//       setEditorUser(newEditor);
//     });

//     return () => {
//       newSocket.emit("release-editor", { roomId });
//       newSocket.disconnect();
//     };
//   }, [roomId, user]);

//   const requestEditAccess = () => {
//     socket?.emit("request-edit", { roomId, user });
//   };

//   const handleCodeChange = (value) => {
//     if (!isEditor) return;
//     setCode(value);
//     localStorage.setItem(`code_${roomId}`, value);
//     socket?.emit("code-change", { roomId, code: value });
//   };

//   const stopEditing = () => {
//     socket?.emit("release-editor", { roomId });
//   };

//   if (!socket || !user) return <div className="text-white">Loading...</div>;

//   return (
//     <div className="flex h-screen">
//       {/* LEFT SIDEBAR */}
//       <div className="w-1/4 bg-gray-900 text-white p-4">
//         <h2 className="text-xl font-bold mb-4">Online Users</h2>

//         <ul>
//           {onlineUsers.map((u) => (
//             <li key={u.id}>
//               {u.name} {editorUser?.id === u.id && "✏️ (editing)"}
//             </li>
//           ))}
//         </ul>

//         {!isEditor ? (
//           <button onClick={requestEditAccess} className="mt-4 bg-blue-600 p-2 rounded">
//             Request Edit Access
//           </button>
//         ) : (
//           <button onClick={stopEditing} className="mt-4 bg-red-600 p-2 rounded">
//             Stop Editing
//           </button>
//         )}
//       </div>

//       {/* EDITOR */}
//       <div className="flex-1">
//         <Editor
//           height="100vh"
//           theme="vs-dark"
//           defaultLanguage="javascript"
//           value={code}
//           onChange={handleCodeChange}
//           options={{
//             readOnly: !isEditor,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default RoomPage;
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { Play, Edit3, StopCircle, Users, Code2 } from "lucide-react";
import FileOptions from "../components/FileOption";

const RoomPage = () => {
  
  const { roomId } = useParams();
  const { user } = useAuth();

  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [editorUser, setEditorUser] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const isEditor = editorUser?.id === user?.id;

  const LANGUAGE_MAP = {
    javascript: 63,
    typescript: 74,
    python: 71,
    java: 62,
    c: 50,
    cpp: 54,
    csharp: 51,
    php: 68,
    ruby: 72,
    go: 60,
    kotlin: 78,
    rust: 73,
    swift: 83,
    sql: 82,
    bash: 46,
    html: 80,
    css: 79
  };

  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      forceNew: true,
    });

    setSocket(newSocket);
    newSocket.emit("join-room", { roomId, user });

    newSocket.on("online-users", (users) => {
      console.log("Users:", users);
      setOnlineUsers(users);
    });

    newSocket.on("update-code", (updatedCode) => {
      setCode(updatedCode);
    });

    newSocket.on("editor-updated", (newEditor) => {
      setEditorUser(newEditor);
    });

    return () => {
      newSocket.emit("release-editor", { roomId });
      newSocket.disconnect();
    };
  }, [roomId, user]);

  const handleCodeChange = (value) => {
    if (!isEditor) return;
    setCode(value);
    localStorage.setItem(`code_${roomId}`, value);
    if (socket) socket.emit("code-change", { roomId, code: value });
  };

  const requestEditAccess = () => {
    if (socket) socket.emit("request-edit", { roomId, user });
  };

  const stopEditing = () => {
    if (socket) socket.emit("release-editor", { roomId });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    
    try {
      const language_id = LANGUAGE_MAP[language];
      const response = await fetch(
        "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: code,
            language_id: language_id,
          }),
        }
      );

      const result = await response.json();
      setOutput(result.stdout || result.stderr || result.compile_output || "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e]">
      {/* Sidebar */}
      <div className="w-80 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
        {/* Users Section */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-blue-400" size={22} />
            <h2 className="text-lg font-semibold text-gray-200">
              Online Users ({onlineUsers.length})
            </h2>
          </div>

          <div className="space-y-2">
            {onlineUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#2d2d30] hover:bg-[#37373d] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 font-medium">{u.name}</span>
                </div>
                {editorUser?.id === u.id && (
                  <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
                    <Edit3 size={14} />
                    <span>Editing</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className="p-5 border-t border-[#3e3e42] space-y-3">
          {!isEditor ? (
            <button
              onClick={requestEditAccess}
              className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors text-white font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <Edit3 size={18} />
              Request Edit Access
            </button>
          ) : (
            <button
              onClick={stopEditing}
              className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors text-white font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <StopCircle size={18} />
              Stop Editing
            </button>
          )}
        </div>
      </div>

      {/* Editor Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-14 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="text-blue-400" size={20} />
              <span className="text-gray-300 font-medium">Language:</span>
            </div>
            <select
              className="px-4 py-2 bg-[#3c3c3c] text-gray-200 rounded-lg border border-[#3e3e42] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </div>

          <button
            onClick={runCode}
            disabled={isRunning || !isEditor}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors text-white font-medium flex items-center gap-2 shadow-lg"
          >
            <Play size={18} fill="currentColor" />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>

        {/* Code Editor */}
        <FileOptions code={code} setCode={setCode} />
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={handleCodeChange}
            options={{
              readOnly: !isEditor,
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
              lineNumbers: "on",
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>

        {/* Output Panel */}
        {output && (
          <div className="max-h-max sticky  bottom-64 bg-[#1e1e1e] border-t border-[#3e3e42] p-4 overflow-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                Output
              </span>
            </div>
            <p className="text-gray-300 h-[500px] font-mono text-sm whitespace-pre-wrap">
              {output}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;

