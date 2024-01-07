import React from "react";

export default function TextField({ name ,type, children, a, active, value}) {
  return (
    <>
      <div className="relative border rounded mb-2 bg-white text-black border-black border-opacity-25">
        <input
          className={[
            "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
            active ? "pt-6" : "",
          ].join(" ")}
          id={name}
          name={name}
          type={type}
          value={value}
          {...a}
        />
        <label
          className={[
            "absolute top-0 left-0 flex items-center text-black text-opacity-50 p-2 transition-all duration-200 ease-in-out",
            active ? "text-xs" : "text-sm",
          ].join(" ")}
          htmlFor={"name"}
        >
          {children}
        </label>
      </div>
    </>
  );
}
