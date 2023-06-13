import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_ACC,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: "your-email@example.com",
        to: process.env.NODEMAILER_ACC,
        subject: "next portfolio",
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
        html: `
        <div
      style="
        width: 100%;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #efefef;
        padding: 2rem;
      "
    >
      <div
        style="
          width: 100%;
          padding: 3rem 4rem;
          border-radius: 0.5rem;
          background-color: #fff;
        "
      >
        <h1>New Message</h1>
        <p>
          From:
          <b><span>${email}</span></b>
        </p>
        <p>
          Name:
          <b><span>${name}</span></b>
        </p>
        <p>
          Message:
          <b>
            <span>
              ${message}
            </span>
          </b>
        </p>
      </div>
    </div>
    `,
      });

      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send message." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
