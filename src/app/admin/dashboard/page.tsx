'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Brain,
  BookOpen,
  FileText,
  MessageSquare,
  Edit,
  ChevronLeft,
  ChevronRight,
  Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const sidebarItems = [
    { id: 'dashboard', title: 'Bảng tổng kết', icon: BarChart3, color: '#125093' },
    { id: 'ai-data', title: 'Dữ liệu AI', icon: Brain, color: '#00CBB8' },
    { id: 'library', title: 'Thư viện môn học', icon: BookOpen, color: '#5B72EE' },
    { id: 'products', title: 'Sản phẩm học tập', icon: FileText, color: '#F48C06', active: true },
    { id: 'tests', title: 'Bài kiểm tra', icon: FileText, color: '#29B9E7' },
    { id: 'news', title: 'Tin tức', icon: MessageSquare, color: '#00CBB8' }
  ];

  const courses = [
    {
      code: 'MLN111',
      products: [
        { id: 1, title: 'Tên sản phẩm', code: 'MLN111', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 2, title: 'Tên sản phẩm', code: 'MLN111', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 3, title: 'Tên sản phẩm', code: 'MLN111', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' }
      ]
    },
    {
      code: 'MLN122',
      products: [
        { id: 4, title: 'Tên sản phẩm', code: 'MLN122', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 5, title: 'Tên sản phẩm', code: 'MLN122', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 6, title: 'Tên sản phẩm', code: 'MLN122', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' }
      ]
    },
    {
      code: 'MLN131',
      products: [
        { id: 7, title: 'Tên sản phẩm', code: 'MLN131', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 8, title: 'Tên sản phẩm', code: 'MLN131', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 9, title: 'Tên sản phẩm', code: 'MLN131', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' }
      ]
    },
    {
      code: 'HCM202',
      products: [
        { id: 10, title: 'Tên sản phẩm', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 11, title: 'Tên sản phẩm', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' },
        { id: 12, title: 'Tên sản phẩm', code: 'HCM202', instructor: 'Nguyễn Văn Bình', date: '20 / 04 /2025', image: 'https://placehold.co/415x240' }
      ]
    },
    {
      code: 'VNR202',
      products: []
    }
  ];

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <div className="w-[270px] bg-white p-6">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://placehold.co/192x192" 
              alt="Logo" 
              className="w-48 h-48 mb-8"
            />
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-12">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.active;
              return (
                <div 
                  key={item.id} 
                  className="flex items-center gap-6"
                >
                  <div 
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div 
                    className="flex-1"
                    style={{ 
                      color: '#010514', 
                      fontSize: 20, 
                      fontFamily: 'SVN-Gilroy', 
                      fontWeight: isActive ? '700' : '400', 
                      lineHeight: isActive ? 32 : 30, 
                      wordWrap: 'break-word' 
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {/* Header */}
          <div className="flex items-center gap-12 p-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span style={{ 
                  color: '#010514', 
                  fontSize: 24, 
                  fontFamily: 'SVN-Gilroy', 
                  fontWeight: '400', 
                  lineHeight: 38.40, 
                  wordWrap: 'break-word' 
                }}>
                  Chào mừng, 
                </span>
                <span style={{ 
                  color: '#125093', 
                  fontSize: 32, 
                  fontFamily: 'SVN-Poppins', 
                  fontWeight: '700', 
                  lineHeight: 48, 
                  wordWrap: 'break-word' 
                }}>
                  Nguyễn Văn Bình
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div style={{ 
                  color: '#010514', 
                  fontSize: 24, 
                  fontFamily: 'SVN-Gilroy', 
                  fontWeight: '700', 
                  lineHeight: 38.40, 
                  wordWrap: 'break-word' 
                }}>
                  Quản trị viên
                </div>
                <Edit className="w-8 h-8 text-[#1A1A1A]" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="px-6 pb-20">
            {/* Title and Update Button */}
            <div className="flex items-center justify-between mb-8">
              <h1 style={{ 
                color: '#010514', 
                fontSize: 48, 
                fontFamily: 'SVN-Poppins', 
                fontWeight: '700', 
                lineHeight: 62.40, 
                wordWrap: 'break-word' 
              }}>
                Sản phẩm học tập
              </h1>
              <button 
                onClick={() => console.log('Update clicked')}
                className="px-5 py-5 bg-[#125093] rounded-full shadow-lg"
                style={{ 
                  color: 'white', 
                  fontSize: 22, 
                  fontFamily: 'SVN-Gilroy', 
                  fontWeight: '600', 
                  letterSpacing: 0.44, 
                  wordWrap: 'break-word' 
                }}
              >
                Cập nhập
              </button>
            </div>

            {/* Course Sections */}
            <div className="space-y-12">
              {courses.map((course, courseIndex) => (
                <div key={course.code} className="space-y-8">
                  {/* Course Title */}
                  <h2 style={{ 
                    color: 'black', 
                    fontSize: 28, 
                    fontFamily: 'SVN-Poppins', 
                    fontWeight: '700', 
                    lineHeight: 36.40, 
                    wordWrap: 'break-word' 
                  }}>
                    {course.code}
                  </h2>

                  {/* Products Grid */}
                  {course.products.length > 0 ? (
                    <div className="space-y-12">
                      <div className="flex items-center gap-5">
                        {course.products.map((product, productIndex) => (
                          <div 
                            key={product.id}
                            className="bg-white rounded-2xl shadow-lg pb-8 flex flex-col gap-8"
                          >
                            <div className="flex flex-col gap-6">
                              <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-[415px] h-60 rounded-t-2xl"
                              />
                              <div className="px-6 flex flex-col gap-3">
                                <div className="flex items-center justify-between h-8">
                                  <div style={{ 
                                    color: '#010514', 
                                    fontSize: 20, 
                                    fontFamily: 'SVN-Gilroy', 
                                    fontWeight: '700', 
                                    lineHeight: 32, 
                                    wordWrap: 'break-word' 
                                  }}>
                                    {product.title}
                                  </div>
                                  <div style={{ 
                                    color: '#010514', 
                                    fontSize: 14, 
                                    fontFamily: 'SVN-Gilroy', 
                                    fontWeight: '400', 
                                    lineHeight: 16.80, 
                                    wordWrap: 'break-word' 
                                  }}>
                                    {product.code}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                  <div style={{ 
                                    color: '#5B5B5B', 
                                    fontSize: 16, 
                                    fontFamily: 'SVN-Gilroy', 
                                    fontWeight: '400', 
                                    wordWrap: 'break-word' 
                                  }}>
                                    {product.instructor}
                                  </div>
                                  <div className="flex items-center justify-center gap-2">
                                    <div style={{ 
                                      color: '#5B5B5B', 
                                      fontSize: 16, 
                                      fontFamily: 'SVN-Gilroy', 
                                      fontWeight: '400', 
                                      wordWrap: 'break-word' 
                                    }}>
                                      {product.date}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="px-6 flex items-center justify-between">
                              <button 
                                onClick={() => console.log('Edit clicked', product.id)}
                                className="px-5 py-3 bg-[#49BBBD] rounded-full shadow-lg"
                                style={{ 
                                  color: 'white', 
                                  fontSize: 20, 
                                  fontFamily: 'SVN-Gilroy', 
                                  fontWeight: '600', 
                                  wordWrap: 'break-word' 
                                }}
                              >
                                Chỉnh sửa
                              </button>
                              <button 
                                onClick={() => console.log('Delete clicked', product.id)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-6 h-6 text-[#1A1A1A]" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      <div className="flex items-center justify-center gap-6">
                        <button 
                          onClick={() => console.log('Previous page')}
                          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
                        >
                          <ChevronLeft className="w-6 h-6 text-[#AEACAC]" />
                        </button>
                        <span style={{ 
                          color: '#010514', 
                          fontSize: 24, 
                          fontFamily: 'SVN-Gilroy', 
                          fontWeight: '700', 
                          lineHeight: 38.40, 
                          wordWrap: 'break-word' 
                        }}>1</span>
                        <span style={{ 
                          color: '#010514', 
                          fontSize: 24, 
                          fontFamily: 'SVN-Gilroy', 
                          fontWeight: '400', 
                          lineHeight: 38.40, 
                          wordWrap: 'break-word' 
                        }}>2</span>
                        <span style={{ 
                          color: '#010514', 
                          fontSize: 24, 
                          fontFamily: 'SVN-Gilroy', 
                          fontWeight: '400', 
                          lineHeight: 38.40, 
                          wordWrap: 'break-word' 
                        }}>3</span>
                        <button 
                          onClick={() => console.log('Next page')}
                          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
                        >
                          <ChevronRight className="w-6 h-6 text-[#010514]" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="flex items-center gap-5">
                      <div className="bg-white rounded-2xl shadow-lg pb-8 flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                          <div className="w-[415px] h-60 bg-[#C4C4C4] rounded-t-2xl"></div>
                          <div className="w-25 h-25 mx-auto">
                            <div className="w-20 h-20 border-4 border-[#5B5B5B] rounded-full"></div>
                          </div>
                          <div className="px-6 flex flex-col gap-3">
                            <div className="h-8 flex flex-col justify-start gap-4">
                              <div style={{ 
                                color: '#010514', 
                                fontSize: 20, 
                                fontFamily: 'SVN-Gilroy', 
                                fontWeight: '700', 
                                lineHeight: 32, 
                                wordWrap: 'break-word' 
                              }}>
                                Chưa có sản phẩm
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <div style={{ 
                                color: '#5B5B5B', 
                                fontSize: 16, 
                                fontFamily: 'SVN-Gilroy', 
                                fontWeight: '400', 
                                wordWrap: 'break-word' 
                              }}>
                                Hiện tại môn học này chưa có sản phẩm học tập nào, hãy cập nhập ngay !
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="w-full py-15 bg-[#125093] flex flex-col items-center gap-20"
        style={{ paddingTop: 60, paddingBottom: 60 }}
      >
        <div className="w-[1386px] h-[504px] flex flex-col justify-between items-center">
          <div className="flex items-center gap-11">
            <img 
              src="https://placehold.co/112x112" 
              alt="Logo" 
              className="w-28 h-28"
            />
            <div 
              className="w-20 h-0 border border-white border-opacity-30"
              style={{ transform: 'rotate(90deg)' }}
            ></div>
            <div style={{ 
              width: 240, 
              color: 'white', 
              fontSize: 24, 
              fontFamily: 'Arimo', 
              fontWeight: '400', 
              lineHeight: 38.40, 
              wordWrap: 'break-word' 
            }}>
              Soft Skill Department         Trường ĐH FPT
            </div>
          </div>
          
          <div className="w-full flex flex-col items-center gap-14">
            <div 
              className="w-full text-center"
              style={{ 
                color: 'rgba(255, 255, 255, 0.30)', 
                fontSize: 24, 
                fontFamily: 'Arimo', 
                fontWeight: '400', 
                lineHeight: 38.40, 
                wordWrap: 'break-word' 
              }}
            >
              Nếu bạn có thắc mắc hay cần giúp đỡ, liên hệ ngay
            </div>
            
            <div className="w-full flex justify-between items-center">
              <div style={{ 
                color: 'white', 
                fontSize: 20, 
                fontFamily: 'SVN-Gilroy', 
                fontWeight: '400', 
                lineHeight: 30, 
                wordWrap: 'break-word' 
              }}>
                Văn phòng Bộ môn Kỹ năng mềm          Địa chỉ: <br/>
                Email: vanbinh@fpt.edu.vn          Zalo: 090.xxx.xxx
              </div>
              <div style={{ 
                color: 'white', 
                fontSize: 20, 
                fontFamily: 'SVN-Gilroy', 
                fontWeight: '400', 
                lineHeight: 30, 
                wordWrap: 'break-word' 
              }}>
                Thầy Văn Bình          Chức vụ: <br/>
                Email: vanbinh@fpt.edu.vn          Zalo: 090.xxx.xxx
              </div>
              <div style={{ 
                color: 'white', 
                fontSize: 20, 
                fontFamily: 'SVN-Gilroy', 
                fontWeight: '400', 
                lineHeight: 30, 
                wordWrap: 'break-word' 
              }}>
                Thầy Văn Bình          Chức vụ<br/>
                Email: vanbinh@fpt.edu.vn          Zalo: 090.xxx.xxx
              </div>
            </div>
          </div>
          
          <div 
            className="w-full text-center"
            style={{ 
              color: 'rgba(255, 255, 255, 0.30)', 
              fontSize: 24, 
              fontFamily: 'Arimo', 
              fontWeight: '400', 
              lineHeight: 38.40, 
              wordWrap: 'break-word' 
            }}
          >
            Soft Skills Department | Trường Đại học FPT
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}