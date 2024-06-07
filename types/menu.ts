export type Menu  = {
  _id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[] ;
};
