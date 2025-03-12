import {getSession} from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import {sortedTodos} from "../../utils/sortedTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log("connect to DB");
  } catch (error) {
    res
      .status(500)
      .json({status: "failed", message: "Error in connecting to DB"});
  }

  const session = await getSession({req});
  console.log(session);

  if (!session) {
    return res
      .status(401)
      .json({status: "failed", message: "You aren't logged in!!"});
  }

  const user = await User.findOne({email: session.user.email});
  if (!user) {
    return res
      .status(404)
      .json({status: "failed", message: "User dosen't exist!!"});
  }

  if (req.method === "POST") {
    const {title, status} = req.body;

    if (!title || !status) {
      res.status(422).json({
        status: "failed",
        message: "Invalid Data",
      });
    }

    user.todos.push({title, status});
    await user.save();

    return res.status(201).json({
      status: "success",
      message: "Data created!",
    });
  } else if (req.method === "GET") {
    const sortedData = sortedTodos(user.todos);
    res.status(200).json({status: "success", todo: {sortedData}});
  }
}
