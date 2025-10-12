'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Smile, Puzzle, Lightbulb, Building, Mail, Phone } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ExercisesPage() {
  const [subjects] = useState([
    {
      id: 'mln111',
      code: 'MLN111',
      name: 'Kỹ năng mềm cơ bản',
      icon: GraduationCap,
      color: 'bg-blue-600',
      description: 'Các kỹ năng mềm cơ bản trong công việc'
    },
    {
      id: 'mln122',
      code: 'MLN122',
      name: 'Giao tiếp hiệu quả',
      icon: Smile,
      color: 'bg-blue-400',
      description: 'Kỹ năng giao tiếp và thuyết trình'
    },
    {
      id: 'mln131',
      code: 'MLN131',
      name: 'Tư duy phản biện',
      icon: Puzzle,
      color: 'bg-teal-500',
      description: 'Phát triển tư duy logic và phản biện'
    },
    {
      id: 'hcm202',
      code: 'HCM202',
      name: 'Lãnh đạo nhóm',
      icon: Lightbulb,
      color: 'bg-teal-600',
      description: 'Kỹ năng lãnh đạo và quản lý nhóm'
    },
    {
      id: 'vnr202',
      code: 'VNR202',
      name: 'Văn hóa doanh nghiệp',
      icon: Building,
      color: 'bg-purple-600',
      description: 'Hiểu biết về văn hóa và môi trường làm việc'
    }
  ]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">

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

      {/* Subject Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chọn môn học và kiểm tra xem bạn có "pass" hay không nhé ^0^
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Link
                  key={subject.id}
                  href={`/exercises/${subject.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="text-center">
                      <div className={`w-16 h-16 ${subject.color} rounded-lg flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.code}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{subject.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
    </ProtectedRoute>
  );
}