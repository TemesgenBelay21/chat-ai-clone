import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import MessageList from "./components/MessageList/MessageList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [conversations, setConversations] = useState([]);

  async function fetchConversations() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/chat/conversations");

      setConversations(data.data);
      
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
    }
  
  }

  useEffect(() => {
    fetchConversations();
  }, []);



  return (
    <div className="app">
      <Sidebar />

      <main className="chat">
        <Header />

        {/* conversation list */}

        <MessageList conversations = {conversations} />
      </main>
    </div>
  );
}

export default App;
