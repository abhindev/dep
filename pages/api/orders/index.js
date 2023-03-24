import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
      // console.log(order._id);
      ////////////////////////////////////////////
      // const orderdata = {
      //   order_id: "order_9279944453509",
      //   order_amount: 10.12,
      //   order_currency: "INR",
      //   order_note: "Additional order info",
      //   order_meta: {
      //     return_url: "http://localhost:3000/cart?{order_id}"},
      //   customer_details: {
      //     customer_id: "12345",
      //     customer_name: "name",
      //     customer_email: "care@cashfree.com",
      //     customer_phone: "9816512345",
      //   },}
      //   const createOrder = async () => {
      //     // const data =  axios.post("/api/get_page_data", order);
      //     // setOredrData(data)
      //       const response = await fetch('/api/get_page_data', {
      //         method: 'POST',
      //         body: JSON.stringify({ ...orderdata }),
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //       });
        
      //       const responseData = await response.json();
      //       console.log(responseData.payment_link);
      //   };
      ///////////////////////////////////////////
     
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;