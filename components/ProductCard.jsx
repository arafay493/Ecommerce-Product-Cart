import { addToCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
const ProductCard = ({ productData }) => {
  const { title, description, thumbnail, id , price } = productData;
  const dispatch = useDispatch();
  return (
    <motion.div
      className="min-w-[320px] w-[32%]  h-[470px] rounded-lg overflow-hidden bg-[#444444]"
      initial={{ y: 30, opacity:0 }}
      whileInView={{ y: 0, opacity:1}}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <div className="w-full h-[50%]">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-10 px-5 flex-1">
        <Link href={`/products/${id}`}>
          <h2 className="text-3xl">
            {title.length > 15 ? `${title.substr(0, 15)}...` : title}
          </h2>
          <p className="text-sm/6 mt-3 font-medium">
            {description.length > 50
              ? `${description.substr(0, 50)}...`
              : description}
            {description.length > 50 && <span>read more</span>}
          </p>
          <span className="text-3xl font-bold">${price}</span>
        </Link>
      </div>
      <div
        className="px-5 mt-2"
        onClick={() => dispatch(addToCart(productData))}
      >
        <button className="btn flex justify-center w-full">
          <AiOutlineShoppingCart /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
