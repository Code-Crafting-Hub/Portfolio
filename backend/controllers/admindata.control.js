const userModel = require("../models/user.model");
const cloudinary = require("cloudinary");
const projectModel = require("../models/project.model");
const contactModel = require("../models/contact.model");
const imgModel = require("../models/image.model");
const serviceModel = require("../models/service.model");
const path = require('path')
const fs = require('fs')

// Fetching user login data

const userData = async (req, res) => {
  try {
    const data = await userModel.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ errors: "User not exists" });
    }
  } catch (error) {
    console.log("error in fetchin user data", error);
    res.status(500).json({ errors: "Errors in feting user data" });
  }
};

// Admin project section

const createProjects = async (req, res) => {
  const { name, description, link } = req.body;
  try {
    if (!name || !description || !link) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const image = req.files.image;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file format.Only png and jpeg file are allowed",
      });
    }

    //cloudinary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error while file upload to cloudinary" });
    }

    const projectData = {
      name,
      description,
      link,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
    };

    const project = await projectModel.create(projectData);

    res.json({
      message: "New project created successfully",
      project,
    });
  } catch (error) {
    console.log("Error in project creation", error);
    res.status(500).json({ errors: "Server side error in project creation" });
  }
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { name, description, link } = req.body;
  try {
    const existingProject = await projectModel.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ errors: "Project not found" });
    }
    const updatedData = { name, description, link };

    // If image receive

    if (req.files && req.files.image) {
      const image = req.files.image;
      const allowedFormat = ["image/png", "image/jpeg"];
      if (!allowedFormat.includes(image.mimetype)) {
        return res.status(400).json({
          errors: "Invalid file format.Only png and jpeg file are allowed",
        });
      }
      if (existingProject.image && existingProject.image.public_id) {
        await cloudinary.uploader.destroy(existingProject.image.public_id);
      }
      const uploadResult = await cloudinary.uploader.upload(image.tempFilePath);
      updatedData.image = {
        public_id: uploadResult.public_id,
        url: uploadResult.url,
      };
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      projectId,
      updatedData,
      { new: true }
    );
    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in project updating" });
    console.log("Error in project updating ", error);
  }
};

const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const deletedProject = await projectModel.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ errors: "Project not found" });
    }

    if (deletedProject.image?.public_id) {
      await cloudinary.uploader.destroy(deletedProject.image.public_id);
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error in deleting project", error);
    res.status(500).json({ errors: "Error in deleting project" });
  }
};

const getProjects = async (req, res) => {
  try {
    const data = await projectModel.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ errors: "Project not found" });
    }
  } catch (error) {
    console.log("error in fetching project data", error);
    res.status(500).json({ errors: "Errors in feting project data" });
  }
};

// Admin Contact section

const createContact = async (req, res) => {
  const { name, link } = req.body;
  try {
    if (!link || !name) {
      return res.status(400).json({ errors: "All fields are required" });
    }
    const image = req.files.image;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }

    const allowedFormat = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file format.Only png and jpeg file are allowed",
      });
    }

    //cloudinary code
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error while file upload to cloudinary" });
    }

    const contactData = {
      name,
      link,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
    };

    const contact = await contactModel.create(contactData);

    res.json({
      message: "New contact created successfully",
      contact,
    });
  } catch (error) {
    console.log("Error in contact creation", error);
    res.status(500).json({ errors: "Server side error in contact creation" });
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { link } = req.body;
  try {
    const existingContact = await contactModel.findById(contactId);
    if (!existingContact) {
      return res.status(404).json({ errors: "Contact not found" });
    }
    const updatedData = { link };
    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      updatedData,
      { new: true }
    );
    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in contact updating" });
    console.log("Error in contact updating ", error);
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await contactModel.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ errors: "Contact not found" });
    }

    if (deletedContact.image?.public_id) {
      await cloudinary.uploader.destroy(deletedContact.image.public_id);
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error in deleting contact", error);
    res.status(500).json({ errors: "Error in deleting contact" });
  }
};

const getContact = async (req, res) => {
  try {
    const data = await contactModel.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ errors: "Contact not found" });
    }
  } catch (error) {
    console.log("error in fetching contact data", error);
    res.status(500).json({ errors: "Errors in fetching contact data" });
  }
};

// Admin Images

const createImage = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.files.image;
    if (!name || !image) {
      return res.status(400).json({ errors: "Data is not receive" });
    }
    const allowedFormat = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file format.Only png and jpeg file are allowed",
      });
    }
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error while file upload to cloudinary" });
    }
    const imageData = {
      name,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
    };
    const imageres = await imgModel.create(imageData);
    res.json({
      message: "New Image created successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ errors: "Internal server error in creating images" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { imgId } = req.params;
    const deletedImg = await imgModel.findByIdAndDelete(imgId);
    if (!deletedImg) {
      return res.status(404).json({ errors: "Image not found" });
    }

    if (deletedImg.image?.public_id) {
      await cloudinary.uploader.destroy(deletedImg.image.public_id);
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(400).json({ errors: "Internal server error" });
  }
};

const getImage = async (req, res) => {
  try {
    const img = await imgModel.find();
    if (img) {
      res.status(200).json(img);
    } else {
      res.status(404).json({ errors: "Img not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: "Internal server error in getting image" });
  }
};

// Services

const createService = async (req, res) => {
  const { name, description, link } = req.body;
  try {
    if ((!name|| !description|| !link)) {
      return res.status(400).json({ errors: "Data not receive" });
    }
    const data = { name, description, link };
    await serviceModel.create(data);
    res.json({ message: "New service create successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ errors: "Internal server error in creating service" });
  }
};

const deleteService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const services = await serviceModel.findByIdAndDelete(serviceId);
    if (!services) {
      return res.json({ errors: "Service not found" });
    }
    res.json({ message: "Service delete successfully" });
  } catch (error) {
    res.json({ errors: "Internal server error in deleting service" });
  }
};

const getService = async (req, res) => {
  try {
    const service = await serviceModel.find();
    if (service) {
      res.json(service);
    }else{
      res.json({errors:"Error in getting service"})
    }
  } catch (error) {
    res.json({ errors: "Internal server error in getting service" });
  }
};

// CV file

const uploadPdf = async(req,res)=>{
  try {
    
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfFile = req.files.pdf;
    const uploadPath = path.join(__dirname, "..", "public", "doc", "CV.pdf");

    if (pdfFile.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    await pdfFile.mv(uploadPath);

    res.json({
      message: "PDF uploaded successfully",
      fileUrl: `/doc/${pdfFile.name}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Error uploading PDF" });
  }
}

const getPdf = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../public/doc", "CV.pdf");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "CV not found" });
    }
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal server error in getting file" });
  }
};


const adminData = {
  userData,
  createProjects,
  updateProject,
  deleteProject,
  getProjects,
  createContact,
  updateContact,
  deleteContact,
  getContact,
  createImage,
  deleteImage,
  getImage,
  createService,
  deleteService,
  getService,
  uploadPdf,
  getPdf
};

module.exports = adminData;
