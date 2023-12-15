const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const externalApiUrl = 'https://eventplan.onrender.com';

let events = [];


const fetchEvents = async () => {
    try {
        const response = await axios.get(externalApiUrl);
        
        if (response.status === 200) {
            events = response.data;
            console.log('Fetched events from the external API:', events);
        } else {
            console.error('Failed to fetch events from the external API. Server response:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching events from the external API:', error.message);
    }
};


fetchEvents();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public'), { index: 'index.html' }));

app.get('/all-event', (req, res) => {
    res.json(events);
});

app.post('/create-event', (req, res) => {
    const createEvent = req.body.event;
    console.log('Received request to create event. Data:', req.body);
    
    if (!createEvent) {
        return res.status(400).json({ error: 'Invalid data for event creation' });
    }

    events.push(createEvent);
    console.log('Updated events array:', events);
    res.json(createEvent);
});
app.post('/update-event', (req, res) => {
    const { event, index } = req.body;
    events[index] = event;
    res.json(event);
});

app.post('/delete-event', (req, res) => {
    const { index } = req.body;
    events.splice(index, 1);
    res.json({ message: 'Event deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});