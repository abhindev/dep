import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from "../../styles/Navbar.module.css";
import logo from "/public/img/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";

function Navbar() {
    const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
       <div className={styles.item}>
         <Link href="/">
           <div className={styles.logo}>
             <Image src={logo} alt="" width="80" />
           </div>
         </Link>
       </div>
       <Link href={"/cart"} passHref>
         <div className={styles.item}>
       <div className={styles.cart}>
         <div className={styles.cartIcon}>
           <h1>
           <BiShoppingBag />
           </h1>
            </div>
            <div className={styles.cartcounter}>{quantity}</div>
          </div>
         </div>
       </Link>
    </div>
  )
}

export default Navbar
