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

export default function AdminTestsPage() {
  const { user } = useAuth();
  const [activeSidebarItem, setActiveSidebarItem] = useState('tests');

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tổng kết', icon: BarChart3 },
    { id: 'ai-data', label: 'Dữ liệu AI', icon: Brain },
    { id: 'lectures', label: 'Bài giảng', icon: BookOpen },
    { id: 'tests', label: 'Bài kiểm tra', icon: FileText },
    { id: 'news', label: 'Tin tức', icon: MessageSquare }
  ];

  const testSections = [
    {
      code: 'MLN111',
      name: 'Kỹ năng mềm cơ bản',
      items: [
        { 
          title: 'Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra nhanh',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        }
      ]
    },
    {
      code: 'MLN122',
      name: 'Giao tiếp hiệu quả',
      items: [
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        }
      ]
    },
    {
      code: 'MLN131',
      name: 'Tư duy phản biện',
      items: [
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        }
      ]
    },
    {
      code: 'HCM202',
      name: 'Lãnh đạo nhóm',
      items: [
        { 
          title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/06/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/06/2025', 
          questions: '30 câu' 
        },
        { 
          title: 'Giáo trình Kinh tế Chính trị Mác - Lê nin', 
          instructor: 'Nguyễn Văn Bình', 
          type: 'Kiểm tra theo bài',
          date: '20/04/2025', 
          questions: '30 câu' 
        }
      ]
    },
    {
      code: 'VNR202',
      name: 'Văn hóa doanh nghiệp',
      items: []
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
              <h2 className="text-3xl font-bold text-gray-900">Bài kiểm tra</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Thêm bài kiểm tra</span>
              </button>
            </div>

            {/* Test Sections */}
            <div className="space-y-8">
              {testSections.map((section) => (
                <div key={section.code} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{section.code}</h3>
                  
                  {section.items.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section.items.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="mb-4">
                              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-gray-500" />
                                  </div>
                                  <p className="text-xs text-gray-500">Laptop with video call</p>
                                </div>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-1">{item.instructor}</p>
                              <p className="text-sm text-gray-600 mb-1">{item.type}</p>
                              <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                              <p className="text-sm text-gray-500">{item.questions}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                Chỉnh sửa
                              </button>
                              <button className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center mt-6">
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                          <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-12 w-12 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Chưa có tài liệu</h4>
                      <p className="text-gray-600 mb-6">Hiện tại môn học này chưa có bài giảng nào, hãy cập nhập ngày nào!</p>
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Tải lên tài liệu
                      </button>
                    </div>
                  )}
                </div>
              ))}
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
