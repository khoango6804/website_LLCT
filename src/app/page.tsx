'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  BookOpen, 
  MessageCircle, 
  FileText, 
  Users, 
  BarChart3,
  ArrowRight,
  Star,
  Clock,
  Award
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated, user, hasRole } = useAuth();

  const features = [
    {
      title: 'Học tập thông minh',
      description: 'AI hỗ trợ học tập với chatbot thông minh và đề xuất nội dung phù hợp',
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Khóa học đa dạng',
      description: 'Hàng trăm khóa học từ cơ bản đến nâng cao, phù hợp mọi trình độ',
      icon: BookOpen,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Bài tập tương tác',
      description: 'Hệ thống bài tập đa dạng với chấm điểm tự động và phản hồi tức thì',
      icon: FileText,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Cộng đồng học tập',
      description: 'Kết nối với giảng viên và bạn học, chia sẻ kiến thức và kinh nghiệm',
      icon: Users,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const stats = [
    { label: 'Khóa học', value: '500+' },
    { label: 'Sinh viên', value: '10,000+' },
    { label: 'Giảng viên', value: '200+' },
    { label: 'Đánh giá', value: '4.9/5' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Học tập thông minh với{' '}
              <span className="text-blue-600 dark:text-blue-400">AI</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Nền tảng E-Learning hiện đại với AI, chatbot thông minh và hệ thống học tập tương tác. 
              Khám phá kiến thức mới, kết nối với cộng đồng học tập toàn cầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                Bắt đầu học ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/courses"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Khám phá khóa học
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Công nghệ tiên tiến, nội dung chất lượng và trải nghiệm học tập tuyệt vời
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <div className={`w-12 h-12 ${feature.color} dark:bg-opacity-80 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Chào mừng trở lại, {user?.full_name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {hasRole('admin') && 'Quản trị viên - Quản lý toàn bộ hệ thống'}
                {hasRole('instructor') && 'Giảng viên - Quản lý khóa học và sinh viên'}
                {!hasRole('admin') && !hasRole('instructor') && 'Sinh viên - Tiếp tục hành trình học tập của bạn'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions based on role */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hasRole('admin') && (
            <>
              <a href="/admin" className="bg-red-600 text-white p-6 rounded-lg hover:bg-red-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Bảng điều khiển Admin</h3>
                    <p className="text-sm opacity-90">Quản lý hệ thống</p>
                  </div>
                </div>
              </a>
            </>
          )}
          
          {hasRole('instructor') && (
            <>
              <a href="/instructor" className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">Bảng điều khiển Giảng viên</h3>
                    <p className="text-sm opacity-90">Quản lý khóa học</p>
                  </div>
                </div>
              </a>
            </>
          )}

          <a href="/courses" className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Khóa học</h3>
                <p className="text-sm opacity-90">Khám phá nội dung học tập</p>
              </div>
            </div>
          </a>

          <a href="/chatbot" className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">AI Chatbot</h3>
                <p className="text-sm opacity-90">Hỗ trợ học tập thông minh</p>
              </div>
            </div>
          </a>

          <a href="/exercises" className="bg-orange-600 text-white p-6 rounded-lg hover:bg-orange-700 transition-colors">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Bài tập</h3>
                <p className="text-sm opacity-90">Luyện tập và kiểm tra</p>
              </div>
            </div>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hoạt động gần đây</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Hoàn thành bài tập Toán học</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Đạt điểm cao trong bài kiểm tra</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1 ngày trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Nhận chứng chỉ hoàn thành khóa học</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">3 ngày trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}