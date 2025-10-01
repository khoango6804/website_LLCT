'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Shield,
  UserPlus,
  FileText,
  MessageSquare,
  Database,
  Activity
} from 'lucide-react';

export default function AdminPage() {
  const { user, hasRole } = useAuth();

  const stats = [
    {
      title: 'Tổng người dùng',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Khóa học',
      value: '89',
      change: '+5%',
      icon: BookOpen,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Bài tập',
      value: '456',
      change: '+8%',
      icon: FileText,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Tin nhắn',
      value: '2,345',
      change: '+15%',
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      action: 'Tạo khóa học mới',
      time: '5 phút trước',
      type: 'course'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      action: 'Đăng bài tập',
      time: '15 phút trước',
      type: 'exercise'
    },
    {
      id: 3,
      user: 'Lê Văn C',
      action: 'Tham gia khóa học',
      time: '30 phút trước',
      type: 'enrollment'
    },
    {
      id: 4,
      user: 'Phạm Thị D',
      action: 'Gửi tin nhắn',
      time: '1 giờ trước',
      type: 'message'
    }
  ];

  const quickActions = [
    {
      title: 'Quản lý người dùng',
      description: 'Thêm, sửa, xóa người dùng',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Quản lý khóa học',
      description: 'Duyệt và quản lý khóa học',
      icon: BookOpen,
      href: '/admin/courses',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Báo cáo thống kê',
      description: 'Xem báo cáo chi tiết',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Cài đặt hệ thống',
      description: 'Cấu hình hệ thống',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <ProtectedRoute requiredRole="admin">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bảng điều khiển Admin</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Chào mừng, {user?.full_name}! Quản lý hệ thống E-Learning Platform
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
                    <div className={`p-3 rounded-full ${stat.color} dark:bg-opacity-80`}>
                      <Icon className="h-6 w-6" />
              </div>
            </div>
            </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Thao tác nhanh</h2>
              </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <a
                          key={index}
                          href={action.href}
                          className={`${action.color} text-white p-4 rounded-lg transition-colors`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className="h-6 w-6" />
              <div>
                              <h3 className="font-semibold">{action.title}</h3>
                              <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
                        </a>
                      );
                    })}
          </div>
        </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hoạt động gần đây</h2>
                </div>
            <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                        </div>
                          </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trạng thái hệ thống</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Database</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Hoạt động bình thường</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Redis Cache</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Hoạt động bình thường</p>
            </div>
          </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">AI Service</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Hoạt động bình thường</p>
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