import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

export const sendEmail = async () => {
  const { data, error } = await resend.emails.send({
    from: "updates@vasjan.com",
    to: ["covelo7680@dropeso.com"],
    subject: "Hello World",
    html: "<strong>You have exceeded 1000$ in spending!</strong>",
  });

  if (error) {
    return console.error({ error });
  }
  console.log({ data });
};
