
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { Play, Edit3, StopCircle, Users, Code2 } from "lucide-react";
import FileOptions from "../components/FileOption";
import axios from "axios";

const RoomPage = () => {

  const { roomId } = useParams();
  const { user } = useAuth();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [socket, setSocket] = useState(null);
  const socketRef = React.useRef(null);
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
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/room/${roomId}`, { withCredentials: true });
        setRoomData(res.data);
        console.log(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        transports: ["websocket"],
        forceNew: true,
      });
    }

    const s = socketRef.current;

    s.emit("join-room", { roomId, user });

    s.on("online-users", (users) => {
      console.log("Online Users:", users);
      setOnlineUsers(users);
    });

    s.on("update-code", (updatedCode) => {
      setCode(updatedCode);
    });
    s.on("editor-updated", (newEditor) => {
      setEditorUser(newEditor);
    });
    s.on("edit-denied", (currentEditor) => {
      alert(`Edit access denied. ${currentEditor.name} is currently editing.`);
    });
    return () => {
      s.emit("release-editor", { roomId });
      // s.disconnect();
    };
  }, [roomId, user]);

  const handleCodeChange = (value) => {
    if (!isEditor) return;
    setCode(value);
    localStorage.setItem(`code_${roomId}`, value);
    // if (socketRef) socketRef.emit("code-change", { roomId, code: value });
    if (socketRef.current) socketRef.current.emit("code-change", { roomId, code: value });

  };

  const requestEditAccess = () => {
    if (socketRef.current) socketRef.current.emit("request-edit", { roomId, user });
  };

  const stopEditing = () => {
    if (socketRef) socketRef.current.emit("release-editor", { roomId });
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
   
    <div>

      <div className="h-screen pt-24 flex flex-col bg-[#1e1e1e]">

        {/* Main Content - Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {/* Online Users */}
          <div className="w-80 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
            <div className="flex mr-3 items-center gap-2 mb-6">
              <Users className="text-blue-400" size={22} />
              <h2 className="text-lg font-semibold text-gray-200">
                Online Users ({onlineUsers.length})
              </h2>
             <span className="text-sm block">  Room Code: {roomData?.roomCode}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(roomData?.roomCode);
                  toast.success("Room code copied!");
                }}
                className="px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Copy
              </button>
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

                </div>
              ))}
            </div>
          </div>
          {/* EDITOR SECTION */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top toolbar */}
            <div className="h-14 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Code2 className="text-blue-400" size={20} />
                  <span className="text-gray-300 font-medium">Language:</span>
                </div>

                <select
                  className="px-4 py-2 bg-[#3c3c3c] text-gray-200 rounded-lg border border-[#3e3e42]"
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
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium flex items-center gap-2"
              >
                <Play size={18} fill="currentColor" />
                {isRunning ? "Running..." : "Run Code"}
              </button>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden">
              <FileOptions code={code} setCode={setCode} />
              <Editor
                height="100%"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={handleCodeChange}
              />
            </div>

          </div>

        </div>

        {/* OUTPUT PANEL — FULL WIDTH BOTTOM */}
        {output && (
          <div className="h-[300px] bg-[#1e1e1e] border-t border-[#3e3e42] p-4 overflow-auto">

            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
                Output
              </span>
            </div>

            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>


    </div>
  );
};

export default RoomPage;

