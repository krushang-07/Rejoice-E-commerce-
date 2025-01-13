import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return; // Don't send empty messages

    // Add user message to state
    const newMessage = {
      sender: "user",
      text: userInput,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput(""); // Clear user input field

    try {
      // Send user message to the backend for processing
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        const botReply = {
          sender: "bot",
          text: data.reply, // Ensure that the backend returns a 'reply' field
        };

        // Add bot reply to state
        setMessages((prevMessages) => [...prevMessages, botReply]);
      } else {
        // Handle server errors
        console.error("Error from backend:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 w-96 bg-white shadow-lg rounded-lg">
      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask a question..."
      />
      <button
        onClick={handleSendMessage}
        className="w-full bg-blue-500 text-white p-2 mt-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
