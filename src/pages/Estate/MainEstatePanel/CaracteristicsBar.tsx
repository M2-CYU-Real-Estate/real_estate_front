import BedIcon from '@mui/icons-material/Bed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowerIcon from '@mui/icons-material/Shower';
import { Grid } from '@mui/material';
import TextWithIcon from '../../../components/TextWithIcon';
import { convertToArea } from '../../../utils/StringUtils';

interface CaracteristicsProps {
    area?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
}

function CaracteristicsBar({
    area,
    rooms,
    bedrooms,
    bathrooms,
}: CaracteristicsProps) {
    return (
        <Grid container display="flex" justifyContent="center" alignItems="">
            <Grid item xs={3}>
                <TextWithIcon
                    icon={<OpenInFullIcon />}
                    text={convertToArea(area)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon
                    icon={<MeetingRoomIcon />}
                    text={rooms?.toString()}
                />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon icon={<BedIcon />} text={bedrooms?.toString()} />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon
                    icon={<ShowerIcon />}
                    text={bathrooms?.toString()}
                />
            </Grid>
        </Grid>
    );
}

export default CaracteristicsBar;
