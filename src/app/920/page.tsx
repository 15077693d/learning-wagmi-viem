"use client";
import React from "react";
import { prepareTXWithError, prepareTXWithNotError } from "./utils";

export default function page() {
  return (
    <>
      <button onClick={() => prepareTXWithNotError()}>
        Click to prepareTXWithNotError
      </button>
      <button onClick={() => prepareTXWithError()}>
        Click to prepareTXWithError
      </button>
    </>
  );
}
