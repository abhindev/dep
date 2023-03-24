
import axios from "axios";

async function createPayment (
  order_id,
  order_amount,
  customer_id,
  customer_name,
  customer_email,
  customer_phone) {
  const res = await axios.post(`api/get_page_data`, {
    order_id: order_id,
    order_amount: order_amount,
    order_currency: "INR",
    order_note: "Additional order info",
    order_meta: {
      return_url: `/orders/{order_id}`,
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