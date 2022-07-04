const Users = require('./auth.controller');
module.exports = (router) => {
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);

  //Example of protected route
  //router.post('/protectedPage', verifyToken, Users.loginUser);

  // async function verifyToken(req, res, next) {
  //   try {
  //     if (!req.headers.authorization) {
  //       return res.status(401).send('Unauhtorized Request');
  //     }
  //     let token = req.headers.authorization.split(' ')[1];
  //     if (token === 'null') {
  //       return res.status(401).send('Unauhtorized Request');
  //     }
  
  //     const payload = await jwt.verify(token, 'secretkey');
  //     if (!payload) {
  //       return res.status(401).send('Unauhtorized Request');
  //     }
  //     req.userId = payload._id;
  //     next();
  //   } catch(e) {
  //     //console.log(e)
  //     return res.status(401).send('Unauhtorized Request');
  //   }
  // }  

}