import { create } from 'zustand';

interface MyObject {
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

export const shopBagState = create<ShopBag>((set) => ({
  userCart: [],
  setUserCart: (isCart) => set({ userCart: isCart }),
}));

export const totalPriceState = create<TotalPrice>((set) => ({
  totalPrice: 0,
  setTotalPrice: (isPrice) => set({ totalPrice: isPrice }),
}));
