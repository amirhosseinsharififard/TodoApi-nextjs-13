import {getSession} from "next-auth/react";
import connectDB from "../../utils/connectDB";
import {verifyPassword} from "../../utils/auth";
import User from "../../models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log("connected DB");
  } catch (error) {
    return res
      .status(500)
      .json({status: "failed", message: "Error In connected to DB"});
  }

  const session = await getSession({req});
  console.log(session);
  if (!session) {
    return res.status(401).message({
      status: "failed",
      message: "you arem't logged in!",
    });
  }

  const user = await User.findOne({email: session.user.email});
  if (!user) {
    return res
      .status(404)
      .json({status: "failed", message: "user doesn't exist"});
  }

  if (req.method === "POST") {
    const {name, lastName, password} = req.body;
    const isInvalid = await verifyPassword(password, user.password);
    if (!isInvalid) {
      return res.status(422).json({
        status: "failed",
        message: "Password is incorrect",
      });
    }
    user.name = name;
    user.lastName = lastName;
    await user.save();

    res.status(201).json({
      status: "success",
      data: {name, lastName, Email: session.user.email},
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: {name: user.name, lastName: user.lastName, emailL: user.email},
    });
  }
}
