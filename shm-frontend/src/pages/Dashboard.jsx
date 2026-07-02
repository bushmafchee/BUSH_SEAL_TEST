export default function Dashboard() {
    const role = localStorage.getItem('role');

    return (
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Chào mừng đến với Hệ thống SEAL Hackathon</h1>
            <p className="mt-4 text-gray-600">
                Bạn đang đăng nhập với vai trò: <span className="font-semibold text-indigo-600">{role}</span>
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Các thẻ thống kê mẫu */}
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-800">Giải đấu đang diễn ra</h3>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">1</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h3 className="text-lg font-semibold text-green-800">Đội thi đăng ký</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">24</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
                    <h3 className="text-lg font-semibold text-amber-800">Bài thi chờ chấm</h3>
                    <p className="text-3xl font-bold text-amber-600 mt-2">12</p>
                </div>
            </div>
        </div>
    );
}