import { InputAdornment, OutlinedInput } from "@mui/material";
import styled from "styled-components";

type MyOutlinedInputProps = {
  value: number;
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
      type="number"
      disabled={disabled}
    />
  );
};

const StyledOutlinedInput = styled(OutlinedInput)`
  width: 100%;
`;
