// const CreatePayment = async (



  
// ) => {
//   const response = await fetch("/api/get_page_data", {
//     method: "POST",
//     body: JSON.stringify({
//       order_id: order_id,
//       order_amount: order_amount,
//       order_currency: "INR",
//       order_note: "Additional order info",
//       order_meta: {
//         return_url: "http://localhost:3000/cart?{order_id}",
//       },
//       customer_details: {
//         customer_id: customer_id,
//         customer_name: customer_name,
//         customer_email: customer_email,
//         customer_phone: customer_phone,
//       },
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const responseData = await response.json();
//   console.log(responseData.payment_link);
//   // setLink(responseData.payment_link)
// };

// // export default CreatePayment;

import axios from "axios";

async function createPayment (
  order_id,
  order_amount,
  customer_id,
  customer_name,
  customer_email,
  customer_phone) {
  const res = await axios.post("/api/get_page_data", {
    order_id: order_id,
    order_amount: order_amount,
    order_currency: "INR",
    order_note: "Additional order info",
    order_meta: {
      return_url: `http://localhost:3000/orders/{order_id}`,
    },
    customer_details: {
      customer_id: customer_id,
      customer_name: customer_name,
      customer_email: customer_email,
      customer_phone: customer_phone,
    },
});
return(res)
}

export default createPayment