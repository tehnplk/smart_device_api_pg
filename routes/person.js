var express = require('express');
var router = express.Router();
var knex = require('../con_db');

router.get('/get_person_by_vn/:vn', async function (req, res, next) {
  let vn = req.params.vn;
  let sql = ` SELECT p.hn ,p.cid ,CONCAT(p.pname,p.fname,' ',p.lname) as fullname  
  FROM ovst o INNER JOIN patient p ON p.hn = o.hn WHERE  o.vn =? limit 1  `;
  let data = await knex.raw(sql, [vn]);

  try {
    res.json({
      'hn': data.rows[0].hn,
      'cid': data.rows[0].cid,
      'fullname': data.rows[0].fullname
    })
  } catch (error) {
    res.json({
      'hn': '0',
      'cid': '0',
      'fullname': 'ไม่พบรายชื่อ'
    });
  }

});

router.get('/get_person_by_cid/:cid', async function (req, res, next) {
  let cid = req.params.cid;
  let sql = ` SELECT p.hn ,p.cid ,CONCAT(p.pname,p.fname,' ',p.lname) as fullname 
  from patient p where p.cid = ? `;
  let data = await knex.raw(sql, [cid]);

  try {
    res.json({
      'hn': data.rows[0].hn,
      'cid': data.rows[0].cid,
      'fullname': data.rows[0].fullname
    })
  } catch (error) {
    res.json({
      'hn': '0',
      'cid': '0',
      'fullname': 'ไม่พบรายชื่อ'
    });
  }

});

router.get('/get_cid_by_hn/:hn', async function (req, res, next) {
  let hn = req.params.hn;
  let sql = ` SELECT p.cid  from patient p where p.hn = ? `;
  let data = await knex.raw(sql, [hn]);

  try {
    res.json({
      'cid': data.rows[0].cid
    })
  } catch (error) {
    res.json({
      'cid': '0'
    });
  }

});

router.get('/get_vn_by_cid/:cid', async function (req, res, next) {
  let cid = req.params.cid;
  let sql = ` select o.vn  from ovst o  left join patient p on p.hn = o.hn
  where p.cid=? and vstdate = CURRENT_DATE order by vsttime desc limit 1 `;
  let data = await knex.raw(sql, [cid]);

  try {
    res.json({
      'vn': data.rows[0].vn
    })
  } catch (error) {
    res.json({
      'vn': '0'
    });
  }

});


module.exports = router;