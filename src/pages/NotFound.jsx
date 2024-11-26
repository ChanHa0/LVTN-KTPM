import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Không tìm thấy trang
                    </h2>
                    <p className="text-gray-600">
                        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
                    </p>
                </div>

                <div className="space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Quay lại
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;