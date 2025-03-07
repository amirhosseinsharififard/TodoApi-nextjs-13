import {hashPassword} from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

export async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    connectDB();
  } catch (error) {
    res.status(500).json({status: "failed", message: "Error in connect to DB"});
  }

  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(402).json({status: "failed", message: "Invalid Data"});
  }

  const exsistingUser = await User.findOne({email});

  if (exsistingUser) {
    return res
      .status(422)
      .json({status: "failed", message: "User exsists already"});
  }
  const hashedPassword =await hashPassword(password);
  const newUser = await User.create({email, password: hashedPassword});
  console.log(newUser);

  res.status(201).json({status: "success", message: "Created User !!"});
}

export default handler;
