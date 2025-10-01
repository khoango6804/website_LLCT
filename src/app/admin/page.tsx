'use client';

import { useState } from 'react';
import { 
  Settings, 
  Upload, 
  FolderOpen, 
  Users, 
  BarChart3, 
  FileText,
  Database,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  Clock,
  BookOpen,
  MessageCircle,
  Award
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'Tất cả môn học', color: 'bg-gray-500' },
    { id: 'math', name: 'Toán học', color: 'bg-blue-500' },
    { id: 'physics', name: 'Vật lý', color: 'bg-green-500' },
    { id: 'chemistry', name: 'Hóa học', color: 'bg-purple-500' },
    { id: 'biology', name: 'Sinh học', color: 'bg-red-500' },
    { id: 'english', name: 'Tiếng Anh', color: 'bg-yellow-500' }
  ];

  const documents = [
    {
      id: 1,
      name: 'Giáo trình Đại số tuyến tính.pdf',
      subject: 'math',
      subjectName: 'Toán học',
      type: 'Giáo trình',
      size: '2.5 MB',
      uploadDate: '2024-01-20',
      uploadBy: 'TS. Nguyễn Văn A',
      downloads: 150,
      status: 'active'
    },
    {
      id: 2,
      name: 'Bài giảng Cơ học lượng tử.pptx',
      subject: 'physics',
      subjectName: 'Vật lý',
      type: 'Bài giảng',
      size: '15.2 MB',
      uploadDate: '2024-01-18',
      uploadBy: 'PGS.TS. Trần Thị B',
      downloads: 89,
      status: 'active'
    },
    {
      id: 3,
      name: 'Tài liệu tham khảo Hóa học hữu cơ.docx',
      subject: 'chemistry',
      subjectName: 'Hóa học',
      type: 'Tài liệu tham khảo',
      size: '8.7 MB',
      uploadDate: '2024-01-15',
      uploadBy: 'TS. Lê Văn C',
      downloads: 67,
      status: 'pending'
    }
  ];

  const chatbotData = [
    {
      id: 1,
      source: 'Giáo trình Toán học - Chương 1',
      subject: 'math',
      subjectName: 'Toán học',
      type: 'Học tập',
      entries: 150,
      lastUpdated: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      source: 'Câu hỏi thường gặp Vật lý',
      subject: 'physics',
      subjectName: 'Vật lý',
      type: 'Q&A',
      entries: 89,
      lastUpdated: '2024-01-18',
      status: 'active'
    },
    {
      id: 3,
      source: 'Tài liệu tranh luận Hóa học',
      subject: 'chemistry',
      subjectName: 'Hóa học',
      type: 'Tranh luận',
      entries: 45,
      lastUpdated: '2024-01-15',
      status: 'pending'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Nguyễn Văn X',
      email: 'nguyenvanx@student.edu',
      subject: 'math',
      subjectName: 'Toán học',
      loginCount: 45,
      studyTime: 25.5,
      lastLogin: '2024-01-20',
      progress: 85,
      testScore: 92
    },
    {
      id: 2,
      name: 'Trần Thị Y',
      email: 'tranthiy@student.edu',
      subject: 'physics',
      subjectName: 'Vật lý',
      loginCount: 38,
      studyTime: 18.2,
      lastLogin: '2024-01-19',
      progress: 72,
      testScore: 88
    },
    {
      id: 3,
      name: 'Lê Văn Z',
      email: 'levanz@student.edu',
      subject: 'chemistry',
      subjectName: 'Hóa học',
      loginCount: 52,
      studyTime: 32.1,
      lastLogin: '2024-01-20',
      progress: 90,
      testScore: 95
    }
  ];

  const systemStats = {
    totalStudents: 1200,
    activeStudents: 850,
    totalDocuments: 500,
    totalDownloads: 15000,
    chatbotQueries: 2500,
    averageStudyTime: 15.5
  };

  const filteredDocuments = documents.filter(doc => 
    selectedSubject === 'all' || doc.subject === selectedSubject
  );

  const filteredStudents = students.filter(student => 
    selectedSubject === 'all' || student.subject === selectedSubject
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 rounded-full">
                <Settings className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản trị hệ thống</h1>
                <p className="text-gray-600 mt-1">Quản lý tài liệu, dữ liệu chatbot và theo dõi học sinh</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng học sinh</p>
                <p className="text-3xl font-bold text-gray-900">{systemStats.totalStudents}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {systemStats.activeStudents} đang hoạt động
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tài liệu</p>
                <p className="text-3xl font-bold text-gray-900">{systemStats.totalDocuments}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {systemStats.totalDownloads} lượt tải
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Truy vấn Chatbot</p>
                <p className="text-3xl font-bold text-gray-900">{systemStats.chatbotQueries}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% so với tháng trước
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thời gian học TB</p>
                <p className="text-3xl font-bold text-gray-900">{systemStats.averageStudyTime}h</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2h so với tuần trước
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'documents'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quản lý tài liệu
            </button>
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'chatbot'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Nguồn dữ liệu Chatbot
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'students'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quản lý học sinh
            </button>
          </div>
        </div>

        {/* Subject Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedSubject === subject.id
                    ? `${subject.color} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Quản lý tài liệu</h2>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải lên tài liệu
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Tên tài liệu</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Môn học</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Loại</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Kích thước</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Tải xuống</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                            subjects.find(s => s.id === doc.subject)?.color || 'bg-gray-500'
                          }`}>
                            {doc.subjectName}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{doc.type}</td>
                        <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                        <td className="py-3 px-4 text-gray-600">{doc.downloads}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Data Tab */}
        {activeTab === 'chatbot' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Nguồn dữ liệu Chatbot</h2>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Database className="h-4 w-4 mr-2" />
                  Thêm nguồn dữ liệu
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {chatbotData.map((data) => (
                  <div key={data.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{data.source}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {data.status === 'active' ? 'Hoạt động' : 'Chờ duyệt'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Môn học:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium text-white ${
                          subjects.find(s => s.id === data.subject)?.color || 'bg-gray-500'
                        }`}>
                          {data.subjectName}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Loại:</span> {data.type}
                      </div>
                      <div>
                        <span className="font-medium">Số mục:</span> {data.entries}
                      </div>
                      <div>
                        <span className="font-medium">Cập nhật:</span> {data.lastUpdated}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Xem chi tiết
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Chỉnh sửa
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Quản lý học sinh</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm học sinh..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm học sinh
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Học sinh</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Môn học</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Lần đăng nhập</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Thời gian học</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Tiến trình</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Điểm TB</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                            subjects.find(s => s.id === student.subject)?.color || 'bg-gray-500'
                          }`}>
                            {student.subjectName}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{student.loginCount}</td>
                        <td className="py-3 px-4 text-gray-600">{student.studyTime}h</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium text-gray-900">{student.testScore}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}