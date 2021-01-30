import styled from "styled-components";
import Link from "next/link";
import DarkModeToggleButton from "./basics/DarkModeToggleButton";

const Container = styled.div`
  display: flex;
  justify-content: start;
  padding: 0.5rem 1.1rem;
  width: 100%;
`;

const A = styled.a`
  margin-right: 1rem;
  font-size: 1.3rem;
  margin-top: 0.3rem;

  &: hover {
    cursor: pointer;
  }
`;

type HeaderProps = {
  onToggleTheme: () => void;
};

const Header = ({ onToggleTheme }: HeaderProps) => (
  <Container>
    <DarkModeToggleButton onToggleTheme={onToggleTheme} />
    <Link href="/">
      <A>Home</A>
    </Link>
    <Link href="/about">
      <A>Game</A>
    </Link>
  </Container>
);

export default Header;
