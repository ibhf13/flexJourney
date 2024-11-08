import { useState } from 'react'

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
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

    const handleCloseWithConfirmation = () => {
        if (hasChanges) {
            setIsConfirmDialogOpen(true)
        } else {
            onClose()
        }
    }

    const handleConfirmClose = () => {
        setHasChanges(false)
        setIsConfirmDialogOpen(false)
        onClose()
    }

    const handleCancelClose = () => {
        setIsConfirmDialogOpen(false)
    }

    return {
        isConfirmDialogOpen,
        handleCloseWithConfirmation,
        handleConfirmClose,
        handleCancelClose
    }
}