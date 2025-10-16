'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Brain,
  MessageSquare,
  Pencil,
  Plus,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';

export default function AdminLibraryPage() {
  const { user } = useAuth();
  const [activeSidebarItem, setActiveSidebarItem] = useState('library');
  // Library is strictly for study materials (tài liệu, giáo trình)
  const [query, setQuery] = useState('');

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tổng kết', icon: BarChart3, color: '#125093', href: '/admin/dashboard' },
    { id: 'ai-data', label: 'Dữ liệu AI', icon: Brain, color: '#00CBB8', href: '/admin/ai-data' },
    { id: 'library', label: 'Thư viện môn học', icon: BookOpen, color: '#5B72EE', href: '/admin/library', active: true },
    { id: 'products', label: 'Sản phẩm học tập', icon: FileText, color: '#F48C06', href: '/admin/products' },
    { id: 'tests', label: 'Bài kiểm tra', icon: FileText, color: '#29B9E7', href: '/admin/tests' },
    { id: 'news', label: 'Tin tức', icon: MessageSquare, color: '#00CBB8', href: '/admin/news' }
  ];

  const librarySections = [
    {
      code: 'MLN111',
      name: 'Kỹ năng mềm cơ bản',
      items: [
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        }
      ]
    },
    {
      code: 'MLN122',
      name: 'Giao tiếp hiệu quả',
      items: [
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        }
      ]
    },
    {
      code: 'MLN131',
      name: 'Tư duy phản biện',
      items: [
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '30 câu' 
        },
        { 
          title: 'Tuần 1 - Tên bài kiểm tra', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '30 câu' 
        }
      ]
    },
    {
      code: 'HCM202',
      name: 'Lãnh đạo nhóm',
      items: [
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        },
        { 
          title: 'Tên giáo trình', 
          instructor: 'Nguyễn Văn Bình', 
          date: '20/04/2025', 
          duration: '20 phút' 
        }
      ]
    },
    {
      code: 'VNR202',
      name: 'Văn hóa doanh nghiệp',
      items: []
    }
  ];

  const sampleResources = [
    {
      id: 'r1',
      title: 'Slide Bài giảng Tuần 1',
      course: 'MLN111',
      type: 'PDF',
      size: '2.3MB',
      preview: 'https://placehold.co/640x360',
      tags: ['slide', 'week1'],
      uploader: 'Nguyễn Văn Bình',
      avatars: ['https://placehold.co/40x40', 'https://placehold.co/40x40'],
      downloads: 42,
      updatedAt: '20/04/2025'
    },
    {
      id: 'r2',
      title: 'Tài liệu tham khảo',
      course: 'MLN122',
      type: 'DOCX',
      size: '1.1MB',
      preview: 'https://placehold.co/640x360',
      tags: ['reference'],
      uploader: 'Trần Minh',
      avatars: ['https://placehold.co/40x40'],
      downloads: 18,
      updatedAt: '22/04/2025'
    },
    {
      id: 'r3',
      title: 'Video minh hoạ',
      course: 'MLN131',
      type: 'MP4',
      size: '120MB',
      preview: 'https://placehold.co/640x360',
      tags: ['video'],
      uploader: 'Nguyễn Văn Bình',
      avatars: ['https://placehold.co/40x40', 'https://placehold.co/40x40', 'https://placehold.co/40x40'],
      downloads: 73,
      updatedAt: '25/04/2025'
    }
  ];

  // Assignments/products will be handled in the separate "Sản phẩm học tập" section

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-white flex">
        {/* Sidebar (match dashboard) */}
        <div className="w-56 bg-white p-4 border-r border-gray-100">
          {/* Logo */}
          <div className="mb-6">
            <img src="https://placehold.co/192x192" alt="Logo" className="w-24 h-24 md:w-32 md:h-32 mb-6"/>
          </div>
          {/* Sidebar Menu */}
          <div className="space-y-8">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active;
              return (
                <Link key={item.id} href={item.href} className="flex items-center gap-4 hover:opacity-90">
                  <div className="w-8 h-8 flex items-center justify-center rounded" style={{ backgroundColor: item.color }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex-1 text-sm md:text-base ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>{item.label}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {/* Header (match dashboard) */}
          <div className="flex items-center gap-6 md:gap-8 p-4 md:p-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-gray-900 text-base md:text-lg">Chào mừng, </span>
                <span className="text-[#125093] text-xl md:text-2xl font-bold">Nguyễn Văn Bình</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-gray-900 text-base md:text-lg font-semibold">Quản trị viên</div>
                <Pencil className="w-5 h-5 md:w-6 md:h-6 text-[#1A1A1A]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Thư viện môn học</h2>
              <div className="flex gap-3 items-center">
              <div className="hidden md:block">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <span className={`px-3 py-1 text-sm rounded-md bg-white shadow text-gray-900`}>Tài liệu</span>
                </div>
              </div>
                <div className="flex items-center gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm theo tên, môn, tag..."
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-64"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Upload className="h-4 w-4 inline mr-2" /> Tải lên
                  </button>
                </div>
              </div>
            </div>

            {/* Resource/Assignment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleResources
                .filter((r) => `${r.title} ${r.course} ${r.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
                .map((r) => (
                <div key={r.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={r.preview} alt={r.title} className="w-full h-44 object-cover"/>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-gray-700 border border-gray-200">
                      {r.type}
                    </div>
                    {r.size && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
                        {r.size}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{r.course}</span>
                      <span className="text-xs text-gray-500">{r.updatedAt}</span>
                    </div>
                    <h4 className="text-gray-900 font-semibold line-clamp-1">{r.title}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {r.tags.map((t: string) => (
                        <span key={t} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">#{t}</span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {r.avatars.map((a: string, i: number) => (
                          <img key={i} src={a} className="w-7 h-7 rounded-full border-2 border-white"/>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">{r.downloads ? `${r.downloads} lượt tải` : 'Bản xem'}</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm">Xem / Tải</button>
                      <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">Chỉnh sửa</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Footer removed to avoid duplication with global footer */}
        </div>
      </div>
    </ProtectedRoute>
  );
}
