"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AddressSelectList from "../AddressSelectList";
import AddressCard from "../AddressCard";

export default function PurchaseAddress({ session }) {
  const [options, setOptions] = useState([]);
  const [addressId, setAddressId] = useState();
  const [error, setError] = useState(false);
  const bgcolor = "bg-yellow p-5  dark:bg-opacity-90";

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getAdress?id=${session.user.id}`
      );
      const op = response.data.map((item) => {
        return {
          label: item._id,
          component: <AddressCard item={item} bgcolor={bgcolor} />,
        };
      });

      setOptions(op);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  }, [session.user.id, bgcolor]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (addressId === null) {
      setError(true);
    } else {
      setError(false);
    }
  }, [options, addressId]);

  const handleSelect = (option) => {
    setAddressId(option.label);
  };

  return (
    <div className="h-[80vh] w-[90vw]   md:h-fit md:w-[380px] ">
      <h2 className="my-5 text-center text-2xl font-bold">
        Select shipping address
      </h2>
      <input
        className="hidden"
        type="text"
        name="addressId"
        value={addressId}
        required
        readOnly
      />
      <div className="flex items-center justify-center ">
        <AddressSelectList options={options} onSelect={handleSelect} />
      </div>
      {error ? (
        <div className="mt-2 flex items-center justify-center">
          <p className="w-[280px] rounded-md bg-red p-2">
            Please select address
          </p>
        </div>
      ) : null}
    </div>
  );
}
