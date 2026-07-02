import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function Grading() {
    const [submissions, setSubmissions] = useState([]);
    const [scores, setScores] = useState({});

    useEffect(() => {
        // Giả định API này trả về danh sách các đội và bài nộp của họ
        axiosClient.get('/submissions/pending').then(res => setSubmissions(res.result));
    }, []);

    const handleGrade = async (teamId) => {
        try {
            await axiosClient.post('/grades/submit', { teamId, score: scores[teamId] });
            alert("Chấm điểm thành công!");
        } catch (err) {
            alert("Lỗi chấm điểm!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">⚖️ Danh sách bài thi chờ chấm</h2>
            <table className="w-full text-left">
                <thead>
                <tr className="bg-gray-50">
                    <th className="p-3">Tên đội</th>
                    <th className="p-3">Link bài làm</th>
                    <th className="p-3">Nhập điểm (0-100)</th>
                    <th className="p-3">Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {submissions.map(sub => (
                    <tr key={sub.teamId} className="border-t">
                        <td className="p-3">{sub.teamName}</td>
                        <td className="p-3"><a href={sub.link} target="_blank" className="text-blue-600 underline">Xem bài thi</a></td>
                        <td className="p-3">
                            <input
                                type="number"
                                className="w-20 p-1 border rounded"
                                onChange={(e) => setScores({...scores, [sub.teamId]: e.target.value})}
                            />
                        </td>
                        <td className="p-3">
                            <button onClick={() => handleGrade(sub.teamId)} className="bg-green-600 text-white px-3 py-1 rounded">Chấm điểm</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}