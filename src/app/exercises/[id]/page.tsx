'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Mail, Phone } from 'lucide-react';

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const subjectInfo = {
    'mln111': { code: 'MLN111', name: 'Kỹ năng mềm cơ bản' },
    'mln122': { code: 'MLN122', name: 'Giao tiếp hiệu quả' },
    'mln131': { code: 'MLN131', name: 'Tư duy phản biện' },
    'hcm202': { code: 'HCM202', name: 'Lãnh đạo nhóm' },
    'vnr202': { code: 'VNR202', name: 'Văn hóa doanh nghiệp' }
  };

  const currentSubject = subjectInfo[params.id as keyof typeof subjectInfo] || subjectInfo.mln111;

  const testCards = [
    {
      id: 1,
      name: 'Tên bài kiểm tra',
      instructor: 'Nguyễn Văn Bình',
      date: '20/00/20xx',
      attempt: 'Lần 1'
    },
    {
      id: 2,
      name: 'Tên bài kiểm tra',
      instructor: 'Nguyễn Văn Bình',
      date: '20/00/20xx',
      attempt: 'Lần 1'
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Header */}
        <div className="flex items-center mb-8">
          <Link href="/exercises" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">{currentSubject.code}</h1>
        </div>

        {/* Quick Test Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kiểm tra nhanh</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="text-gray-700 mb-6">
              Làm một bài kiểm tra tổng hợp gồm 60 câu được chọn random từ toàn bộ bộ đề
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg">
              Kiểm tra ngay
            </button>
          </div>
        </section>

        {/* Tests by Lesson Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Kiểm tra theo bài học</h2>
          
          {/* Week 1 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tuần 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {testCards.map((test) => (
                <div key={test.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Làm bài
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{test.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{test.instructor}</span>
                    <span>{test.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{test.attempt}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
              </div>
            </div>
          </div>

          {/* Week 1 (Second Section) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tuần 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {testCards.map((test) => (
                <div key={`${test.id}-2`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Làm bài
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{test.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{test.instructor}</span>
                    <span>{test.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{test.attempt}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
              </div>
            </div>
          </div>

          {/* Week 1 (Third Section) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tuần 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {testCards.map((test) => (
                <div key={`${test.id}-3`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Làm bài
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{test.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{test.instructor}</span>
                    <span>{test.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{test.attempt}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
              </div>
            </div>
          </div>

          {/* Week 1 (Fourth Section) */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tuần 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {testCards.map((test) => (
                <div key={`${test.id}-4`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      Làm bài
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{test.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{test.instructor}</span>
                    <span>{test.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{test.attempt}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">‹</button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">3</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-700">›</button>
              </div>
            </div>
          </div>
        </section>
      </main>

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
