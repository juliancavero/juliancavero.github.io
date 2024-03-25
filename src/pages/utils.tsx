import { anyNumberRegex, transformDotToComma } from "../utils/transformers";

export const changeValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<string>>,
  min: number = -1
) => {
  if (!anyNumberRegex.test(e.target.value)) {
    return;
  }
  if (e.target.value === "") {
    return setter("0");
  }
  if (min !== -1 && Number(e.target.value) < min) {
    return setter(String(min));
  }
  setter(transformDotToComma(e.target.value));
};
