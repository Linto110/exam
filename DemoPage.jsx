import React, { useState } from "react";
import { Link } from "react-router-dom";

const DemoPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const features = [
    {
      title: "Dual Camera Support",
      description: "Works with both laptop cameras and CCTV systems",
      icon: "📹",
      details: [
        "Laptop camera integration with device selection",
        "CCTV support via RTSP streams",
        "Easy configuration for multiple cameras",
        "Real-time streaming capabilities",
      ],
    },
    {
      title: "Vehicle Type Detection",
      description:
        "Automatically distinguishes between 2-wheelers and 4-wheelers",
      icon: "🚗",
      details: [
        "Image analysis using computer vision",
        "Confidence scoring for detection accuracy",
        "Support for various vehicle types",
        "Real-time processing capabilities",
      ],
    },
    {
      title: "Advanced Vehicle Detection",
      description: "Identifies and classifies different types of vehicles",
      icon: "�",
      details: [
        "Multi-class vehicle detection",
        "High accuracy classification",
        "Real-time processing",
        "Support for various vehicle types",
      ],
    },
    {
      title: "Database Integration",
      description: "Stores and manages vehicle entry records",
      icon: "💾",
      details: [
        "MongoDB integration",
        "Real-time record management",
        "Entry and exit tracking",
        "Historical data access",
      ],
    },
  ];

  const cctvExamples = [
    {
      brand: "Hikvision",
      config: {
        protocol: "RTSP",
        ip: "192.168.1.100",
        port: "554",
        username: "admin",
        password: "admin123",
        streamPath: "/Streaming/Channels/101",
      },
    },
    {
      brand: "Dahua",
      config: {
        protocol: "RTSP",
        ip: "192.168.1.101",
        port: "554",
        username: "admin",
        password: "admin",
        streamPath: "/cam/realmonitor?channel=1&subtype=0",
      },
    },
    {
      brand: "Generic RTSP",
      config: {
        protocol: "RTSP",
        ip: "192.168.1.102",
        port: "554",
        username: "",
        password: "",
        streamPath: "/stream1",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#1b263b] text-white">
      {/* Header */}
      <div className="bg-[#0d1b2a] border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Smart Park - Vehicle Detection System
            </h1>
            <div className="flex gap-4">
              <Link
                to="/enhanced-camera-entry"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Try Demo
              </Link>
              <Link
                to="/"
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-4 border-b border-gray-700">
          {[
            { id: "overview", label: "Overview" },
            { id: "features", label: "Features" },
            { id: "cctv", label: "CCTV Setup" },
            { id: "api", label: "API Documentation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Smart Park Vehicle Detection System
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A comprehensive solution for automatic vehicle detection and
                classification, designed to work with both laptop cameras and
                CCTV systems for parking management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0d1b2a] p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">
                  🎯 Project Goals
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Capture vehicle images using laptop camera or CCTV</li>
                  <li>
                    • Automatically detect vehicle type (2-wheeler vs 4-wheeler)
                  </li>
                  <li>• Identify and classify vehicles in images</li>
                  <li>• Store vehicle entry records in database</li>
                  <li>
                    • Provide easy CCTV integration for real-world deployment
                  </li>
                </ul>
              </div>

              <div className="bg-[#0d1b2a] p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-green-400">
                  ✅ Key Achievements
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Unified camera component for multiple input sources</li>
                  <li>• Real-time image processing and analysis</li>
                  <li>• CCTV configuration with preset templates</li>
                  <li>• Modern, responsive user interface</li>
                  <li>• RESTful API for system integration</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                🚀 Quick Start
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">1️⃣</div>
                  <h4 className="font-bold mb-2">Setup Backend</h4>
                  <p className="text-gray-400 text-sm">
                    Install dependencies and start the server
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">2️⃣</div>
                  <h4 className="font-bold mb-2">Configure Camera</h4>
                  <p className="text-gray-400 text-sm">
                    Choose laptop camera or setup CCTV
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">3️⃣</div>
                  <h4 className="font-bold mb-2">Start Detection</h4>
                  <p className="text-gray-400 text-sm">
                    Capture images and process vehicles
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              System Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-[#0d1b2a] p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{feature.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-gray-300 text-sm">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cctv" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              CCTV Camera Setup
            </h2>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">
                Supported Camera Brands
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cctvExamples.map((example, index) => (
                  <div key={index} className="bg-[#1b263b] p-4 rounded-lg">
                    <h4 className="font-bold mb-3 text-blue-400">
                      {example.brand}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Protocol:</span>{" "}
                        {example.config.protocol}
                      </div>
                      <div>
                        <span className="text-gray-400">IP:</span>{" "}
                        {example.config.ip}
                      </div>
                      <div>
                        <span className="text-gray-400">Port:</span>{" "}
                        {example.config.port}
                      </div>
                      <div>
                        <span className="text-gray-400">Username:</span>{" "}
                        {example.config.username || "None"}
                      </div>
                      <div>
                        <span className="text-gray-400">Stream Path:</span>{" "}
                        {example.config.streamPath}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Configuration Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Access Camera Settings</h4>
                    <p className="text-gray-400">
                      Navigate to your camera's web interface and note the IP
                      address, username, and password.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Configure in System</h4>
                    <p className="text-gray-400">
                      Use the CCTV configuration modal to enter your camera
                      details and test the connection.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Start Detection</h4>
                    <p className="text-gray-400">
                      Once configured, the system will connect to your CCTV feed
                      and enable vehicle detection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "api" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              API Documentation
            </h2>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">
                Vehicle Detection Endpoints
              </h3>
              <div className="space-y-4">
                <div className="bg-[#1b263b] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm mr-3">
                      POST
                    </span>
                    <code className="text-blue-400">
                      /api/vehicle-detection/detect
                    </code>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Process image for vehicle detection and classification
                  </p>
                </div>

                <div className="bg-[#1b263b] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm mr-3">
                      POST
                    </span>
                    <code className="text-blue-400">
                      /api/vehicle-detection/save-record
                    </code>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Save vehicle entry record to database
                  </p>
                </div>

                <div className="bg-[#1b263b] p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm mr-3">
                      GET
                    </span>
                    <code className="text-blue-400">
                      /api/vehicle-detection/records
                    </code>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Retrieve vehicle entry records
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1b2a] p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Response Format</h3>
              <pre className="bg-[#1b263b] p-4 rounded-lg text-sm overflow-x-auto">
                {`{
  "success": true,
  "plate": "KA-01-AB-1234",
  "vehicleType": "4-wheeler",
  "plateConfidence": 0.85,
  "vehicleConfidence": 0.92,
  "region": "100,200,300,50",
  "metadata": {
    "plateRegions": 2,
    "imageSize": {
      "width": 1280,
      "height": 720,
      "format": "jpeg"
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoPage;
