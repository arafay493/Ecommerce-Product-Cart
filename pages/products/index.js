import React, { useState } from "react";
import {
  MdOutlineKeyboardBackspace,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Link from "next/link";
import { useGetProductsQuery } from "@/store/fetchData/AllProducts";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
// import ReactPaginate from "react-paginate";
const products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [isActive, setActive] = useState(null);

  const { data, error, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return;
  }
  const { products } = data;

  const buttonsQuantity = Math.ceil(products.length / productsPerPage);

  const handlePageBack = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : currentPage;
    window.scrollTo(0, 0);
  };
  const handlePageForward = () => {
    currentPage < buttonsQuantity
      ? setCurrentPage(currentPage + 1)
      : currentPage;
    window.scrollTo(0, 0);  
  };

  // console.log(currentPage);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const ProductSlice = products
    .slice(firstIndex, lastIndex)
    .map((curElem) => <ProductCard productData={curElem} key={curElem.id} />);

  // console.log(lastIndex, firstIndex);

  const buttonsArray = [];

  for (let i = 1; i <= buttonsQuantity; i++) {
    buttonsArray.push(i);
  }
  const AllButtons = buttonsArray.map((curElem, index) => (
    <button
      // className={`px-3 py-2 hover:bg-inherit ${
      //   isActive == index ? "bg-black" : null
      // }`}
      className="px-3 py-2 hover:bg-inherit"
      key={index}
      onClick={() => handlePageNumber(curElem, index)}
    >
      {curElem}
    </button>
  ));

  const handlePageNumber = (curElem, index = currentPage) => {
    setCurrentPage(curElem);
    window.scrollTo(0, 0);
    // setActive(isActive => isActive === index ? null : isActive)
    // // AllButtons[index].classList.add("bg-black")
    // AllButtons[index].props.className.add("bg-black")
    // let btnClassName = AllButtons[index].props.className;
    // // btnClassName += " bg-black";
    // console.log(btnClassName)
  };

  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <>
      <motion.div className="mt-36 px-10 overflow-hidden"
        initial={{ y: 100, opacity:0  }}
        whileInView={{ y: 0, opacity:1  }}
        transition={{ ease: "easeInOut", duration: 1 }}
      >
        <div className="my-10">
          <Link
            href={"/"}
            className="bg-[#0F0F0F] flex items-center gap-2 px-3 py-2 rounded-md w-fit"
          >
            <MdOutlineKeyboardBackspace />
            Home
          </Link>
        </div>
        <h2 className="uppercase text-4xl text-center my-10">
          Available <span>items</span>
        </h2>
        <div className="flex gap-[1rem] flex-wrap justify-center w-full mb-10">
          {ProductSlice}
        </div>

        <div className="pagination flex items-center justify-center gap-3 mb-10 overflow-auto w-auto">
          <div className="back">
            <button onClick={handlePageBack} className="px-3 py-2">
              <MdOutlineArrowBackIos className="cursor-pointer" />
            </button>
          </div>
          <div className="flex flex-wrap justify-evenly gap-1 md:gap-3 items-center">
            {AllButtons}
          </div>
          <div className="forward">
            <button onClick={handlePageForward} className="px-3 py-2">
              <MdOutlineArrowForwardIos className="cursor-pointer" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  ) : null;
};

export default products;

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("https://dummyjson.com/products?limit=100");
//   const { products } = await res.json();

//   return {
//     props: {
//       products,
//     },
//   };
// }
