'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ExerciseDetailPage() {
  const params = useParams();
  const subjectId = params.id as string;
  
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock data for subject details
  const subjectDetails = {
    'mln111': {
      code: 'MLN111',
      name: 'Kỹ năng mềm cơ bản',
      color: '#125093'
    },
    'mln122': {
      code: 'MLN122', 
      name: 'Giao tiếp hiệu quả',
      color: '#29B9E7'
    },
    'mln131': {
      code: 'MLN131',
      name: 'Tư duy phản biện', 
      color: '#49BBBD'
    },
    'hcm202': {
      code: 'HCM202',
      name: 'Lãnh đạo nhóm',
      color: '#49BBBD'
    },
    'vnr202': {
      code: 'VNR202',
      name: 'Văn hóa doanh nghiệp',
      color: '#5B72EE'
    }
  };

  const subject = subjectDetails[subjectId as keyof typeof subjectDetails] || subjectDetails['mln111'];

  // Mock test data
  const testCards = [
    {
      id: 1,
      title: 'Tên bài kiểm tra',
      instructor: 'Nguyễn Văn Bình',
      date: '20 / 00 / 20xx',
      attempt: 'Lần 1'
    },
    {
      id: 2,
      title: 'Tên bài kiểm tra',
      instructor: 'Nguyễn Văn Bình', 
      date: '20 / 00 / 20xx',
      attempt: 'Lần 1'
    },
    {
      id: 3,
      title: 'Tên bài kiểm tra',
      instructor: 'Nguyễn Văn Bình',
      date: '20 / 00 / 20xx', 
      attempt: 'Lần 1'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#125093] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute w-[20px] h-[20px] left-[1497.09px] top-[490.54px] bg-[#00CBB8] rounded-full"></div>
        <div className="absolute w-[24px] h-[24px] left-[610px] top-[528.75px] bg-[#29B9E7] rounded-full"></div>
        <div className="absolute w-[20px] h-[20px] left-[1024.50px] top-[586.96px] bg-[#8C7AFF] rounded-full"></div>

        {/* Floating Cards */}
        <div className="absolute w-[85.86px] h-[85.86px] left-[390px] top-[239.83px] transform -rotate-12 bg-white shadow-[0px_14px_44px_rgba(86,91,221,0.10)] rounded-[20px]"></div>
        <div className="absolute w-[62.36px] h-[62.36px] left-[403.96px] top-[248.85px] transform -rotate-12 bg-white shadow-[0px_16px_44px_rgba(13,15,28,0.10)] rounded-[20px]"></div>
        <div className="absolute w-[17.17px] h-[8.59px] left-[419px] top-[260.31px] transform -rotate-12 bg-[#545AE8] rounded-[4px]"></div>
        <div className="absolute w-[17.17px] h-[8.59px] left-[443.88px] top-[280.72px] transform -rotate-12 bg-[#545AE8] rounded-[4px]"></div>
        <div className="absolute w-[17.17px] h-[22.90px] left-[421.28px] top-[270.94px] transform -rotate-12 bg-[#545AE8] rounded-[4px]"></div>
        <div className="absolute w-[17.17px] h-[22.90px] left-[438.58px] top-[256.10px] transform -rotate-12 bg-[#F48C06] rounded-[4px]"></div>

        <div className="absolute w-[85.11px] h-[85.11px] left-[1531.74px] top-[231.08px] transform rotate-[10deg] bg-white shadow-[0px_14px_44px_rgba(86,91,221,0.10)] rounded-[20px]"></div>
        <div className="absolute w-[61.82px] h-[61.82px] left-[1541.21px] top-[244.56px] transform rotate-[10deg] bg-white shadow-[0px_16px_44px_rgba(13,15,28,0.10)] rounded-[20px]"></div>
        <div className="absolute w-[36.73px] h-[29.56px] left-[1550.11px] top-[261.64px] transform rotate-[10deg] overflow-hidden">
          <div className="w-[36.73px] h-[29.56px] left-[5.09px] top-0 absolute transform rotate-[10deg] bg-[#545AE8]"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-[54px] font-bold text-[#00CBB8] mb-6 leading-[81px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
              Kiểm tra
            </h1>
            <p className="text-[24px] text-white leading-[38.40px]" style={{fontFamily: 'Lexend', fontWeight: '400'}}>
              Kiểm tra và củng cố kiến thức để chuẩn bị cho những bài test sắp tới của bộ môn Kỹ năng mềm tại<br/>
              trường ĐH FPT
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Subject Header */}
            <div className="flex items-center justify-center gap-[85px] mb-20">
              <div className="w-[60px] h-[60px] relative">
                <div className="w-[41.25px] h-[37.50px] left-[9.38px] top-[11.25px] absolute bg-[#010514]"></div>
              </div>
              <div className="text-[#010514] text-[48px] leading-[62.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                {subject.code}
              </div>
            </div>

            <div className="flex flex-col items-center gap-[100px]">
              {/* Quick Test Section */}
              <div className="w-[1140px] flex flex-col items-center gap-[32px]">
                <div className="w-[832px] flex flex-col items-center gap-[18px]">
                  <h2 className="text-[32px] font-bold text-[#010514] leading-[48px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                    Kiểm tra nhanh
                  </h2>
                  <p className="text-[24px] text-[#5B5B5B] leading-[38.40px] text-center" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                    Làm một bài kiểm tra tổng hợp gồm 60 câu được chọn<br/>
                    random từ toàn bộ bộ đề
                  </p>
                </div>
                <button className="w-[270px] px-5 py-5 bg-[#49BBBD] rounded-[80px] text-white text-[22px] font-semibold transition-colors hover:bg-opacity-90" style={{fontFamily: 'SVN-Gilroy', fontWeight: '600', letterSpacing: '0.44px'}}>
                  Kiểm tra ngay
                </button>
              </div>

              {/* Tests by Lesson Section */}
              <div className="w-full flex flex-col items-center gap-[48px]">
                <h2 className="text-[32px] font-bold text-[#010514] leading-[48px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                  Kiểm tra theo bài học
                </h2>
                
                <div className="w-[1430px] flex flex-col gap-[64px]">
                  {/* Week 1 */}
                  <div className="flex flex-col items-center gap-[48px]">
                    <h3 className="w-full text-[28px] font-bold text-black leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                      Tuần 1
                    </h3>
                    <div className="w-full flex justify-between items-center">
                      {testCards.map((test) => (
                        <div key={test.id} className="w-[415px] flex flex-col">
                          {/* Icon */}
                          <div className="pl-[30px] flex justify-start items-start gap-[10px]">
                            <div className="p-5 bg-[#29B9E7] rounded-[12px] flex justify-start items-start gap-[10px]">
                              <div className="w-[34px] h-[34px] relative overflow-hidden">
                                <div className="w-[34px] h-[34px] left-0 top-0 absolute overflow-hidden">
                                  <div className="w-[28.68px] h-[28.66px] left-[2.12px] top-[2.12px] absolute bg-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Card */}
                          <div className="w-full pt-[80px] pb-[32px] px-[50px] bg-white shadow-[4px_4px_15px_#9DA1A6] rounded-[12px] flex flex-col items-end gap-[20px]">
                            <div className="w-full flex flex-col gap-[8px]">
                              <h4 className="w-full text-[#010514] text-[28px] font-bold leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                                {test.title}
                              </h4>
                              <div className="w-full flex justify-center items-center gap-[10px]">
                                <div className="flex-1 text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.instructor}
                                </div>
                                <div className="flex-1 text-right text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.date}
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-[10px]">
                              <div className="flex-1 text-[#5B5B5B] text-[20px] font-bold leading-[32px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>
                                {test.attempt}
                              </div>
                            </div>
                            <button className="w-[80px] pt-[8px] pb-[8px] border-b border-[#5B5B5B] flex justify-center items-center">
                              <span className="text-[#5B5B5B] text-[22px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                Làm bài
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="w-[270px] flex justify-between items-center">
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[32px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronLeft className="w-6 h-6 text-[#AEACAC]" />
                      </button>
                      <span className="text-[#010514] text-[24px] font-bold leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>1</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>2</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>3</span>
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[37px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronRight className="w-6 h-6 text-[#010514]" />
                      </button>
                    </div>
                  </div>

                  {/* Week 2 */}
                  <div className="flex flex-col items-center gap-[48px]">
                    <h3 className="w-full text-[28px] font-bold text-black leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                      Tuần 2
                    </h3>
                    <div className="w-full flex justify-between items-center">
                      {testCards.map((test) => (
                        <div key={test.id + 3} className="w-[415px] flex flex-col">
                          {/* Icon */}
                          <div className="pl-[30px] flex justify-start items-start gap-[10px]">
                            <div className="p-5 bg-[#29B9E7] rounded-[12px] flex justify-start items-start gap-[10px]">
                              <div className="w-[34px] h-[34px] relative overflow-hidden">
                                <div className="w-[34px] h-[34px] left-0 top-0 absolute overflow-hidden">
                                  <div className="w-[28.68px] h-[28.66px] left-[2.12px] top-[2.12px] absolute bg-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Card */}
                          <div className="w-full pt-[80px] pb-[32px] px-[50px] bg-white shadow-[4px_4px_15px_#9DA1A6] rounded-[12px] flex flex-col items-end gap-[20px]">
                            <div className="w-full flex flex-col gap-[8px]">
                              <h4 className="w-full text-[#010514] text-[28px] font-bold leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                                {test.title}
                              </h4>
                              <div className="w-full flex justify-center items-center gap-[10px]">
                                <div className="flex-1 text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.instructor}
                                </div>
                                <div className="flex-1 text-right text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.date}
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-[10px]">
                              <div className="flex-1 text-[#5B5B5B] text-[20px] font-bold leading-[32px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>
                                {test.attempt}
                              </div>
                            </div>
                            <button className="w-[80px] pt-[8px] pb-[8px] border-b border-[#5B5B5B] flex justify-center items-center">
                              <span className="text-[#5B5B5B] text-[22px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                Làm bài
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="w-[270px] flex justify-between items-center">
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[32px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronLeft className="w-6 h-6 text-[#AEACAC]" />
                      </button>
                      <span className="text-[#010514] text-[24px] font-bold leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>1</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>2</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>3</span>
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[37px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronRight className="w-6 h-6 text-[#010514]" />
                      </button>
                    </div>
                  </div>

                  {/* Week 3 */}
                  <div className="flex flex-col items-center gap-[48px]">
                    <h3 className="w-full text-[28px] font-bold text-black leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                      Tuần 3
                    </h3>
                    <div className="w-full flex justify-between items-center">
                      {testCards.map((test) => (
                        <div key={test.id + 6} className="w-[415px] flex flex-col">
                          {/* Icon */}
                          <div className="pl-[30px] flex justify-start items-start gap-[10px]">
                            <div className="p-5 bg-[#29B9E7] rounded-[12px] flex justify-start items-start gap-[10px]">
                              <div className="w-[34px] h-[34px] relative overflow-hidden">
                                <div className="w-[34px] h-[34px] left-0 top-0 absolute overflow-hidden">
                                  <div className="w-[28.68px] h-[28.66px] left-[2.12px] top-[2.12px] absolute bg-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Card */}
                          <div className="w-full pt-[80px] pb-[32px] px-[50px] bg-white shadow-[4px_4px_15px_#9DA1A6] rounded-[12px] flex flex-col items-end gap-[20px]">
                            <div className="w-full flex flex-col gap-[8px]">
                              <h4 className="w-full text-[#010514] text-[28px] font-bold leading-[36.40px]" style={{fontFamily: 'SVN-Poppins', fontWeight: '700'}}>
                                {test.title}
                              </h4>
                              <div className="w-full flex justify-center items-center gap-[10px]">
                                <div className="flex-1 text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.instructor}
                                </div>
                                <div className="flex-1 text-right text-[#5B5B5B] text-[14px] leading-[16.80px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                  {test.date}
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex justify-center items-center gap-[10px]">
                              <div className="flex-1 text-[#5B5B5B] text-[20px] font-bold leading-[32px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>
                                {test.attempt}
                              </div>
                            </div>
                            <button className="w-[80px] pt-[8px] pb-[8px] border-b border-[#5B5B5B] flex justify-center items-center">
                              <span className="text-[#5B5B5B] text-[22px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>
                                Làm bài
                              </span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="w-[270px] flex justify-between items-center">
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[32px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronLeft className="w-6 h-6 text-[#AEACAC]" />
                      </button>
                      <span className="text-[#010514] text-[24px] font-bold leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '700'}}>1</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>2</span>
                      <span className="text-[#010514] text-[24px] leading-[38.40px]" style={{fontFamily: 'SVN-Gilroy', fontWeight: '400'}}>3</span>
                      <button className="w-[50px] h-[50px] px-[19px] py-[11px] rounded-[37px] flex flex-col justify-center items-center gap-[10px]">
                        <ChevronRight className="w-6 h-6 text-[#010514]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}