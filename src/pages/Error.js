import error from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={error} alt="error" />
        <h3>Page not found</h3>
        <p>Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/">Go back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
