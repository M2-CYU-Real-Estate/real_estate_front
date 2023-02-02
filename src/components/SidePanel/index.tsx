import { Grid } from '@mui/material'
import houseImageDefault from '../../assets/images/house-default.jpg'

/**
 * A panel aside the main content that displays a random house image.
 * This is intended to be used with login and registration pages
 */
function SidePanel() {
    return (
        <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: `url(https://source.unsplash.com/random/?house)`,
                backgroundColor: 'primary.dark',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    )
}

export default SidePanel
