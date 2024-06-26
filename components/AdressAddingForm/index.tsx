"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { adressAction } from "@/app/actions/adressAction";
import { notificationState } from "@/store/notificationState";
import { notificationMessage } from "@/store/notificationMessage";
import Loading from "@/app/loading";

// Интерфейс для города
interface District {
  geonameId: number;
  adminName1: string;
  toponymName: string;
}
// Интерфейс для округа (административного региона)
interface City {
  geonameId: number;
  adminName1: string;
}

export default function AddressAddingForm({ session, addressId }) {
  const setNotification = notificationState((state) => state.setNotification);
  const setNotificationMessage = notificationMessage(
    (state) => state.setNotificationMessage
  );

  const [street, setStreet] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Azerbaijan");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Обработчик изменения округа
  const districtHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
  };

  // Обработчик изменения города
  const cityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const fetchDistrict = async () => {
    try {
      const response = await axios.get("http://api.geonames.org/searchJSON", {
        params: {
          country: "AZ",
          featureClass: "P",
          maxRows: 1000,
          username: "adillek96",
        },
      });

      const data: City[] = response.data.geonames;

      // Фильтрация для получения уникальных adminName1
      const adminNamesMap: { [key: string]: City } = {};
      data.forEach((city) => {
        if (!adminNamesMap[city.adminName1]) {
          adminNamesMap[city.adminName1] = {
            geonameId: city.geonameId,
            adminName1: city.adminName1,
          };
        }
      });

      const uniqueAdminNames: City[] = Object.values(adminNamesMap);
      setList(data);
      setCities(uniqueAdminNames);

      // Устанавливаем начальный выбранный город
      if (addressId === null) {
        if (uniqueAdminNames.length > 0) {
          setSelectedCity(uniqueAdminNames[0].adminName1);
        }
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getAdress?id=${session.user.id}&addressId=${addressId}`
      );

      setSelectedDistrict(response.data[0].district);
      setPostalCode(response.data[0].postalCode);
      setSelectedCity(response.data[0].city);
      setStreet(response.data[0].street);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchDistrict();
    if (addressId !== null) {
      fetchData();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const districtMap: { [key: string]: District } = {};
    list.forEach((item) => {
      if (item.adminName1 === selectedCity) {
        districtMap[item.toponymName] = item;
      }
    });

    const uniqueDistrict: District[] = Object.values(districtMap);
    setDistricts(uniqueDistrict);

    // Устанавливаем начальный выбранный district
    if (addressId === null) {
      setSelectedDistrict(
        uniqueDistrict.length > 0 ? uniqueDistrict[0].toponymName : "Baku"
      );
    }
  }, [cities, selectedCity]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await adressAction(formData, session.user.id, addressId);

      setNotificationMessage("Adress has been add!");
    } catch (error) {
      setNotificationMessage("Somthing wrong, please try later!");
    } finally {
      setNotification(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="country"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            value={country}
            placeholder="Country"
            readOnly
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="city"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            City
          </label>
          <select
            name="city"
            placeholder="City"
            required
            value={selectedCity}
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            onChange={cityHandler}
          >
            {cities.map((item) => (
              <option key={item.geonameId} value={item.adminName1}>
                {item.adminName1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label
            htmlFor="district"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            District
          </label>
          <select
            name="district"
            placeholder="District"
            required
            value={selectedDistrict}
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
            onChange={districtHandler}
          >
            {districts.map((item) => (
              <option key={item.geonameId} value={item.toponymName}>
                {item.toponymName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label
            htmlFor="street"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Street
          </label>
          <textarea
            name="street"
            value={street}
            placeholder="Street"
            onChange={(e) => setStreet(e.target.value)}
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="postalCode"
            className="mb-3 block text-sm font-medium text-dark dark:text-white"
          >
            Postal code (ZIP)
          </label>
          <input
            type="text"
            name="postalCode"
            value={postalCode}
            placeholder="AZ ####"
            pattern="AZ\d{4}"
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
          />
        </div>

        <button
          type="submit"
          className="mb-16 flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          {addressId === null ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}
