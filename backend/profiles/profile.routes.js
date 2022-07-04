const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const profile = require('./profile.controller');
const SECRET_KEY = 'secretkey123456';

// router.get('/', profile.getAllProfiles);
// router.get('/', profile.getProfiles);

router.post('/', verifyToken, profile.createProfile);
router.get('/', verifyToken, profile.getProfilesByIdUser);
router.get('/:profile', profile.getProfilesByProfile);
router.get('/tag/:tag', profile.getProfilesByTag);
router.get('/iduser/:id', profile.getProfileByIdProfile);
router.get('/:profile/:state', profile.getProfilesByProfileAndState);
// router.get('/:profile/:city', profile.getProfilesByProfileAndCity);
router.get('/:profile/:name', profile.getProfilesByName);
router.put('/:id', verifyToken, profile.editProfile);
router.delete('/:id', verifyToken, profile.deleteProfile);

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request by !req.headers.authorization');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request by token === null');
		}

		const payload = await jwt.verify(token, SECRET_KEY);
		if (!payload) {
			return res.status(401).send('Unauhtorized Request by !payload');
		}
		console.log(payload);
		req.userId = payload._id;
		next();
	} catch(e) {
		console.log('Error: ' + e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;


// async function verifyToken(req, res, next) {
//     let token = req.headers.authorization.split(' ')[1];
  
//     if (token) {
//       jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//           return res.status(401).send('Unauhtorized Request');
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       res.status(401).send({
//         mensaje: 'Token not found'
//       })
//     }
// }