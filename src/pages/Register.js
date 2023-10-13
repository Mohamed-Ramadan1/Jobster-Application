import React from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const [values, setValues] = useState(initialState);

  // redux toolkit and useNavigate later
  const toggleMember = () => {
    return setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all form fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {!values.isMember && (
          <FormRow
            handleChange={handleChange}
            labelText="Name"
            type="text"
            name="name"
            value={values.name}
          />
        )}
        <FormRow
          handleChange={handleChange}
          labelText="Email"
          type="email"
          name="email"
          value={values.email}
        />
        <FormRow
          handleChange={handleChange}
          labelText="Password"
          type="password"
          name="password"
          value={values.password}
        />

        <button className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading..." : values.isMember ? "Login" : "Register"}
        </button>
        <button className="btn btn-block member-btn" disabled={isLoading}>
          Guest User
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}

          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
