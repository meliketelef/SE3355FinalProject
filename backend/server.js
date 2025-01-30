const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Örnek veri
const jobPostings = [
  {
    id: 1,
    title: "Frontend Developer",
    city: "Istanbul",
    type: "Full-time",
    description: "React ile projeler geliştirecek takım arkadaşı arıyoruz.",
    lastUpdated: "2025-01-20",
    applications: 23,
  },
  {
    id: 2,
    title: "Backend Developer",
    city: "İstanbul", // Aynı şehir
    type: "Part-time",
    description: "Node.js konusunda tecrübeli yazılımcı arıyoruz.",
    lastUpdated: "2025-01-18",
    applications: 12,
  },
  {
    id: 3,
    title: "DevOps Engineer",
    city: "İstanbul", // Aynı şehir
    type: "Full-time",
    description: "DevOps süreçlerini yönetecek mühendis arıyoruz.",
    lastUpdated: "2025-01-19",
    applications: 10,
  },
  {
    id: 4,
    title: "UI/UX Designer",
    city: "Ankara", // Farklı şehir
    type: "Full-time",
    description: "Tasarım projeleri için UI/UX uzmanı arıyoruz.",
    lastUpdated: "2025-01-15",
    applications: 8,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    city: "Ankara",
    type: "Full-time",
    description: "CI/CD süreçlerini yönetebilecek DevOps mühendisi arıyoruz.",
    lastUpdated: "2025-01-15",
    applications: 18,
  },
  {
    id: 6,
    title: "UI/UX Designer",
    city: "İzmir",
    type: "Full-time",
    description:
      "Yaratıcı ve yenilikçi tasarımlar yapacak UI/UX tasarımcısı arıyoruz.",
    lastUpdated: "2025-01-12",
    applications: 10,
  },
  {
    id: 7,
    title: "Data Scientist",
    city: "İstanbul",
    type: "Remote",
    description:
      "Makine öğrenimi modelleri geliştirebilecek veri bilimcisi arıyoruz.",
    lastUpdated: "2025-01-10",
    applications: 30,
  },
  {
    id: 8,
    title: "Mobile App Developer",
    city: "Antalya",
    type: "Part-time",
    description:
      "React Native ile mobil uygulama geliştirebilecek yazılımcı arıyoruz.",
    lastUpdated: "2025-01-08",
    applications: 8,
  },
  {
    id: 9,
    title: "Product Manager",
    city: "Bursa",
    type: "Full-time",
    description: "Yazılım projelerini yönetebilecek ürün yöneticisi arıyoruz.",
    lastUpdated: "2025-01-05",
    applications: 22,
  },
  {
    id: 10,
    title: "Cyber Security Specialist",
    city: "İstanbul",
    type: "Full-time",
    description:
      "Bilgi güvenliği süreçlerini yönetebilecek siber güvenlik uzmanı arıyoruz.",
    lastUpdated: "2025-01-03",
    applications: 15,
  },
  {
    id: 11,
    title: "System Administrator",
    city: "İzmir",
    type: "Full-time",
    description:
      "Sunucu ve ağ yönetimi yapabilecek sistem yöneticisi arıyoruz.",
    lastUpdated: "2025-01-02",
    applications: 11,
  },
  {
    id: 12,
    title: "Sales Representative",
    city: "Adana",
    type: "Part-time",
    description: "Satış süreçlerini destekleyecek temsilci arıyoruz.",
    lastUpdated: "2024-12-30",
    applications: 14,
  },
  {
    id: 13,
    title: "Game Developer",
    city: "Eskişehir",
    type: "Full-time",
    description:
      "Unity veya Unreal Engine ile oyun geliştirebilecek yazılımcı arıyoruz.",
    lastUpdated: "2024-12-25",
    applications: 20,
  },
  {
    id: 14,
    title: "Marketing Specialist",
    city: "Gaziantep",
    type: "Remote",
    description: "Dijital pazarlama kampanyaları yönetebilecek uzman arıyoruz.",
    lastUpdated: "2024-12-20",
    applications: 17,
  },
];

// Türkiye Şehir Listesi
const cities = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Aksaray",
  "Amasya",
  "Ankara",
  "Antalya",
  "Ardahan",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bartın",
  "Batman",
  "Bayburt",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Düzce",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkâri",
  "Hatay",
  "Iğdır",
  "Isparta",
  "İstanbul",
  "İzmir",
  "Kahramanmaraş",
  "Karabük",
  "Karaman",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırıkkale",
  "Kırklareli",
  "Kırşehir",
  "Kilis",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Mardin",
  "Mersin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Osmaniye",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Şanlıurfa",
  "Şırnak",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Uşak",
  "Van",
  "Yalova",
  "Yozgat",
  "Zonguldak",
];

// İş ilanları için API route
// İş ilanları için API route
app.get("/api/jobs", (req, res) => {
  const { city, type, position } = req.query; // Query parametrelerini al

  let filteredJobs = jobPostings;

  // Şehir filtresi
  if (city) {
    filteredJobs = filteredJobs.filter(
      (job) => job.city.toLowerCase() === city.toLowerCase()
    );
  }

  // Çalışma tipi filtresi
  if (type) {
    filteredJobs = filteredJobs.filter(
      (job) => job.type && job.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Pozisyon filtresi
  if (position) {
    filteredJobs = filteredJobs.filter((job) =>
      job.title.toLowerCase().includes(position.toLowerCase())
    );
  }

  res.json(filteredJobs);
});

// Şehirler için API route
app.get("/api/cities", (req, res) => {
  res.json(cities);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
