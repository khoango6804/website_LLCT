'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export default function TestResultPage({ params }: { params: { id: string } }) {
  const subjectInfo = {
    'mln111': { code: 'MLN111', name: 'Kỹ năng mềm cơ bản' },
    'mln122': { code: 'MLN122', name: 'Giao tiếp hiệu quả' },
    'mln131': { code: 'MLN131', name: 'Tư duy phản biện' },
    'hcm202': { code: 'HCM202', name: 'Lãnh đạo nhóm' },
    'vnr202': { code: 'VNR202', name: 'Văn hóa doanh nghiệp' }
  };

  const currentSubject = subjectInfo[params.id as keyof typeof subjectInfo] || subjectInfo.mln111;

  const testResults = [
    {
      attempt: 'Lần 1',
      type: 'Bài kiểm tra trước',
      totalScore: '8.0/10',
      correctAnswers: '40/60',
      timeSpent: '00:30:00',
      date: '04 / 10 / 2025'
    },
    {
      attempt: 'Lần 2',
      type: 'Bài kiểm tra trước',
      totalScore: '8.0/10',
      correctAnswers: '40/60',
      timeSpent: '00:30:00',
      date: '04 / 10 / 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <div className="text-white">
                <div className="text-lg font-semibold">Soft Skills Department</div>
                <div className="text-sm opacity-90">Trường ĐH FPT</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/courses" className="text-white hover:text-blue-200 transition-colors">
                Thư viện
              </Link>
              <Link href="/chatbot" className="text-white hover:text-blue-200 transition-colors">
                Chatbot
              </Link>
              <Link href="/exercises" className="text-white hover:text-blue-200 transition-colors">
                Kiểm tra
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">A</span>
              </div>
              <span className="text-white font-medium">Nguyễn Thị A</span>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
          <span className="text-2xl text-purple-300">!</span>
        </div>
        <div className="absolute top-20 right-16 w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-300 rounded"></div>
        </div>
        <div className="absolute bottom-10 left-1/4 w-4 h-4 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-purple-400 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-teal-400 mb-6">
            Kiểm tra
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Kiểm tra và củng cố kiến thức để chuẩn bị cho những bài test sắp tới của bộ môn Kỹ năng mềm tại trường ĐH FPT
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              KẾT QUẢ
            </h2>
            <p className="text-lg text-gray-600">
              Kiểm tra theo bài
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {testResults.map((result, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-blue-800">
                    {result.attempt}
                  </h3>
                  <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
                    {result.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Tổng điểm:</span>
                      <span className="text-lg font-bold text-gray-900">{result.totalScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Số câu đúng:</span>
                      <span className="text-lg font-bold text-gray-900">{result.correctAnswers}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Thời gian làm bài:</span>
                      <span className="text-lg font-bold text-gray-900">{result.timeSpent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Ngày làm bài:</span>
                      <span className="text-lg font-bold text-gray-900">{result.date}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <Link
                      href={`/exercises/${params.id}/attempt`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Làm lại bài kiểm tra
                    </Link>
                    <Link
                      href={`/exercises/${params.id}`}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Quay lại danh sách
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Actions */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">
                Bạn muốn làm gì tiếp theo?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/exercises"
                  className="bg-white text-blue-600 px-6 py-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-center font-medium"
                >
                  Chọn môn học khác
                </Link>
                <Link
                  href="/chatbot"
                  className="bg-white text-blue-600 px-6 py-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-center font-medium"
                >
                  Hỏi Chatbot AI
                </Link>
                <Link
                  href="/courses"
                  className="bg-white text-blue-600 px-6 py-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors text-center font-medium"
                >
                  Xem thư viện
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email: vanbinh@fpt.edu.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Zalo: 090.xxx.xxx</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thầy Văn Bình</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email: vanbinh@fpt.edu.vn</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Zalo: 090.xxx.xxx</span>
                </div>
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
  );
}
