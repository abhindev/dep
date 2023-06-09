import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Link from "next/link";
import Details from "../../components/ui/Details";
import { useRouter } from 'next/router'
// import Slider from "../../components/slider"

const Product = ({ product, products }: any) => {
  // console.log(pizzas)
  const [price, setPrice] = useState(product.prices[0].price);
  const [selection, setSelection] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [variant, serVariant] = useState(product.prices[0].text);
  const dispatch = useDispatch();
  const router = useRouter()

  const handleClickPrice=(size:any) => {
    console.log(size.price)
    console.log(size.text)
    setPrice(size.price) 
    serVariant(size.text)
  }
  // console.log(product.prices[0].text);
  // const changePrice = (number: any) => {
  //   setPrice(price + number);
  // };
  
  // const handleSize = (sizeIndex: any) => {
  //   const difference = product.prices[sizeIndex] - product.prices[size];
  //   setSize(sizeIndex);
  //   changePrice(difference);
  // };

  // const handleChange = (e: any, option: any) => {
  //   const checked = e.target.checked;

  //   if (checked) {
  //     changePrice(option.price);
  //     setExtras((prev): any => [...prev, option]);
  //   } else {
  //     changePrice(-option.price);
  //     // setExtras(extras.filter((extra) => extra._id !== option._id));
  //   }
  // };
  const addQuantity = () => {
    setQuantity(Number(quantity)+1)
  }
  const removeQuantity = () => {
    setQuantity(Number(quantity)-1)
  }

  const handleClickAddtoCart = () => {
    dispatch(addProduct({ ...product,  price, quantity,variant }));
  };
  const handleClickBuy = () => {
    dispatch(addProduct({ ...product,  price, quantity,variant }));
    router.push('/cart')
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgContainer}>
            <Image
              src={product.img[0]}
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>{product.title}</p>
          <span className={styles.price}>₹ {price}</span>
          <div className={styles.decsDiv}>
          <p className={styles.desc}>{product.desc}</p>
          </div>
          <h3 className={styles.choose}>Choose the size</h3>
          <div className={styles.sizes}>
            {product.prices.map((size: any, i: number) => (
              <div className={styles.size} key={i} >
                <h1 style={{backgroundColor: i==selection? "#76A11F":"white", color: i==selection? "white":"black" }} className={styles.number} onClick={(e)=>{{handleClickPrice(size)}; setSelection(i)}} >{size.text}</h1>
              </div>
            ))}

          </div>

          <div className={styles.add}>
            
            <div className={styles.quantity}>
              <button className={styles.quantity_button} onClick={()=>{quantity>1? removeQuantity() : null}}>-</button>
              <p>{quantity}</p>
              <button className={styles.quantity_button} onClick={()=>addQuantity()}>+</button>
            </div>
            <button
              className={styles.button}
              onClick={handleClickBuy}
              style={{ backgroundColor: "#76A11F" }}
            >
              BUY NOW
            </button>
            <button className={styles.button} 
            onClick={handleClickAddtoCart}
            >
              ADD TO CART
            </button>
            
          </div>
        </div>
      </div>
      <div>
        <Details />
        <p style={{ textAlign: "center", fontSize: "13px", fontWeight: "500" }}>
          Related Products
        </p>
        {/* <Slider pizza={pizzas}/> */}
      </div>
      <div>
        <h1 style={{ marginLeft: "10%", fontSize: "15px" }}>User reviews</h1>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  const res = await axios.get(
    `${process.env.ROOT_URL}/api/products/${params.id}`
  );
  const resone = await axios.get(`${process.env.ROOT_URL}/api/products`);

  return {
    props: {
      product: res.data,
      products: resone.data,
    },
  };
};

export default Product;
