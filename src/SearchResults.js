import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const SearchResults = () => {
  const [filters, setFilters] = useState({
    country: "Türkiye",
    city: "",
    district: "",
    type: "",
  });
  const [jobs, setJobs] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cities")
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = () => {
    let query = "http://localhost:5000/api/jobs?";
    if (filters.country) query += `country=${filters.country}&`;
    if (filters.city) query += `city=${filters.city}&`;
    if (filters.district) query += `district=${filters.district}&`;
    if (filters.type) query += `type=${filters.type}`;

    axios
      .get(query)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterClear = () => {
    setFilters({ country: "Türkiye", city: "", district: "", type: "" });
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <input
          type="text"
          name="position"
          placeholder="Pozisyon veya şirket ara"
          value={filters.position || ""}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, position: e.target.value }))
          }
          className="search-input"
        />
        <input
          type="text"
          name="city"
          placeholder="Şehir veya ilçe ara"
          value={filters.city}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, city: e.target.value }))
          }
          className="search-input"
        />
        <button onClick={fetchJobs} className="search-button">
          İş Ara
        </button>
      </header>

      {/* Seçili Filtreler */}
      <div className="selected-filters-container">
        <h3>
          Seçili Filtreler (
          {Object.keys(filters).filter((key) => filters[key]).length})
        </h3>
        <div className="selected-filters">
          {Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => (
              <span key={key} className="filter-tag">
                {key}: {value}
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, [key]: "" }))}
                  className="filter-remove-button"
                >
                  ×
                </button>
              </span>
            ))}
          {Object.keys(filters).some((key) => filters[key]) && (
            <button
              onClick={handleFilterClear}
              className="clear-filters-button"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Filtreler */}
        <aside>
          <h3>Filtreler</h3>
          <div>
            <label>Ülke:</label>
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="Türkiye">Türkiye</option>
              <option value="ABD">ABD</option>
            </select>
          </div>
          <div>
            <label>Şehir:</label>
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <option value="">Şehir seçin</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>İlçe:</label>
            <input
              type="text"
              name="district"
              placeholder="İlçe yazın"
              value={filters.district}
              onChange={handleFilterChange}
            />
          </div>
          <div>
            <label>Çalışma Türü:</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="">Hepsi</option>
              <option value="Full-time">Tam Zamanlı</option>
              <option value="Part-time">Yarı Zamanlı</option>
            </select>
          </div>
          <button onClick={handleFilterClear}>Filtreleri Temizle</button>
        </aside>

        {/* İş İlanları */}
        <main>
          <h2>{jobs.length} İş İlanı Bulundu</h2>
          <div className="job-list">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>
                  <Link to={`/job/${job.id}`}>{job.title}</Link>
                </h3>
                <p>{job.city}</p>
                <p>{job.district || "Belirtilmemiş"}</p>
                <p>{job.type}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
