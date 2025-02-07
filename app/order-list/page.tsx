"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/api/list-of-orders`);
        setOrders(res.data);
      } catch {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-4 w-full max-w-3xl">
          {orders.map((order: { _id: string; bookId: { title: string; description: string }; quantity: number; userId: { username: string; email: string } }) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{order.bookId.title}</h2>
              <p className="text-sm text-gray-600">{order.bookId.description}</p>
              <p className="mt-2 text-sm font-medium">Quantity: {order.quantity}</p>
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>Ordered by:</strong> {order.userId.username}</p>
                <p><strong>Email:</strong> {order.userId.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
