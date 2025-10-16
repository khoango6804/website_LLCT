'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS, getFullUrl, authFetch } from '@/lib/api';
import { 
  BarChart3, 
  Brain,
  BookOpen,
  FileText,
  MessageSquare,
  Edit,
  Trash2,
  Plus,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

// Removed mock products array - now using MongoDB API

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalDownloads: 0,
    totalGroups: 0
  });

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await authFetch(getFullUrl(API_ENDPOINTS.PRODUCTS));
      if (response.ok) {
        const data = await response.json();
        setProductsData(data);
      } else {
        setError('Không thể tải danh sách sản phẩm');
      }
    } catch (err) {
      setError('Lỗi kết nối API');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.PRODUCT_STATS));
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalProducts: data.total_products || 0,
          totalDownloads: data.total_downloads || 0,
          totalGroups: data.total_groups || 0
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', title: 'Bảng tổng kết', icon: BarChart3, color: '#125093', href: '/admin/dashboard' },
    { id: 'ai-data', title: 'Dữ liệu AI', icon: Brain, color: '#00CBB8', href: '/admin/ai-data' },
    { id: 'library', title: 'Thư viện môn học', icon: BookOpen, color: '#5B72EE', href: '/admin/library' },
    { id: 'products', title: 'Sản phẩm học tập', icon: FileText, color: '#F48C06', href: '/admin/products', active: true },
    { id: 'tests', title: 'Bài kiểm tra', icon: FileText, color: '#29B9E7', href: '/admin/tests' },
    { id: 'news', title: 'Tin tức', icon: MessageSquare, color: '#00CBB8', href: '/admin/news' }
  ];


  const getTypeColor = (type: string) => {
    switch (type) {
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'mobile-app': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      case 'web-system': return 'bg-indigo-100 text-indigo-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'document': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'website': return 'Website';
      case 'mobile-app': return 'Ứng dụng di động';
      case 'presentation': return 'Thuyết trình';
      case 'web-system': return 'Hệ thống web';
      case 'video': return 'Video';
      case 'document': return 'Tài liệu';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'website':
      case 'web-system':
        return '🌐';
      case 'mobile-app':
        return '📱';
      case 'presentation':
        return '📊';
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      default:
        return '📁';
    }
  };

  // CRUD Functions
  const handleAddProduct = async (newProduct: any) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.PRODUCTS), {
        method: 'POST',
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          subject: newProduct.subject,
          subject_name: newProduct.subjectName,
          group: newProduct.group,
          members: newProduct.members,
          instructor: newProduct.instructor,
          semester: newProduct.semester || 'HK1 2024-2025',
          type: newProduct.type,
          technologies: newProduct.technologies,
          file_url: newProduct.fileUrl,
          demo_url: newProduct.demoUrl
        })
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProductsData([...productsData, createdProduct]);
        setShowAddModal(false);
        fetchStats(); // Refresh stats
      } else {
        alert('Không thể thêm sản phẩm');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Lỗi khi thêm sản phẩm');
    }
  };

  const handleEditProduct = async (updatedProduct: any) => {
    try {
      const response = await authFetch(getFullUrl(API_ENDPOINTS.PRODUCT_BY_ID(editingProduct.id)), {
        method: 'PATCH',
        body: JSON.stringify({
          title: updatedProduct.title,
          description: updatedProduct.description,
          subject: updatedProduct.subject,
          subject_name: updatedProduct.subjectName,
          group: updatedProduct.group,
          members: updatedProduct.members,
          instructor: updatedProduct.instructor,
          semester: updatedProduct.semester,
          type: updatedProduct.type,
          technologies: updatedProduct.technologies,
          file_url: updatedProduct.fileUrl,
          demo_url: updatedProduct.demoUrl
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setProductsData(productsData.map(p => p.id === editingProduct.id ? updated : p));
        setEditingProduct(null);
        fetchStats(); // Refresh stats
      } else {
        alert('Không thể cập nhật sản phẩm');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Lỗi khi cập nhật sản phẩm');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const response = await authFetch(getFullUrl(API_ENDPOINTS.PRODUCT_BY_ID(productId)), {
          method: 'DELETE'
        });

        if (response.ok) {
          setProductsData(productsData.filter(p => p.id !== productId));
          fetchStats(); // Refresh stats
        } else {
          alert('Không thể xóa sản phẩm');
        }
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Lỗi khi xóa sản phẩm');
      }
    }
  };

  // Filter products based on search and filters
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.members.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || product.subject === selectedSubject;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  // Get unique subjects and types for filters
  const subjects = [...new Set(productsData.map(p => p.subject))];
  const types = [...new Set(productsData.map(p => p.type))];

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <div className="w-56 bg-white p-4 border-r border-gray-100">
          {/* Logo */}
          <div className="mb-6">
            <img 
              src="https://placehold.co/192x192" 
              alt="Logo" 
              className="w-24 h-24 md:w-32 md:h-32 mb-6"
            />
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-8">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-4 hover:opacity-90"
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex-1 text-sm md:text-base ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                    {item.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          {/* Header */}
          <div className="bg-white shadow-sm border-b p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sản phẩm học tập</h1>
                <p className="text-gray-600 mt-1">Quản lý các sản phẩm, bài tập và dự án của sinh viên</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Thêm sản phẩm</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="text-red-600">
                    <p className="font-medium">Lỗi tải dữ liệu</p>
                    <p className="text-sm">{error}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setError(null);
                      fetchProducts();
                      fetchStats();
                    }}
                    className="ml-auto bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
                  >
                    Thử lại
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nhóm</p>
                    <p className="text-2xl font-bold text-green-600">{stats.totalGroups}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lượt tải</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Môn học</p>
                    <p className="text-2xl font-bold text-orange-600">{new Set(productsData.map(p => p.subject)).size}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm, mô tả, thành viên..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Subject Filter */}
                <div className="w-full md:w-48">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả môn học</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                {/* Type Filter */}
                <div className="w-full md:w-48">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả loại</option>
                    {types.map(type => (
                      <option key={type} value={type}>{getTypeText(type)}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results count */}
              <div className="mt-4 text-sm text-gray-600">
                Hiển thị {filteredProducts.length} / {products.length} sản phẩm
                {(searchTerm || selectedSubject !== 'all' || selectedType !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubject('all');
                      setSelectedType('all');
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Danh sách sản phẩm</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Môn học
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nhóm & Thành viên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Công nghệ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày nộp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thống kê
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{getTypeIcon(product.type)}</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</div>
                              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</div>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-2 ${getTypeColor(product.type)}`}>
                                {getTypeText(product.type)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.subject}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">{product.subjectName}</div>
                            <div className="text-xs text-gray-400 mt-1">{product.semester}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.group}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {product.members.slice(0, 2).join(', ')}
                              {product.members.length > 2 && ` +${product.members.length - 2} khác`}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">GV: {product.instructor}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.technologies.slice(0, 3).map((tech, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800">
                                {tech}
                              </span>
                            ))}
                            {product.technologies.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                +{product.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.submittedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-xs">{product.downloads} lượt tải</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => setEditingProduct(product)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {product.fileUrl && (
                              <a 
                                href={product.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Tải xuống"
                              >
                                <FileText className="h-4 w-4" />
                              </a>
                            )}
                            {product.demoUrl && (
                              <a 
                                href={product.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                                title="Xem demo"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                            )}
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Xóa"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {(showAddModal || editingProduct) && (
          <ProductModal
            product={editingProduct}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onClose={() => {
              setShowAddModal(false);
              setEditingProduct(null);
            }}
          />
        )}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Product Modal Component
function ProductModal({ product, onSave, onClose }: { product?: any, onSave: (product: any) => void, onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    subject: product?.subject || 'MLN111',
    subjectName: product?.subjectName || 'Kỹ năng mềm cơ bản',
    group: product?.group || '',
    members: product?.members || [''],
    instructor: product?.instructor || '',
    semester: product?.semester || 'HK1 2024-2025',
    type: product?.type || 'website',
    technologies: product?.technologies || [''],
    fileUrl: product?.fileUrl || '',
    demoUrl: product?.demoUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      members: formData.members.filter(m => m.trim()),
      technologies: formData.technologies.filter(t => t.trim()),
      ...(product && { id: product.id })
    };
    onSave(productData);
  };

  const addMember = () => {
    setFormData({ ...formData, members: [...formData.members, ''] });
  };

  const removeMember = (index: number) => {
    setFormData({ ...formData, members: formData.members.filter((_, i) => i !== index) });
  };

  const addTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ''] });
  };

  const removeTechnology = (index: number) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== index) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="MLN111">MLN111</option>
                <option value="MLN122">MLN122</option>
                <option value="HCM202">HCM202</option>
                <option value="VNR202">VNR202</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại sản phẩm</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="website">Website</option>
                <option value="mobile-app">Ứng dụng di động</option>
                <option value="web-system">Hệ thống web</option>
                <option value="presentation">Thuyết trình</option>
                <option value="video">Video</option>
                <option value="document">Tài liệu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nhóm</label>
              <input
                type="text"
                required
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhóm 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giảng viên</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thành viên nhóm</label>
            {formData.members.map((member, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => {
                    const newMembers = [...formData.members];
                    newMembers[index] = e.target.value;
                    setFormData({ ...formData, members: newMembers });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tên thành viên"
                />
                {formData.members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMember}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Thêm thành viên
            </button>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Công nghệ sử dụng</label>
            {formData.technologies.map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => {
                    const newTech = [...formData.technologies];
                    newTech[index] = e.target.value;
                    setFormData({ ...formData, technologies: newTech });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tên công nghệ"
                />
                {formData.technologies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTechnology}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Thêm công nghệ
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link file/source</label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link demo</label>
              <input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://demo.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {product ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
