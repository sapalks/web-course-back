const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { Dropbox } = require('dropbox');

const port = 3000;

const access_token = 'UI12SXbJHvcAAAAAAAAAAQ7aIcZayTBq8G_H1p7KFLC3D-eZ7IhoVNNmwUGif_Cz'

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('views'))

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/uploading', function (req, res) {
    res.render('uploading')
})

app.get('/files', async function (req, res) {
    const dbx = new Dropbox({ accessToken: access_token });
    let queryFilesListFolder = (await dbx.filesListFolder({ path: '' })).result.entries

    folders = [];
    files = [];

    for (var i = 0; i < queryFilesListFolder.length; i++) {
        if (path.extname(queryFilesListFolder[i].name) == '') {
            folders.push(queryFilesListFolder[i]);
        } else {
            files.push(queryFilesListFolder[i]);
        }
    }
    res.render('files', { folders: folders, files: files })
});

app.get('/download', async function ({
 query: { shared_link }}, res) {
    const dbx = new Dropbox({ accessToken: access_token });

    let sharedLink = (await dbx.sharingCreateSharedLink({ path: shared_link })).result.url;

    dbx.sharingGetSharedLinkFile({ url: sharedLink })
        .then((data) => {
            fs.writeFile(data.result.name, data.result.fileBinary, (err) => {
                if (err) throw err;
            });
        })
    res.render('download-success', { shared_link: shared_link })
});

app.get('/upload', function ({ query: { filename }}, res) {
    const dbx = new Dropbox({ accessToken: access_token });

    fs.readFile(path.join(__dirname, '/' + filename), (err, contents) => {
        if (err) throw err;

        dbx.filesUpload({
            path: '/' + filename,
            contents
        })
            .then(json => {
                res.render('upload-success', {
                    filename: filename
                })
            })
            .catch((uploadErr) => { console.log(uploadErr); });
    });
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})