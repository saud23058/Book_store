import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-16  mt-0 bg-blue-600 shadow-md flex justify-between items-center px-6 md:px-12">
      <h1 className="text-3xl font-bold text-white">📚</h1>
      <div className="flex gap-3">
      <Link
        href="/order-list"
        className="text-white font-medium transition hover:text-blue-300"
      >
        Orders
      </Link>

      <Link
        href="/signup"
        className="text-white font-medium transition hover:text-blue-300"
      >
        Register
      </Link>
      <Link
        href="/signin"
        className="text-white font-medium transition hover:text-blue-300"
      >
        Login
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
