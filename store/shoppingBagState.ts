import { create } from 'zustand';

interface MyObject {
  category: string;
  _id: string;
  name: string;
  image: string[];
  sale: boolean;
  salePrice: number;
  quantity: number;
  price: number;
}

interface ShopBag {
  userCart: MyObject[];
  setUserCart: (isCart: MyObject[]) => void;
}

interface TotalPrice {
  totalPrice: number;
  setTotalPrice: (isPrice: number) => void;
}
 interface TotalQuantity {
  totalQuantity: number;
  setTotalQuantity:  (isQuantity: number) => void;
 }

export const shopBagState = create<ShopBag>((set) => ({
  userCart: [],
  setUserCart: (isCart) => set({ userCart: isCart }),
}));

export const totalPriceState = create<TotalPrice>((set) => ({
  totalPrice: 0,
  setTotalPrice: (isPrice) => set({ totalPrice: isPrice }),
}));

export const totalQuantityState = create<TotalQuantity>((set) => ({
  totalQuantity: 0,
  setTotalQuantity: (isQuantity) => set({ totalQuantity: isQuantity }),
}));
