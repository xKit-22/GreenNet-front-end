import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {EventsList} from './EventsList'
import './eventsPage.scss'
import {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {MyEventsList} from "./MyEventsList";
import {login} from "../../redux/userSlice";
import axios from "axios";
import {ArchiveEvents} from "./ArchiveEvents";


//Изменение некоторых стилей для табов
const useStyles = makeStyles({
    root: {
        '& .MuiTab-root': {
            color: 'rgb(59, 124, 15)',
            marginLeft: 0,
            padding: 0,
            fontFamily: "'Mulish', 'sans-serif'",
            fontWeight: 'bolder',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.02em',
            marginRight: '24px',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'rgb(59, 124, 15)',
            height: '3px',
        },
        '& .Mui-selected': {
            color: 'rgb(59, 124, 15) !important',
        },

    }
});

export const EventsPage = () => {

    const classes = useStyles();

    const [eventsArr, setEventsArr] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:3000/events`).then(res => {
                setEventsArr(res.data)
        });
    }, [eventsArr])

    const [value, setValue] = useState('allEvents');
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [checkboxEndValue, setCheckboxEndValue] = useState(false)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '70%'}} className={`${classes.root} box-container`}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab tabs">
                        <Tab label="Все события" value="allEvents"/>
                        <Tab label="Мои события" value="myEvents"/>
                        <Tab label="Архивные события" value="archiveEvents"/>
                    </TabList>
                </Box>
                <TabPanel value="allEvents">
                    <EventsList allEvents={eventsArr}/>
                </TabPanel>
                <TabPanel value="myEvents">
                    <input onChange={e => setCheckboxValue(e.target.checked)} checked={checkboxValue} className="admin-filter-checkbox" type="checkbox" id="adminFilter" name="adminFilter" value="yes"/>
                    <label className="admin-filter-label" htmlFor="adminFilter">Я - админ</label>
                    <br/>
                    <input onChange={e => setCheckboxEndValue(e.target.checked)} checked={checkboxEndValue} className="admin-filter-checkbox" type="checkbox" id="EndFilter" name="EndFilter" value="yes"/>
                    <label className="admin-filter-label" htmlFor="EndFilter">Не завершено</label>
                    <MyEventsList allEvents={eventsArr} checkboxValue={checkboxValue} checkboxEndValue={checkboxEndValue}/>
                </TabPanel>
                <TabPanel value="archiveEvents">
                    <ArchiveEvents allEvents={eventsArr}/>
                </TabPanel>
            </TabContext>
        </Box>
    )
}