
import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { Play, Users, Code2, Sun, Moon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast"
import FileOptions from "../components/FileOption"
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
const RoomPage = () => {

  const { roomId } = useParams();
  const { user } = useAuth();
  // const { fontSize } = useSettings();
const { fontSize, tabSize, wordWrap, lineNumbers } = useSettings();
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

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const { theme, toggleTheme } = useTheme()
  const API = import.meta.env.VITE_API_URL
  const foreignCursorDecorations = useRef({}); // { socketId: decorationId }
 
//  yha se change kiya h
  // adjustable sidebar width (persist per room)
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    try {
      const v = localStorage.getItem(`sidebarWidth_${roomId}`);
      return v ? parseInt(v, 10) : 320;
    } catch (e) { return 320; }
  });
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(sidebarWidth);

  const startDrag = (e) => {
    e.preventDefault();
    draggingRef.current = true;
    startXRef.current = (e.clientX ?? (e.touches && e.touches[0].clientX)) || 0;
    startWidthRef.current = sidebarWidth;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
  };

  const onDrag = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    const clientX = (e.clientX ?? (e.touches && e.touches[0].clientX)) || 0;
    const dx = clientX - startXRef.current;
    const newWidth = Math.max(200, Math.min(640, startWidthRef.current + dx));
    setSidebarWidth(newWidth);
  };

  const stopDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try { localStorage.setItem(`sidebarWidth_${roomId}`, String(sidebarWidth)); } catch (e) {}
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', stopDrag);
  };

  // collapsed state (persisted)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem(`sidebarCollapsed_${roomId}`) === '1'; } catch (e) { return false; }
  });
  const prevWidthRef = useRef(sidebarWidth || 320);
  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      // expand
      const restore = prevWidthRef.current || 320;
      setSidebarWidth(restore);
      setSidebarCollapsed(false);
      try { localStorage.setItem(`sidebarCollapsed_${roomId}`, '0'); } catch (e) {}
    } else {
      // collapse
      prevWidthRef.current = sidebarWidth || 320;
      setSidebarCollapsed(true);
      try { localStorage.setItem(`sidebarCollapsed_${roomId}`, '1'); } catch (e) {}
    }
  };

  // yha tk
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
  axios.get(`${API}/api/auth/verify`, { withCredentials: true })
    .then(res => setUser(res.data.user))
    .catch(() => logout());
}, []);

    useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize,
        tabSize,
        wordWrap: wordWrap ? "on" : "off",
        lineNumbers: lineNumbers ? "on" : "off",
      });
    }
  }, [fontSize, tabSize, wordWrap, lineNumbers]);
   const leaveRoom = async () => {
    try {
      // notify server we are leaving so others can be informed
      if (socketRef.current) {
        socketRef.current.emit('leave-room', { roomId, user });
      }
    } catch (e) {
      console.error('leaveRoom emit error', e);
    }

    // local cleanup: remove our decorations/styles
    try {
      if (editorRef.current) {
        // remove all remote decorations owned by this user (if any)
        const safeId = sanitizeId(user?.id || user?.name || 'me');
        const style = document.getElementById(`user-style-${safeId}`);
        if (style) style.remove();
      }
    } catch (e) {}

    // navigate back to home
    try { navigate('/'); } catch (e) { window.location.href = '/'; }
  };
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize });
    }
  }, [fontSize]);

  useEffect(() => {
    if (!user) return;
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/api/room/${roomId}`, { withCredentials: true });
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
      socketRef.current = io("https://collab-code-editor-1-fut6.onrender.com", {
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


    return () => {


      s.off("online-users", onOnline);
      s.off("update-code", onCode);
      s.off("language-changed", onLanguage);
      s.off("run-output", onRunOutput);
      s.off("editor-updated", onEditor);
      s.emit("release-editor", { roomId });
      //  s.disconnect();
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
    setIsOutput(true)

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
      console.log(result.stdout || result.stderr || result.compile_output || "No output");

      setOutput(result.stdout || result.stderr || result.compile_output || "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
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
      <div className="h-screen  flex flex-col join">
        {/* Main Content - Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden ">
          {/* Sidebar */}
          {/* Online Users */}
          {!sidebarCollapsed && (
            <div className="join border-r  border-[#3e3e42] flex flex-col p-4" style={{ width: sidebarWidth, minWidth: 200, maxWidth: 640 }}>
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
            <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {onlineUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center p-2 rounded-lg card  group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className=" font-medium">{u.name}</span>
                  </div>
                </div>
              ))}
            </div>
            </div>
          )}
            {/* changed */}
          {/* resizer (hidden when collapsed) */}
          {!sidebarCollapsed && (
            <div
              role="separator"
              aria-orientation="vertical"
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              className="flex items-center justify-center"
              style={{ width: 12, cursor: 'col-resize', userSelect: 'none' }}
            >
              <div
                className="rounded-full bg-gray-400/40 hover:bg-gray-400"
                style={{ width: 4, height: '60%', transition: 'background 120ms' }}
              />
            </div>
          )}
{/* yha th */}
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
<div className="flex justify-end gap-3 items-center">
  
              <button
                onClick={runCode}
                disabled={isRunning || !isEditor}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium  flex items-center gap-2"
              >
                <Play size={18} fill="currentColor" />
                {(isRunning) ? "Running..." : "Run Code"}
              </button>
                <button
                onClick={leaveRoom}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Leave Room
              </button>
              <button
                onClick={() => toggleTheme?.()}
                className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition flex items-center gap-2"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-white"/>}
              </button>
</div>
            </div>
            <FileOptions code={code} setCode={setCode} />
            {/* Editor */}
            <div className="flex-1 rounded-lg join ml-4 my-3 overflow-hidden pr-4 ">
              <Editor
                wrapperClassName="rounded-lg overflow-hidden"
                height="100%"
                theme={theme === "light" ? "vs-light" : "vs-dark"}
                language={language}
                value={code}
                onChange={handleCodeChange}
                  
                onMount={(editor, monaco) => {
                  editorRef.current = editor;
                  monacoRef.current = monaco;

                  // Apply font size on load
                   editor.updateOptions({
                    fontSize,
                    tabSize,
                    wordWrap: wordWrap ? "on" : "off",
                    lineNumbers: lineNumbers ? "on" : "off",
                  });

                  // Ensure the Monaco editor DOM has rounded corners and clips overflow
                  try {
                    const dom = editor.getDomNode && editor.getDomNode();
                    if (dom) {
                      dom.style.borderRadius = '0.5rem';
                      dom.style.overflow = 'hidden';
                      dom.style.boxSizing = 'border-box';
                    }
                  } catch (e) { /* ignore */ }
          


                }}
                options={{
                  readOnly: !isEditor,
                  minimap: { enabled: true },
                  fontSize: fontSize,
                  fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
              
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>
        </div>
        {/* OUTPUT PANEL — FULL WIDTH BOTTOM */}

        {(output && isOutput) && (
          <div className="h-[200px] join border-t border-[#3e3e42] p-4 overflow-auto">

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