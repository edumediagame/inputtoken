export default async function handler(req, res) {
  const { kelas, token } = req.query;

  // Spreadsheet URL (CSV atau JSON)
  const sheetURL = process.env.SHEET_URL;

  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const rows = text.split("\n").map(r => r.split(","));

    let found = null;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === kelas && rows[i][1] === token) {
        found = rows[i][2]; // link tujuan
        break;
      }
    }

    if (found) {
      res.status(200).json({ success: true, link: found });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Gagal membaca data" });
  }
}
