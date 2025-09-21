import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StaffNavbar from "../components/StaffNavbar";
import "../styles/admin-dashboard.css"; // Reuse admin dashboard styles
import { handleSecureLogout } from "../utils/authUtils";

// Main staff dashboard component
const StaffDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [parkingStats, setParkingStats] = useState({
    available: 0,
    occupied: 0,
    maintenance: 0,
    total: 0,
  });
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth check and prevent back navigation after logout
  useEffect(() => {
    const checkAuth = () => {
      const isStaffLoggedIn = localStorage.getItem("isStaffLoggedIn");
      const userRole = localStorage.getItem("userRole");
      const staffId = localStorage.getItem("staffId");

      if (isStaffLoggedIn !== "true" || userRole !== "staff" || !staffId) {
        console.log("Not logged in as staff, redirecting to login");
        // Clear any invalid staff session data
        localStorage.removeItem("isStaffLoggedIn");
        localStorage.removeItem("staffId");
        localStorage.removeItem("userRole");
        window.location.replace("/login");
        return false;
      }
      return true;
    };

    // Initial auth check
    const initialCheck = checkAuth();
    if (!initialCheck) return;

    // Prevent browser caching
    const preventCaching = () => {
      window.history.pushState(null, "", window.location.href);
      checkAuth();
    };

    // Set up event listeners for navigation and page visibility
    window.addEventListener("popstate", preventCaching);
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        preventCaching();
      }
    });

    // Handle page visibility changes
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        checkAuth();
      }
    });

    // Handle storage changes (if logged out in another tab)
    window.addEventListener("storage", (e) => {
      if (e.key === "isStaffLoggedIn" && e.newValue !== "true") {
        window.location.replace("/login");
      }
    });

    // Initial history state
    window.history.pushState(null, "", window.location.href);

    return () => {
      // Clean up all event listeners
      window.removeEventListener("popstate", preventCaching);
      document.removeEventListener("visibilitychange", checkAuth);
    };
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch parking slot statistics
        const statsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/parking-slots/stats`,
          {
            credentials: "include",
          }
        );
        if (!statsResponse.ok) throw new Error("Failed to fetch parking stats");
        const statsData = await statsResponse.json();
        setParkingStats({
          available: statsData.available || 0,
          occupied: statsData.occupied || 0,
          maintenance: statsData.maintenance || 0,
          total: statsData.total || 0,
        });

        // Fetch recent vehicle entries
        const entriesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vehicle-records?limit=5`,
          {
            credentials: "include",
          }
        );
        if (!entriesResponse.ok)
          throw new Error("Failed to fetch vehicle records");
        const entriesData = await entriesResponse.json();
        setRecentEntries(entriesData.records || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div
      className="admin-dashboard-root"
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <StaffNavbar onToggle={handleSidebarToggle} />
      <div
        className="content-wrapper"
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "256px",
          width: "calc(100% - 256px)",
          transition: "margin-left 0.3s ease",
        }}
      >
        <main className="main-content">
          <header className="main-header">
            <h1>Staff Dashboard</h1>
            <p>Manage parking operations efficiently</p>
          </header>

          {/* Parking Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#0d1b2a] rounded-lg p-4 flex flex-col">
              <span className="text-gray-400 text-sm">Available Slots</span>
              <span className="text-2xl font-bold text-green-400">
                {parkingStats.available}
              </span>
            </div>
            <div className="bg-[#0d1b2a] rounded-lg p-4 flex flex-col">
              <span className="text-gray-400 text-sm">Occupied Slots</span>
              <span className="text-2xl font-bold text-red-400">
                {parkingStats.occupied}
              </span>
            </div>
            <div className="bg-[#0d1b2a] rounded-lg p-4 flex flex-col">
              <span className="text-gray-400 text-sm">In Maintenance</span>
              <span className="text-2xl font-bold text-yellow-400">
                {parkingStats.maintenance}
              </span>
            </div>
            <div className="bg-[#0d1b2a] rounded-lg p-4 flex flex-col">
              <span className="text-gray-400 text-sm">Total Slots</span>
              <span className="text-2xl font-bold text-white">
                {parkingStats.total}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Quick Actions
              </h2>
              <div className="flex flex-col gap-3">
                <Link
                  to="/vehicle-entry"
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                >
                  <span className="material-icons">directions_car</span>
                  <span>Manage Vehicle Records</span>
                </Link>
                <Link
                  to="/slots"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
                >
                  <span className="material-icons">local_parking</span>
                  <span>Manage Parking Slots</span>
                </Link>
                <Link
                  to="/enhanced-camera-entry"
                  className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors"
                >
                  <span className="material-icons">camera_alt</span>
                  <span>Camera Monitoring</span>
                </Link>
              </div>
            </div>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Staff Information
              </h2>
              <div className="bg-[#1b263b] p-4 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {localStorage.getItem("staffName")?.charAt(0) || "S"}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {localStorage.getItem("staffName") || "Staff User"}
                    </h3>
                    <p className="text-gray-400">
                      {localStorage.getItem("staffEmail") ||
                        "staff@smartpark.com"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-1">
                  ID: {localStorage.getItem("staffId") || "STF-001"}
                </p>
                <p className="text-sm text-gray-400">Role: Staff</p>
              </div>
            </div>
          </div>

          {/* Recent Entries */}
          <div className="bg-[#0d1b2a] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Vehicle Entries
            </h2>

            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : recentEntries.length === 0 ? (
              <p className="text-center text-gray-400">No recent entries</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1b263b]">
                    <tr>
                      <th className="p-3 text-gray-400">Vehicle Type</th>
                      <th className="p-3 text-gray-400">Vehicle Class</th>
                      <th className="p-3 text-gray-400">Slot</th>
                      <th className="p-3 text-gray-400">Entry Time</th>
                      <th className="p-3 text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEntries.map((entry) => (
                      <tr key={entry._id} className="border-b border-gray-700">
                        <td className="p-3 text-gray-300">
                          {entry.vehicleType}
                        </td>
                        <td className="p-3 text-gray-300">
                          {entry.vehicleClass || "Unknown"}
                        </td>
                        <td className="p-3 text-gray-300">
                          {entry.slotNumber || "N/A"}
                        </td>
                        <td className="p-3 text-gray-300">
                          {formatDate(entry.entryTime)}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.exitTime
                                ? "bg-green-900 text-green-300"
                                : "bg-blue-900 text-blue-300"
                            }`}
                          >
                            {entry.exitTime ? "Completed" : "Active"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4">
              <Link
                to="/vehicle-entry"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
              >
                View all entries
                <span className="material-icons text-sm ml-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
