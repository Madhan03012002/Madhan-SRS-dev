import express from "express";

const user = async (req, res) => {
  console.log("API Success");
  res.json({ message: "User API accessed successfully" });
};

export { user };