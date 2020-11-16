import express from 'express';
import { read } from './jsonFileStorage.js';

const app = express();
const PORT = 3004;

app.set('view engine', 'ejs');

// THis is the main home page with the list
app.get('/', (request, response) => {
  read('data.json', (data) => {
    response.render('year', data);
  });
});

// This is for each individual sightings page
app.get('/sightings/:index', (request, response) => {
  read('data.json', (data) => {
    console.log(request.url, 'request.url');
    const { index: dataIndex } = request.params;

    const newDataObj = { ...data.sightings[dataIndex] };
    newDataObj.url = '/';
    console.log(newDataObj, 'newDataObj');
    response.render('index', newDataObj);
  });
});
// This is to create a newpage that renders the reports by sort()
app.get('/newPage', (request, response) => {
  read('data.json', (data) => {
    const orderOfSort = request.query.sortby;
    if (orderOfSort === 'year') {
      data.sightings.sort((a, b) => a.YEAR - b.YEAR);
    } else if (orderOfSort === 'state') {
      data.sightings.sort((a, b) => {
        if (a.STATE < b.STATE) { return -1; }
        if (a.STATE > b.STATE) { return 1; }
        return 0;
      });
    }
    response.render('year', data);
  });
});

app.listen(PORT);
