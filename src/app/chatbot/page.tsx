'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  MessageSquare, 
  Search,
  Lightbulb,
  Zap
} from 'lucide-react';

export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState('learning');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý AI học tập. Bạn cần hỗ trợ gì hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const chatbotTypes = [
    {
      id: 'learning',
      name: 'Chatbot học tập',
      description: 'Hỗ trợ học tập theo giáo trình',
      icon: BookOpen,
      color: 'bg-blue-500',
      features: ['Giải thích khái niệm', 'Hướng dẫn bài tập', 'Tóm tắt nội dung']
    },
    {
      id: 'debate',
      name: 'Chatbot tranh luận',
      description: 'Thảo luận và tranh luận thử nghiệm',
      icon: MessageSquare,
      color: 'bg-green-500',
      features: ['Tranh luận chủ đề', 'Phân tích quan điểm', 'Đưa ra lập luận']
    },
    {
      id: 'qa',
      name: 'Chatbot Q&A',
      description: 'Hỗ trợ tra cứu thông tin',
      icon: Search,
      color: 'bg-purple-500',
      features: ['Tra cứu nhanh', 'Tìm kiếm tài liệu', 'Trả lời câu hỏi']
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    try {
      // Send message to AI API
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat/sessions/session_1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          user_id: 1 // Mock user ID
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: data.ai_response.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Fallback response
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: `Tôi hiểu câu hỏi của bạn về "${currentMessage}". Đây là câu trả lời từ AI...`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback response
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: `Xin lỗi, tôi gặp lỗi khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  const quickQuestions = [
    'Giải thích khái niệm ma trận',
    'Cách tính định thức?',
    'Tóm tắt bài học hôm nay',
    'Làm thế nào để giải bài tập này?'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trợ lý AI học tập</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Hỗ trợ học tập thông minh với AI</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chatbot Types Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Loại trợ lý</h2>
              <div className="space-y-3">
                {chatbotTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        activeTab === type.id
                          ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-200 dark:border-blue-700'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`p-2 ${type.color} rounded-lg mr-3`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{type.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                        </div>
                      </div>
                      <div className="ml-11">
                        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Lightbulb className="h-3 w-3 mr-1" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${
                    chatbotTypes.find(t => t.id === activeTab)?.color || 'bg-blue-500'
                  } rounded-lg`}>
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {chatbotTypes.find(t => t.id === activeTab)?.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Đang hoạt động</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`p-2 rounded-full ${
                        message.type === 'user' 
                          ? 'bg-blue-600' 
                          : chatbotTypes.find(t => t.id === activeTab)?.color || 'bg-blue-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Questions */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Câu hỏi nhanh:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
