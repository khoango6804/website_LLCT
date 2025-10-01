'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  MessageCircle, 
  FileText, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import UserMenu from './UserMenu';
import NotificationsBell from './NotificationsBell';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { href: '/', label: 'Trang chủ', icon: BookOpen },
    { href: '/courses', label: 'Thư viện môn học', icon: BookOpen },
    { href: '/chatbot', label: 'Chatbot', icon: MessageCircle },
    { href: '/exercises', label: 'Bài tập & Kiểm tra', icon: FileText },
    { href: '/instructors', label: 'Giảng viên', icon: Users },
    { href: '/community', label: 'Cộng đồng', icon: MessageSquare },
  ];

  // Add instructor-specific menu items
  if (hasRole('instructor')) {
    menuItems.push(
      { href: '/instructor/courses', label: 'Khóa học của tôi', icon: BookOpen },
      { href: '/instructor/exercises', label: 'Bài tập', icon: FileText },
      { href: '/instructor/students', label: 'Sinh viên', icon: Users }
    );
  }

  // Add admin menu only for admins
  if (hasRole('admin')) {
    menuItems.push({ href: '/admin', label: 'Quản trị', icon: Settings });
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">E-Learning</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            
            {/* User Menu or Login Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NotificationsBell />
                <UserMenu />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/login"
                  className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mx-3 mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
