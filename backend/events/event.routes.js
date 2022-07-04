const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const event = require('./event.controller');
const SECRET_KEY = 'secretkey123456';

// router.get('/', event.getAllEvents);
// router.get('/', event.getEvents);

router.post('/', verifyToken, event.createEvent);
router.get('/', verifyToken, event.getEventsByIdUser);
router.get('/idevent/:id', event.getEventById);
router.get('/:eventType', event.getEventsByEventType);
router.get('/:eventType/:state', event.getEventsByEventTypeAndState);
router.get('/:eventType/:city', event.getEventsByEventTypeAndCity);
router.get('/:eventType/:title', event.getEventsByTitle);
router.put('/:id', verifyToken, event.editEvent);
router.delete('/:id', verifyToken, event.deleteEvent);

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