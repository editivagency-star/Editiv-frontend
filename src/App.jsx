import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ClientAuthProvider } from "./context/ClientAuthContext";

import Home from "./pages/Home";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddPortfolio from "./admin/AddPortfolio";
import ManageFolders from "./admin/ManageFolder";
import FolderItems from "./admin/FolderItems";
import PortfolioFolder from "./pages/PortfolioFolder";
import ManageBookings from "./admin/ManageBookings";
import ManageClients from "./admin/ManageClients";
import ManageProjects from "./admin/ManageProjects";
import ManageInvoices from "./admin/ManageInvoices";

import ClientLogin from "./client/ClientLogin";
import ClientLayout from "./client/ClientLayout";
import ClientDashboard from "./client/ClientDashboard";
import ClientProject from "./client/ClientProject";


function App() {
  return (
    <ThemeProvider>
      <ClientAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/add-portfolio" element={<AdminLayout><AddPortfolio /></AdminLayout>} />
            <Route path="/admin/folders" element={<AdminLayout><ManageFolders /></AdminLayout>} />
            <Route path="/admin/folder/:id" element={<AdminLayout><FolderItems /></AdminLayout>} />
            <Route path="/admin/bookings" element={<AdminLayout><ManageBookings /></AdminLayout>} />
            <Route path="/admin/clients" element={<AdminLayout><ManageClients /></AdminLayout>} />
            <Route path="/admin/projects" element={<AdminLayout><ManageProjects /></AdminLayout>} />
            <Route path="/admin/invoices" element={<AdminLayout><ManageInvoices /></AdminLayout>} />

            {/* Portfolio */}
            <Route path="/portfolio/:id" element={<PortfolioFolder />} />

            {/* Client Portal */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/dashboard" element={<ClientLayout><ClientDashboard /></ClientLayout>} />
            <Route path="/client/project/:id" element={<ClientLayout><ClientProject /></ClientLayout>} />
          </Routes>
        </BrowserRouter>
      </ClientAuthProvider>
    </ThemeProvider>
  );
}

export default App;
