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
  Award,
  Play,
  Download,
  MessageSquare,
  TrendingUp,
  Calendar,
  Bell,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  Target,
  Zap,
  GraduationCap,
  Book,
  TestTube
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { isAuthenticated, user, hasRole } = useAuth();

  const features = [
    {
      title: 'Thư viện giáo trình',
      description: 'Nurturing cognitive, social, emotional, and physical development through comprehensive curriculum resources.',
      icon: GraduationCap,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Chat Bot AI',
      description: 'Passionate teachers creating a supportive learning environment with AI-powered assistance.',
      icon: MessageCircle,
      color: 'text-cyan-600 bg-cyan-100'
    },
    {
      title: 'Kiểm tra',
      description: 'Prioritizing safety and providing a warm atmosphere for comprehensive skill assessment.',
      icon: TestTube,
      color: 'text-blue-600 bg-blue-100'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Phiên bản mới nhất của SEB đã cập nhập',
      description: 'Cập nhật các tính năng mới và cải thiện trải nghiệm người dùng',
      date: '10/10/2025',
      image: '/api/placeholder/400/250',
      isMain: true
    },
    {
      id: 2,
      title: 'Sự kiện Hội sử Mùa thu 2025 đã chính thức khởi động',
      description: 'Tôn vinh Chủ tịch Hồ Chí Minh và tạo sân chơi cho sinh viên',
      image: '/api/placeholder/200/150',
      isMain: false
    },
    {
      id: 3,
      title: 'Sự kiện Hội sử Mùa thu 2025 đã chính thức khởi động',
      description: 'Tôn vinh Chủ tịch Hồ Chí Minh và tạo sân chơi cho sinh viên',
      image: '/api/placeholder/200/150',
      isMain: false
    },
    {
      id: 4,
      title: 'Sự kiện Hội sử Mùa thu 2025 đã chính thức khởi động',
      description: 'Tôn vinh Chủ tịch Hồ Chí Minh và tạo sân chơi cho sinh viên',
      image: '/api/placeholder/200/150',
      isMain: false
    }
  ];

  const announcements = [
    {
      id: 1,
      instructor: 'Thầy Văn Bình',
      message: 'Lớp GD1703 slot 4 ngày 17/09/2025 chuyển sang phòng G04',
      contact: 'Liên hệ: 090.xxx.xxx'
    },
    {
      id: 2,
      instructor: 'Thầy Văn Bình',
      message: 'Lớp GD1703 slot 4 ngày 17/09/2025 chuyển sang phòng G04',
      contact: 'Liên hệ: 090.xxx.xxx'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-blue-800 overflow-hidden">
          {/* Background curved shape */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-48 translate-y-48 opacity-20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Thư viện online bộ môn
                </h1>
                <h2 className="text-5xl md:text-6xl font-bold text-blue-300 mb-6">
                  Soft Skills
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Kho học tập online bộ môn Kỹ năng mềm trường Đại học FPT
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/login"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                  >
                    Học ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
                  >
                    Trò chuyện cùng AI
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Info Boxes */}
              <div className="relative">
                {/* Student Image Placeholder */}
                <div className="absolute right-0 top-0 w-64 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Users className="h-32 w-32 text-gray-400" />
                </div>
                
                {/* Info Boxes */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Thư viện giáo trình</h3>
                        <p className="text-sm text-gray-600">Hỗ trợ sinh viên</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm ml-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Kiểm tra trình độ</h3>
                        <p className="text-sm text-gray-600">Chuẩn bị tinh thần trước kỳ thi</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Phản biện cùng AI</h3>
                        <p className="text-sm text-gray-600">Cùng có kiến thức</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Bắt đầu hành trình học tập của bạn
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá các tính năng học tập thông minh và hiệu quả
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tin tức mới nhất
              </h2>
              <p className="text-xl text-gray-600">
                Cập nhập thông tin mới nhất của bộ môn
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Main News */}
              <div className="space-y-6">
                {newsItems.filter(item => item.isMain).map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{item.date}</span>
                        <Link href={`/news/${item.id}`} className="text-blue-600 hover:text-blue-700 underline">
                          Đọc thêm
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Side News */}
              <div className="space-y-6">
                {newsItems.filter(item => !item.isMain).map((item) => (
                  <div key={item.id} className="flex space-x-4 bg-white rounded-lg shadow-lg p-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Announcements */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mr-4">
                Thông báo từ giảng viên
              </h2>
              <div className="w-16 h-1 bg-cyan-500"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Announcements */}
              <div className="space-y-6">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 mb-2">{announcement.instructor}</h3>
                    <p className="text-gray-700 mb-3">{announcement.message}</p>
                    <p className="text-sm text-gray-500">{announcement.contact}</p>
                  </div>
                ))}
              </div>
              
              {/* Images */}
              <div className="space-y-6">
                {announcements.map((_, index) => (
                  <div key={index} className="w-full h-32 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-cyan-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user - same homepage but with user info
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-800 overflow-hidden">
        {/* Background curved shape */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-48 translate-y-48 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Chào mừng trở lại,
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-blue-300 mb-6">
                {user?.full_name}!
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Kho học tập online bộ môn Kỹ năng mềm trường Đại học FPT
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/library"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  Thư viện
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/chatbot"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
                >
                  Trò chuyện cùng AI
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Content - Info Boxes */}
            <div className="relative">
              {/* Student Image Placeholder */}
              <div className="absolute right-0 top-0 w-64 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <Users className="h-32 w-32 text-gray-400" />
              </div>
              
              {/* Info Boxes */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Thư viện giáo trình</h3>
                      <p className="text-sm text-gray-600">Hỗ trợ sinh viên</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm ml-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Kiểm tra trình độ</h3>
                      <p className="text-sm text-gray-600">Chuẩn bị tinh thần trước kỳ thi</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phản biện cùng AI</h3>
                      <p className="text-sm text-gray-600">Cùng có kiến thức</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bắt đầu hành trình học tập của bạn
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các tính năng học tập thông minh và hiệu quả
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  href={
                    feature.title === 'Thư viện giáo trình' ? '/library' :
                    feature.title === 'Chat Bot AI' ? '/chatbot' :
                    feature.title === 'Kiểm tra' ? '/exercises' : '#'
                  }
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow block"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tin tức mới nhất
            </h2>
            <p className="text-xl text-gray-600">
              Cập nhập thông tin mới nhất của bộ môn
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main News */}
            <div className="space-y-6">
              {newsItems.filter(item => item.isMain).map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <Link href={`/news/${item.id}`} className="text-blue-600 hover:text-blue-700 underline">
                        Đọc thêm
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Side News */}
            <div className="space-y-6">
              {newsItems.filter(item => !item.isMain).map((item) => (
                <div key={item.id} className="flex space-x-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Announcements */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mr-4">
              Thông báo từ giảng viên
            </h2>
            <div className="w-16 h-1 bg-cyan-500"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Announcements */}
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-2">{announcement.instructor}</h3>
                  <p className="text-gray-700 mb-3">{announcement.message}</p>
                  <p className="text-sm text-gray-500">{announcement.contact}</p>
                </div>
              ))}
            </div>
            
            {/* Images */}
            <div className="space-y-6">
              {announcements.map((_, index) => (
                <div key={index} className="w-full h-32 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-cyan-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}