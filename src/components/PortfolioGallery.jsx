import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // ✅ added
import "../styles/portfolioGallery.css";

import API from "../config/api";





export default function PortfolioGallery() {

  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();   // ✅ added

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const folderRes = await axios.get(`${API}/folders`);
      const portfolioRes = await axios.get(`${API}/portfolio`);

      const folderData = folderRes.data;
      const portfolioData = portfolioRes.data;

      const finalData = folderData.map(folder => ({
        ...folder,
        count: portfolioData.filter(
          item => item.folderId === folder._id
        ).length
      }));

      setFolders(finalData);
      setError(false);

    } catch (err) {
      // Silently handle — server may be offline
      setError(true);
    }
  };

  return (
    <div className="portfolio-gallery-wrapper">



      <p className="gallery-small">RECENT WORK</p>

      <h2 className="gallery-title">
        Portfolio <span>Gallery</span>
      </h2>

      <div className="gallery-grid">

        {folders.map(folder => (

          <div
            className="gallery-card"
            key={folder._id}
            onClick={() => navigate(`/portfolio/${folder._id}`)}   // ✅ added
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

        ))}

      </div>

    </div>
  );
}
