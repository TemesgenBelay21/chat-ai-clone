import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import MessageList from "./components/MessageList/MessageList";
import ChatInput from "./components/ChatInput/ChatInput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  async function handleSendMessage(prompt) {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/api/chat/conversations", { prompt });
      await fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <div className="app">
      <Sidebar />

      <main className="chat">
        <Header />

        {/* conversation list */}

        <MessageList conversations = {conversations} />

        <ChatInput handleSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
