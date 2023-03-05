import { Typography } from '@mui/material';

/**
 * Display an icon along with a simple text
 */
function TextWithIcon({ icon, text, replacementText = '...' }: TextIconProps) {
    const textToDisplay = text || replacementText;
    return (
        <Typography
            variant="subtitle1"
            sx={{ verticalAlign: 'middle', display: 'inline-flex' }}
        >
            {icon} {textToDisplay}
        </Typography>
    );
}

interface TextIconProps {
    /**
     * The icon to render, usually one comming from @mui/icons-material
     */
    icon: JSX.Element;
    /**
     * The text to display aside the icon. If undefined, the remplacement text will be shown instead
     */
    text?: string;
    /**
     * If text attribute is not set, this text will be displayed instead
     */
    replacementText?: string;
}

export default TextWithIcon;
