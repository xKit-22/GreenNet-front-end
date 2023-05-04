import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {EventsList} from './EventsList'
import './eventsPage.scss'
import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {MyEventsList} from "./MyEventsList";


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

    const fakeEventsArray = [
        {
            id: 1,
            img: 'https://img.freepik.com/free-vector/hand-drawn-apple-fruit-illustration_53876-2980.jpg?w=740&t=st=1682794553~exp=1682795153~hmac=b2973d1214bbd63a795869766968dc27baf6641ae04808d3c561ae9f9a75bc3f',
            name: 'item_1',
            description: 'description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ ',
            dateOfStart: `${new Date('10.10.2023').toISOString()}`,
            dateOfFinish: `${new Date('10.10.2023').toISOString()}`,
            membersArr: [],
            reward: 1200,
            adminID: 'PEsPyRS6td',
            isAdmin: false
        },
        {
            id: 2,
            img: 'https://img.freepik.com/free-vector/capybara-in-nature-pond-on-half-earth_1308-126854.jpg?w=740&t=st=1682868036~exp=1682868636~hmac=d1580da0e20e73ecf0e5b24f8e662bb26ac35726a4b99098aebc81d07b7a94d0',
            name: 'item_2',
            description: 'description_3/description_3/description_3/description_3/description_3/description_3/description_3/description_3/',
            dateOfStart: `${new Date(new Date() - 24 * 3600 * 1000).toISOString()}`,
            dateOfFinish: `${new Date(new Date() - 24 * 3600 * 1000).toISOString()}`,
            membersArr: [],
            reward: 800,
            adminID: null,
            isAdmin: false
        },
        {
            id: 3,
            img: 'https://img.freepik.com/premium-vector/cute-welsh-corgi-dog-waving-paw-cartoon_42750-623.jpg?w=740',
            name: 'item_3',
            description: 'description_2/ description_2/ description_2/ description_2/description_2/description_2/description_2/description_2/',
            cost: 500,
            dateOfStart: `${new Date().toISOString()}`,
            dateOfFinish: `${new Date().toISOString()}`,
            membersArr: ['PEsPyRS6td'],
            reward: 500,
            adminID: null,
            isAdmin: false
        },
        {
            id: 4,
            img: 'https://img.freepik.com/free-vector/pet-shop-composition_1284-25876.jpg?w=826&t=st=1682953595~exp=1682954195~hmac=2f5d7f0d78153cef622c29fee0a476f990ffefdc7865659c490f24f67e3a85d7',
            name: 'item_4',
            description: 'description_4/ description_4/ description_4/ description_4/description_4/description_4/description_4/description_4/',
            cost: 200,
            dateOfStart: `${new Date('10.08.2023').toISOString()}`,
            dateOfFinish: `${new Date('10.08.2023').toISOString()}`,
            membersArr: [],
            reward: 1500,
            adminID: null,
            isAdmin: false
        },
    ]

    const [allEventsArr, setAllEventsArr] = useState(fakeEventsArray)
    const [value, setValue] = useState('allEvents');


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
                    </TabList>
                </Box>
                <TabPanel value="allEvents">
                    <EventsList allEvents={allEventsArr}/>
                </TabPanel>
                <TabPanel value="myEvents">
                    <MyEventsList allEvents={allEventsArr}/>
                </TabPanel>
            </TabContext>
        </Box>
    )
}