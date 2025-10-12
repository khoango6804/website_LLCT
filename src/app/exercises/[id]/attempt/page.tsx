'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Mail, Phone } from 'lucide-react';

export default function TestAttemptPage({ params }: { params: { id: string } }) {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());

  const subjectInfo = {
    'mln111': { code: 'MLN111', name: 'Kỹ năng mềm cơ bản' },
    'mln122': { code: 'MLN122', name: 'Giao tiếp hiệu quả' },
    'mln131': { code: 'MLN131', name: 'Tư duy phản biện' },
    'hcm202': { code: 'HCM202', name: 'Lãnh đạo nhóm' },
    'vnr202': { code: 'VNR202', name: 'Văn hóa doanh nghiệp' }
  };

  const currentSubject = subjectInfo[params.id as keyof typeof subjectInfo] || subjectInfo.mln111;

  const questions = [
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 5,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 6,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    },
    {
      id: 7,
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      options: ["Câu trả lời 1", "Câu trả lời 2", "Câu trả lời 3", "Câu trả lời 4"],
      points: 1
    }
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleClearAnswer = (questionId: number) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  };

  const handleMarkQuestion = (questionId: number) => {
    setMarkedQuestions(prev => {
      const newMarked = new Set(prev);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return newMarked;
    });
  };

  const getQuestionStatus = (questionId: number) => {
    if (questionId === currentQuestion + 1) return 'current';
    if (answers[questionId] !== undefined) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-orange-500 text-white';
      case 'answered': return 'bg-teal-500 text-white';
      case 'unanswered': return 'bg-gray-300 text-white';
      default: return 'bg-gray-300 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/exercises/${params.id}`} className="flex items-center">
              <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">{currentSubject.code}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Tuần 1</div>
                <div>Chương 1: Tư tưởng Hồ Chí Minh</div>
                <div>Lần 2</div>
              </div>
            </div>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Questions */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  {/* Question Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Câu {question.id}</h3>
                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {question.points} điểm
                    </span>
                  </div>

                  {/* Question Content */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {question.question}
                  </p>

                  {/* Answer Options */}
                  <div className="space-y-3 mb-6">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionIndex}
                          checked={answers[question.id] === optionIndex}
                          onChange={() => handleAnswerChange(question.id, optionIndex)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleClearAnswer(question.id)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Xóa câu trả lời
                    </button>
                    <button
                      onClick={() => handleMarkQuestion(question.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <Star 
                        className={`h-4 w-4 ${markedQuestions.has(question.id) ? 'text-yellow-500 fill-current' : ''}`} 
                      />
                      <span>Đánh dấu câu hỏi</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Timer and Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Timer */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-center text-lg font-semibold text-gray-900 mb-4">
                  Thời gian làm bài còn
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Question Navigation Grid */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Điều hướng câu hỏi
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }, (_, index) => {
                    const questionNumber = index + 1;
                    const status = getQuestionStatus(questionNumber);
                    const isMarked = markedQuestions.has(questionNumber);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors relative ${getStatusColor(status)}`}
                      >
                        {questionNumber}
                        {isMarked && (
                          <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 fill-current" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SS</span>
                </div>
                <div className="text-white">
                  <div className="text-lg font-semibold">Soft Skills Department</div>
                  <div className="text-sm opacity-90">Trường ĐH FPT</div>
                </div>
              </div>
            </div>

            {/* Center Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Nếu bạn có thắc mắc hay cần giúp đỡ, liên hệ ngay
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Văn phòng Bộ môn Kỹ năng mềm</strong>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email: vanbinh@fpt.edu.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Zalo: 090.xxx.xxx</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thầy Văn Bình</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email: vanbinh@fpt.edu.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Zalo: 090.xxx.xxx</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="border-t border-blue-700 mt-8 pt-8 text-center">
            <p className="text-sm opacity-90">
              Soft Skills Department | Trường Đại học FPT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}