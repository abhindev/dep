import axios from "axios";


async function createOrder (customer, Address, City,State,pinCode, phone , phone2, item, total) {
    const res = await axios.post(`api/orders`, {
    "customer": customer,
    "address": {
          "Address": Address,
          "City":City,
          "State" : State,
          "pinCode": pinCode,
    }, 
    "phone" :phone,
    "phone2" :phone2,
    "item": item,
    "total": total,
    "status": 0,
    "method": 0
});
return(res)
}

export default createOrder