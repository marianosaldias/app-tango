const Event = require('./event.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';

const eventCtrl = {};

// Get all profiles: May be it is used only by the admin
// profileCtrl.getAllProfiles = async (req, res, next) => {
//     const profiles = await Profile.find();
//     res.json(profiles);
// };

eventCtrl.createEvent =  async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const event = new Event ({
            idUser          : getIdUser,
            state           : req.body.state,
            city            : req.body.city,
            zipCode         : req.body.zipCode,
            addressLat      : req.body.addressLat,
            addressLng      : req.body.addressLng, 
            eventType       : req.body.eventType,
            title           : req.body.title,
            address         : req.body.address,
            addressNumber   : req.body.addressNumber,
            phone           : req.body.phone,
            email           : req.body.email,
            website         : req.body.website,
            socialLink      : req.body.socialLink,
            program         : req.body.program,
            organizer       : req.body.organizer,
            typeDate        : req.body.typeDate,
            eventDay        : req.body.eventDay,
            dateInit        : req.body.dateInit,
            dateEnd         : req.body.dateEnd,
            timeInit        : req.body.timeInit,
            timeEnd         : req.body.timeEnd
    });
    console.log(event);
    await event.save();
    res.status(200).json({
        status: 200,
        message: 'Event saved'
    });        
}

// eventCtrl.getEvents = async (req, res, next) => {
//     const event = await Event.findById(req.params.id);
//     res.json(event);
// }

eventCtrl.getEventsByIdUser = async (req, res, next) => {
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const events = await Event.find({ 'idUser': getIdUser});
    res.json(events);
}

eventCtrl.getEventById = async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
}

eventCtrl.getEventsByTitle = async (req, res, next) => {
    const events = await Event.find({ 'title': req.params.title });
    res.json(events);
}

eventCtrl.getEventsByEventType = async (req, res, next) => {
    const events = await Event.find({ 'eventType': req.params.eventType });
    res.json(events);
}

eventCtrl.getEventsByEventTypeAndState = async (req, res, next) => {
    const events = await Event.find({ 'eventType': req.params.eventType, 'state': req.params.state });
    res.json(events);
}

eventCtrl.getEventsByEventTypeAndCity = async (req, res, next) => {
    const events = await Event.find({ 'eventType': req.params.eventType, 'city': req.params.city });
    res.json(events);
}

eventCtrl.editEvent = async (req, res, next) => {
    const {id} = req.params;
    // Get idUser from token:
    getIdUser = getToken(req, res);  
    console.log('req: ' + req);
    console.log('idUser: ' + getIdUser);
    const event = {
        idUser          : getIdUser,
        state           : req.body.state,
        city            : req.body.city,
        zipCode         : req.body.zipCode,
        addressLat      : req.body.addressLat,
        addressLng      : req.body.addressLng, 
        eventType       : req.body.eventType,
        title           : req.body.title,
        address         : req.body.address,
        addressNumber   : req.body.addressNumber,
        phone           : req.body.phone,
        email           : req.body.email,
        website         : req.body.website,
        socialLink      : req.body.socialLink,
        program         : req.body.program,
        organizer       : req.body.organizer,
        typeDate        : req.body.typeDate,
        eventDay        : req.body.eventDay,
        dateInit        : req.body.dateInit,
        dateEnd         : req.body.dateEnd,
        timeInit        : req.body.timeInit,
        timeEnd         : req.body.timeEnd
    };
    console.log(event);
    await Event.findByIdAndUpdate(id, {$set: event}, {new: true});
    res.status(200).json({
        status: 200,
        message: 'Response Ok'
    });
}

eventCtrl.deleteEvent = async (req, res, next) => {
    await Event.findByIdAndRemove(req.params.id);
    res.json({
        status: 200,
        message: 'Event deleted'
    });
}

module.exports = eventCtrl;

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