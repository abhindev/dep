import React from "react";
import ProductCard from "./productCard";
import styles from "../../styles/ProductList.module.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

function PoductList(productList) {
  const product = productList.productList;
  // console.log(product)
  const a = 5;
  const { width } = useWindowDimensions();

  // console.log(width)

  return (
    <div className={width < 600 ? styles.main : null}>
      <div className={width < 600 ? styles.grid_container : null}>
        {product.map((product, i) => (
          <div key={i} className={width < 600 ? styles.grid_item : null}>
            <ProductCard key={i} product={product} i={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoductList;
