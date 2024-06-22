import React from "react";

export default function AddressCard({ item, bgcolor }) {
  return (
    <div className={`h-[200px] w-[270px] rounded-md ${bgcolor}  p-5 shadow-md`}>
      <div className=" flex flex-col ">
        <div className=" flex justify-between">
          <div>
            <p>
              <b>
                <i>City:</i>
              </b>
            </p>
            <span className="font-bold text-primary">{item.city}</span>
          </div>
          <div>
            <p>
              <b>
                <i>ZIP:</i>
              </b>
            </p>
            <span className="font-bold text-primary">{item.postalCode}</span>
          </div>
        </div>

        <div>
          <p>
            <b>
              <i>Street:</i>
            </b>
          </p>
          <span className="font-bold text-primary">{item.street}</span>
        </div>
      </div>
    </div>
  );
}
