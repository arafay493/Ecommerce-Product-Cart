import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useGetProductsByIdQuery } from "@/store/fetchData/AllProducts";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import Review from "@/components/Review";
const product = () => {
  const [showSlide, setShowSlide] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setId] = useState(router.query.product);

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.product);
    }
  }, [router.isReady, router.query.product]);
  // if (!router) return;
  const { data, error, isLoading } = useGetProductsByIdQuery(id);
  console.log(data);

  if (isLoading) {
    return;
  }
  const {
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = data;
  return error ? (
    <>Oh no, there was an error</>
  ) : isLoading ? (
    <>Loading...</>
  ) : data ? (
    <div className="select-none mb-16">
      <div
        className="h-[85vh] bg-center bg-contain bg-fixed select-none"
        style={{
          backgroundImage: `url(${thumbnail})`,
        }}
      >
        <div className="h-full bg-gradient-to-b from-rose-600/60 to-black/50 backdrop-blur-md flex items-center justify-center px-5 md:px-12">
          <div className="flex items-center text-center flex-col md:gap-5">
            <h2 className="w-fit md:tracking-[1px] text-2xl md:text-3xl">
              {title}
            </h2>
            <Review />
          </div>
        </div>
      </div>
      <div className="px-10">
        <div className="my-10">
          <Link
            href={"/products"}
            className="bg-[#0F0F0F] flex items-center gap-2 px-3 py-2 rounded-md w-fit"
          >
            <MdOutlineKeyboardBackspace />
            Back
          </Link>
        </div>
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex-1 flex flex-col">
            <div className="thumbnail flex-1">
              <img src={!showSlide ? thumbnail : showSlide} alt={title} />
            </div>
            <div className="itemImages flex justify-between items-center gap-2">
              {images.map((curElem, index) => {
                return (
                  <div
                    className="w-1/4 h-[80px] border-transparent border-4 hover:border-sky-600 hover:border-4 transition-all duration-300 focus:border-sky-600"
                    onClick={() => setShowSlide(images[index])}
                    key={index}
                  >
                    <img src={curElem} alt="" className="h-full object-cover" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-4">
            <h2 className="text-3xl font-medium">{title}</h2>
            <p>{description}</p>
            <div className="catagory flex items-center gap-5">
              <span className="chip uppercase text-xs w-fit bg-[#FED7D7] text-[#822727] font-bold px-2 rounded-lg">
                {category}
              </span>
              <span className="chip uppercase text-xs w-fit bg-[#FED7D7] text-[#822727] font-bold px-2 rounded-lg">
                {brand}
              </span>
            </div>
            <div className="price text-2xl font-medium">
              $<span>{price}</span>
            </div>
            <div className="flex justify-between items-center">
              <button className="btn" onClick={() => dispatch(addToCart(data))}>
                <AiOutlineShoppingCart /> Add to Cart
              </button>
              <span className="uppercase text-green-400">
                in stock: {stock}
              </span>
            </div>
            <p className="text-xs ">
              Average Ratings : <span className="text-green-400">{rating}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default product;
