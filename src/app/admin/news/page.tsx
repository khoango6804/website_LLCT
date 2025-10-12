'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Brain,
  MessageSquare,
  Pencil,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

export default function AdminNewsPage() {
  const { user } = useAuth();
  const [activeSidebarItem, setActiveSidebarItem] = useState('news');

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tổng kết', icon: BarChart3 },
    { id: 'ai-data', label: 'Dữ liệu AI', icon: Brain },
    { id: 'lectures', label: 'Bài giảng', icon: BookOpen },
    { id: 'tests', label: 'Bài kiểm tra', icon: FileText },
    { id: 'news', label: 'Tin tức', icon: MessageSquare }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin',
      author: 'Nguyễn Văn Bình',
      date: '20 / 04 / 2025',
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-600 text-white">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <div>
                <div className="text-lg font-semibold">Soft Skills</div>
                <div className="text-sm opacity-90">Department</div>
              </div>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSidebarItem(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSidebarItem === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SS</span>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Soft Skills Department</h1>
                  <p className="text-sm text-gray-600">Trường ĐH FPT</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-medium">Chào mừng, Nguyễn Văn Bình</span>
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600">Quản trị viên</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">B</span>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Tin tức</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Thêm tin tức</span>
              </button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="w-full h-48 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <MessageSquare className="h-10 w-10 text-gray-500" />
                        </div>
                        <p className="text-xs text-gray-500">Laptop with video call</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{item.author}</p>
                    <p className="text-sm text-gray-500 mb-4">{item.date}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm">
                        Chỉnh sửa
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
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
                    <div>Địa chỉ:</div>
                    <div>Email: vanbinh@fpt.edu.vn</div>
                    <div>Zalo: 090.xxx.xxx</div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Thầy Văn Bình</h3>
                  <div className="space-y-2 text-sm">
                    <div>Chức vụ:</div>
                    <div>Email: vanbinh@fpt.edu.vn</div>
                    <div>Zalo: 090.xxx.xxx</div>
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
      </div>
    </ProtectedRoute>
  );
}
