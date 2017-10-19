const express = require('express');
const router = express.Router();

/* GET runs. */
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 5
  const offset = parseInt(req.query.offset) || 0
  const db_runs = req.database.collection('runs')
  const runs_ = db_runs.find({})
      .skip(offset)
      .limit(limit)
      .toArray()
  const total_ = db_runs.count()
  Promise.all([runs_, total_])
    .then(([runs, total]) => {
      res.send({ runs, meta: { total } })
    }).catch(err => {
    console.log('err')
    console.log(err)
    res.status(400)
    res.send({message: 'db error'})
  })
});

module.exports = router;
