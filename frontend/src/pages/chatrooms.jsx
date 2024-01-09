import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatsListAPI, usersListAPI, createRoomAPI } from "../api";

function ChatRooms() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const [activeTab, setActiveTab] = useState("yourChats");
  const userData = localStorage.getItem("user");
  const user = userData && JSON.parse(userData);
  const userID = user && user.id;
  console.log("user", userID);

  const fetchChats = async () => {
    const res = await chatsListAPI();
    setChats(res.data);
    console.log("res", res.data);
  };

  const fetchUsers = async () => {
    const res = await usersListAPI();
    setUsers(res.data);
    console.log("res", res.data);
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
   
  }

  const createChatRoom = async (receiver_id) => {
    try {
      const res = await createRoomAPI(receiver_id);
      console.log("roooomm", res.data && res.data[0].room_id);

      const room_id =res.data && res.data[0].room_id;
  
      if (room_id) {
        navigate(`/chat/${room_id}/${receiver_id}/`);
      } else {
        console.error("Error creating chat room: Invalid response or missing room_id");
        // Handle the error or provide user feedback accordingly
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
      // Handle the error or provide user feedback accordingly
    }
  };
  
  // const createChatRoom = async (reciever_id) => {
  //   const res = await createRoomAPI(reciever_id);
  //   console.log("res", res.data)
  //   const data = res.data
  //   const room_id = data && data.room_id
    
  //   if(data && room_id){
  //     navigate(
  //       `/chat/${room_id}/${
  //         reciever_id
  //       }/`
  //     )
  //   }
  //   console.log("res", res);
  // };

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login route if no token
      navigate("/login");
    } else {
      fetchChats();
      fetchUsers();
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
     
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Chat Application
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <button
            className={`mr-4 px-4 py-2 focus:outline-none ${
              activeTab === "yourChats"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("yourChats")}
          >
            Your Chats
          </button>
          <button
            className={`px-4 py-2 focus:outline-none ${
              activeTab === "usersList"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("usersList")}
          >
            Users List
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "yourChats" && (
          <ul>
            {chats &&
              chats.map((chat, index) => (
                <li
                  key={index}
                  className={`flex justify-between items-center mb-${
                    index === chats.length - 1 ? "0" : "2"
                  }`}
                >
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={() => navigate(`/chat/${index + 1}`)}
                  >
                    {chat.sender.id == userID
                      ? chat.reciever.first_name
                      : chat.sender.first_name}
                  </button>
                  <button
                    className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={() =>
                      navigate(
                        `/chat/${chat.room_id}/${
                          chat.sender.id == userID
                            ? chat.reciever.id
                            : chat.sender.id
                        }/`
                      )
                    }
                  >
                    View Chat
                  </button>
                </li>
              ))}
          </ul>
        )}

        {activeTab === "usersList" && (
          <ul>
            {users &&
              users
                .filter((user) => user.id != userID)
                .map((user, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center mb-${
                      index === users.length - 1 ? "0" : "2"
                    }`}
                  >
                    <span>{user.first_name}</span>
                    <button
                      className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                      onClick={() => createChatRoom(user.id)}
                    >
                      Start Chat
                    </button>
                  </li>
                ))}
          </ul>
        )}
      
      </div>
      
    </div>
    <button onClick={handleLogout}  className="ml-4 px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        Logout
      </button>
    </div>
  );
}

export default ChatRooms;
