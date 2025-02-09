import React, { useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { paymentAPI } from "../../services/paymentAPI";
import { useQuery } from "@tanstack/react-query";

const PayingPremiumPlan = () => {
  //!Get post id
  const { planId } = useParams();
  const { data: premiumPlan } = useQuery({
    queryKey: ["premiumPlan"],
    queryFn: () => paymentAPI(planId),
  });

  const handleVerify = (data) => {
    console.log("HandleVerify");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100">
      <div className="p-8 bg-white rounded shadow-md w-80">
        <FaCreditCard className="w-16 h-16 mx-auto text-orange-500" />
        <h2 className="mt-6 text-2xl font-semibold text-center text-orange-700">
          Premium Plan Payment
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Proceed to make your payment for the premium plan.
        </p>
        <Link
        //  to={`/checkout/${premiumPlan?.data?.id}`}
        >
          <button
            className="mt-8 w-full py-2 px-4 bg-orange-500 text-white rounded
            hover:bg-orange-600 focus:outline-none"
            onClick={() => handleVerify(premiumPlan)}
          >
            Continue to Pay
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PayingPremiumPlan;
