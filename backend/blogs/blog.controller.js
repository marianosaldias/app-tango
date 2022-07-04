const Blog = require('./blog.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

const blogCtrl = {};

// Get all blogs: May be it is used only by the admin
// blogCtrl.getAllBlogs = async (req, res, next) => {
//     const blogs = await Blog.find();
//     res.json(blogs);
// };

blogCtrl.createBlog =  async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const blog = new Blog ({
        idUser              : getIdUser,
        state               : req.body.state,
        city                : req.body.city,
        title               : req.body.title,
        introParagraph      : req.body.introParagraph,
        paragraphs          : req.body.paragraphs,
        date                : req.body.date,
        lan                 : req.body.lan,
        writer              : req.body.writer,
        email               : req.body.email,
        tags                : req.body.tags
    });
    console.log(blog);
    await blog.save();
    res.status(200).json({
        status: 200,
        message: 'Blog saved'
    });        
}

blogCtrl.getBlogsByIdUser = async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const blogs = await Blog.find({ 'idUser': getIdUser});
    res.json(blogs);
}

blogCtrl.getAllBlogs = async (req, res, next) => {
    const blogs = await Blog.find();
    res.json(blogs);
}

blogCtrl.getBlogByIdBlog = async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
}

blogCtrl.getBlogsByTag = async (req, res, next) => {
    const blogs = await Blog.find({ 'tags': {$regex: req.params.tag} });
    res.json(blogs);
}

blogCtrl.getBlogsByState = async (req, res, next) => {
    const blogs = await Blog.find({ 'state': req.params.state });
    res.json(blogs);
}

blogCtrl.getBlogsByLan = async (req, res, next) => {
    const blogs = await Blog.find({ 'lan': req.params.lan });
    res.json(blogs);
}

blogCtrl.editBlog = async (req, res, next) => {
    const {id} = req.params;
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const blog = {
        idUser              : getIdUser,
        state               : req.body.state,
        city                : req.body.city,
        title               : req.body.title,
        introParagraph      : req.body.introParagraph,
        paragraphs          : req.body.paragraphs,
        date                : req.body.date,
        lan                 : req.body.lan,
        writer              : req.body.writer,
        email               : req.body.email,        
        tags                : req.body.tags        
    };
    console.log(blog);
    await Blog.findByIdAndUpdate(id, {$set: blog}, {new: true});
    res.status(200).json({
        status: 200,
        message: 'Blog edited successfully'
    });
}

blogCtrl.deleteBlog = async (req, res, next) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.json({
        status: 200,
        message: 'Blog deleted successfully'
    });
}

module.exports = blogCtrl;

function getToken(req, res) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / !req.headers.authorization'});
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).json({status: 401, message: 'getToken: Unauhtorized Request / Token is null'});
		}

		const payload = jwt.verify(token, SECRET_KEY);
		if (!payload) {
			return res.status(401).json({status: 401, message: 'Unauhtorized Request / !payload'});
		}
        req.userId = payload.id;
        console.log('Payload.Id: ' + payload.id);
        return payload.id;
	} catch(e) {
		console.log('Error: ' + e)
		return res.status(401).json({status: 401, message: 'Unauhtorized Request'});
	}
}