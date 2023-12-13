const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const events = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public'), { index: "index.html" }));

app.get('/all-event', (req, res) => {
    res.json(events);
});

app.post('/create-event', (req, res) => {
    const createEvent = req.body.event;
    console.log('Received request to create event:', createEvent);
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

