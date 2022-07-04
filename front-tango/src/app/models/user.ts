export class User {

    constructor(
        _id             = '', 
        firstName       = '', 
        lastName        = '',
        //nick            = '', 
        //profile         = '', 
        //status          = '',
        email           = '', 
        //phone           = '', 
        password        = ''
    ) {
        this._id             = _id;
        this.firstName       = firstName;
        this.lastName        = lastName,
        //this.nick            = nick;
        //this.profile         = profile;
        //this.status          = status;
        this.email           = email;
        //this.phone           = phone;
        this.password        = password;
    }

    _id             : string;
    firstName       : string;
    lastName        : string;
    //nick            : string;
    //profile         : string;
    //status          : string;
    email           : string;
    //phone           : string;
    password        : string;
}

