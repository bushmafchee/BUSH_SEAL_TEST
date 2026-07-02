import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy thông tin user từ LocalStorage
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        navigate('/login');
    };

    // Hàm kiểm tra xem tab nào đang được active
    const isActive = (path) => location.pathname === path ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-600';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar bên trái */}
            <div className="w-64 bg-indigo-800 flex flex-col shadow-lg">
                <div className="flex items-center justify-center h-16 bg-indigo-900">
                    <h1 className="text-xl font-bold text-white uppercase tracking-wider">SEAL Hackathon</h1>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-2">
                        <Link to="/dashboard" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard')}`}>
                            📊 Tổng quan
                        </Link>

                        {/* Menu dành riêng cho COORDINATOR / ADMIN */}
                        {(role === 'COORDINATOR' || role === 'ADMIN') && (
                            <>
                                <Link to="/dashboard/events" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard/events')}`}>
                                    🏆 Quản lý Giải đấu
                                </Link>
                                <Link to="/dashboard/users" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard/users')}`}>
                                    👥 Quản lý Tài khoản (Duyệt)
                                </Link>
                            </>
                        )}

                        {/* Menu dành riêng cho LEADER / MEMBER */}
                        {(role === 'LEADER' || role === 'MEMBER') && (
                            <>
                                <Link to="/dashboard/my-team" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard/my-team')}`}>
                                    🛡️ Đội thi của tôi
                                </Link>
                                <Link to="/dashboard/submissions" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard/submissions')}`}>
                                    📤 Nộp bài dự thi
                                </Link>
                            </>
                        )}

                        {/* Menu dành riêng cho JUDGE */}
                        {role === 'JUDGE' && (
                            <Link to="/dashboard/grading" className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('/dashboard/grading')}`}>
                                ⚖️ Chấm bài thi
                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Khu vực nội dung chính bên phải */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        {location.pathname.split('/').pop().replace('-', ' ') || 'Tổng quan'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600">Xin chào, {email} ({role})</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </header>

                {/* Nội dung thay đổi (Outlet) */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet /> {/* Các trang con sẽ được render vào đây */}
                </main>
            </div>
        </div>
    );
}