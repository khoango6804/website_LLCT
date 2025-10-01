'use client';

import { useState } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  Star,
  MessageSquare,
  FileText,
  Award,
  Clock,
  User
} from 'lucide-react';

export default function InstructorsPage() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [activeTab, setActiveTab] = useState('instructors');

  const instructors = [
    {
      id: 1,
      name: 'TS. Nguyễn Văn A',
      title: 'Giảng viên chính',
      subject: 'Toán học',
      avatar: '/api/placeholder/100/100',
      email: 'nguyenvana@university.edu',
      phone: '0123-456-789',
      office: 'Phòng 101, Tòa A',
      officeHours: 'Thứ 2, 4: 9:00-11:00',
      rating: 4.9,
      students: 150,
      experience: '15 năm',
      education: 'Tiến sĩ Toán học - Đại học Harvard',
      specialties: ['Đại số tuyến tính', 'Giải tích', 'Xác suất thống kê'],
      bio: 'Chuyên gia về Toán học ứng dụng với hơn 15 năm kinh nghiệm giảng dạy...',
      articles: 25,
      courses: 8
    },
    {
      id: 2,
      name: 'PGS.TS. Trần Thị B',
      title: 'Phó Giáo sư',
      subject: 'Vật lý',
      avatar: '/api/placeholder/100/100',
      email: 'tranthib@university.edu',
      phone: '0123-456-790',
      office: 'Phòng 205, Tòa B',
      officeHours: 'Thứ 3, 5: 14:00-16:00',
      rating: 4.8,
      students: 120,
      experience: '12 năm',
      education: 'Tiến sĩ Vật lý - MIT',
      specialties: ['Cơ học lượng tử', 'Vật lý hạt nhân', 'Vật lý chất rắn'],
      bio: 'Nghiên cứu viên hàng đầu về Vật lý lý thuyết...',
      articles: 30,
      courses: 6
    },
    {
      id: 3,
      name: 'TS. Lê Văn C',
      title: 'Giảng viên',
      subject: 'Hóa học',
      avatar: '/api/placeholder/100/100',
      email: 'levanc@university.edu',
      phone: '0123-456-791',
      office: 'Phòng 301, Tòa C',
      officeHours: 'Thứ 2, 6: 10:00-12:00',
      rating: 4.7,
      students: 180,
      experience: '10 năm',
      education: 'Tiến sĩ Hóa học - Stanford',
      specialties: ['Hóa học hữu cơ', 'Hóa học phân tích', 'Hóa học vật liệu'],
      bio: 'Chuyên gia về Hóa học hữu cơ và ứng dụng...',
      articles: 20,
      courses: 5
    }
  ];

  const teachingAssistants = [
    {
      id: 1,
      name: 'Nguyễn Thị D',
      subject: 'Toán học',
      year: 'Năm 3',
      email: 'nguyenthid@student.edu',
      rating: 4.8,
      students: 50,
      specialties: ['Đại số', 'Giải tích']
    },
    {
      id: 2,
      name: 'Trần Văn E',
      subject: 'Vật lý',
      year: 'Năm 4',
      email: 'tranvane@student.edu',
      rating: 4.9,
      students: 40,
      specialties: ['Cơ học', 'Điện từ học']
    }
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'Phương pháp mới trong giải tích ma trận',
      author: 'TS. Nguyễn Văn A',
      subject: 'Toán học',
      date: '2024-01-15',
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: 'Ứng dụng cơ học lượng tử trong công nghệ',
      author: 'PGS.TS. Trần Thị B',
      subject: 'Vật lý',
      date: '2024-01-12',
      views: 980,
      likes: 76
    },
    {
      id: 3,
      title: 'Tổng hợp hợp chất hữu cơ mới',
      author: 'TS. Lê Văn C',
      subject: 'Hóa học',
      date: '2024-01-10',
      views: 1100,
      likes: 92
    }
  ];

  const feedbackSystem = [
    {
      id: 1,
      from: 'Nguyễn Văn X',
      to: 'TS. Nguyễn Văn A',
      subject: 'Toán học',
      rating: 5,
      comment: 'Thầy giảng rất dễ hiểu, phương pháp giảng dạy hiệu quả',
      date: '2024-01-20',
      anonymous: false
    },
    {
      id: 2,
      from: 'Anonymous',
      to: 'PGS.TS. Trần Thị B',
      subject: 'Vật lý',
      rating: 4,
      comment: 'Cô giảng chi tiết nhưng đôi khi hơi nhanh',
      date: '2024-01-18',
      anonymous: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Giảng viên & Trợ giảng</h1>
              <p className="text-gray-600 mt-1">Thông tin và liên hệ với đội ngũ giảng dạy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('instructors')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'instructors'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Giảng viên
            </button>
            <button
              onClick={() => setActiveTab('assistants')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'assistants'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trợ giảng
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'articles'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bài viết phân tích
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'feedback'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phản hồi
            </button>
          </div>
        </div>

        {/* Instructors Tab */}
        {activeTab === 'instructors' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instructors List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {instructors.map((instructor) => (
                  <div key={instructor.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">{instructor.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{instructor.title} - {instructor.subject}</p>
                        <p className="text-sm text-gray-500 mb-4">{instructor.bio}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                            {instructor.students} học viên
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            {instructor.experience}
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            {instructor.articles} bài viết
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                            {instructor.courses} khóa học
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {instructor.specialties.map((specialty, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Mail className="h-4 w-4 mr-2" />
                            Liên hệ
                          </button>
                          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </button>
                          <button 
                            onClick={() => setSelectedInstructor(instructor)}
                            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedInstructor ? (
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chi tiết</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Liên hệ</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {selectedInstructor.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          {selectedInstructor.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          {selectedInstructor.office}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Giờ làm việc</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {selectedInstructor.officeHours}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Học vấn</h3>
                      <p className="text-sm text-gray-600">{selectedInstructor.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Chuyên môn</h3>
                      <div className="space-y-1">
                        {selectedInstructor.specialties.map((specialty, index) => (
                          <div key={index} className="text-sm text-gray-600">• {specialty}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Chọn giảng viên</h3>
                    <p className="text-gray-500">Nhấn "Chi tiết" để xem thông tin đầy đủ</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Teaching Assistants Tab */}
        {activeTab === 'assistants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachingAssistants.map((ta) => (
              <div key={ta.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ta.name}</h3>
                    <p className="text-gray-600">{ta.subject} - {ta.year}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{ta.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {ta.email}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {ta.students} học viên hỗ trợ
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Chuyên môn hỗ trợ</h4>
                  <div className="flex flex-wrap gap-2">
                    {ta.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Liên hệ trợ giảng
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            {recentArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Tác giả: {article.author}</span>
                      <span>Môn: {article.subject}</span>
                      <span>Ngày: {article.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {article.views} lượt xem
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {article.likes} thích
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Đây là tóm tắt ngắn gọn về nội dung bài viết. Bài viết này cung cấp những phân tích sâu sắc về chủ đề được đề cập...
                </p>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Đọc toàn bộ
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Tải xuống
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Chia sẻ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hệ thống phản hồi & đánh giá chéo</h2>
              <p className="text-gray-600 mb-6">
                Chia sẻ ý kiến của bạn về chất lượng giảng dạy và nhận phản hồi từ đồng nghiệp.
              </p>
              
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Gửi phản hồi mới
              </button>
            </div>
            
            <div className="space-y-4">
              {feedbackSystem.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {feedback.anonymous ? 'Phản hồi ẩn danh' : feedback.from}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Gửi cho {feedback.to} - {feedback.subject}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{feedback.comment}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{feedback.date}</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">Thích</button>
                      <button className="text-gray-600 hover:text-gray-700">Phản hồi</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
