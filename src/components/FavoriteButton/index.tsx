/**
 * The favorite button thet the user toggle
 */

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Zoom } from '@mui/material';

interface FavoriteButtonProps {
    /**
     * If the favorite is set on or off
     */
    isFavorite: boolean;
    /**
     * The function called when the button is cliked on
     */
    onToggle: (event: React.MouseEvent) => void;
}

function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
    return (
        <IconButton
            size="large"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onToggle}
        >
            {/* Provide a smooth transition between both states */}
            <Zoom in={isFavorite}>
                <FavoriteIcon sx={{ color: '#C51104' }} />
            </Zoom>
            <Zoom
                in={!isFavorite}
                // Set as position absolute in order to be
                // at the same position as the other icon
                style={{ position: 'absolute' }}
            >
                <FavoriteBorderIcon />
            </Zoom>
        </IconButton>
    );
}

export default FavoriteButton;
