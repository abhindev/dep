import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React,{useState, useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { addOrder } from "../../redux/orderSlice";
import {reset} from "../../redux/cartSlice"

import styles from "../../styles/OrderID.module.css";
import myGif from '../../public/img/error.gif'
function Orders({ order, resone }: any) {

  const [orderstatus, setOrderstatus]= useState(order.status)
console.log(orderstatus)
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  
  // console.log(order.status);
// console.log(order.updatedAt)
const date = new Date(order.createdAt);
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
// console.log(formattedDate);





  const orderItems = order.item.products;
  const order_status = resone.data.order_status;
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    
  },[])

  const clickHandler = () => {
    
      // Make the PUT request
      const response = axios.put(`http://localhost:3000/api/orders/${id}`, {
        // Include any data you want to update in the request body
        status: 1,
      });
      // Handle the response data
      ()=>dispatch(reset());
  };
  // const clear = () => {
  //   dispatch(reset());
  // };

  // setTimeout(function() {
  //   if (order_status == "PAID" && orderstatus == 0 ) {
  //     const response = axios.put(`http://localhost:3000/api/orders/${id}`, {
  //         // Include any data you want to update in the request body
  //         status: 1,
  //       });
  //     console.log("done")
  //     dispatch(reset());
  //   }
  // }, 1000);
  
  const myTimeout = setTimeout(myGreeting, 100);
  function myGreeting() {
    if (order_status == "PAID" && orderstatus == 0 ) {
    clickHandler()
    console.log("fod")
    console.log(orderstatus)
    location.reload();
    console.log("reload")
    }
  }
  if ( orderstatus == 1 ) {
  dispatch(addOrder({ ...order }));
  console.log("added")
  } else {
    console.log("error")
  }
// function myGreeting() {
//   if (order_status == "PAID" && orderstatus == 0 ) {
//     const response = () => axios.put(`http://localhost:3000/api/orders/${id}`, {
//       // Include any data you want to update in the request body
//       status: 1,
//     });
//   console.log("done")
//   dispatch(reset());
//       }
// }

  return (
    <div>
      {order_status == "PAID" ? <><div className={styles.container}>
      <div>
      <div className={styles.orderId}>
        <h3 className={styles.id} >Order ID: {order._id}</h3>
        <h4 className={styles.date}>{formattedDate}</h4>
      </div>
      {/* <button onClick={()=>clear()}>clear </button> */}
      <div style={{borderTop:"1px solid gray" ,marginTop:"10px",}}>
      {orderItems.map((item:any, i:any)=>
      <div key={i} className={styles.item}>
        <div className={styles.imgdiv}>
         <Image src={item.img[0]} alt="" width="80" height="80" />
        </div>
        <div className={styles.more}>
          
          <div className={styles.desc}>
            <h1>{item.title}</h1>
            <p>{item.variant}</p>

          </div>
          <div className={styles.price}>
            <p>₹{item.price}</p>
            <p>Qty:{item.quantity}</p>
          </div>
        </div>
        
      </div> )}
      </div>
      {/* statues */}
  <div className={styles.order_track}>
    {order_status == "PAID" ? <>  <div className={styles.order_track_step}>
      <div className={styles.order_track_status}>
        <span className={styles.order_track_status_dot}></span>
        <span className={styles.order_track_status_line}></span>
        
      </div>
     
      <div className={styles.order_track_text}>
        <p className={styles.order_track_text_stat}>Order Received</p>
      </div>
    </div>
    <div className={styles.order_track_step}>
      <div className={styles.order_track_status}>
        <span className={styles.order_track_status_dot}></span>
        <span className={styles.order_track_status_line}></span>
      </div>
      <div className={styles.order_track_text}>
        <p className={styles.order_track_text_stat}>Order Processed</p>
      </div>
    </div>
    <div className={styles.order_track_step}>
      <div className={styles.order_track_status}>
        <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>1?  "#77a31f": "gray"}}></span>
        <span className={styles.order_track_status_line} style={{backgroundColor: orderstatus>1?  "#77a31f": "gray"}}></span>
      </div>
      <div className={styles.order_track_text}>
        <p className={styles.order_track_text_stat}>Manufracturing In Progress</p>
      </div>
    </div>
    <div className={styles.order_track_step}>
      <div className={styles.order_track_status}>
        <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>2?  "#77a31f": "gray"}}></span>
        <span className={styles.order_track_status_line} style={{backgroundColor: orderstatus>2?  "#77a31f": "gray"}}></span>
      </div>
      <div className={styles.order_track_text}>
        <p className={styles.order_track_text_stat}>Order Dispatched</p>
      </div>
    </div>
    <div className={styles.order_track_step}>
      <div className={styles.order_track_status}>
        <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>3?  "#77a31f": "gray"}}></span>
        <span className={styles.order_track_status_line} ></span>
      </div>
      <div className={styles.order_track_text}>
        <p className={styles.order_track_text_stat}>Order Deliverd</p>
      </div>
    </div> </> : null}
    
  </div>
      {/* statest end */}
      
      <div className={styles.address}>
        <h3>Delivery</h3>
        <p>Address</p>
        <p>{order.address.Address}, {order.address.City} ,{order.address.State}, {order.address.pinCode}</p>
      </div>
      </div> 
    </div></> : <div className={styles.Error}>
      <Image src={myGif} alt=""  width={500}/>
      </div>}
    </div>
  );
}

export default Orders;

export const getServerSideProps = async ({ params }: any) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  const resone = await axios.get(`http://localhost:3000/api/${params.id}`);
  // console.log(resone.data.data.order_status);
  return {
    props: {
      order: res.data,
      resone: resone.data,
      // products: resone.data,
    },
  };
};
// {orderItems.map((item: any, i: number) => {
//   {console.log("render")}
//   <div className={styles.imgDiv} key={i}>
//     <h1>ahya</h1>
//     {/* <Image  src={item.img[0]} alt="" width="60" height="60" /> */}
//   </div>
// })}