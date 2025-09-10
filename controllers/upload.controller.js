import bucket from "../utils/firebase.js";

// Upload file to Firebase Storage
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const file = bucket.file(req.file.originalname);

    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    // Generate signed URL (valid for 1 hour)
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000,
    });

    res.json({
      message: "File uploaded successfully ✅",
      signedUrl: url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
