import express from 'express';

const router = express.Router();

router.get('/model', (req, res) => {
  res.render('sub_models', {
    name: 'max'
  });
});

router.get('/appshell', (req, res) => {
  res.json({
    name: 'essie'
  });
  res.status(200);
});

router.get('/ln', (req, res) => {
  res.render('ln', { name: 'esssiieee' });
});

router.get('/users', (req, res) => {
  // simplicity 101

  res.json([{
    "id": 1,
    "firstName": "Theon",
    "lastName": "catMEl",
    "email": "catMEl@save.net"
  },
  {
    "id": 2,
    "firstName": "sebrina",
    "lastName": "craig",
    "emai": "craig@yahoo.com"
  },
  {
    "id": 3,
    "firstName": "tom",
    "lastName": "richard",
    "email": "tom@gmail.com"
  },
  {
    "id": 4,
    "firstName": "Perly",
    "lastName": "wanjiku",
    "email": "perlyKiambati@silicon.io"
  },
  {
    "id": 5,
    "firstName": "diana",
    "lastName": "wanjiku",
    "email": "shiku99@gmail.com"
  }
  ]);
});

export default router;
