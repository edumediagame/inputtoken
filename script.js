document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const kelas = document.getElementById("kelas").value.trim();
  const token = document.getElementById("token").value.trim();
  const errorEl = document.getElementById("error");

  try {
    const res = await fetch(`/api/validate?kelas=${encodeURIComponent(kelas)}&token=${encodeURIComponent(token)}`);
    const data = await res.json();

    if (data.success) {
      window.location.href = `/api/proxy?url=${encodeURIComponent(data.link)}`;
    } else {
      errorEl.textContent = "Kelas atau token salah!";
    }
  } catch (err) {
    errorEl.textContent = "Gagal memproses, coba lagi.";
  }
});
