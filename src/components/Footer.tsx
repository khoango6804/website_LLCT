import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Logo and Department */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <div className="text-white">
                <div className="text-lg font-semibold">Soft Skills Department</div>
              </div>
            </div>
            
            {/* Vertical Line */}
            <div className="w-px h-12 bg-white opacity-30"></div>
            
            {/* Department Info */}
            <div className="text-white">
              <div className="text-lg font-semibold">Soft Skill Department</div>
              <div className="text-sm opacity-90">Trường ĐH FPT</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <p className="text-xl">
            Nếu bạn có thắc mắc hay cần giúp đỡ, liên hệ ngay
          </p>
        </div>

        {/* Contact Information - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - Department Office */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Văn phòng Bộ môn Kỹ năng mềm
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm">Địa chỉ:</span>
              </div>
              <div>
                <span className="text-sm">Email: vanbinh@fpt.edu.vn</span>
              </div>
              <div>
                <span className="text-sm">Zalo: 090.xxx.xxx</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Instructor 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Thầy Văn Bình
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm">Chức vụ:</span>
              </div>
              <div>
                <span className="text-sm">Email: vanbinh@fpt.edu.vn</span>
              </div>
              <div>
                <span className="text-sm">Zalo: 090.xxx.xxx</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Instructor 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Thầy Văn Bình
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm">Chức vụ:</span>
              </div>
              <div>
                <span className="text-sm">Email: vanbinh@fpt.edu.vn</span>
              </div>
              <div>
                <span className="text-sm">Zalo: 090.xxx.xxx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-blue-700 pt-8">
          <div className="text-center">
            <p className="text-sm">
              Soft Skills Department | Trường Đại học FPT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}