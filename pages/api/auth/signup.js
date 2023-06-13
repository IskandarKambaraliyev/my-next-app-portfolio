import connectMongodb from "@/database/connMongodb";
import Users from "@/model/RegisterUserSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  try {
    await connectMongodb();

    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "Don't have form data!" });
      }

      const { name, email, password } = req.body;

      const checkExisting = await Users.findOne({ email });
      if (checkExisting) {
        return res.status(422).json({ message: "Email already exists!" });
      }

      const hashedPassword = await hash(password, 12);
      const newUser = new Users({ name, email, password: hashedPassword });
      const savedUser = await newUser.save();

      return res.status(201).json({ status: true, user: savedUser });
    } else {
      return res
        .status(500)
        .json({ message: "HTTP method not valid. only POST method is accepted" });
    }
  } catch (err) {
    return res.json({ error: "Connection failed with the database!" });
  }
}
