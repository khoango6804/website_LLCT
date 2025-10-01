'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Timer,
  Lock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { CourseCardSkeleton } from '@/components/LoadingSkeleton';

export default function ExercisesPage() {
  const [activeTab, setActiveTab] = useState('available');
  const [loading, setLoading] = useState(false);
  const { authFetch } = useAuth();

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
    },
    {
      id: 4,
      title: 'Quiz Chương 2: Vector và không gian',
      type: 'quiz',
      subject: 'Toán học',
      questions: 15,
      duration: 45,
      status: 'available',
      score: null,
      completedAt: null,
      deadline: '2024-02-10'
    }
  ];

  const filteredTests = tests.filter(test => {
    if (activeTab === 'available') return test.status === 'available';
    if (activeTab === 'completed') return test.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">Có thể làm</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">Đã hoàn thành</span>;
      case 'locked':
        return <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs font-medium">Chưa mở</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bài tập & Kiểm tra</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Đánh giá kiến thức và rèn luyện kỹ năng</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Test Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {testTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{type.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{type.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {['available', 'completed', 'all'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {tab === 'available' && 'Có thể làm'}
                  {tab === 'completed' && 'Đã hoàn thành'}
                  {tab === 'all' && 'Tất cả'}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tests List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{test.title}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{test.subject}</span>
                </div>
                {getStatusBadge(test.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm">{test.questions} câu hỏi</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Timer className="h-4 w-4 mr-2" />
                  <span className="text-sm">{test.duration} phút</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">Hạn: {new Date(test.deadline).toLocaleDateString('vi-VN')}</span>
                </div>
                {test.score !== null && (
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Award className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">{test.score} điểm</span>
                  </div>
                )}
              </div>

              {test.status === 'available' && (
                <Link
                  href={`/exercises/${test.id}/attempt`}
                  className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Bắt đầu làm bài
                </Link>
              )}
              {test.status === 'completed' && (
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Xem lại kết quả
                </button>
              )}
              {test.status === 'locked' && (
                <button 
                  disabled 
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Chưa mở
                </button>
              )}
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Không có bài tập</h3>
            <p className="text-gray-500 dark:text-gray-400">Chưa có bài tập nào trong mục này</p>
          </div>
        )}
      </div>
    </div>
  );
}
