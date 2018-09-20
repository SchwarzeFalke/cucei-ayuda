const { Router } = require('express');
const router = Router();

//GET /map return all edifice
router.get('/', (req, res) => {
  const map = [
    {
      id: 1,
      edificio: 'DEDX',
      descripcion: 'infos, compu',
      aulas: 23,
    },
    {
      id: 2,
      edificio: 'DUCT1',
      descripcion: 'infos, compu',
      aulas: 19,
    },
    {
      id: 3,
      edificio: 'DUCT2',
      descripcion: 'infos, compu',
      aulas: 20,
    },
    {
      id: 4,
      edificio: 'DEDR',
      descripcion: 'matematicos',
      aulas: 18,
    },
    {
      id: 5,
      edificio: 'DEDV',
      descripcion: 'quimicos, matematicos',
      aulas: 8,
    },
    {
      id: 6,
      edificio: 'DEDV2',
      descripcion: 'quimicos, matematicos',
      aulas: 16,
    }
  ];
  res.send(map);
});

//GET /map/:mapId returns specific edifice
router.get('/:mapId', (req, res) => {
  const map = {
    id: req.params.mapId,
    edificio: `edificio${req.params.mapId}`,
    aulas: `aulas${req.params.mapId}`,
  };
  res.send(map);
});

//POST /map create a new edifice
router.post('/', (req, res) => {
	const json = {
	response: 'New edifice created!',
	data: {
		id: req.body.id,
		edificicio: req.body.edificio,
    descripcion: req.body.descripcion,
		aulas: req.body.aulas,
	 },
	};
	res.send(json);
});

// PUT /map/:mapId modify edifice
router.put('/:mapId', (req,res) => {
	const json = {
	response: 'Edifice modified successfully!',
	data: {
		id: req.body.id,
		text: 'Edifice modified!',
		modifiedAt: 19/09/12,
	 },
	};
  res.send(json);
});

//DELETE /map/:mapId delete edifice
router.delete('/:mapId', (req,res) =>{
  const json = {
    response: 'edifice deleted',
    data: {
      id: req.body.id,
      deletedAt: 19/09/12,
    },
  };
  res.send(json);
});

module.exports = router;
