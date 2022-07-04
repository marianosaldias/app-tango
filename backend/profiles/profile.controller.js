const Profile = require('./profile.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

const profileCtrl = {};

// Get all profiles: May be it is used only by the admin
// profileCtrl.getAllProfiles = async (req, res, next) => {
//     const profiles = await Profile.find();
//     res.json(profiles);
// };

profileCtrl.createProfile =  async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const profile = new Profile ({
            idUser          : getIdUser,
            state           : req.body.state,
            city            : req.body.city,
            profile         : req.body.profile,
            name            : req.body.name,
            subtitle        : req.body.subtitle,
            phone           : req.body.phone,
            email           : req.body.email,
            website         : req.body.website,
            socialLink      : req.body.socialLink,
            resume          : req.body.resume,
            tags            : req.body.tags
    });
    console.log(profile);
    await profile.save();
    res.status(200).json({
        status: 200,
        message: 'Profile saved'
    });        
}

// profileCtrl.getProfiles = async (req, res, next) => {
//     const profile = await Profile.findById(req.params.id);
//     res.json(profile);
// }

profileCtrl.getProfilesByIdUser = async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const profiles = await Profile.find({ 'idUser': getIdUser});
    res.json(profiles);
}

profileCtrl.getProfileByIdProfile = async (req, res, next) => {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
}

profileCtrl.getProfilesByProfile = async (req, res, next) => {
    const profiles = await Profile.find({ 'profile': req.params.profile });
    res.json(profiles);
}

profileCtrl.getProfilesByName = async (req, res, next) => {
    const profiles = await Profile.find({ 'name': req.params.name });
    res.json(profiles);
}

profileCtrl.getProfilesByTag = async (req, res, next) => {
    const profiles = await Profile.find({ 'tags': {$regex: req.params.tag} });
    // const profiles = await Profile.find({ 'tags': {$regex: 'paris'} });
    res.json(profiles);
}

profileCtrl.getProfilesByProfileAndState = async (req, res, next) => {
    const profiles = await Profile.find({ 'profile': req.params.profile, 'state': req.params.state });
    res.json(profiles);
}

// profileCtrl.getProfilesByProfileAndCity = async (req, res, next) => {
//     const profiles = await Profile.find({ 'profile': req.params.profile, 'city': req.params.city });
//     res.json(profiles);
// }

profileCtrl.editProfile = async (req, res, next) => {
    const {id} = req.params;
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const profile = {
        idUser          : getIdUser,
        state           : req.body.state,
        city            : req.body.city,
        profile         : req.body.profile,
        name            : req.body.name,
        subtitle        : req.body.subtitle,
        phone           : req.body.phone,
        email           : req.body.email,
        website         : req.body.website,
        socialLink      : req.body.socialLink,
        resume          : req.body.resume,
        tags            : req.body.tags
    };
    console.log(profile);
    await Profile.findByIdAndUpdate(id, {$set: profile}, {new: true});
    res.status(200).json({
        status: 200,
        message: 'Response Ok'
    });
}

profileCtrl.deleteProfile = async (req, res, next) => {
    await Profile.findByIdAndRemove(req.params.id);
    res.json({
        status: 200,
        message: 'Profile deleted'
    });
}

module.exports = profileCtrl;

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