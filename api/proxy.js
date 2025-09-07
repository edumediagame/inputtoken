export default async function handler(req, res) {
  const { url } = req.query;

  try {
    // Tes dengan GET ringan (ambil hanya header)
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) throw new Error("Server bermasalah");

    // Kalau OK → redirect user ke link tujuan
    res.writeHead(302, { Location: url });
    res.end();
  } catch (err) {
    // Kalau gagal → tampilkan halaman error custom
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
