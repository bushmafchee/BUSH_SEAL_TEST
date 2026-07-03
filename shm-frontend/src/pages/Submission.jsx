import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Submission() {
    const [formData, setFormData] = useState({
        fileUrl: '',
        matrixId: 1,
        teamId: 1
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            // Gọi API nộp bài, axiosClient sẽ tự động bọc token của LEADER
            await axiosClient.post('/submissions', formData);
            setMessage({ text: '🎉 Nộp bài thành công! Dự án của đội bạn đã được ghi nhận.', type: 'success' });
        } catch (err) {
            setMessage({ text: err.message || 'Có lỗi xảy ra khi nộp bài. Vui lòng kiểm tra lại quyền LEADER!', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">📤 Nộp Bài Dự Thi</h2>
                <p className="text-sm text-gray-500 mt-1">Gửi tài liệu tổng hợp về dự án của đội bạn đến Ban giám khảo.</p>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 text-sm rounded-lg border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Đường dẫn tài liệu dự án (File URL) *</label>
                    <input
                        type="url" required
                        placeholder="VD: Link GitHub hoặc Drive chứa mã nguồn hệ thống nhận diện vật cản qua BLE..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        value={formData.fileUrl}
                        onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                    />
                    <p className="mt-2 text-xs text-gray-500">
                        Hãy nén toàn bộ tài liệu (Slide, Video Demo, tài liệu kiến trúc hệ thống xử lý offline-first, mã nguồn) vào một thư mục Drive/GitHub và dán link vào đây.
                    </p>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit" disabled={loading}
                        className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all shadow-md"
                    >
                        {loading ? 'Đang gửi dữ liệu...' : 'Gửi Bài Dự Thi'}
                    </button>
                </div>
            </form>
        </div>
    );
}