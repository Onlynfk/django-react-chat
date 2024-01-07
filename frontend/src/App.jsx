import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/404";
import Chat from "./pages/chat"
import ChatRooms from "./pages/chatrooms"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/chats" element={<ChatRooms />} />


        <Route exact path="/register" element={<Register />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={NotFound} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
