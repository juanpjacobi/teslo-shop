"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useEffect } from 'react';

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);
  const {itemsInCart} = useCartStore((state) => state.getSumaryInformation());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={"/gender/men"}
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={"/gender/women"}
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
          href={"/gender/kid"}
        >
          Niños
        </Link>
      </div>
      {/* search, cart, menu */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={((itemsInCart === 0 ) && loaded )? "/empty" : '/cart'} className="mx-2">
          <div className="relative">
            {(loaded && itemsInCart > 0) && (
              <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {itemsInCart}
              </span>
            )}

            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={openMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-200"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
