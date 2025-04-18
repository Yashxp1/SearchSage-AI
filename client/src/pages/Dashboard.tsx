import { FaArrowRight } from 'react-icons/fa6';
import Sidebar from '../components/Sidebar';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../utils';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getResult = async () => {
    try {
      setLoading(true);
      // Add user message to chat
      const userMessage = { type: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      
      const res = await axios.post(
        `${baseURL}/summary`,
        { content: input },
        {
          withCredentials: true,
        }
      );
      
      // Add AI response to chat
      const aiMessage = { 
        type: 'ai', 
        content: res.data.summary,
        searchResults: res.data.searchResults || [] 
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log('Error fetching data');
      // Show error message in chat
      setMessages(prev => [...prev, { 
        type: 'system', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    getResult();
    setInput('');
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-950 text-gray-100">
      {/* Mobile menu button */}
      <button 
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-full bg-gray-800 text-white"
        onClick={toggleMobileSidebar}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      
      {/* Sidebar for mobile (overlay) */}
      <div className={`lg:hidden fixed inset-0 bg-gray-900 bg-opacity-80 z-40 transition-opacity duration-300 ${isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-64 h-full bg-gray-900 p-4 transform transition-transform duration-300 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="pt-10">
            <Sidebar />
          </div>
        </div>
      </div>
      
      {/* Sidebar for desktop */}
      <div className="hidden lg:block lg:w-64 border-r border-gray-800 overflow-y-auto">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Chat container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <h1 className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent font-bold text-4xl md:text-5xl mb-4">
                  Hello Yash
                </h1>
                <p className="text-gray-400 text-lg md:text-xl">
                  How can I help you today?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3xl rounded-2xl px-4 py-3 ${
                      message.type === 'user' 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : message.type === 'system'
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-800 text-white rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    
                    {/* Search results */}
                    {message.searchResults && message.searchResults.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h3 className="font-medium text-gray-300 mb-2">Search Results:</h3>
                        <ul className="space-y-3">
                          {message.searchResults.map((item, idx) => (
                            <li key={idx} className="bg-gray-700 bg-opacity-40 rounded-lg p-3">
                              <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="font-medium text-blue-400 hover:underline"
                              >
                                {item.title}
                              </a>
                              <p className="text-sm text-gray-300 mt-1">{item.snippet}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Input area */}
        <div className="border-t border-gray-800 p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              type="text"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`rounded-full p-3 flex items-center justify-center transition-all ${
                !input.trim() || loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <FaArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;