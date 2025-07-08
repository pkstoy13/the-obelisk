import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, genres, message } = await req.json();

  if (!email || !genres || genres.length === 0) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Aux <noreply@auxupnext.com>", // Must be a verified sender in Resend
      to: ["contact@auxupnext.com", "pkstoyanov1@gmail.com"], // Replace with your real email
      subject: "New Newsletter Signup",
      text: `New subscriber: ${email}\nGenres: ${genres.join(", ")}\nMessage: ${message}`,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to send email", { status: 500 });
  }
}
