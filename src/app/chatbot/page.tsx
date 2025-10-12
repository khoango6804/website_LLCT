'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Bot, User, MessageSquare, GraduationCap, Smile, Star, Mail, Phone } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatbotPage() {
  const getInitialMessage = (type: string) => {
    switch (type) {
      case 'learning':
        return 'Xin chào! Tôi là Chatbot Học Tập. Tôi có thể giúp bạn hiểu các khái niệm, giải thích bài học và hướng dẫn làm bài tập. Bạn cần hỗ trợ gì?';
      case 'debate':
        return 'Xin chào! Tôi là Chatbot Debate. Tôi có thể giúp bạn tranh luận, phân tích quan điểm và thảo luận về các chủ đề học tập. Hãy cùng thảo luận!';
      case 'qa':
        return 'Xin chào! Tôi là Chatbot Q&A. Tôi có thể trả lời các câu hỏi về thông tin khóa học, lịch thi và hướng dẫn sử dụng hệ thống. Bạn muốn biết gì?';
      default:
        return 'Xin chào! Tôi là AI Chatbot của Soft Skills Department. Tôi có thể giúp bạn gì hôm nay?';
    }
  };

  const [selectedType, setSelectedType] = useState('learning');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: getInitialMessage('learning'),
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const chatbotTypes = [
    {
      id: 'learning',
      name: 'CHATBOT HỌC TẬP',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'Our curriculum focuses on nurturing cognitive, social, emotional, and physical development, ensuring a well-rounded education.'
    },
    {
      id: 'debate',
      name: 'CHATBOT DEBATE',
      icon: MessageSquare,
      color: 'bg-teal-500',
      description: 'Our passionate and qualified teachers create a supportive and stimulating learning environment.'
    },
    {
      id: 'qa',
      name: 'CHATBOT Q&A',
      icon: Star,
      color: 'bg-blue-400',
      description: 'We prioritize safety and provide a warm and caring atmosphere for every child.'
    }
  ];

  // Auto scroll to chat section when type changes
  const scrollToChat = () => {
    if (chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const suggestedQuestions = {
    learning: [
      'Giải thích khái niệm kỹ năng mềm',
      'Làm thế nào để cải thiện kỹ năng giao tiếp?',
      'Các bước để làm việc nhóm hiệu quả'
    ],
    debate: [
      'Tranh luận về tầm quan trọng của kỹ năng mềm',
      'Phân tích ưu nhược điểm của làm việc nhóm',
      'Thảo luận về vai trò của lãnh đạo'
    ],
    qa: [
      'Lịch thi của môn MLN111',
      'Cách sử dụng hệ thống LMS',
      'Thông tin về giảng viên'
    ]
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Try to call Gemini API
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          type: selectedType
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.response || `Cảm ơn bạn đã hỏi về "${currentMessage}". Đây là câu trả lời từ ${chatbotTypes.find(t => t.id === selectedType)?.name}.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      console.log('Gemini API not available, using intelligent fallback response');
      
      // Intelligent fallback responses based on message content
      let response = '';
      const message = currentMessage.toLowerCase();
      
      if (selectedType === 'learning') {
        if (message.includes('kỹ năng mềm') || message.includes('soft skills')) {
          response = 'Kỹ năng mềm là những khả năng cá nhân giúp bạn tương tác hiệu quả với người khác. Bao gồm: giao tiếp, làm việc nhóm, lãnh đạo, giải quyết vấn đề, tư duy phản biện, và quản lý thời gian.';
        } else if (message.includes('giao tiếp')) {
          response = 'Giao tiếp hiệu quả bao gồm: lắng nghe tích cực, diễn đạt rõ ràng, sử dụng ngôn ngữ cơ thể phù hợp, và thấu hiểu người nghe. Hãy thực hành thường xuyên để cải thiện.';
        } else if (message.includes('làm việc nhóm')) {
          response = 'Làm việc nhóm hiệu quả cần: phân chia vai trò rõ ràng, giao tiếp cởi mở, tôn trọng ý kiến khác, và cùng hướng tới mục tiêu chung.';
        } else {
          response = `Đây là câu hỏi thú vị về "${currentMessage}". Trong bộ môn Kỹ năng mềm, chúng ta học cách phát triển các kỹ năng cá nhân và xã hội. Bạn có thể tìm hiểu thêm trong thư viện tài liệu.`;
        }
      } else if (selectedType === 'debate') {
        if (message.includes('tầm quan trọng') || message.includes('quan trọng')) {
          response = 'Kỹ năng mềm rất quan trọng vì: 1) Giúp xây dựng mối quan hệ tốt, 2) Tăng hiệu quả công việc, 3) Phát triển sự nghiệp, 4) Cải thiện chất lượng cuộc sống. Tuy nhiên, cần cân bằng với kỹ năng cứng.';
        } else if (message.includes('ưu nhược điểm') || message.includes('pros and cons')) {
          response = 'Ưu điểm: Tăng hiệu quả làm việc, cải thiện mối quan hệ, phát triển sự nghiệp. Nhược điểm: Cần thời gian rèn luyện, khó đo lường, phụ thuộc vào môi trường.';
        } else {
          response = `Hãy cùng tranh luận về "${currentMessage}". Tôi nghĩ đây là chủ đề thú vị để thảo luận. Bạn có quan điểm nào về vấn đề này không?`;
        }
      } else if (selectedType === 'qa') {
        if (message.includes('lịch thi') || message.includes('schedule')) {
          response = 'Lịch thi sẽ được thông báo trên hệ thống LMS và email. Vui lòng kiểm tra thường xuyên để không bỏ lỡ thông tin quan trọng.';
        } else if (message.includes('lms') || message.includes('hệ thống')) {
          response = 'Hệ thống LMS giúp bạn: xem tài liệu, làm bài tập, kiểm tra điểm số, và tương tác với giảng viên. Đăng nhập bằng tài khoản sinh viên để sử dụng.';
        } else {
          response = `Cảm ơn bạn đã hỏi về "${currentMessage}". Đây là thông tin từ hệ thống Q&A. Nếu cần hỗ trợ thêm, vui lòng liên hệ phòng đào tạo.`;
        }
      } else {
        response = `Cảm ơn bạn đã hỏi về "${currentMessage}". Đây là câu trả lời từ ${chatbotTypes.find(t => t.id === selectedType)?.name}. Tôi đang học hỏi để có thể hỗ trợ bạn tốt hơn!`;
      }
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setMessages([{
      id: 1,
      type: 'bot',
      content: getInitialMessage(type),
      timestamp: new Date()
    }]);
    // Auto scroll to chat section
    setTimeout(scrollToChat, 100);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-blue-800 text-white py-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">i!</span>
          </div>
          <div className="absolute top-20 right-16 w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded"></div>
          </div>
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">CHATBOT AI</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Cùng chatbot AI giải đáp những thắc mắc về các môn học bộ môn kỹ năng mềm tại trường Đại học FPT
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {chatbotTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`${type.color} rounded-lg p-8 text-center text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                      selectedType === type.id ? 'ring-4 ring-white ring-opacity-50' : ''
                    }`}
                    onClick={() => handleTypeChange(type.id)}
                  >
                    <div className="flex justify-center mb-6">
                      <IconComponent className="w-16 h-16" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{type.name}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chat Interface Section */}
        <section ref={chatSectionRef} className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Title */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 ${chatbotTypes.find(t => t.id === selectedType)?.color} rounded-lg flex items-center justify-center text-white mr-4`}>
                  {(() => {
                    const IconComponent = chatbotTypes.find(t => t.id === selectedType)?.icon || Smile;
                    return <IconComponent className="h-8 w-8" />;
                  })()}
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  {chatbotTypes.find(t => t.id === selectedType)?.name}
                </h2>
              </div>
            </div>

            {/* Chat Container */}
            <div className="overflow-hidden">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">
                        {message.content.split('\n').map((line, index) => {
                          // Handle bullet points
                          if (line.trim().startsWith('- ')) {
                            return (
                              <div key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{line.substring(2)}</span>
                              </div>
                            );
                          }
                          // Handle numbered lists
                          if (line.trim().match(/^\d+\.\s/)) {
                            return (
                              <div key={index} className="flex items-start">
                                <span className="mr-2 font-semibold">{line.match(/^\d+\./)?.[0]}</span>
                                <span>{line.replace(/^\d+\.\s/, '')}</span>
                              </div>
                            );
                          }
                          // Handle bold text
                          if (line.includes('**')) {
                            const parts = line.split(/(\*\*.*?\*\*)/g);
                            return (
                              <div key={index}>
                                {parts.map((part, partIndex) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return (
                                      <strong key={partIndex} className="font-semibold">
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  return part;
                                })}
                              </div>
                            );
                          }
                          // Regular text
                          return <div key={index}>{line}</div>;
                        })}
                      </div>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-pulse">Đang suy nghĩ...</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Questions */}
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">Câu hỏi gợi ý</p>
                <div className="flex gap-2 mb-4">
                  {suggestedQuestions[selectedType as keyof typeof suggestedQuestions]?.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="flex-1 px-3 py-2 bg-white bg-opacity-80 text-gray-700 rounded-lg text-sm hover:bg-opacity-100 transition-colors border border-gray-200"
                    >
                      Câu {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tôi có thể hỗ trợ gì cho bạn ^v^"
                    className="flex-1 px-4 py-3 bg-white bg-opacity-80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-opacity-100"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="p-3 bg-white bg-opacity-80 text-gray-600 rounded-lg hover:bg-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}