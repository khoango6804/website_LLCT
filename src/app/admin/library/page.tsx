'use client';

import { useState, useEffect } from 'react';
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
  Upload,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  Tag,
  User,
  X,
  Save
} from 'lucide-react';
import { API_ENDPOINTS, getFullUrl } from '@/lib/api';

interface LibraryDocument {
  id: string;
  title: string;
  description?: string;
  subject_code: string;
  subject_name: string;
  document_type: string;
  status: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  author: string;
  instructor_id?: string;
  tags: string[];
  keywords: string[];
  semester?: string;
  academic_year?: string;
  chapter?: string;
  lesson?: string;
  download_count: number;
  view_count: number;
  rating: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

interface Subject {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  department?: string;
  faculty?: string;
  prerequisite_subjects: string[];
  primary_instructor_id?: string;
  instructors: string[];
  total_documents: number;
  total_students: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminLibraryPage() {
  const { user, authFetch, hasRole } = useAuth();
  const [documents, setDocuments] = useState<LibraryDocument[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState<LibraryDocument | null>(null);

  const isAdmin = hasRole('admin');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch documents and subjects in parallel
      const [documentsRes, subjectsRes] = await Promise.all([
        authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENTS)),
        authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_SUBJECTS))
      ]);

      if (documentsRes.ok) {
        const documentsData = await documentsRes.json();
        setDocuments(documentsData);
      } else {
        console.error('Failed to fetch documents');
        setDocuments([]);
      }

      if (subjectsRes.ok) {
        const subjectsData = await subjectsRes.json();
        setSubjects(subjectsData);
      } else {
        console.error('Failed to fetch subjects');
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching library data:', error);
      setDocuments([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDocument = async (documentData: any) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENTS), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        setShowCreateModal(false);
      } else {
        console.error('Failed to create document');
        alert('Không thể tạo tài liệu');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Lỗi khi tạo tài liệu');
    }
  };

  const handleUpdateDocument = async (documentId: string, documentData: any) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENT_DETAIL(documentId)), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        setEditingDocument(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to update document:', errorData);
        alert(`Không thể cập nhật tài liệu: ${errorData.detail || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Lỗi khi cập nhật tài liệu');
    }
  };

  const handleUploadDocument = async (formData: FormData) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENT_UPLOAD), {
        method: 'POST',
        body: formData, // Don't set Content-Type for FormData
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        setShowUploadModal(false);
        alert('Upload tài liệu thành công!');
      } else {
        const errorData = await response.json();
        console.error('Failed to upload document:', errorData);
        alert(`Không thể upload tài liệu: ${errorData.detail || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Lỗi khi upload tài liệu');
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) return;

    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENT_DETAIL(documentId)), {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData(); // Refresh data
        alert('Đã xóa tài liệu thành công');
      } else {
        let errorMessage = 'Lỗi không xác định';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
          console.error('Failed to delete document:', errorData);
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          console.error('Failed to parse error response:', e);
        }
        alert(`Không thể xóa tài liệu: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Lỗi khi xóa tài liệu');
    }
  };

  const handleDownload = async (documentId: string) => {
    try {
      // First, increment download count
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENT_DOWNLOAD(documentId)), {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.file_url) {
          // Open file in new tab for download
          const fileUrl = getFullUrl(data.file_url);
          window.open(fileUrl, '_blank');
          
          // Refresh data to update download count
          await fetchData();
        } else {
          alert('File không tồn tại');
        }
      } else {
        console.error('Failed to download document');
        alert('Không thể tải file');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Lỗi khi tải file');
    }
  };

  const handleDownloadOld = async (documentId: string) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.LIBRARY_DOCUMENT_DOWNLOAD(documentId)), {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.file_url) {
          window.open(data.file_url, '_blank');
        } else {
          alert('Tài liệu chưa có file đính kèm');
        }
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Lỗi khi tải tài liệu');
    }
  };

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(query.toLowerCase()) ||
                         doc.author.toLowerCase().includes(query.toLowerCase()) ||
                         doc.subject_name.toLowerCase().includes(query.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || doc.subject_code === selectedSubject;
    const matchesType = selectedDocumentType === 'all' || doc.document_type === selectedDocumentType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const documentTypes = [
    { value: 'all', label: 'Tất cả loại' },
    { value: 'textbook', label: 'Giáo trình' },
    { value: 'lecture_notes', label: 'Bài giảng' },
    { value: 'reference', label: 'Tài liệu tham khảo' },
    { value: 'exercise', label: 'Bài tập' },
    { value: 'exam', label: 'Đề thi' },
    { value: 'presentation', label: 'Slide thuyết trình' },
    { value: 'video', label: 'Video bài giảng' },
    { value: 'audio', label: 'Audio bài giảng' },
    { value: 'other', label: 'Khác' }
  ];

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find(t => t.value === type);
    return docType ? docType.label : type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Đã xuất bản';
      case 'draft': return 'Nháp';
      case 'under_review': return 'Đang xem xét';
      case 'archived': return 'Lưu trữ';
      default: return status;
    }
  };

  if (loading) {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Bảng tổng kết', icon: BarChart3, color: '#125093', href: '/admin/dashboard' },
    { id: 'ai-data', label: 'Dữ liệu AI', icon: Brain, color: '#00CBB8', href: '/admin/ai-data' },
    { id: 'library', label: 'Thư viện môn học', icon: BookOpen, color: '#5B72EE', href: '/admin/library', active: true },
    { id: 'products', label: 'Sản phẩm học tập', icon: FileText, color: '#F48C06', href: '/admin/products' },
    { id: 'tests', label: 'Bài kiểm tra', icon: FileText, color: '#29B9E7', href: '/admin/tests' },
    { id: 'news', label: 'Tin tức', icon: MessageSquare, color: '#00CBB8', href: '/admin/news' },
    { id: 'members', label: 'Thành viên', icon: Users, color: '#8B5CF6', href: '/admin/members' }
  ];

  return (
    <ProtectedRoute requiredRoles={['admin', 'instructor']}>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
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
        <div className="flex-1 bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">Thư viện môn học</h1>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {documents.length} tài liệu
                  </span>
              </div>
                {(isAdmin || hasRole('instructor')) && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload File</span>
                    </button>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Thêm tài liệu</span>
                    </button>
              </div>
                )}
            </div>
          </div>
                </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu, tác giả, môn học..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="all">Tất cả môn học</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.code}>
                        {subject.code} - {subject.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={selectedDocumentType}
                    onChange={(e) => setSelectedDocumentType(e.target.value)}
                  >
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subject Statistics */}
            {subjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {subjects.map((subject) => (
                  <div key={subject.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{subject.code}</h3>
                        <p className="text-sm text-gray-600 mt-1">{subject.name}</p>
                        <p className="text-xs text-gray-500 mt-2">{subject.total_documents} tài liệu</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{subject.credits}</span>
                        <p className="text-xs text-gray-500">tín chỉ</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSubject(subject.code)}
                      className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-md text-sm font-medium transition-colors"
                    >
                      Xem tài liệu
                  </button>
                </div>
                ))}
              </div>
            )}

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có tài liệu</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {documents.length === 0 
                      ? 'Hãy thêm tài liệu đầu tiên vào thư viện.'
                      : 'Không tìm thấy tài liệu nào phù hợp với bộ lọc.'
                    }
                  </p>
                  {(isAdmin || hasRole('instructor')) && documents.length === 0 && (
                    <div className="mt-6">
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        Thêm tài liệu đầu tiên
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tài liệu
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Môn học
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Loại
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thống kê
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày tạo
                        </th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDocuments.map((document) => (
                        <tr key={document.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <FileText className="h-10 w-10 text-blue-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {document.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {document.description}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  Tác giả: {document.author}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{document.subject_code}</div>
                            <div className="text-sm text-gray-500">{document.subject_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {getDocumentTypeLabel(document.document_type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(document.status)}`}>
                              {getStatusLabel(document.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {document.file_url ? (
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1 text-blue-500" />
                                  <span className="text-xs font-medium">{document.file_name}</span>
                                </div>
                                {document.file_size && (
                                  <div className="text-xs text-gray-400">
                                    {(document.file_size / (1024 * 1024)).toFixed(2)} MB
                                  </div>
                                )}
                                <button
                                  onClick={() => handleDownload(document.id)}
                                  className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Tải xuống
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">Không có file</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {document.view_count}
                              </div>
                              <div className="flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                {document.download_count}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(document.created_at).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {document.file_url && (
                                <button
                                  onClick={() => handleDownload(document.id)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Tải xuống"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              )}
                              {(isAdmin || document.instructor_id === user?.id) && (
                                <>
                                  <button
                                    onClick={() => setEditingDocument(document)}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Chỉnh sửa"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDocument(document.id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Xóa"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
              </div>
            </div>

        {/* Upload File Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Upload tài liệu</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
                    </div>
              
              <FileUploadForm
                subjects={subjects}
                onSubmit={handleUploadDocument}
                onCancel={() => setShowUploadModal(false)}
              />
            </div>
                      </div>
                    )}

        {/* Create Document Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Thêm tài liệu mới</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
                  </div>
              
              <CreateDocumentForm
                subjects={subjects}
                onSubmit={handleCreateDocument}
                onCancel={() => setShowCreateModal(false)}
              />
                    </div>
                      </div>
                    )}

        {/* Edit Document Modal */}
        {editingDocument && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Chỉnh sửa tài liệu</h3>
                <button
                  onClick={() => setEditingDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
                  </div>
              
              <EditDocumentForm
                document={editingDocument}
                subjects={subjects}
                onSubmit={(data) => handleUpdateDocument(editingDocument.id, data)}
                onCancel={() => setEditingDocument(null)}
              />
                    </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

// Create Document Form Component
function CreateDocumentForm({ subjects, onSubmit, onCancel }: {
  subjects: Subject[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject_code: '',
    document_type: 'textbook',
    author: '',
    tags: '',
    semester: '',
    academic_year: '2024-2025',
    chapter: '',
    lesson: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = subjects.find(s => s.code === formData.subject_code);
    if (!subject) {
      alert('Vui lòng chọn môn học');
      return;
    }

    const submitData = {
      ...formData,
      subject_name: subject.name,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    onSubmit(submitData);
  };

  const documentTypes = [
    { value: 'textbook', label: 'Giáo trình' },
    { value: 'lecture_notes', label: 'Bài giảng' },
    { value: 'reference', label: 'Tài liệu tham khảo' },
    { value: 'exercise', label: 'Bài tập' },
    { value: 'exam', label: 'Đề thi' },
    { value: 'presentation', label: 'Slide thuyết trình' },
    { value: 'video', label: 'Video bài giảng' },
    { value: 'audio', label: 'Audio bài giảng' },
    { value: 'other', label: 'Khác' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tác giả *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Môn học *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.subject_code}
            onChange={(e) => setFormData({...formData, subject_code: e.target.value})}
          >
            <option value="">Chọn môn học</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
                    </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại tài liệu *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.document_type}
            onChange={(e) => setFormData({...formData, document_type: e.target.value})}
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
                      </div>
                    </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Học kỳ
          </label>
          <input
            type="text"
            placeholder="1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.semester}
            onChange={(e) => setFormData({...formData, semester: e.target.value})}
          />
                    </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm học
          </label>
          <input
            type="text"
            placeholder="2024-2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.academic_year}
            onChange={(e) => setFormData({...formData, academic_year: e.target.value})}
          />
                  </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chương
          </label>
          <input
            type="text"
            placeholder="Chương 1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.chapter}
            onChange={(e) => setFormData({...formData, chapter: e.target.value})}
          />
                </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bài học
          </label>
          <input
            type="text"
            placeholder="Tên bài học"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.lesson}
            onChange={(e) => setFormData({...formData, lesson: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            placeholder="tag1, tag2, tag3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Tạo tài liệu
        </button>
      </div>
    </form>
  );
}

// File Upload Form Component
function FileUploadForm({ subjects, onSubmit, onCancel }: {
  subjects: Subject[];
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject_code: '',
    document_type: 'textbook',
    author: '',
    tags: '',
    semester: '',
    academic_year: '2024-2025',
    chapter: '',
    lesson: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Vui lòng chọn file để upload');
      return;
    }

    const subject = subjects.find(s => s.code === formData.subject_code);
    if (!subject) {
      alert('Vui lòng chọn môn học');
      return;
    }

    setUploading(true);

    const uploadData = new FormData();
    uploadData.append('file', selectedFile);
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('subject_code', formData.subject_code);
    uploadData.append('subject_name', subject.name);
    uploadData.append('document_type', formData.document_type);
    uploadData.append('author', formData.author);
    uploadData.append('tags', formData.tags);
    uploadData.append('semester', formData.semester);
    uploadData.append('academic_year', formData.academic_year);
    uploadData.append('chapter', formData.chapter);
    uploadData.append('lesson', formData.lesson);

    try {
      await onSubmit(uploadData);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const documentTypes = [
    { value: 'textbook', label: 'Giáo trình' },
    { value: 'lecture_notes', label: 'Bài giảng' },
    { value: 'reference', label: 'Tài liệu tham khảo' },
    { value: 'exercise', label: 'Bài tập' },
    { value: 'exam', label: 'Đề thi' },
    { value: 'presentation', label: 'Slide thuyết trình' },
    { value: 'video', label: 'Video bài giảng' },
    { value: 'audio', label: 'Audio bài giảng' },
    { value: 'other', label: 'Khác' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* File Upload Area */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Chọn file để upload *
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : selectedFile
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mp3,.wav,.zip,.rar"
          />
          
          {selectedFile ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Xóa file
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    Nhấn để chọn file
                  </span>
                  <span className="text-gray-500"> hoặc kéo thả file vào đây</span>
                </label>
              </div>
              <p className="text-xs text-gray-500">
                Hỗ trợ: PDF, Word, PowerPoint, Excel, Ảnh, Video, Audio, ZIP (tối đa 100MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Môn học *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.subject_code}
            onChange={(e) => setFormData({...formData, subject_code: e.target.value})}
          >
            <option value="">Chọn môn học</option>
            {subjects.map(subject => (
              <option key={subject.code} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
            </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại tài liệu *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.document_type}
            onChange={(e) => setFormData({...formData, document_type: e.target.value})}
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
      </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tác giả *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Học kỳ
          </label>
          <input
            type="text"
            placeholder="1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.semester}
            onChange={(e) => setFormData({...formData, semester: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm học
          </label>
          <input
            type="text"
            placeholder="2024-2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.academic_year}
            onChange={(e) => setFormData({...formData, academic_year: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chương
          </label>
          <input
            type="text"
            placeholder="Chương 1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.chapter}
            onChange={(e) => setFormData({...formData, chapter: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bài học
          </label>
          <input
            type="text"
            placeholder="Tên bài học"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.lesson}
            onChange={(e) => setFormData({...formData, lesson: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            placeholder="tag1, tag2, tag3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={uploading}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Đang upload...</span>
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              <span>Upload tài liệu</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// Edit Document Form Component
function EditDocumentForm({ document, subjects, onSubmit, onCancel }: {
  document: LibraryDocument;
  subjects: Subject[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: document.title,
    description: document.description || '',
    subject_code: document.subject_code,
    document_type: document.document_type,
    author: document.author,
    tags: document.tags.join(', '),
    semester: document.semester || '',
    academic_year: document.academic_year || '',
    chapter: document.chapter || '',
    lesson: document.lesson || '',
    status: document.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = subjects.find(s => s.code === formData.subject_code);
    if (!subject) {
      alert('Vui lòng chọn môn học');
      return;
    }

    const submitData = {
      ...formData,
      subject_name: subject.name,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    onSubmit(submitData);
  };

  const documentTypes = [
    { value: 'textbook', label: 'Giáo trình' },
    { value: 'lecture_notes', label: 'Bài giảng' },
    { value: 'reference', label: 'Tài liệu tham khảo' },
    { value: 'exercise', label: 'Bài tập' },
    { value: 'exam', label: 'Đề thi' },
    { value: 'presentation', label: 'Slide thuyết trình' },
    { value: 'video', label: 'Video bài giảng' },
    { value: 'audio', label: 'Audio bài giảng' },
    { value: 'other', label: 'Khác' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Nháp' },
    { value: 'published', label: 'Đã xuất bản' },
    { value: 'under_review', label: 'Đang xem xét' },
    { value: 'archived', label: 'Lưu trữ' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tác giả *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Môn học *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.subject_code}
            onChange={(e) => setFormData({...formData, subject_code: e.target.value})}
          >
            <option value="">Chọn môn học</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại tài liệu *
          </label>
          <select
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.document_type}
            onChange={(e) => setFormData({...formData, document_type: e.target.value})}
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Học kỳ
          </label>
          <input
            type="text"
            placeholder="1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.semester}
            onChange={(e) => setFormData({...formData, semester: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm học
          </label>
          <input
            type="text"
            placeholder="2024-2025"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.academic_year}
            onChange={(e) => setFormData({...formData, academic_year: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chương
          </label>
          <input
            type="text"
            placeholder="Chương 1, 2, 3..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.chapter}
            onChange={(e) => setFormData({...formData, chapter: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bài học
          </label>
          <input
            type="text"
            placeholder="Tên bài học"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.lesson}
            onChange={(e) => setFormData({...formData, lesson: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (phân cách bằng dấu phẩy)
          </label>
          <input
            type="text"
            placeholder="tag1, tag2, tag3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
}