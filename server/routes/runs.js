const express = require('express');
const router = express.Router();

/* GET /api/runs.
  returns list of runs.
  query params:
  - limit : int
  - offset : int
  - filter : string - JSON string
*/
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 5
  const offset = parseInt(req.query.offset) || 0
  const filter = JSON.parse(req.query.filter) || {}
  const db_runs = req.database.collection('runs')
  const runs_ = db_runs.find(filter)
      .skip(offset)
      .limit(limit)
      .sort({start_time: -1})
      .toArray()
  const total_ = db_runs.count(filter)
  Promise.all([runs_, total_])
    .then(([runs, total]) => {
      res.send({ runs, meta: { total } })
    }).catch(err => {
    console.log(err)
    res.status(400)
    res.send({message: 'db error'})
  })
});

/* GET /api/runs/:id. */
router.get('/:id', (req, res) => {
  const db_runs = req.database.collection('runs')
  db_runs.findOne({_id: parseInt(req.params.id) }).then(run => {
    res.send({ run: run })
  }).catch(err => {
    console.log(err)
    res.status(400)
    res.send({message: 'db error'})
  })
});

module.exports = router;
