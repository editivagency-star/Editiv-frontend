import "../styles/admin.css";

import "../styles/admin.css";

export default function AdminDashboard() {

  return (
    <div className="admin-content">
      <h1 className="admin-page-title">Admin Dashboard</h1>
      <p className="admin-page-sub">Welcome 👋 Manage your portfolio here</p>

      {/* Add Portfolio Instructions */}
      <div className="admin-instruction-card">
        <h3 className="admin-instruction-title">1. Add Portfolio Page</h3>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px" }}>
          The Add Portfolio page is used for adding videos or images to your project collections.
        </p>

        <div className="admin-instruction-step">
          <h4>Step 1: Enter Project Title</h4>
          <div className="admin-instruction-images">
            <img src="/image.png" alt="Enter Project Title" />
          </div>
        </div>

        <div className="admin-instruction-step">
          <h4>Step 2: Select or Create a Folder</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            If the folder already exists, select it from the dropdown. If it doesn't exist, click on <strong>Create New Folder</strong>.
            Choose a Name, choose the Folder Type (Image or Video), and choose a Thumbnail for the folder.<br /><br />
            <em>Note: Please ensure the thumbnail image size's width & height match standard proportions.</em>
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 145504.png" alt="Select Folder" />
            <img src="/Screenshot 2026-04-12 145644.png" alt="Create New Folder Mode" />
            <img src="/Screenshot 2026-04-12 145728.png" alt="Choose Folder Name" />
            <img src="/Screenshot 2026-04-12 145821.png" alt="Choose Folder Type" />
            <img src="/Screenshot 2026-04-12 145905.png" alt="Choose Folder Thumbnail" />
            <img src="/Screenshot 2026-04-12 150016.png" alt="Click Create Folder" />
          </div>
        </div>

        <div className="admin-instruction-step">
          <h4>Step 3: Upload the Portfolio Item</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            If a video folder is chosen, add the Google Drive Link and upload a thumbnail image for the video.
            Then click <strong>Upload Portfolio</strong>.
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 150126.png" alt="Upload Video Item" />
          </div>
        </div>
      </div>

      {/* Manage Portfolio Instructions */}
      <div className="admin-instruction-card">
        <h3 className="admin-instruction-title">2. Manage Portfolio Page</h3>

        <div className="admin-instruction-step">
          <h4>View and Manage Folders</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            You'll find all the folders you have created displayed here. You can delete the whole folder at once.
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 150327.png" alt="All Folders" />
            <img src="/Screenshot 2026-04-12 150429.png" alt="Folder Options" />
            <img src="/Screenshot 2026-04-12 150508.png" alt="Delete Folder Action" />
          </div>
        </div>

        <div className="admin-instruction-step">
          <h4>Manage Individual Items</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            You can also enter a folder and delete only one specific image or video at a time if needed.
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 150610.png" alt="Delete Individual Item" />
          </div>
        </div>
      </div>

      {/* Bookings Instructions */}
      <div className="admin-instruction-card">
        <h3 className="admin-instruction-title">3. Bookings Page</h3>

        <div className="admin-instruction-step">
          <h4>Viewing Enquiries</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            You'll find the list of everyone who has submitted an enquiry through the website.
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 150652.png" alt="Enquiries List" />
          </div>
        </div>

        <div className="admin-instruction-step">
          <h4>Updating Status</h4>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            When a submission is new, it shows as <strong>New</strong>. Once you have contacted them, simply click the status button to turn it to <strong>Contacted</strong>.
            When the deal is closed successfully, click <strong>Contacted</strong> again to turn it into <strong>Closed</strong>.
          </p>
          <div className="admin-instruction-images">
            <img src="/Screenshot 2026-04-12 150811.png" alt="Status New" />
            <img src="/Screenshot 2026-04-12 150911.png" alt="Status Contacted" />
            <img src="/Screenshot 2026-04-12 151012.png" alt="Status Closed" />
          </div>
        </div>
      </div>

    </div>
  );
}
