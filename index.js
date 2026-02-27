const express = require("express");
const app = express();

app.use(express.json());

// DATABASE JADWAL
const jadwal = {
  senin: [
    { waktu: "08.10-09.30", mapel: "Bahasa Bali" },
    { waktu: "09.30-10.10", mapel: "IPAS" },
    { waktu: "10.10-10.40", mapel: "Bahasa Indonesia" }
  ],
  selasa: [
    { waktu: "08.10-09.30", mapel: "PJOK" },
    { waktu: "09.30-10.10", mapel: "DDA" }
    { waktu: "10.10-10.40", mapel: "Matematika" }
  ],
  rabu: [
    { waktu: "08.10-09.30", mapel: "PKN" }
    { waktu: "09.30-10.10", mapel: "Matematika" }
    { waktu: "10.10-10.40", mapel: "Seni Budaya" }
    { waktu: "10.40-12.00", mapel: "Sejarah" }
    { waktu: "12.00-13.20", mapel: "BK" }
    { waktu: "14.20-15.40", mapel: "bAHASA iNDONESIA" }
  ],
  kamis: [
    { waktu: "07.30", mapel: "KKA" },
    { waktu: "08.10", mapel: "DDA" },
    { waktu: "08.50", mapel: "Agama" }
  ],
  
  jumat: [
    { waktu: "07.30", mapel: "Iformatika" },
    { waktu: "08.10", mapel: "Bahasa Inggris" },
    { waktu: "08.50", mapel: "Ekstrakulikuler" }
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
