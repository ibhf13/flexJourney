import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

interface ConfirmationDialogProps {
    open: boolean
    title: string
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationDialog = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) => (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={onConfirm} color="error" variant="contained">
                Discard
            </Button>
        </DialogActions>
    </Dialog>
)