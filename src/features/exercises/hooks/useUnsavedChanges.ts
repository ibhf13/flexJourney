import { useEffect } from 'react';

interface UseUnsavedChangesProps {
    hasChanges: boolean;
    setHasChanges: (value: boolean) => void;
    onClose: () => void;
}

export const useUnsavedChanges = ({
    hasChanges,
    setHasChanges,
    onClose,
}: UseUnsavedChangesProps) => {
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const handleCloseWithConfirmation = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                setHasChanges(false);
                onClose();
            }
        } else {
            onClose();
        }
    };

    return { handleCloseWithConfirmation };
};