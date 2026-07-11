import Resource from '../models/Resource.js';
import path from 'path';
import fs from 'fs';

export const uploadResource = async (req, res) => {
  try {
    const { title, description, type, tags, linkUrl } = req.body;
    let fileUrl = null;
    if (req.file) fileUrl = '/uploads/' + req.file.filename;

    const resource = new Resource({
      title,
      description,
      type,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      fileUrl,
      linkUrl: type === 'link' ? linkUrl : null,
      educator: req.user._id
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    // Increment view count and update lastAccessed
    resource.viewCount = (resource.viewCount || 0) + 1;
    resource.lastAccessed = new Date();
    await resource.save();
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resource', error: err.message });
  }
};

export const downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource || !resource.fileUrl) return res.status(404).json({ message: 'Resource/file not found' });
    // Increment download count and update lastAccessed
    resource.downloadCount = (resource.downloadCount || 0) + 1;
    resource.lastAccessed = new Date();
    await resource.save();
    // Stream the file
    const filePath = path.join(process.cwd(), 'backend', resource.fileUrl);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });
    res.download(filePath, path.basename(filePath));
  } catch (err) {
    res.status(500).json({ message: 'Failed to download file', error: err.message });
  }
}; 