import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoomAPI, chatsListAPI,  updateHasSeenAPI } from "../api";

function Chat() {
  const navigate = useNavigate();
  const { room_id, receiver_id } = useParams();
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const res = await chatsListAPI();
    setChats(res.data);
    console.log("res", res.data);
  };

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const userID = user.id;
  const socketRef = useRef(null);

  console.log("room_id", room_id);
  console.log("receiver_id", receiver_id);
  const [roomData, setRoomData] = useState([]);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchRoomChats = async (room_id, reciever_id) => {
    try {
      const res = await fetchRoomAPI(room_id, reciever_id);
      console.log("res room", res.data);

      // Update state with retrieved messages
      setRoomData(res.data);
      setMessages(res.data.old_chats);
    } catch (error) {
      console.error("Error fetching room chats:", error);
    }
  };

  const updateHasSeenStatus = async (room_id, receiver_id) => {
    try {
      const response = await updateHasSeenAPI(room_id, receiver_id);

      console.log("Response from updateHasSeenAPI:", response);

      if (response && response.status === 200) {
        console.log("has_seen status updated successfully");
      } else {
        console.error("Failed to update has_seen status");
      }
    } catch (error) {
      console.error("Error updating has_seen status:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    // Establish a WebSocket connection when the component mounts
    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${room_id}/`
    );

    socketRef.current.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    socketRef.current.addEventListener("message", (event) => {
      console.log("Message from server:", event.data);
      // Handle received messages as needed
      const messageObject = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    });

    socketRef.current.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    socketRef.current.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    return () => {
      socketRef.current.close();
    };
  }, [navigate, room_id]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  // Use the current date and time to generate a unique slug
  const now = new Date();
  const chatSlug = `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  const handleSendMessage = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const messageObject = {
        sender: {
          id: userID,
          first_name: user.first_name,
        },
        receiver: receiver_id,
        text: newMessage,
        date: new Date().toISOString(),
        has_seen: false,
        slug: chatSlug,
      };

      // Send the message to the WebSocket server
      socketRef.current.send(JSON.stringify(messageObject));

      // Clear the input field
      setNewMessage("");
    } else {
      console.error("WebSocket connection not open.");
    }
  }, [userID, user.first_name, newMessage, receiver_id]);

  useEffect(() => {
    fetchRoomChats(room_id, receiver_id);
    updateHasSeenStatus(room_id, receiver_id);
    fetchChats()
  }, [room_id, receiver_id]);



  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4 hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
        {chats.map((chat, index) => (
        <ul>
          <li 
          onClick={ navigate(
            `/chat/${chat.room_id}/${
              chat.sender.id == userID
                ? chat.reciever.id
                : chat.sender.id
            }/`
          )}
          className="bg-gray-100 border-gray-300 p-2 mb-2 border rounded cursor-pointer">{chat.sender.id == userID? chat.reciever.first_name: chat.sender.first_name}</li>

        </ul>
          ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200">
        {/* Chat Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold">
            Chatting with {roomData?.reciever_name}
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.sender.id === userID ? "text-right" : "text-left"
              }`}
            >
              {message.text}
              {message.sender.id === userID && message.has_seen && (
                <span className="ml-2 text-sm text-green-500">✓</span>
              )}
              {/* Add any additional information you want to display */}
              <div className="text-sm text-gray-500">
                {new Date(message.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="bg-white p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={handleKeyPress}
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md mr-2 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
