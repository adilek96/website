import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  component: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

const AddressSelectList: React.FC<CustomSelectProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (options.length !== 0) {
    return (
      <div
        className="relative h-[300px]  w-[280px]  text-black"
        ref={dropdownRef}
      >
        <button
          type="button"
          className=" flex h-[300px] w-full flex-col items-center justify-between    rounded-md  bg-gray bg-opacity-30 py-5  shadow-sm dark:bg-modal dark:bg-opacity-60"
          onClick={handleToggle}
        >
          <div className="mt-2 h-full">
            {selectedOption ? (
              selectedOption.component
            ) : (
              <div className="flex h-full items-center justify-center  text-xl font-bold text-primary dark:text-white">
                <p> Please select shipping address...</p>
              </div>
            )}
          </div>

          <div className="my-5 h-9  text-primary dark:text-white">&#x25BC;</div>
        </button>
        {isOpen && (
          <div className=" absolute z-10 mb-5 mt-1 w-full rounded  bg-gray bg-opacity-40 py-5  shadow-lg dark:bg-modal dark:bg-opacity-80">
            {options.map((option, index) => (
              <div
                key={index}
                className="hover:bg-gray-200 cursor-pointer p-2"
                onClick={() => handleSelect(option)}
              >
                {option.component}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex  h-[300px] w-[280px] items-center justify-center">
        <Link
          className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
          href={"/profile/adress/add-adress"}
        >
          Add Address
        </Link>
      </div>
    );
  }
};

export default AddressSelectList;
