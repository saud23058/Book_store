"use client";
import React, { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleOrder = async () => {
    setError("");
    try {
      const res = await axios.post(` http://localhost:3000/api/place-order`, {
        shippingAddress,
        quantity,
        title,
      });

      if (res.status === 200) {
        alert("Order placed successfully");
      } else {
        setError(res.data?.message || "Failed to place order.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Place Order</h2>
        <div className="space-y-2">
          <input
            type="text"
            name="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Shipping Address"
            required
          />
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded"
            placeholder="Quantity"
            min="1"
            required
          />
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Title"
            required
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={handleOrder}
          >
            Confirm Order
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default PlaceOrder;