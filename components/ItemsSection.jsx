import { useGetProductsQuery } from "@/store/fetchData/AllProducts";
import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import {IoMdArrowRoundForward} from "react-icons/io"
const ItemsSection = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return;
  }
  const { products } = data;
  const ProductSlice = products
    .slice(0, 3)
    .map((curElem) => <ProductCard productData={curElem} key={curElem.id} />);
  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <>
      <motion.div
        className="my-10 px-10 overflow-hidden"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <h2 className="uppercase text-4xl text-center my-10">
          Available <span>items</span>
        </h2>
        <div className="flex gap-[1rem] flex-wrap justify-center w-full mb-10">
          {ProductSlice}
        </div>
        <Link href={"/products"}>
          <button className="btn flex justify-center m-auto w-full sm:w-1/2 ">
            All Products {"    "}
            <IoMdArrowRoundForward />
          </button>
        </Link>
      </motion.div>
    </>
  ) : null;
};

export default ItemsSection;
