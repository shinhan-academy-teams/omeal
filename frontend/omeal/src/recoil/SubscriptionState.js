import { atom } from "recoil";

export const SubTypeAtom = atom({
  key: "SubTypeAtom",
  default: "WEEKLY",
});

export const ContainerTypeAtom = atom({
  key: "ContainerTypeAtom",
  default: "일회용기",
});

export const FoodCategoryAtom = atom({
  key: "FoodCategoryAtom",
  default: "",
});

export const AllergyAtom = atom({
  key: "AllergyAtom",
  default: [],
});

export const AddrAtom = atom({
  key: "AddrAtom",
  default: "",
});

export const SubAddrAtom = atom({
  key: "SubAddrAtom",
  default: "",
});

export const SubTimeAtom = atom({
  key: "SubTimeAtom",
  default: "아침",
});
