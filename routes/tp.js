var express = require('express');
var router = express.Router();

var knex = require('../con_db');

router.get('/', function (req, res, next) {
  res.render('tp', {
    title: 'TP'
  });
});


router.post('/add_log', async function (req, res, next) {

  let vn = req.body.vn;
  let cid = req.body.cid;
  let tp = req.body.tp;
  let hn = req.body.hn;
  let fullname = req.body.fullname;
  let note1 = req.body.note1;
  let note2 = req.body.note2;
  let note3 = req.body.note3;

  d_update = new Date();
  console.log(d_update)

  var id = await knex('smart_gate_tp')
    .insert({
      //id: null,
      vn: vn,
      cid: cid,
      tp: tp,
      hn: hn,
      fullname: fullname,
      d_update: d_update,
      note1: note1,
      note2: note2,
      note3: note3
    })
  res.json({
    'id': id.rowCount
  })

});

router.post('/update_opdscreen', async function (req, res, next) {

  let vn = req.body.vn;
  let tp = req.body.tp;

  let effect = await knex('opdscreen')
    .where('vn', '=', vn)
    .update({
      temperature: tp,
    })

  res.json({
    'effect': effect
  })
});



module.exports = router;