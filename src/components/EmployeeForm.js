import React, { useState } from 'react';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    franchiseName: '',
    personName: '',
    position: '',
    customPosition: '',
    reportTo: '',
    customReportTo: '',
    workLocation: '',
    mobileNo: '',
    whatsappNo: '',
    companyEmailStart: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    companyEmailStart: '',
    franchiseName: '',
    personName: '',
    mobileNo: '',
    whatsappNo: '',
  });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateCompanyEmailStart = (value) => {
    return /^[a-z0-9_]+$/.test(value);
  };

  const validateName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value); // Allows only alphabets and spaces
  };

  const validateMobileNumber = (value) => {
    return /^[0-9]{10}$/.test(value); // Allows exactly 10 digits
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for specific fields
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({
          ...errors,
          email: 'Email must contain "@" and no special characters apart from "@" are allowed.',
        });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (name === 'companyEmailStart') {
      if (!validateCompanyEmailStart(value)) {
        setErrors({
          ...errors,
          companyEmailStart: 'Only lowercase letters, numbers, and underscores are allowed.',
        });
      } else {
        setErrors({ ...errors, companyEmailStart: '' });
      }
    }

    if (name === 'franchiseName') {
      if (!validateName(value)) {
        setErrors({
          ...errors,
          franchiseName: 'Name should not contain numbers or special characters.',
        });
      } else {
        setErrors({ ...errors, franchiseName: '' });
      }
    }

    if (name === 'personName') {
      if (!validateName(value)) {
        setErrors({
          ...errors,
          personName: 'Name should not contain numbers or special characters.',
        });
      } else {
        setErrors({ ...errors, personName: '' });
      }
    }

    if (name === 'mobileNo' || name === 'whatsappNo') {
      if (!validateMobileNumber(value)) {
        setErrors({
          ...errors,
          [name]: 'Number must be exactly 10 digits.',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    }

    // Set sanitized values where necessary
    if (name === 'companyEmailStart') {
      const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Combine companyEmailStart with the domain
    const fullEmail = `${formData.companyEmailStart}@talentcorner.in`;

    // Check for any validation errors
    if (
      errors.email ||
      errors.companyEmailStart ||
      errors.franchiseName ||
      errors.personName ||
      errors.mobileNo ||
      errors.whatsappNo ||
      !formData.email ||
      !formData.franchiseName ||
      !formData.personName ||
      !formData.mobileNo ||
      !formData.whatsappNo ||
      !formData.companyEmailStart
    ) {
      alert('Please fix all errors before submitting the form.');
      return;
    }

    // Add form submission logic here
    console.log('Form Submitted:', { ...formData, fullEmail });
    alert('Form submitted successfully!');
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h1>Email ID Creation</h1>

      <label>
        Email*
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Personal email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Name of Franchise* - In case of Franchisee Please fill name as per agreement 
        (Don't mention name as Talent Corner)
        In case of Employee of TCHR fill name then mention TCHR
        <input
          type="text"
          name="franchiseName"
          value={formData.franchiseName}
          onChange={handleChange}
          placeholder="Name as per agreement"
          required
        />
        {errors.franchiseName && <span className="error">{errors.franchiseName}</span>}
      </label>

      <label>
        Name of Person*
        <input
          type="text"
          name="personName"
          value={formData.personName}
          onChange={handleChange}
          placeholder="Enter the name"
          required
        />
        {errors.personName && <span className="error">{errors.personName}</span>}
      </label>

      <fieldset>
        <legend>Position*</legend>
        {[
          'Branch Head / Franchise Partner',
          'Recruiter and Franchise Office',
          'Team Leader at Head Office',
          'BD At Head Office',
          'Admin at Head Office',
          'Intern',
          'Other',
        ].map((position, index) => (
          <label key={index}>
            <input
              type="radio"
              name="position"
              value={position}
              onChange={handleChange}
              required
            />
            {position}
          </label>
        ))}
        {formData.position === 'Other' && (
          <label>
            Please specify:
            <input
              type="text"
              name="customPosition"
              value={formData.customPosition}
              onChange={handleChange}
              required
            />
          </label>
        )}
      </fieldset>

      <fieldset>
        <legend>Report To</legend>
        {[
          'Joyeeta Khaskel',
          'Surbhi Jain',
          'Avadai Marthuvar',
          'Komal Bhanushali',
          'Bankim Doshi',
          'Rashesh Doshi',
          'P. Vayunandan',
          'Vedika Tolani',
          'Suganya R',
          'Other',
        ].map((report, index) => (
          <label key={index}>
            <input
              type="radio"
              name="reportTo"
              value={report}
              onChange={handleChange}
            />
            {report}
          </label>
        ))}
        {formData.reportTo === 'Other' && (
          <label>
            Please specify:
            <input
              type="text"
              name="customReportTo"
              value={formData.customReportTo}
              onChange={handleChange}
              required
            />
          </label>
        )}
      </fieldset>

      <label>
        Location of Work*
        <input
          type="text"
          name="workLocation"
          value={formData.workLocation}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Mobile No*
        <input
          type="tel"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />
        {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
      </label>

      <label>
        WhatsApp No*
        <input
          type="tel"
          name="whatsappNo"
          value={formData.whatsappNo}
          onChange={handleChange}
          required
        />
        {errors.whatsappNo && <span className="error">{errors.whatsappNo}</span>}
      </label>

      <label>
        Company Official Email ID*
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            name="companyEmailStart"
            value={formData.companyEmailStart}
            onChange={handleChange}
            placeholder="Enter your name for the email"
            required
            style={{ flex: '1' }}
          />
          <span style={{ marginLeft: '8px' }}>@talentcorner.in</span>
        </div>
        {errors.companyEmailStart && (
          <span className="error">{errors.companyEmailStart}</span>
        )}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeForm;  