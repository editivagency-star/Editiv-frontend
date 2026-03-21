import "../styles/portfolioModal.css";

export default function PortfolioModal({ item, onClose }) {

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div 
        className="modal-content scrollable" 
        onClick={e => e.stopPropagation()}
      >

        <button className="modal-close" onClick={onClose}>✕</button>

        <img 
          src={item.image}
          alt={item.title}
          className="modal-media-full"
        />

        {item.title && (
          <h3 className="modal-title">{item.title}</h3>
        )}

        {item.description && (
          <p className="modal-desc">{item.description}</p>
        )}

        {item.driveLink && (
          <div style={{ textAlign: "center" }}>
            <a
              href={item.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-video-btn"
            >
              ▶ Watch Video
            </a>
          </div>
        )}

      </div>

    </div>
  );
}
