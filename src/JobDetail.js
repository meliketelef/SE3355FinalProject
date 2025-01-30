import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const { id } = useParams(); // URL'den ID al
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const navigate = useNavigate(); // Sayfa yönlendirme için kullanılır

  useEffect(() => {
    // Seçili ilan detayını al
    axios
      .get(`http://localhost:5000/api/jobs`)
      .then((response) => {
        const selectedJob = response.data.find(
          (job) => job.id === parseInt(id)
        );
        setJob(selectedJob);

        // Benzer ilanları al (örneğin aynı şehirdeki ilanlar)
        const similarJobs = response.data.filter(
          (j) =>
            j.id !== selectedJob.id &&
            (j.city === selectedJob.city || j.type === selectedJob.type)
        );
        setRelatedJobs(similarJobs.slice(0, 3)); // İlk 3 benzer ilan
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [id]);

  const handleApply = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // Giriş yapılmadıysa login sayfasına yönlendir
    } else {
      alert("Başvuru yapıldı!");
    }
  };

  if (!job) {
    return <p>Loading...</p>; // Veriler yüklenirken
  }

  return (
    <div className="job-detail-container">
      {/* İlan Detayları */}
      <div className="job-detail">
        <h1>{job.title}</h1>
        <p>
          <strong>Location:</strong> {job.city}
        </p>
        <p>
          <strong>Type:</strong> {job.type}
        </p>
        <p>
          <strong>Last Updated:</strong> {job.lastUpdated}
        </p>
        <p>
          <strong>Applications:</strong> {job.applications}
        </p>
        <p>{job.description}</p>
        <button onClick={handleApply}>Başvur</button>
      </div>

      {/* Benzer İlanlar */}
      <div className="related-jobs">
        <h2>Benzer İlanlar</h2>
        <ul>
          {relatedJobs.map((relatedJob) => (
            <li key={relatedJob.id}>
              <Link to={`/job/${relatedJob.id}`}>
                <strong>{relatedJob.title}</strong>
              </Link>
              <p>{relatedJob.city}</p>
              <p>{relatedJob.type}</p>
              <p>{relatedJob.lastUpdated}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetail;
