/* author: Mohammad Sheraj */
/* email: mdsheraj123@gmail.com */
// Used Node.js Expressjs and Postman body-parser pug multer ejs passportjs
// Planning on Using and MongoDB
//Tried with Array, then Map, but best is Class

class Product {
    constructor(name,colour,size,type,description) {
        this.name = name
        this.colour = colour
        this.size = size
        this.type = type
        this.description = description
    }
    getID() {
        return this.name+this.colour+this.size+this.type;//description can vary
    }
}

class MarketItem extends Product {
    constructor(ProductInstance,price,stock,status) {
        super(ProductInstance.name,ProductInstance.colour,ProductInstance.size,ProductInstance.type,ProductInstance.description)
        this.price = price
        this.stock = stock
        this.status = status
    }
    getID() {
        return super.getID() + this.price + this.stock + this.status;//this.status and all to track all offers
    }
}
class CustomerOrder extends Product {
    constructor(ProductInstance,price,quantity,customer,status) {
        super(ProductInstance.name,ProductInstance.colour,ProductInstance.size,ProductInstance.type,ProductInstance.description)
        this.price = price
        this.quantity = quantity
        this.customer = customer
        this.status = status
    }
    getID() {
        return super.getID() + this.price + this.quantity + this.customer + this.status;//this.status and all to track all incremental orders
    }
}
/////////////////////////////////////////////
class Market {
    constructor(marketItemsList=[]) {
        this.marketItemsList = marketItemsList;
    }
    addItem(newMarketItem) {
        this.marketItemsList.push(newMarketItem);
    }
    showItems() {
        this.marketItemsList.forEach(element => {
            if(element.status==="sell") {
                console.log(element.getID());
            }
        });
    }
}


class Customer {
    constructor(phoneNumber, customerOrderList=[]) {
        this.phoneNumber = phoneNumber;
        this.customerOrderList = customerOrderList;
    }
    addOrder(newCustomerOrder) {
        this.customerOrderList.push(newCustomerOrder);
    }
    showOrder() {
        this.customerOrderList.forEach(element => {
            console.log(element.getID());
        });
    }

}

class Agent {
    constructor() {
    }

}


const finalMarket = new Market();
finalMarket.addItem(new MarketItem(new Product("V140","Red","15-inch","laptop","Best laptop ever"),10000,1,"sell"))
finalMarket.addItem(new MarketItem(new Product("V140","Blue","13-inch","laptop","Best laptop ever"),5000,0,"sold"))
finalMarket.showItems();


const customerSheraj = new Customer('8094045888');
customerSheraj.addOrder(new CustomerOrder(new Product("V140","Red","15-inch","laptop","Best laptop ever"),8000,1,"8094045888","delivered"))
customerSheraj.addOrder(new CustomerOrder(new Product("V140","Blue","13-inch","laptop","Best laptop ever"),6000,2,"8094045888","pending"))
customerSheraj.showOrder()


