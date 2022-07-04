const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const blog = require('./blog.controller');
const SECRET_KEY = 'secretkey123456';

router.post('/', verifyToken, blog.createBlog);
router.get('/', verifyToken, blog.getBlogsByIdUser);
router.get('/all/', blog.getAllBlogs);
router.get('/id/:id', blog.getBlogByIdBlog);
router.get('/state/:state', blog.getBlogsByState);
router.get('/tag/:tag', blog.getBlogsByTag);
router.get('/lan/:lan', blog.getBlogsByLan);
// router.get('/tag/:tag/state/:state', blog.getBlogsByTagAndState);
router.put('/:id', verifyToken, blog.editBlog);
router.delete('/:id', verifyToken, blog.deleteBlog);

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