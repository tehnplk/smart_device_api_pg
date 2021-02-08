var express = require('express');
var router = express.Router();

var knex = require('../con_db');

router.get('/', function (req, res, next) {
  res.render('bmi', {
    title: 'BMI'
  });
});


router.post('/add_log', async function (req, res, next) {

  let vn = req.body.vn;
  let cid = req.body.cid;
  let bw = req.body.bw;
  let bh = req.body.bh;
  let bmi = req.body.bmi;
  let hn = req.body.hn;
  let fullname = req.body.fullname;
  let note1 = req.body.note1;
  let note2 = req.body.note2;
  let note3 = req.body.note3;

  d_update = new Date();
  console.log(d_update)

  var id = await knex('smart_gate_bmi')
    .insert({
      //id: null,
      vn: vn,
      cid: cid,
      bw: bw,
      bh: bh,
      bmi: bmi,
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
  let bw = req.body.bw;
  let height = parseInt(req.body.height);
  let bmi = req.body.bmi;

  let effect = await knex('opdscreen')
    .where('vn', '=', vn)
    .update({
      bw: bw,
      height: height,
      bmi: bmi
    })

  res.json({
    'effect': effect
  })
});



module.exports = router;