import { useContext } from 'react';
import HomeContext from './HomeContext';

function LastEntries() {
    const { enableLoading, disableLoading } = useContext(HomeContext);

    return <div>Last entries</div>;
}

export default LastEntries;
