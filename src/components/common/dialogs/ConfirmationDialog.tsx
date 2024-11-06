import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material'

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationDialog = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) => (

    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} color="inherit">
                Cancel
            </Button>
            <Button onClick={onConfirm} color="primary" variant="contained">
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);