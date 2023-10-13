import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";
import Logo from "./Logo";
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    isSidebarOpen && (
      <Wrapper>
        <Logo />
      </Wrapper>
    )
  );
};

export default BigSidebar;
