export class Event {

    constructor(
        _id             = '', 
        idUser          = '',
        state           = '', 
        city            = '',
        zipCode         = '',
        addressLat      = 0,
        addressLng      = 0,
        eventType       = '', 
        title           = '',
        address         = '',
        addressNumber   = '', 
        phone           = '',
        email           = '', 
        website         = '', 
        socialLink      = '',
        program         = '',
        organizer       = '',
        typeDate        = 1,
        eventDay        = 0,
        dateInit        = '',
        dateEnd         = '',
        timeInit        = '',
        timeEnd         = '',
        ) {
        this._id            = _id;
        this.idUser         = idUser;
        this.state          = state;
        this.city           = city,
        this.zipCode        = zipCode;
        this.addressLat     = addressLat;
        this.addressLng     = addressLng;        
        this.eventType      = eventType;
        this.title          = title;
        this.address        = address;
        this.addressNumber  = addressNumber;
        this.phone          = phone,
        this.email          = email;
        this.website        = website;
        this.socialLink     = socialLink;
        this.program        = program;
        this.organizer      = organizer;
        this.typeDate       = typeDate;
        this.eventDay       = eventDay;
        this.dateInit       = dateInit;
        this.dateEnd        = dateEnd;
        this.timeInit       = timeInit;
        this.timeEnd        = timeEnd
    }

    _id             : string;
    idUser          : string;
    state           : string;
    city            : string;
    zipCode         : string;
    addressLat      : number;
    addressLng      : number;
    eventType       : string;
    title           : string;
    address         : string;
    addressNumber   : string;
    phone           : string;
    email           : string;
    website         : string;
    socialLink      : string;
    program         : string;
    organizer       : string;
    typeDate        : number;
    eventDay        : number;
    dateInit        : string;
    dateEnd         : string;
    timeInit        : string;
    timeEnd         : string
}

// export class Event {

//     constructor(
//         _id             = '', 
//         idUser          = '',
//         state           = '', 
//         city            = '',
//         eventType       = '', 
//         name            = '',
//         address         = '', 
//         phone           = '',
//         email           = '', 
//         website         = '', 
//         socialLink      = '',
//         comments        = '',
//         organizer       = '',
//         dateInit        = '',
//         dateEnd         = '',
//         timeInit        = '',
//         timeEnd         = ''
//         ) {
//         this._id            = _id;
//         this.idUser         = idUser;
//         this.state          = state;
//         this.city           = city,
//         this.eventType      = eventType;
//         this.name           = name;
//         this.address        = address;
//         this.phone          = phone,
//         this.email          = email;
//         this.website        = website;
//         this.socialLink     = socialLink;
//         this.comments       = comments;
//         this.organizer      = organizer,
//         this.dateInit       = dateInit,
//         this.dateEnd        = dateEnd,
//         this.timeInit       = timeInit,
//         this.timeEnd        = timeEnd
//     }

//     _id             : string;
//     idUser          : string;
//     state           : string;
//     city            : string;
//     eventType       : string;
//     name            : string;
//     address         : string;
//     phone           : string;
//     email           : string;
//     website         : string;
//     socialLink      : string;
//     comments        : string;
//     organizer       : string;
//     dateInit        : string;
//     dateEnd         : string;
//     timeInit        : string;
//     timeEnd         : string  
// }