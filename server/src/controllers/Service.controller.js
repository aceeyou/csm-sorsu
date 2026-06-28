import mongoose from "mongoose";
import Service from "../models/Service.js";
import TypeOfOffice from "../models/TypeOfOffice.js";

const selectFilter = "typeID services isActive";

export async function GetServicesList(req, res) {
  try {
    const services = await Service.find()
      .select(selectFilter)
      .sort({ type: 1 });
    // const servicesList = services.map((service) => service.service);

    // MANUALLY ADDED isActive PROPERTY TO ALL DOCUMENTS
    // await Service.updateMany(
    //   { isActive: { $exists: false } }, // Query: Find documents missing this property
    //   { $set: { isActive: true } }, // Update: Set the property value
    // );

    // console.log(services);
    if (services) {
      return res.status(200).json({
        services,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function FetchServicesOfType(req, res) {
  const { officetype } = req.params;
  try {
    const getOfficeType = await TypeOfOffice.findOne({
      type: officetype,
    }).select("_id type");
    // console.log("getOfficetype: ", getOfficeType);
    if (!getOfficeType) {
      return res.status(200).json({
        message: "Services for this office are not available",
        services: [],
      });
    }
    const services = await Service.findOne({
      typeID: getOfficeType._id,
    }).select("_id typeID services isActive");

    if (!services) {
      return res.status(200).json({
        message: "Services for this office are not available",
        services: [],
      });
    }

    // console.log(services);
    if (services) return res.status(200).json({ services: services });
  } catch (error) {
    console.log(error);
  }
}

export async function AddServices(req, res) {
  const { typeID, services } = req.body;

  // console.log(req.body);

  try {
    if (!typeID) {
      return res
        .status(400)
        .json({ message: "Cannot find type of office. Please try again" });
    }

    // const officeTypeId = new mongoose.Types.ObjectId(typeID);
    // console.log(officeTypeId)
    // Checks if the type of office exists on the database

    const servicesToOfficeTypeExists = await Service.findOne({
      typeID,
    });
    if (servicesToOfficeTypeExists)
      return res.status(400).json({
        message:
          "This type of office already has a list of services ready to be used.",
      });

    if (!services)
      return res
        .status(400)
        .json({ message: "Submitted list is blank. Try again." });

    // Adds/Updates the list of services to the services
    const newServices = await Service.create({
      typeID,
      services,
      isActive: true,
    });

    if (newServices) {
      const servicesList = await Service.find().select(selectFilter);
      return res.status(201).json({
        message: "Successfully added services 🎉",
        services: servicesList,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateServices(req, res) {
  const { typeID, services } = req.body;
  const { id } = req.params;

  try {
    if (!id || !services || !typeID) {
      return res.status(400).json({
        message: "Update failed. Please provide the required information.",
      });
    }

    // Checks if the list of services with the given ID exists on the database
    const serviceItem = await Service.findOne({ _id: id });
    if (!serviceItem)
      return res.status(400).json({
        message:
          "Cannot find the services you're looking for. Please try again",
      });

    const typeExists = await TypeOfOffice.findOne({ _id: typeID });
    if (!typeExists)
      return res.status(400).json({
        message: "Cannot find the type of office. Please try again.",
      });

    // Updates the list of services to the services
    const updateServices = await Service.findByIdAndUpdate(
      { _id: id },
      { services },
    );
    // updateServices.services = services;
    // updateServices.save();

    if (updateServices)
      return res.status(200).json({ message: "Successfully updated services" });
  } catch (error) {
    console.log(error);
  }
}

export async function DeactivateServicesOfType(req, res) {
  const { id } = req.params;

  try {
    if (!id)
      return res
        .status(400)
        .json({ message: "Office type not found. Please try again." });

    const servicesExists = await Service.findOne({ typeID: id });
    if (!servicesExists)
      return res
        .status(400)
        .json({ message: "Services not found. Please try again." });

    const deactivatedService = await Service.findByIdAndUpdate(
      { typeID: id },
      {
        isActive: false,
      },
    );

    if (deactivatedServices)
      return res
        .status(200)
        .json({ message: "Successfully deactivated services." });
  } catch (error) {
    console.log(error);
  }
}
