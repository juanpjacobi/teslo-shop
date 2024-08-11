"use client";

import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
    const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore((state) =>
    state.getSumaryInformation()
  );
  useEffect(() => {
    setLoaded(true);
  }, [])
  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    
    <>
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`} </span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormatter(subTotal)}</span>
      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormatter(tax)}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormatter(total)}</span>
    </>
  );
};
