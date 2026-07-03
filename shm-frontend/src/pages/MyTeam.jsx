import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function MyTeam() {
    const [formData, setFormData] = useState({
        name: '',
        type: 'PUBLIC',
        joinPassword: '',
        trackId: 1, // Tạm fix cứng ID track dựa theo SQL script đã chạy
        eventId: 1  // Tạm fix cứng ID sự kiện
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axiosClient.post('/teams/create', formData);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tạo đội. Tên đội có thể đã tồn tại!');
        } finally {
            setLoading(false);
        }
    };

    // Màn hình hiển thị khi tạo thành công
    if (success) {
        return (
            <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Tạo đội thành công!</h2>
                <p className="text-gray-600">Bạn hiện đã trở thành <span className="font-bold text-indigo-600">Team Leader</span> của đội: <span className="font-bold text-gray-900">{formData.name}</span></p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Tải lại trang quản lý
                </button>
            </div>
        );
    }

    // Màn hình Form tạo đội
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký Đội Thi Mới</h2>
            <p className="text-sm text-gray-500 mb-6">Trở thành Team Leader và mời các thành viên khác gia nhập đội của bạn.</p>

            {error && <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên Đội Thi</label>
                    <input
                        type="text" required placeholder="Nhập tên đội của bạn..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hạng Mục (Track)</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                        value={formData.trackId}
                        onChange={(e) => setFormData({...formData, trackId: Number(e.target.value)})}
                    >
                        <option value={1}>Ứng dụng AI</option>
                        <option value={2}>Phát triển Web/App</option>
                        <option value={3}>Thiết bị đeo thông minh & Cảm biến (Wearables/IoT)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chế độ đội thi</label>
                    <div className="flex space-x-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" value="PUBLIC"
                                   checked={formData.type === 'PUBLIC'}
                                   onChange={(e) => setFormData({...formData, type: e.target.value})} />
                            <span className="ml-2 text-sm text-gray-700">Công khai (PUBLIC)</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" value="PRIVATE"
                                   checked={formData.type === 'PRIVATE'}
                                   onChange={(e) => setFormData({...formData, type: e.target.value})} />
                            <span className="ml-2 text-sm text-gray-700">Riêng tư (PRIVATE)</span>
                        </label>
                    </div>
                </div>

                {formData.type === 'PRIVATE' && (
                    <div className="animate-fade-in-down">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu gia nhập đội</label>
                        <input
                            type="text" required placeholder="Thiết lập mật khẩu..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                            value={formData.joinPassword}
                            onChange={(e) => setFormData({...formData, joinPassword: e.target.value})}
                        />
                        <p className="mt-1 text-xs text-gray-500">Người khác cần nhập mật khẩu này để vào đội của bạn.</p>
                    </div>
                )}

                <div className="pt-2">
                    <button
                        type="submit" disabled={loading}
                        className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Đang khởi tạo...' : 'Xác Nhận Tạo Đội'}
                    </button>
                </div>
            </form>
        </div>
    );
}