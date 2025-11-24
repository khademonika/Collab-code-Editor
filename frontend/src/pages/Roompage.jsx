import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("http://localhost:5000");

const RoomPage = () => {
  const { roomId } = useParams();
  const { user } = useAuth();

  if (!user) {
    return <div className="text-white p-4">Loading...</div>;
  }
  // const user = JSON.parse(localStorage.getItem("user"));

  const [code, setCode] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [editorUser, setEditorUser] = useState(null); // who is editing?

  const isEditor = editorUser?.id === user.id;


  useEffect(() => {
    socket.emit("join-room", { roomId, user });

    socket.on("online-users", (users) => setOnlineUsers(users));

    socket.on("load-existing-code", (existingCode) => {
      setCode(existingCode);
    });

    socket.on("update-code", (updatedCode) => {
      setCode(updatedCode);
    });

    socket.on("editor-updated", (newEditor) => {
      setEditorUser(newEditor);
    });

    return () => {
      socket.emit("release-editor", { roomId });
      socket.disconnect();
    };
  }, []);

  const requestEditAccess = () => {
    socket.emit("request-edit", { roomId, user });
  };

  const handleCodeChange = (value) => {
    if (!isEditor) return;
    setCode(value);
    socket.emit("code-change", { roomId, code: value });
  };

  const stopEditing = () => {
    socket.emit("release-editor", { roomId });
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>

        {onlineUsers.map((u) => (

          <div>
            <h3>Online Users</h3>
            <ul>
              {onlineUsers.map(u => (
                <li key={u.id}>
                  {u.name} {editorUser?.id === u.id && "✏️ (editing)"}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!isEditor ? (
          <button
            onClick={requestEditAccess}
            className="mt-4 bg-blue-600 p-2 rounded"
          >
            Request Edit Access
          </button>
        ) : (
          <button onClick={stopEditing} className="mt-4 bg-red-600 p-2 rounded">
            Stop Editing
          </button>
        )}
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          onChange={handleCodeChange}
          options={{
            readOnly: !isEditor,
          }}
        />
      </div>
    </div>
  );
};

export default RoomPage;
