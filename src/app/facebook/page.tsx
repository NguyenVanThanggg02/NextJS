"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "react-bootstrap";

const Facebook = () => {
  const router = useRouter();
  const handlleBtn = () => {
    router.push("/");
  };
  return (
    <div>
      Facebook
      <div>
        <Button variant="danger">win</Button>
        <button onClick={handlleBtn}>Back Home</button>
      </div>
    </div>
  );
};

export default Facebook;
