import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/portfolioGallery.css";
import API from "../config/api";

export default function PortfolioGallery() {

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const folderRes    = await axios.get(`${API}/folders`);
      const portfolioRes = await axios.get(`${API}/portfolio`);

      const folderData    = folderRes.data;
      const portfolioData = portfolioRes.data;

      const finalData = folderData.map(folder => ({
        ...folder,
        count: portfolioData.filter(item => item.folderId === folder._id).length,
      }));

      setFolders(finalData);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portfolio-gallery-wrapper">

      <p className="gallery-small">RECENT WORK</p>

      <h2 className="gallery-title">
        Portfolio <span>Gallery</span>
      </h2>

      <div className="gallery-grid">

        {loading ? (
          /* ── Skeleton shimmer cards ── */
          Array.from({ length: 4 }).map((_, i) => (
            <div className="gallery-card gallery-skeleton" key={i}>
              <div className="skeleton-img" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-sub" />
            </div>
          ))
        ) : error ? (
          <p className="gallery-error">
            Unable to load portfolio. Please try again later.
          </p>
        ) : (
          folders.map(folder => (
            <div
              className="gallery-card"
              key={folder._id}
              onClick={() => navigate(`/portfolio/${folder._id}`)}
            >
              <div className="gallery-img-wrap">
                <img
                  src={folder.coverImage || folder.image}
                  alt={folder.name}
                />
              </div>

              <h3>{folder.name}</h3>
              <p>{folder.count} Projects</p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}
