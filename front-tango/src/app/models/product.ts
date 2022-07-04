export class Product {

    constructor(
        _id             = '', 
        type            = '', 
        name            = '',
        description     = '', 
        status          = '', 
        price           = 0,
        happyIndex      = 1
    ) {
        this._id            = _id;
        this.type           = type;
        this.name           = name,
        this.description    = description;
        this.status         = status;
        this.price          = price;
        this.happyIndex     = happyIndex;
    }

    _id             : string;
    type            : string;
    name            : string;
    description     : string;
    status          : string;
    price           : number;
    happyIndex      : number;
}

