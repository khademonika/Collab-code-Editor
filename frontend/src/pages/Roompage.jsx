
import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { Play, Users, Code2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast"
import FileOptions from "../components/FileOption"
import { useTheme } from "../context/ThemeContext";
const RoomPage = () => {

  const { roomId } = useParams();
  const { user } = useAuth();
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const [code, setCode] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [editorUser, setEditorUser] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [isOutput, setIsOutput] = useState(true);

  const [output, setOutput] = useState("");

  const isEditor = editorUser?.id === user?.id;
  const [cursorDecorations, setCursorDecorations] = useState([]);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const {theme} = useTheme()
  const foreignCursorDecorations = useRef({}); // { socketId: decorationId }
  const LANGUAGE_MAP = {
    javascript: 63,
    typescript: 74,
    python: 71,
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
    //for debugging
    s.on("connect", () => console.log("socket connected:", s.id));
    s.on("connect_error", (err) => console.error("connect_error", err));

    s.emit("join-room", { roomId, user });
    // listeners
    const onOnline = (users) => setOnlineUsers(users || []);
    const onCode = (serverCode) => setCode(serverCode ?? "");
    const onLanguage = (lang) => setLanguage(lang ?? "javascript");
    const onRunOutput = (out) => setOutput(out ?? "");
    const onEditor = (ed) => setEditorUser(ed ?? null);
    const onCursor = ({ socketId, cursor }) => {
      handleForeignCursor(socketId, cursor);
    };
    s.on("online-users", onOnline);
    s.on("update-code", onCode);
    s.on("language-changed", onLanguage);
    s.on("run-output", onRunOutput);
    s.on("editor-updated", onEditor);
    s.on("cursor-change", onCursor);


    s.on("cursor-change", onCursor);
    return () => {
      // s.emit("release-editor", { roomId });
      // s.disconnect();
      s.off("online-users", onOnline);
      s.off("update-code", onCode);
      s.off("language-changed", onLanguage);
      s.off("run-output", onRunOutput);
      s.off("editor-updated", onEditor);
    }
  }, [roomId, user]);
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (socketRef.current) socketRef.current.emit("language-change", { roomId, language: newLang });
  };
  const handleCodeChange = (value) => {
    if (!isEditor) return;
    setCode(value);
    localStorage.setItem(`code_${roomId}`, value);
    // if (socketRef) socketRef.emit("code-change", { roomId, code: value });
    if (socketRef.current) socketRef.current.emit("code-change", { roomId, code: value });

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

  function handleForeignCursor(socketId, cursor) {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    // Remove previous decoration for this user
    const prevDeco = foreignCursorDecorations.current[socketId] || [];

    const newDeco = editor.deltaDecorations(prevDeco, [
      {
        range: new monaco.Range(
          cursor.lineNumber,
          cursor.column,
          cursor.lineNumber,
          cursor.column
        ),
        options: {
          className: "foreign-cursor",
          stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTyping,
        },
      },
    ]);

    foreignCursorDecorations.current[socketId] = newDeco;
  }

  const sendCursor = (position) => {
    if (socketRef.current) socketRef.current.emit("cursor-change", { roomId, cursor: position });
  };
  const copyBtnRef = useRef(null);
useEffect(() => {
  if (monacoRef.current) {
    monacoRef.current.editor.setTheme(
      theme === "light" ? "vs-light" : "vs-dark"
    );
  }
}, [theme]);



  return (

    <div>

      <div className="h-screen pt-24 flex flex-col join">

        {/* Main Content - Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden ">
          {/* Sidebar */}
          {/* Online Users */}

          <div className="w-80 join border-r  border-[#3e3e42] flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users size={22} className="text-blue-400" />
                <h2 className="text-lg font-semibold">
                  Online Users ({onlineUsers.length})
                </h2>
              </div>
            </div>

            {/* Room Code Box */}
            <div className=" p-3 rounded-lg mb-6 flex items-center justify-between">
              <span className="text-sm flex-1 truncate">
                Room Code: <span className="text-blue-400">{roomData?.roomCode}</span>
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(roomData?.roomCode);
                  toast.success("Room code copied!");
                }}
                ref={copyBtnRef}
                className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition shrink-0"
              >
                Copy
              </button>
            </div>

            {/* User List */}
            <div className="space-y-2 overflow-y-auto pr-2">
              {onlineUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center p-2 rounded-lg card  group"
                >
                  <div className="flex items-center gap-3 flex-1">
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
          <div className="flex-1 flex join flex-col overflow-hidden">
            {/* Top toolbar */}
            <div className="h-14  border-b border-[#3e3e42] flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Code2 className="text-blue-400" size={20} />
                  <span className=" font-medium">Language:</span>
                </div>

                <select
                  className="px-4 py-2 card rounded-lg border border-[#3e3e42]"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="csharp">C#</option>
                  <option value="go">go</option>
                  <option value="css">CSS</option>
                </select>
              </div>

              <button
                onClick={runCode}
                disabled={isRunning || !isEditor}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium flex items-center gap-2"
              >
                <Play size={18} fill="currentColor" />
                {(isRunning && isOutput) ? "Running..." : "Run Code"}
              </button>
            </div>
            <FileOptions code={code} setCode={setCode} />
            {/* Editor */}
            <div className="flex-1 join ml-4 my-3 overflow-hidden">
              <Editor
                theme={theme === "light" ? "vs-light" : "vs-dark"}
                language={language}
                value={code}
                onMount={(editor, monaco) => {
                  editorRef.current = editor;
                  monacoRef.current = monaco;

                  // track cursor movements and emit
                  editor.onDidChangeCursorPosition((e) => {
                    const pos = e.position; // {lineNumber, column}
                    sendCursor({ lineNumber: pos.lineNumber, column: pos.column });
                  });
                }}
                onChange={handleCodeChange}
                options={{ readOnly: !isEditor , padding: { top: 12, bottom: 12 },}}
              />

            </div>

          </div>

        </div>

        {/* OUTPUT PANEL — FULL WIDTH BOTTOM */}

        {(output && isOutput) && (
          <div className="h-[300px] join border-t border-[#3e3e42] p-4 overflow-auto">

            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold uppercase tracking-wider">
                Output
                <span onClick={() => setIsOutput(false)} className="text-xl px-3 absolute right-3  rounded bg-red-800 text-white cursor-pointer">X</span>
              </span>
            </div>

            <pre className=" font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}

      </div>


    </div>
  );
};

export default RoomPage;

