const express = require('express');
const bodyParser = require('body-parser');
const pollsRoutes = require('./src/routes/polls');
const votesRoutes = require('./src/routes/votes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/polls', pollsRoutes);
app.use('/votes', votesRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
