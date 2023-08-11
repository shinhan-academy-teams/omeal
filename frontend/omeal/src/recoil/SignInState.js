import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const SignInState = atom({
  key: "SignInState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const MemberGradeState = atom({
  key: "MemberGradeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const MemberNameState = atom({
  key: "MemberNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const MemberNickState = atom({
  key: "MemberNickState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const ContinuousDaysState = atom({
  key: "ContinuousDaysState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const SubCheckState = atom({
  key: "SubCheckState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const MemberRoleState = atom({
  key: "MemberRoleState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
