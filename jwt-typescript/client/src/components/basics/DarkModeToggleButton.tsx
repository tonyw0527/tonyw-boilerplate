import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Box = styled.div`
  display: flex;
  border-radius: 50px;
  width: 3.7rem;
  padding: 0.3rem;
  background-color: darkslateblue;
  transition: background-color 0.2s;
  cursor: pointer;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 20px;
  outline: 0;
  background-color: white;
  transition: transform 0.1s;
  transform: ${({ theme }) => {
    return theme.mode === "light" ? "translateX(0px)" : "translateX(28px)";
  }};
`;

type DarkModeToggleButtonProps = {
  theme: string;
  onHandleToggleTheme: () => void;
};

function DarkModeToggleButton({
  theme,
  onHandleToggleTheme,
}: DarkModeToggleButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggleTheme = () => {
    onHandleToggleTheme();
  };

  return (
    <Wrapper>
      <Box onClick={handleToggleTheme}>
        <Button ref={btnRef}></Button>
      </Box>
    </Wrapper>
  );
}

export default DarkModeToggleButton;
