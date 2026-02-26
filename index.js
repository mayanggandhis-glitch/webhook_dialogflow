const express = require("express");
const app = express();

app.use(express.json());

// DATABASE JADWAL
const jadwal = {
  senin: [
    { waktu: "07.30", mapel: "Matematika" },
    { waktu: "08.10", mapel: "PJOK" },
    { waktu: "08.50", mapel: "Bahasa Indonesia" }
  ],
  selasa: [
    { waktu: "07.30", mapel: "IPA" },
    { waktu: "08.10", mapel: "IPS" }
  ],
  rabu: [
    { waktu: "07.30", mapel: "Bahasa Inggris" }
  ]
};

// Fungsi ambil hari sekarang
function getHariIni() {
  const hari = new Date().getDay();
  const daftarHari = [
    "minggu",
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu"
  ];
  return daftarHari[hari];
}

app.post("/webhook", (req, res) => {

  const intent = req.body.queryResult.intent.displayName;

  // ==========================
  // INTENT HARI INI
  // ==========================
  if (intent === "tanya.jadwal.hariini") {

    const hariIni = getHariIni();
    const data = jadwal[hariIni];

    if (!data) {
      return res.json({
        fulfillmentText: "Hari ini tidak ada jadwal pelajaran."
      });
    }

    let jawaban = `Hari ini ${hariIni}:\n`;

    data.forEach(j => {
      jawaban += `${j.waktu} ${j.mapel}\n`;
    });

    return res.json({
      fulfillmentText: jawaban
    });
  }

  res.json({ fulfillmentText: "Intent tidak dikenali" });

});

app.listen(process.env.PORT || 3000);
