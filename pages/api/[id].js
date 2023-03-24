
// export default async function handler(req, res) {
//     const {
//         query: { id },
//       } = req;
//     // const data = req.body; https://sandbox.cashfree.com/pg/orders
//     const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${id}`,{
//       method: "GET",
//       headers: {
//            },
//     })
  
//     const responseData = await response.json();
//      // Send response back to frontend
//     res.status(response.status).json(responseData)
// }

export default async function handler(req, res) {
  // Set the request headers
  const {
    query: { id },
  } = req;

  const headers = {
    "Content-Type": "application/json",
    "x-api-version": "2022-01-01",
    "x-client-id": process.env.CASHFREE_CLIENT_ID,
    "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
  };

  try {
    // Make the GET request
    const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${id}`, {
      method: 'GET',
      headers,
    });

    // Get the response data
    const data = await response.json();

    // Send the response back to the client
    res.status(200).json({ data });
    // console.log(data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Error fetching data' });
  }
}