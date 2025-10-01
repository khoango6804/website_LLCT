'use client';

import { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Circle, 
  Play, 
  BarChart3, 
  Calendar,
  Award,
  BookOpen,
  Timer
} from 'lucide-react';

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState('pretest');

  const testTypes = [
    {
      id: 'pretest',
      name: 'Pre-test',
      description: 'Kiểm tra kiến thức trước khi học',
      icon: Play,
      color: 'bg-blue-500'
    },
    {
      id: 'posttest',
      name: 'Post-test',
      description: 'Đánh giá sau khi hoàn thành khóa học',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 'quiz',
      name: 'Quiz ngắn',
      description: 'Bài kiểm tra theo từng chương/bài',
      icon: FileText,
      color: 'bg-purple-500'
    }
  ];

  const tests = [
    {
      id: 1,
      title: 'Pre-test Toán học - Đại số tuyến tính',
      type: 'pretest',
      subject: 'Toán học',
      questions: 20,
      duration: 60,
      status: 'available',
      score: null,
      completedAt: null,
      deadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Quiz Chương 1: Ma trận cơ bản',
      type: 'quiz',
      subject: 'Toán học',
      questions: 10,
      duration: 30,
      status: 'completed',
      score: 85,
      completedAt: '2024-01-20',
      deadline: '2024-01-25'
    },
    {
      id: 3,
      title: 'Post-test Vật lý - Cơ học lượng tử',
      type: 'posttest',
      subject: 'Vật lý',
      questions: 25,
      duration: 90,
      status: 'locked',
      score: null,
      completedAt: null,
      deadline: '2024-03-01'
    }
  ];

  const history = [
    {
      id: 1,
      title: 'Quiz Chương 1: Ma trận cơ bản',
      subject: 'Toán học',
      score: 85,
      total: 100,
      completedAt: '2024-01-20',
      duration: 28
    },
    {
      id: 2,
      title: 'Quiz Chương 2: Định thức',
      subject: 'Toán học',
      score: 92,
      total: 100,
      completedAt: '2024-01-18',
      duration: 25
    },
    {
      id: 3,
      title: 'Pre-test Vật lý',
      subject: 'Vật lý',
      score: 78,
      total: 100,
      completedAt: '2024-01-15',
      duration: 55
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Có thể làm';
      case 'completed': return 'Đã hoàn thành';
      case 'locked': return 'Chưa mở khóa';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bài tập & Kiểm tra</h1>
              <p className="text-gray-600 mt-1">Đánh giá kiến thức và tiến trình học tập</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Types Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {testTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
                    activeTab === type.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {testTypes.find(t => t.id === activeTab)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {testTypes.find(t => t.id === activeTab)?.description}
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {tests.filter(test => test.type === activeTab).map((test) => (
                    <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                          {getStatusText(test.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {test.subject}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {test.questions} câu hỏi
                        </div>
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 mr-2" />
                          {test.duration} phút
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Hạn: {test.deadline}
                        </div>
                      </div>

                      {test.score && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Điểm số</span>
                            <span className="font-medium">{test.score}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${test.score}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        {test.status === 'available' && (
                          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                            <Play className="h-4 w-4 mr-2" />
                            Bắt đầu làm bài
                          </button>
                        )}
                        {test.status === 'completed' && (
                          <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Xem kết quả
                          </button>
                        )}
                        {test.status === 'locked' && (
                          <button disabled className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center">
                            <Circle className="h-4 w-4 mr-2" />
                            Chưa mở khóa
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {tests.filter(test => test.type === activeTab).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài kiểm tra</h3>
                    <p className="text-gray-500">Các bài kiểm tra sẽ được cập nhật sớm</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử làm bài</h2>
              
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">{item.subject}</div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Điểm số</span>
                      <span className="font-medium text-gray-900">{item.score}/{item.total}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(item.score / item.total) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.completedAt}</span>
                      <span>{item.duration} phút</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                Xem tất cả lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
