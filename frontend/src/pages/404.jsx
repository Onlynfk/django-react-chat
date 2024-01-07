import React from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../component/submitButton";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-content-center bg-main px-4 font-display leading-relaxed">
      <div className="text-left">
        <h1 className="text-9xl font-black text-button">404</h1>

        <p className="mt-4 text-2xl text-black">
          {"The page you are looking for does not exist :("}
        </p>

        <Link to={"/"}>
          <SubmitButton
            title="Go Back Home"
            style={`justify-start bg-button mt-5`}
          />
        </Link>
      </div>
    </div>
  );
}
