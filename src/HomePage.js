import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState({ position: "", city: "" });
  const [language, setLanguage] = useState("TR");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          .then((response) => {
            const currentCity = response.data.address.city || "İstanbul";
            setCity(currentCity);
            fetchJobs(currentCity);
          })
          .catch(() => fetchJobs("İstanbul")); // Default şehir
      },
      () => fetchJobs("İstanbul") // Konum reddedilirse default şehir
    );
  }, []);

  const fetchJobs = (cityName) => {
    axios
      .get(`http://localhost:5000/api/jobs?city=${cityName}`)
      .then((response) => {
        console.log("Fetched Jobs:", response.data); // Gelen veriyi kontrol edin
        if (response.data.length > 0) {
          setJobs(response.data);
        } else {
          axios
            .get("http://localhost:5000/api/jobs")
            .then((res) => setJobs(res.data));
        }
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let query = "http://localhost:5000/api/jobs?";
    if (search.position) query += `position=${search.position}&`;
    if (search.city) query += `city=${search.city}`;
    axios
      .get(query)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const handleLanguageSwitch = () => {
    setLanguage((prev) => (prev === "TR" ? "EN" : "TR"));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");

    alert("Çıkış yapıldı!");
    navigate("/login"); // Kullanıcıyı login sayfasına yönlendir
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div>
      <header className="header">
        <h1>{language === "TR" ? "Kariyer.net" : "Career.net"}</h1>
        <div>
          <button className="language-button" onClick={handleLanguageSwitch}>
            {language === "TR" ? "EN" : "TR"}
          </button>
          <Link to="/search" className="search-link">
            {language === "TR" ? "İş Ara" : "Search Jobs"}
          </Link>
          {!isLoggedIn ? (
            <Link to="/login" className="login-button">
              {language === "TR" ? "Giriş Yap / Üye Ol" : "Login / Register"}
            </Link>
          ) : (
            <button onClick={handleLogout} className="logout-button">
              {language === "TR" ? "Çıkış Yap" : "Logout"}
            </button>
          )}
        </div>
      </header>

      <section className="search-section">
        <h2>
          {language === "TR"
            ? "Kariyer Fırsatlarını Keşfet"
            : "Discover Career Opportunities"}
        </h2>
        <div className="search-inputs">
          <input
            type="text"
            name="position"
            placeholder={
              language === "TR" ? "Pozisyonlarda Ara" : "Search Positions"
            }
            value={search.position}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="city"
            placeholder={
              language === "TR" ? "Şehir veya İlçe Ara" : "Search City or Town"
            }
            value={search.city}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>
            {language === "TR" ? "İş Bul" : "Search"}
          </button>
        </div>
      </section>

      <section className="featured-jobs">
        <h3>{language === "TR" ? "Öne Çıkan İlanlar" : "Featured Jobs"}</h3>
        <div className="job-list">
          {jobs.slice(0, 5).map((job) => (
            <div key={job.id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.city}</p>
              <p>{job.type}</p>
              <Link to={`/job/${job.id}`} className="job-detail-link">
                {language === "TR" ? "Detaylar" : "Details"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
