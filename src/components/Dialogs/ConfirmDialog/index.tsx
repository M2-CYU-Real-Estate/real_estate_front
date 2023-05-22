import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps {
    title: string;
    children: JSX.Element;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void;
    yesLabel?: string;
    noLabel?: string;
}

function ConfirmDialog({
    title,
    children,
    isOpen,
    setOpen,
    onConfirm,
    yesLabel = 'Oui',
    noLabel = 'Non',
}: ConfirmDialogProps) {
    const closeDialog = () => setOpen(false);
    const confirmAndClose = () => {
        setOpen(false);
        onConfirm();
    };
    return (
        <Dialog open={isOpen} onClose={closeDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={closeDialog}>
                    {noLabel}
                </Button>
                <Button variant="contained" onClick={confirmAndClose}>
                    {yesLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
