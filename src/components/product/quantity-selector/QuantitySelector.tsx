"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };
  return (
    <div className="flex items-center ">
      <button onClick={() => onValueChange(-1)}>
        <IoRemoveCircleOutline size={25} />
      </button>
      <span className="w-10 mx-2 p-1 bg-gray-200 text-center rounded-full">
        {quantity}
      </span>
      <button onClick={() => onValueChange(1)}>
        <IoAddCircleOutline size={25} />
      </button>
    </div>
  );
};
