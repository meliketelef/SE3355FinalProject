import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "Password123!") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "Test User");
      localStorage.setItem("userPhoto", "https://via.placeholder.com/50");
      alert("Giriş başarılı!");
      navigate("/");
    } else {
      alert("Email veya şifre hatalı!");
    }
  };

  const handleGoogleClick = () => {
    alert("Google ile giriş özelliği henüz aktif değil.");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Giriş Yap</h1>

      {/* Google ile Giriş Yap Butonu */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={handleGoogleClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            backgroundColor: "#4285F4",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Google ile Giriş Yap
        </button>
      </div>

      {/* Email ve Şifre ile Giriş Formu */}
      <form
        onSubmit={handleLogin}
        style={{
          display: "inline-block",
          textAlign: "left",
          marginTop: "20px",
          maxWidth: "300px",
        }}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", padding: "10px" }}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: "10px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Giriş Yap
        </button>
      </form>

      {/* Üye Ol Butonu */}
      <div style={{ marginTop: "20px" }}>
        <p>Henüz üye değil misiniz?</p>
        <button
          onClick={handleRegisterRedirect}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "white",
            backgroundColor: "#f39c12",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Üye Ol
        </button>
      </div>
    </div>
  );
};

export default Login;
