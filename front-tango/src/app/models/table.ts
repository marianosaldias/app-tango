export class Table {

    constructor(
        _id             = '', 
        tableNumber     = 0,
        tableStatus     = '',
        userId          = '', 
        userNick        = '', 
        dateTimeOpen    = '',
        dateTimeClose   = '',
        total           = 0
    ) {
        this._id            = _id;
        this.tableNumber    = tableNumber;
        this.tableStatus    = tableStatus,
        this.userId         = userId;
        this.userNick       = userNick;
        this.dateTimeOpen   = dateTimeOpen;
        this.dateTimeClose  = dateTimeClose;
        this.total          = total;
    }

    _id             : string; 
    tableNumber     : number;
    tableStatus     : string;
    userId          : string;
    userNick        : string;
    dateTimeOpen    : string;
    dateTimeClose   : string;
    total           : number;
}
