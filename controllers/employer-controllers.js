const { default: mongoose } = require("mongoose");
const express = require("express");
const Employer = require("../models/Employer");
const HttpError = require("../models/HttpError");

exports.signup = async (req, res, next) => {
  const { name, email, password, phone, rating, salary, employees, jobs } =
    req.body;

  let existingEmployer;
  try {
    existingEmployer = await Employer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find Employer", 500);
    return next(error);
  }

  if (existingEmployer) {
    const error = new HttpError("Employer already exist", 422);
    return next(error);
  }

  const createdEmployer = new Employer({
    name,
    email,
    password,
    phone,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1680454460/2-removebg-preview_vggazr.png",
    rating,
    salary,
    employees,
    jobs,
  });

  let employer;
  try {
    employer = await createdEmployer.save();
  } catch (err) {
    const error = new HttpError("Could not create employer", 500);
    return next(error);
  }

  res.status(201).json({ createdEmployer: employer });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingEmployer;
  try {
    existingEmployer = await Employer.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Could not find employer", 404);
    return next(error);
  }

  if (!existingEmployer) {
    const error = new HttpError("Could not find employer, or not created", 500);
    return next(error);
  }

  if (existingEmployer.password !== password) {
    const error = new HttpError("Invalid credentials", 500);
    return next(error);
  }

  res.status(200).json({ message: "Logged In as Employer" });
};

exports.getProfile = async (req, res, next) => {
  const employerId = req.params.employerId;

  let employer;
  try {
    employer = await Employer.findById(employerId);
  } catch (err) {
    const error = new HttpError("Cannot get user profile", 403);
    return next(error);
  }

  res.status(200).json({ employer: employer.toObject({ getters: true }) });
};

exports.getCompanies = async (req, res, next) => {
  let companies;
  try {
    companies = await Employer.find();
  } catch (err) {
    const error = new HttpError("Cannot get companies", 403);
    return next(error);
  }

  res.status(200).json({
    companies: companies.map((company) => company.toObject({ getters: true })),
  });
};

exports.getCompany = async (req, res, next) => {
  const companyId = req.params.companyId;

  let company;
  try {
    company = await Employer.findById(companyId);
  } catch (err) {
    const error = new HttpError("Cannot get company", 403);
    return next(error);
  }

  res.status(200).json({ company: company.toObject({ getters: true }) });
};
