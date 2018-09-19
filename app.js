var express = require('express');
var app = express();

//GET return all
app.get('/map', (req, res) => {
  const map = [
    {
      id: 1,
      edificio: 'DEDX',
      aulas: 23,
    },
    {
      id: 2,
      edificio: 'DUCT1',
      aulas: 19,
    },
    {
      id: 3,
      edificio: 'DUCT2',
      aulas: 20,
    },
    {
      id: 4,
      edificio: 'DEDR',
      aulas: 18,
    },
    {
      id: 5,
      edificio: 'DEDV',
      aulas: 8,
    },
    {
      id: 6,
      edificio: 'DEDV2',
      aulas: 16,
    }
  ];
  res.send(map);
});

//GET return single
app.get('/map/:madId', (req, res) => {
  const map = {
    id: req.params.mapId,
    edificio: `edificio${req.params.mapId}`,
    aulas: `aulas${req.params.mapId}`,
  };
  res.send(map);
});


app.listen(3000,  () => {
  console.log('Example app listening on port 3000!');
});
