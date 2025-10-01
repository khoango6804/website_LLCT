'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Users, 
  Plus, 
  Search, 
  Filter,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  TrendingUp,
  Clock,
  User,
  Star,
  ThumbsUp,
  Reply
} from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('forum');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const topics = [
    { id: 'all', name: 'Tất cả chủ đề', color: 'bg-gray-500' },
    { id: 'math', name: 'Toán học', color: 'bg-blue-500' },
    { id: 'physics', name: 'Vật lý', color: 'bg-green-500' },
    { id: 'chemistry', name: 'Hóa học', color: 'bg-purple-500' },
    { id: 'biology', name: 'Sinh học', color: 'bg-red-500' },
    { id: 'english', name: 'Tiếng Anh', color: 'bg-yellow-500' },
    { id: 'general', name: 'Chung', color: 'bg-indigo-500' }
  ];

  const forumPosts = [
    {
      id: 1,
      title: 'Cách giải bài tập ma trận nghịch đảo',
      author: 'Nguyễn Văn A',
      topic: 'math',
      topicName: 'Toán học',
      content: 'Mình đang gặp khó khăn với bài tập về ma trận nghịch đảo. Có ai có thể hướng dẫn chi tiết không?',
      likes: 15,
      replies: 8,
      views: 120,
      timeAgo: '2 giờ trước',
      isPinned: true,
      tags: ['ma trận', 'đại số tuyến tính', 'bài tập']
    },
    {
      id: 2,
      title: 'Thảo luận về cơ học lượng tử',
      author: 'Trần Thị B',
      topic: 'physics',
      topicName: 'Vật lý',
      content: 'Ai có thể giải thích về nguyên lý bất định Heisenberg một cách dễ hiểu không?',
      likes: 23,
      replies: 12,
      views: 180,
      timeAgo: '4 giờ trước',
      isPinned: false,
      tags: ['cơ học lượng tử', 'Heisenberg', 'vật lý hiện đại']
    },
    {
      id: 3,
      title: 'Nhóm học tập Hóa học hữu cơ',
      author: 'Lê Văn C',
      topic: 'chemistry',
      topicName: 'Hóa học',
      content: 'Mình muốn tạo nhóm học tập để ôn thi Hóa học hữu cơ. Ai quan tâm thì join nhé!',
      likes: 8,
      replies: 5,
      views: 95,
      timeAgo: '6 giờ trước',
      isPinned: false,
      tags: ['hóa học hữu cơ', 'nhóm học', 'ôn thi']
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'Nhóm Toán học nâng cao',
      subject: 'Toán học',
      members: 12,
      maxMembers: 15,
      description: 'Nhóm học tập chuyên sâu về Toán học nâng cao',
      createdBy: 'Nguyễn Văn A',
      lastActivity: '1 giờ trước',
      isPrivate: false
    },
    {
      id: 2,
      name: 'Vật lý Study Group',
      subject: 'Vật lý',
      members: 8,
      maxMembers: 10,
      description: 'Thảo luận và giải bài tập Vật lý',
      createdBy: 'Trần Thị B',
      lastActivity: '3 giờ trước',
      isPrivate: true
    },
    {
      id: 3,
      name: 'Hóa học Hữu cơ',
      subject: 'Hóa học',
      members: 6,
      maxMembers: 8,
      description: 'Chuyên về Hóa học hữu cơ và ứng dụng',
      createdBy: 'Lê Văn C',
      lastActivity: '5 giờ trước',
      isPrivate: false
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Phương pháp học hiệu quả',
      category: 'general',
      participants: 25,
      messages: 45,
      lastMessage: '2 giờ trước',
      isActive: true
    },
    {
      id: 2,
      title: 'Chia sẻ tài liệu học tập',
      category: 'general',
      participants: 18,
      messages: 32,
      lastMessage: '4 giờ trước',
      isActive: true
    },
    {
      id: 3,
      title: 'Kinh nghiệm thi cử',
      category: 'general',
      participants: 30,
      messages: 67,
      lastMessage: '1 ngày trước',
      isActive: false
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesTopic = selectedTopic === 'all' || post.topic === selectedTopic;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 rounded-full">
                <MessageSquare className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cộng đồng học tập</h1>
                <p className="text-gray-600 mt-1">Kết nối, chia sẻ và học hỏi cùng nhau</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài viết
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('forum')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'forum'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Diễn đàn trao đổi
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'groups'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Nhóm học tập
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'discussions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Thảo luận theo chủ đề
            </button>
          </div>
        </div>

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h2>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm bài viết..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Topic Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedTopic === topic.id
                            ? `${topic.color} text-white`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {topic.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                    {post.isPinned && (
                      <div className="flex items-center mb-3">
                        <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-600">Bài viết được ghim</span>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-3">{post.content}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.timeAgo}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {post.views} lượt xem
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          topics.find(t => t.id === post.topic)?.color || 'bg-gray-500'
                        }`}>
                          {post.topicName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.replies} trả lời
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                          <Share className="h-4 w-4 mr-1" />
                          Chia sẻ
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-yellow-600 transition-colors">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Lưu
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Tham gia thảo luận
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                  <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Study Groups Tab */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  {group.isPrivate && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Riêng tư
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{group.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {group.members}/{group.maxMembers} thành viên
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Tạo bởi: {group.createdBy}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Hoạt động: {group.lastActivity}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Thành viên</span>
                    <span>{group.members}/{group.maxMembers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Tham gia
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
            
            {/* Create New Group Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tạo nhóm mới</h3>
                <p className="text-gray-500 mb-4">Tạo nhóm học tập để kết nối với bạn bè</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Tạo nhóm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{discussion.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {discussion.participants} tham gia
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {discussion.messages} tin nhắn
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {discussion.lastMessage}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      discussion.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {discussion.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {discussion.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Thảo luận sôi nổi về {discussion.title.toLowerCase()}. Tham gia để chia sẻ ý kiến và học hỏi từ cộng đồng.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Thích
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                      <Reply className="h-4 w-4 mr-1" />
                      Trả lời
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <Share className="h-4 w-4 mr-1" />
                      Chia sẻ
                    </button>
                  </div>
                  
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Tham gia thảo luận
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
