import React, { useState, useCallback } from "react";
import TextField from "../component/textField";
import SubmitButton from "../component/submitButton";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../api";

export default function Register() {
  const [active, setActive] = React.useState(false);
  const navigate = useNavigate();

  function handleActivation(e) {
    setActive(!!e.target.value);
  }
 
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [itemToEdit, setItemToEdit] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   
  });
  const isDisabled = () => {
    // Check if all fields are valid (you can customize the validation logic)
    return Object.values(itemToEdit).some((value) => !value);
  };
  

  console.log("itemToEdit", itemToEdit);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItemToEdit({
      ...itemToEdit,
      [name]: value ?? JSON.parse(value),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let signupData = {
        email: itemToEdit.email,
        username: itemToEdit.username,
        first_name: itemToEdit.firstName,
        last_name: itemToEdit.lastName,
        password:itemToEdit.password
    };
    const res = await signupApi(signupData);
    console.log("res", res);
    if (res.status != 201) {
      setError("An error occured" );

    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-main min-h-screen flex justify-center items-center font-display leading-lossed ">
      <div className=" lg:w-full text-center">
        <h1 className="text-3xl font-black mb-5">Register</h1>
        <form class="max-w-md mx-auto p-2" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            <TextField
              name="firstName"
              type="text"
              children="First Name"
              a={register("firstName", {
                required: true,
                onChange: (e) => {
                  handleOnChange(e), handleActivation(e);
                },
              })}
              active={active}
            />
            <TextField
              name="lastName"
              type="text"
              children="Last Name"
              a={register("lastName", {
                required: true,
                onChange: (e) => {
                  handleOnChange(e), handleActivation(e);
                },
              })}
              active={active}
            />
          </div>
   
          <TextField
            name="email"
            type="email"
            children="Email"
            a={register("email", {
              required: true,
              onChange: (e) => {
                handleOnChange(e), handleActivation(e);
              },
            })}
            active={active}
          />
          <TextField
            name="password"
            type="password"
            children="Password"
            a={register("password", {
              required: true,
              onChange: (e) => {
                handleOnChange(e), handleActivation(e);
              },
            })}
            active={active}
          />

          {error && <small className="text-sm text-[red]">{error}</small>}
          <SubmitButton
            title="Register"
            disabled={isDisabled()}
            style={`justify-center w-full bg-button mt-5`}
          />

          <p className="mt-3 mb-3">or</p>
        </form>

        <div className="text-center mt-4">
          <p>
            <span className="text-gray-400">Have an account? </span>{" "}
            <Link className="text-regal-blue ml-2" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
