import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css"; // CSS dosyasını içe aktar

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "Türkiye",
    city: "",
    photo: null,
  });
  const [cities, setCities] = useState([]); // Dinamik şehir listesi
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.country === "Türkiye") {
      axios
        .get("http://localhost:5000/api/cities") // Backend endpoint
        .then((response) => {
          setCities(response.data); // Şehir listesini ayarla
        })
        .catch((error) => {
          console.error("Şehirler yüklenirken hata:", error);
        });
    } else {
      setCities([]);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ülke değiştiğinde şehir alanını sıfırla
    if (name === "country" && value !== "Türkiye") {
      setFormData((prev) => ({ ...prev, city: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        photo: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Şifrelerin eşleşmesini kontrol et
    if (formData.password !== formData.confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    // Şifre doğrulamasını kontrol et
    if (!validatePassword(formData.password)) {
      alert(
        "Şifre en az 8 karakter, bir sayı ve bir özel karakter içermelidir!"
      );
      return;
    }

    // Kullanıcı bilgilerini LocalStorage'a kaydet
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", `${formData.name} ${formData.surname}`);
    localStorage.setItem(
      "userPhoto",
      formData.photo || "https://via.placeholder.com/50"
    );

    alert("Kayıt başarılı!");
    navigate("/");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Ad:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Soyad:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kullanıcı email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            title="Şifre en az 8 karakter, bir sayı ve bir özel karakter içermelidir."
          />
        </div>
        <div>
          <label>Tekrar:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ülke:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="Türkiye">Türkiye</option>
            <option value="ABD">ABD</option>
          </select>
        </div>
        {/* Şehir dropdown sadece Türkiye seçildiğinde gösterilecek */}
        {formData.country === "Türkiye" && (
          <div>
            <label>Şehir:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required={formData.country === "Türkiye"}
            >
              <option value="">Şehir Seçin</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Fotoğraf Yükle:</label>
          <input type="file" onChange={handlePhotoUpload} />
          {formData.photo && (
            <img src={formData.photo} alt="Profile" className="profile-img" />
          )}
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
