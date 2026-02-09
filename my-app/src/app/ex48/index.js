const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;
const morgan = require("morgan")
app.use(morgan("combined"))
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);
// Add this line to serve our index.html page
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
});
const cors = require("cors")
app.use(cors())
app.get("/image/:id", cors(), (req, res) => {
    id = req.params["id"]
    console.log('upload/' + id)
    res.sendFile(__dirname + '/upload/' + id);
})
app.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/upload/' + image.name);
    // All good
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
