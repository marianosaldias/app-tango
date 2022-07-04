export class Order {

    constructor(
        _id             = '', 
        orderStatus     = '', 
        tableNumber     = 0,
        userId          = '', 
        userNick        = '', 
        prodId          = '',
        prodType        = '',
        prodName        = '',
        prodPrice       = 0,
        prodQty         = 0


    ) {
        this._id            = _id;
        this.orderStatus    = orderStatus;
        this.tableNumber    = tableNumber,
        this.userId         = userId;
        this.userNick       = userNick;
        this.prodId         = prodId;
        this.prodType       = prodType;
        this.prodName       = prodName;
        this.prodPrice      = prodPrice;
        this.prodQty        = prodQty;

    }

    _id             : string; 
    orderStatus     : string;
    tableNumber     : number;
    userId          : string;
    userNick        : string;
    prodId          : string;
    prodType        : string;
    prodName        : string;
    prodPrice       : number;
    prodQty         : number;    
}
