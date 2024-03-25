import { InputAdornment, OutlinedInput } from "@mui/material";
import styled from "styled-components";

type MyOutlinedInputProps = {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  endAdornment: string;
  disabled?: boolean;
};

export const MyOutlinedInput = ({
  value,
  onChange,
  endAdornment,
  disabled = false,
}: MyOutlinedInputProps) => {
  return (
    <StyledOutlinedInput
      value={value}
      onChange={onChange}
      fullWidth
      endAdornment={
        <InputAdornment position="end">{endAdornment}</InputAdornment>
      }
      disabled={disabled}
    />
  );
};

const StyledOutlinedInput = styled(OutlinedInput)`
  width: 100%;
  & input {
    text-align: right;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  & .MuiOutlinedInput-input {
    padding: 0.75rem 0rem;
  }
`;
