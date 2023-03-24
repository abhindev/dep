import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {reset ,removeItem } from "../../redux/orderSlice";

import styles from "../../styles/Order.module.css";

function Index() {
  const dispatch = useDispatch();
  const order = useSelector((state:any) => state.order);
  // console.log(order.orders); 
  const orderItem = order.orders
  console.log(order)
  const clear = () => {
    dispatch(reset());
  };
  const handleRemove = (i:number, order:any,orderItem:any) =>{
    dispatch(removeItem({i, order,orderItem}))
  }
const demo = ():any => {console.log("nooo")}

  return (
    <div>
      
      All Orders
      {order.orders.map((order:any, i:number)=>
        <div key={i} className={styles.rev}>
          <div className={styles.imagecontainer}>
            <Image src={order.item.products[0].img[0]} alt="" width={100} height={100}/>
            <div>
              <span>{order.item.products.length>1? 
              <>
              <h2>{order.item.products[0].title}</h2> <p>and more {order.item.products.length}</p>
              </> : 
              <>
              <h2>
              {order.item.products[0].title}
              </h2>
              
              </>
              }</span>
            </div>
            <div>{order.item.total}</div>
            <div>{order.status}</div>
            <div>
            {/* {console.log("getBackgroundColor")} */}
            {order.status==0 ? handleRemove(i, order,orderItem) : demo()}
            </div>
            {/* {order.item.products.length>1? <h1>{order.item.products.length}</h1> : null} */}
          </div>
        </div>
      )}
      <button onClick={clear}>buttoen</button>
    </div>
  )
}

export default Index
