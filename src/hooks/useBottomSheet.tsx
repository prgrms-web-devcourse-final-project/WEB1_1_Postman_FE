import React, { useState } from 'react';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';

interface UseBottomSheetProps {
    children: React.ReactNode;
}

const useBottomSheet = ({ children }: UseBottomSheetProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openBottomSheet = () => setIsOpen(true);
    const closeBottomSheet = () => setIsOpen(false);

    const BottomSheet = () => (
        <SliderMenuContainer open={isOpen} onDismiss={closeBottomSheet}>
            {children}
        </SliderMenuContainer>
    );

    return {
        isOpen,
        openBottomSheet,
        closeBottomSheet,
        BottomSheet
    };
};

export default useBottomSheet;
