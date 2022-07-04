'use strict'
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const properties = require('./config/properties');
const DB = require('./config/db');

const SECRET_KEY = 'secretkey123456';

// init DB
DB();

const app = express();
const router = express.Router();
// app.set('keytoken', config.keytoken);

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Middlewares
app.use(morgan('dev'));
// app.use(cors());
app.use(cors({origin: ['http://localhost:4200','http://127.0.0.1:8080']}));

const verifyToken = express.Router();
verifyToken.use(async (req, res, next) => {
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
});

const getToken = express.Router();
getToken.use(async (req, res) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / !req.headers.authorization'});
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / Token is null'});
		}

		const payload = await jwt.verify(token, SECRET_KEY);
		if (!payload) {
			return res.status(401).json({status: 401, message: 'Unauhtorized Request / !payload'});
		}
        req.userId = payload._id;
        console.log('Get idUser from token: ' + req.userId);
		return req.userId;
	} catch(e) {
		console.log('Error: ' + e)
		return res.status(401).json({status: 401, message: 'Unauhtorized Request'});
	}
})

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Hello from home');
});

app.use(router);

// Routes
app.use('/api/profiles', require('./profiles/profile.routes'));
app.use('/api/events', require('./events/event.routes'));
app.use('/api/blogs', require('./blogs/blog.routes'));
// app.use('/api/gallery', require('./gallery/gallery.routes'));

app.listen(properties.PORT, () => console.log(`Server runing on port ${properties.PORT}`));

///////////////////////////////////////////////////////////////////////////////////////

// async function getToken(req, res) {
// 	try {
// 		if (!req.headers.authorization) {
// 			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / !req.headers.authorization'});
// 		}
// 		let token = req.headers.authorization.split(' ')[1];
// 		if (token === 'null') {
// 			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / Token is null'});
// 		}

// 		const payload = await jwt.verify(token, SECRET_KEY);
// 		if (!payload) {
// 			return res.status(401).json({status: 401, message: 'Unauhtorized Request / !payload'});
// 		}
//         req.userId = payload._id;
//         console.log('Get idUser from token: ' + req.userId);
// 		return req.userId;
// 	} catch(e) {
// 		console.log('Error: ' + e)
// 		return res.status(401).json({status: 401, message: 'Unauhtorized Request'});
// 	}
// }
  
///////////////////////////////////////////////////////////////////////////////////////

// async function verifyToken(req, res, next) {
// 	try {
// 		if (!req.headers.authorization) {
// 			return res.status(401).send('Unauhtorized Request by !req.headers.authorization');
// 		}
// 		let token = req.headers.authorization.split(' ')[1];
// 		if (token === 'null') {
// 			return res.status(401).send('Unauhtorized Request by token === null');
// 		}

// 		const payload = await jwt.verify(token, SECRET_KEY);
// 		if (!payload) {
// 			return res.status(401).send('Unauhtorized Request by !payload');
// 		}
// 		console.log(payload);
// 		req.userId = payload._id;
// 		next();
// 	} catch(e) {
// 		console.log('Error: ' + e)
// 		return res.status(401).send('Unauhtorized Request');
// 	}
// }

// verifyToken.use((req, res, next) => {
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
//   });