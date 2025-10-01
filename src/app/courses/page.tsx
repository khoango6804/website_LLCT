'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  FileText, 
  MessageSquare, 
  Download,
  Clock,
  Users,
  Star
} from 'lucide-react';

export default function CoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    { id: 'all', name: 'Tất cả môn học', color: 'bg-gray-500' },
    { id: 'math', name: 'Toán học', color: 'bg-blue-500' },
    { id: 'physics', name: 'Vật lý', color: 'bg-green-500' },
    { id: 'chemistry', name: 'Hóa học', color: 'bg-purple-500' },
    { id: 'biology', name: 'Sinh học', color: 'bg-red-500' },
    { id: 'english', name: 'Tiếng Anh', color: 'bg-yellow-500' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Đại số tuyến tính',
      subject: 'math',
      subjectName: 'Toán học',
      description: 'Khóa học về ma trận, định thức và không gian vector',
      materials: 25,
      videos: 12,
      quizzes: 8,
      students: 150,
      rating: 4.8,
      duration: '8 tuần',
      instructor: 'TS. Nguyễn Văn A',
      lastUpdated: '2 ngày trước'
    },
    {
      id: 2,
      title: 'Cơ học lượng tử',
      subject: 'physics',
      subjectName: 'Vật lý',
      description: 'Nguyên lý cơ bản của cơ học lượng tử và ứng dụng',
      materials: 30,
      videos: 15,
      quizzes: 10,
      students: 120,
      rating: 4.9,
      duration: '10 tuần',
      instructor: 'PGS.TS. Trần Thị B',
      lastUpdated: '1 ngày trước'
    },
    {
      id: 3,
      title: 'Hóa học hữu cơ',
      subject: 'chemistry',
      subjectName: 'Hóa học',
      description: 'Cấu trúc và phản ứng của các hợp chất hữu cơ',
      materials: 28,
      videos: 18,
      quizzes: 12,
      students: 180,
      rating: 4.7,
      duration: '12 tuần',
      instructor: 'TS. Lê Văn C',
      lastUpdated: '3 ngày trước'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thư viện môn học</h1>
              <p className="text-gray-600 mt-2">Khám phá và học tập với 5 môn học chính</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm môn học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lọc theo môn học</h2>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                    subjects.find(s => s.id === course.subject)?.color || 'bg-gray-500'
                  }`}>
                    {course.subjectName}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {course.materials} tài liệu
                  </div>
                  <div className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    {course.videos} video
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {course.quizzes} quiz
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {course.students} học viên
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <span>Cập nhật {course.lastUpdated}</span>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Vào học ngay
                  </button>
                  <div className="flex space-x-2">
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Tài liệu
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Diễn đàn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy môn học</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
}
