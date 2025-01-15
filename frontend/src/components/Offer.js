import React from "react";

const Offer = () => {
  return (
    <div className="bg-white text-red-700">
      <div className="max-w-full mx-auto text-center">
        {/* Marquee */}
        <div className="overflow-x-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="text-lg font-semibold mx-4">
              🌟 Special Offer: Get 50% Off on Your First Purchase!
            </span>
            <span className="text-lg font-semibold mx-4">
              🚚 Free Shipping on Orders Over $100!
            </span>
            <span className="text-lg font-semibold mx-4">
              🎉 Sign Up for Exclusive Deals!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
