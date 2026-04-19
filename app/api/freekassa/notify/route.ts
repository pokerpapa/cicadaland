import crypto from "crypto";

const ALLOWED_IPS = new Set([
  "168.119.157.136",
  "168.119.60.227",
  "178.154.197.79",
  "51.250.54.238",
]);

function md5(text: string): string {
  return crypto.createHash("md5").update(text).digest("hex");
}

function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (!xForwardedFor) return "";
  return xForwardedFor.split(",")[0].trim();
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (!ALLOWED_IPS.has(ip)) {
      return new Response("hacking attempt", { status: 403 });
    }

    const formData = await request.formData();

    const merchantId = String(formData.get("MERCHANT_ID") || "");
    const amount = String(formData.get("AMOUNT") || "");
    const orderId = String(formData.get("MERCHANT_ORDER_ID") || "");
    const sign = String(formData.get("SIGN") || "");

    const secret2 = process.env.FREEKASSA_SECRET_2 || "";

    if (!secret2) {
      return new Response("server misconfigured", { status: 500 });
    }

    const expectedSign = md5(`${merchantId}:${amount}:${secret2}:${orderId}`);

    if (sign.toLowerCase() !== expectedSign.toLowerCase()) {
      return new Response("wrong sign", { status: 400 });
    }

    console.log("FreeKassa payment confirmed", {
      merchantId,
      amount,
      orderId,
      ip,
    });

    return new Response("YES", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("FreeKassa notify error:", error);
    return new Response("server error", { status: 500 });
  }
}