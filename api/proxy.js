export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const body = await response.text();

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(body);
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <html>
        <body style="font-family:Arial; text-align:center; padding:40px;">
          <h2>Server tidak dapat dijangkau</h2>
          <p>Silakan coba lagi.</p>
          <button onclick="window.location.reload()">Coba Lagi</button>
        </body>
      </html>
    `);
  }
}
