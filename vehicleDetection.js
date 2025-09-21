import express from "express";
import multer from "multer";
import { detectVehicle } from "../utils/yoloVehicleDetection.js";
import { determineVehicleType } from "../services/detection/vehicleDetection.js"; // ← NEW fallback

const router = express.Router();

// Import vehicle record model
import VehicleRecord from "../models/vehicleRecord.js";

// Get all vehicle detection records
router.get("/records", async (req, res) => {
  try {
    const records = await VehicleRecord.find().sort({ entryTime: -1 }).limit(100);
    res.json({ success: true, records });
  } catch (error) {
    console.error("Error fetching vehicle records:", error);
    res.status(500).json({ success: false, message: "Failed to fetch vehicle records" });
  }
});

// Save a new vehicle detection record
router.post("/save-record", async (req, res) => {
  try {
    const { vehicleType, vehicleClass, confidence, timestamp } = req.body;
    const record = new VehicleRecord({
      vehicleType,
      vehicleClass,
      confidence,
      entryTime: timestamp || new Date(),
      status: "active",
    });
    await record.save();
    res.status(201).json({ success: true, record });
  } catch (error) {
    console.error("Error creating vehicle record:", error);
    res.status(500).json({ success: false, message: "Failed to create vehicle record" });
  }
});

// Configure multer for image upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "application/octet-stream") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and camera data are allowed"));
    }
  },
});

/**
 * @route POST /api/vehicle-detection/detect
 * @description Detect vehicle type (YOLO + JS fallback)
 */
router.post("/detect", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No image data provided" });

    let buffer = req.file.buffer;
    if (req.body.isBase64) buffer = Buffer.from(req.file.buffer.toString(), "base64");

    let result;
    try {
      // 1.  try YOLO first
      result = await detectVehicle(buffer);
    } catch (yoloErr) {
      console.warn("YOLO failed, falling back to JS detector:", yoloErr.message);
      // 2.  fallback to pure-JS detector
      const vehicle = await determineVehicleType(buffer);
      result = {
        success: true,
        vehicleType: vehicle.type,
        confidence: vehicle.confidence,
        metadata: vehicle.metadata,
      };
    }

    return res.json(result);
  } catch (err) {
    console.error("Vehicle detection route error:", err);
    res.status(500).json({ success: false, message: err.message || "Failed to process image" });
  }
});

/**
 * @route POST /api/vehicle-detection/test-camera
 * @description Test endpoint (YOLO + JS fallback)
 */
router.post("/test-camera", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No camera data received" });

    let buffer = req.file.buffer;
    if (req.body.isBase64) buffer = Buffer.from(req.file.buffer.toString(), "base64");

    let result;
    try {
      result = await detectVehicle(buffer);
    } catch (yoloErr) {
      console.warn("YOLO failed, falling back to JS detector:", yoloErr.message);
      const vehicle = await determineVehicleType(buffer);
      result = {
        success: true,
        vehicleType: vehicle.type,
        vehicleClass: vehicle.type,
        confidence: vehicle.confidence,
        vehicleConfidence: vehicle.confidence,
      };
    }

    return res.json({
      success: true,
      detectionResult: result,
      debug: {
        receivedDataSize: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  } catch (err) {
    console.error("Camera test error:", err);
    res.status(500).json({ success: false, message: err.message || "Failed to process camera data" });
  }
});

export default router;