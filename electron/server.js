
const express = require('express');
const serverDist = express();
const path = require('path');

const distPath = path.join(__dirname, '../dist');
serverDist.use(express.static(distPath));

serverDist.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
})

serverDist.listen(3002, () => {
    console.log('Server dist is running on port: 3002')
})