import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFunction();
            // Kiểm tra và xử lý dữ liệu trả về
            const responseData = response?.data?.products || response?.data || [];
            setData(responseData);
        } catch (err) {
            console.error('Lỗi khi tải dữ liệu:', err);
            setError(err);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};

export default useFetch;