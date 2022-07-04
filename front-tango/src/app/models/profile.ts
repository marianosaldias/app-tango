export class Profile {

    constructor(
        _id             = '', 
        idUser          = '',
        state           = '', 
        city            = '',
        profile         = '', 
        name            = '',
        subtitle        = '', 
        phone           = '',
        email           = '', 
        website         = '', 
        socialLink      = '',
        resume          = '',
        tags            = ''
    ) {
        this._id            = _id;
        this.idUser         = idUser;
        this.state          = state;
        this.city           = city,
        this.profile        = profile;
        this.name           = name;
        this.subtitle       = subtitle;
        this.phone          = phone,
        this.email          = email;
        this.website        = website;
        this.socialLink     = socialLink;
        this.resume         = resume;
        this.tags           = tags;
    }

    _id             : string;
    idUser          : string;
    state           : string;
    city            : string;
    profile         : string;
    name            : string;
    subtitle        : string;
    phone           : string;
    email           : string;
    website         : string;
    socialLink      : string;
    resume          : string;
    tags            : string;
}
