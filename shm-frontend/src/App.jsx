import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MyTeam from './pages/MyTeam';
import EventManagement from './pages/EventManagement';
import UserManagement from './pages/UserManagement';
import Grading from './pages/Grading';
// Hàm bảo vệ Route (Nếu chưa có token thì đá về Login)
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen font-sans text-gray-900 bg-gray-50">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Protected Routes (Phải đăng nhập mới vào được) */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        {/* Index route: Vừa vào /dashboard sẽ hiển thị Component này */}
                        <Route index element={<Dashboard />} />

                        {/* Các chức năng khác sẽ thêm vào đây sau */}
                        {/* <Route path="users" element={<UserManagement />} /> */}
                        {/* <Route path="my-team" element={<MyTeam />} /> */}
                        <Route path="my-team" element={<MyTeam />} />
                        <Route path="events" element={<EventManagement />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="grading" element={<ProtectedRoute><Grading /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;