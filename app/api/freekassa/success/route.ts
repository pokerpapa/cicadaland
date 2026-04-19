export async function GET() {
  const botLink = process.env.TELEGRAM_BOT_LINK || "https://t.me/PROVPN_SecureBot";

  const html = `
    <!doctype html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Оплата успешна</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 40px; text-align: center;">
        <h1>Оплата прошла успешно</h1>
        <p>Вернитесь в Telegram-бот для получения услуги.</p>
        <p><a href="${botLink}">Открыть Telegram-бота</a></p>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}