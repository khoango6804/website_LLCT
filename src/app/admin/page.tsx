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
  Trash2,
  Plus,
  Upload,
  Eye,
  Edit
} from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [activeAnnouncementTab, setActiveAnnouncementTab] = useState('yours');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    media: null
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tổng kết', icon: BarChart3 },
    { id: 'ai-data', label: 'Dữ liệu AI', icon: Brain },
    { id: 'lectures', label: 'Bài giảng', icon: BookOpen },
    { id: 'tests', label: 'Bài kiểm tra', icon: FileText },
    { id: 'news', label: 'Tin tức', icon: MessageSquare }
  ];

  const announcements = [
    { id: 1, title: 'Tên thông báo', date: '00/00/20xx', content: 'Nội dung thông báo...' },
    { id: 2, title: 'Tên thông báo', date: '00/00/20xx', content: 'Nội dung thông báo...' },
    { id: 3, title: 'Tên thông báo', date: '00/00/20xx', content: 'Nội dung thông báo...' },
    { id: 4, title: 'Tên thông báo', date: '00/00/20xx', content: 'Nội dung thông báo...' }
  ];

  const instructors = [
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' },
    { name: 'Nguyễn Văn Bình', email: 'binhvn@fpt.edu.vn' }
  ];

  const students = [
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' },
    { stt: '01', mssv: 'SE190099', name: 'Tên sinh viên' }
  ];

  const courseCards = [
    { title: 'Tên khóa học', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '00/00/20xx' },
    { title: 'Tên khóa học', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '00/00/20xx' },
    { title: 'Tên khóa học', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '00/00/20xx' }
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
          <main className="flex-1 p-6 space-y-8">
            {/* Posted Announcements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông báo đã đăng</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => setActiveAnnouncementTab('yours')}
                      className={`px-6 py-3 font-medium ${
                        activeAnnouncementTab === 'yours'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Của bạn
                    </button>
                    <button
                      onClick={() => setActiveAnnouncementTab('all')}
                      className={`px-6 py-3 font-medium ${
                        activeAnnouncementTab === 'all'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Tất cả
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                          <button className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Ngày đăng: {announcement.date}</p>
                        <p className="text-sm text-gray-700">{announcement.content}</p>
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
                </div>
              </div>
            </section>

            {/* New Announcement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông báo mới</h2>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên thông báo
                      </label>
                      <input
                        type="text"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                        placeholder="Ví dụ Giới thiệu tư tưởng HCM"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nội dung thông báo
                      </label>
                      <textarea
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                        rows={8}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn file media
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Chọn file
                        </button>
                        <div className="mt-4">
                          <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                              <p className="text-sm text-gray-600">aaaaaaa.img</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Đăng thông báo
                      </button>
                      <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1000</h3>
                    <p className="text-gray-600">Tổng bài giảng</p>
                    <div className="w-full h-1 bg-blue-600 mt-4"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1000</h3>
                    <p className="text-gray-600">Tổng dữ liệu AI</p>
                    <div className="w-full h-1 bg-blue-600 mt-4"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1000</h3>
                    <p className="text-gray-600">Tổng giảng viên</p>
                    <div className="w-full h-1 bg-blue-600 mt-4"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">1000</h3>
                    <p className="text-gray-600">Tổng bài kiểm tra</p>
                    <div className="w-full h-1 bg-blue-600 mt-4"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Instructors and Classes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Instructors List */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách giảng viên</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="space-y-4">
                    {instructors.map((instructor, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 text-sm">B</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{instructor.name}</p>
                          <p className="text-sm text-gray-600">{instructor.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Classes List */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách lớp</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex space-x-4 mb-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>HCM202</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>GD1706</option>
                    </select>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-700">STT</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">MSSV</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Tên sinh viên</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 text-sm text-gray-900">{student.stt}</td>
                            <td className="py-2 text-sm text-gray-900">{student.mssv}</td>
                            <td className="py-2 text-sm text-gray-900">{student.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            {/* AI Data and Lectures */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Data */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Dữ liệu AI</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {courseCards.map((card, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Brain className="h-8 w-8 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{card.title}</h3>
                            <p className="text-sm text-gray-600">{card.code}</p>
                            <p className="text-sm text-gray-600">{card.instructor}</p>
                            <p className="text-sm text-gray-500">{card.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Hiển thị tất cả
                  </button>
                </div>
              </section>

              {/* Lectures */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bài giảng</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {courseCards.map((card, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{card.title}</h3>
                            <p className="text-sm text-gray-600">{card.code}</p>
                            <p className="text-sm text-gray-600">{card.instructor}</p>
                            <p className="text-sm text-gray-500">{card.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Hiển thị tất cả
                  </button>
                </div>
              </section>
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