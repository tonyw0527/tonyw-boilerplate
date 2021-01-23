import { ReactNode } from "react";
import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
};

type LayoutProps = {
  children: ReactNode;
  onToggleTheme: () => void;
};

const Layout = ({ children, onToggleTheme }: LayoutProps) => (
  <div style={layoutStyle}>
    <Header onToggleTheme={onToggleTheme} />
    {children}
  </div>
);

export default Layout;
