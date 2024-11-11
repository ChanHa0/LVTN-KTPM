import { useState, useCallback } from 'react';

const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [modalData, setModalData] = useState(null);

    const openModal = useCallback((data = null) => {
        setModalData(data);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalData(null);
        setIsOpen(false);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        modalData,
        openModal,
        closeModal,
        toggleModal
    };
};

export default useModal;