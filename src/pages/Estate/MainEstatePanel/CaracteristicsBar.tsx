import BedIcon from '@mui/icons-material/Bed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ShowerIcon from '@mui/icons-material/Shower';
import { Grid } from '@mui/material';
import TextWithIcon from '../../../components/TextWithIcon';
import { convertToArea } from '../../../utils/StringUtils';

interface CaracteristicsProps {
    houseAreaSqrtM?: number;
    roomCount?: number;
    bedroomCount?: number;
    bathroomCount?: number;
}

function CaracteristicsBar({
    houseAreaSqrtM,
    roomCount,
    bedroomCount,
    bathroomCount,
}: CaracteristicsProps) {
    return (
        <Grid container display="flex" justifyContent="center" alignItems="">
            <Grid item xs={3}>
                <TextWithIcon
                    icon={<OpenInFullIcon />}
                    text={convertToArea(houseAreaSqrtM)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon icon={<MeetingRoomIcon />} text={roomCount?.toString()} />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon icon={<BedIcon />} text={bedroomCount?.toString()} />
            </Grid>
            <Grid item xs={3}>
                <TextWithIcon icon={<ShowerIcon />} text={bathroomCount?.toString()} />
            </Grid>
        </Grid>
    );
}

export default CaracteristicsBar;
