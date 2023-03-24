import Image from "next/image";
import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { BiShoppingBag } from "react-icons/bi";
import styles from "../../styles/ProductCard.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Link from "next/link";
import { useRouter } from 'next/router'
function ProductCard({product ,i }) {
  const { width } = useWindowDimensions();
  const router = useRouter()
  const dispatch = useDispatch();

  const item = product;
  const index = i
  const price = item.prices[0].price;
  const quantity = 1

  const variant = item.prices[0].text;


  const handleClickAddToCart = () => {
    dispatch(addProduct({ ...product, price, quantity ,variant}));
  };
  const handleClickBuyNow = () => {
    dispatch(addProduct({ ...product, price, quantity ,variant }));
    router.push('/cart')
  };


  return (

    <div
      className={width < 600 ? null: styles.container}
      style={
        index % 2 == 0
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    ><Link
    href={`/product/${product._id}`}
    passHref
    style={{ textDecoration: "none", color: "#000" }}
  >
      <div className={width < 600 ? styles.left_mob : styles.left} >
        <div className={width<600 ? styles.imgcont_mob : styles.imgcont}>
          <div className={width<600 ?styles.img_mob : styles.img}>
            <Image src={item.img[0]} alt="" fill objectFit="cover" />
          </div>
        </div>
      </div>
      </Link>
      <div className={width<600 ? styles.right_mob : styles.right}>
      <Link
          href={`/product/${product._id}`}
          passHref
          style={{ textDecoration: "none", color: "#000" }}
        >
        <h1 className={width<600 ? styles.title_mob :styles.title}>{item.title}</h1>
        <p className={width<600 ? styles.desc_mob :styles.desc}>{item.desc}</p>
        <p className={width<600 ? styles.price_mob : styles.price}>
          MRP ₹ 
          <h2>{price}</h2>
        </p>
        </Link>
        <div className={width<600 ? styles.button_mob:styles.button}>
          <button onClick={()=>handleClickBuyNow()} className={width<600 ? styles.button_buy_mob:styles.button_buy}>BUY NOW</button>
          <button onClick={()=>handleClickAddToCart()} className={width<600 ? styles.button_cart_mob:styles.button_cart}>
            <BiShoppingBag />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
