import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartSection from "./CartSection";
const Header = () => {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <header className="absolute w-[92%] bg-[#DA0037]/60 top-10 left-1/2 -translate-x-1/2 p-2 rounded-2xl z-20 flex justify-between items-center select-none overflow-hidden">
        <div>
          <Link
            href={"/"}
            className="flex items-center gap-2 text-2xl font-medium"
          >
            <Image
              src="/images/Logo.png"
              width={40}
              height={40}
              alt="Picture of the author"
            />
            NC
          </Link>
        </div>
        <div className="ms-auto">
          <button
            className="btn bg-[#C57B8C] hover:bg-[#f095aa]"
            onClick={() => {
              setShowCart(!showCart);
              document.body.style.overflow = "hidden";
              window.scrollTo(0, 0);
            }}
          >
            <AiOutlineShoppingCart /> Cart
          </button>
        </div>
      </header>
      {showCart && (
        <CartSection setShowCart={setShowCart} showCart={showCart} />
      )}
    </>
  );
};

export default Header;
