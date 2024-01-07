import { useState, useRef, useEffect, useCallback } from "react";
import TextField from "../component/textField";
import SubmitButton from "../component/submitButton";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api";

export default function Login() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);


 

  function handleActivation(e) {
    setActive(!!e.target.value);
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [itemToEdit, setItemToEdit] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItemToEdit({
      ...itemToEdit,
      [name]: value ?? JSON.parse(value),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setDisable(true);

    const payload = {
      email: itemToEdit.email,
      password: itemToEdit.password,
    };

    // Use the imported loginApi function
    loginApi(payload)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          localStorage.setItem("usertoken", response.data.access);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("user_id", response.data.id);
        } else {
          setError(response.data.detail);
          setErrorVisible(true);
          setDisable(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail || "An error occurred.");
        } else {
          setError("An error occurred.");
        }
        setErrorVisible(true);
        setDisable(false);
      });
  };

  return (
    <div className="bg-main min-h-screen flex justify-center items-center font-display leading-lossed ">
      <div className=" lg:w-full text-center">
        <h1 className="text-3xl font-black mb-5">Login</h1>
        <form class="max-w-md mx-auto p-2" onSubmit={handleLogin}>
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

          <small className="text-sm text-[red]">{error}</small>
          <SubmitButton
            title="Login"
            style={`justify-center w-full bg-button mt-5`}
          />
        </form>

        <div className="text-center mt-4">
          <p>
            <span className="text-gray-400">Don't have an account? </span>{" "}
            <Link className="text-regal-blue ml-2" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
