import React, { useState, useEffect } from "react";

export default function ChatBox({ socket, roomId, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("receive-chat", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      username,
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.current.emit("send-chat", msgData);

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full p-3 text-gray-200">
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg, index) => (
          <div key={index} className="bg-[#333] p-2 rounded-md">
            <span className="font-bold">{msg.username}:</span> {msg.message}
            <div className="text-xs opacity-50">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 bg-[#1e1e1e] border border-[#3e3e42] rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
