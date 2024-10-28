import React, { useEffect, useState } from "react";
import {
  CountrySelect,
  CustomInput,
  SelectComponent,
} from "../components/reusable/Input";
import { genderOption, maritalOption, titleOption } from "../constant/data";
import Register from "../components/reusable/Register";
import PhoneInputComponent from "../components/reusable/PhoneInputComponent";
import { BsFillPassportFill } from "react-icons/bs";
import FormSection from "../components/reusable/FormSection";
import FileUpload from "../components/reusable/DragAndDrop";
import {
  StudentPersnalInfo,
  StudentPersnalInfoEdit,
} from "../features/studentApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { CiCircleInfo } from "react-icons/ci";
import { storage } from "../utils/fireBase";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudentData, studentInfo } from "../features/studentSlice";
import ImageComponent from "./../components/reusable/Input";
import { ImBin } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";

const Form1 = ({
  customClass,
  hide,
  handleCancel,
  studentFormId,
  updateData,
}) => {
  const { countryOption } = useSelector((state) => state.general);
  const location = useLocation();
  const studentInfoData = useSelector((state) => state.student.studentInfoData);
  const studentData = useSelector((state) => state.student.studentInformation);
  const IdToAddStudent = location?.state?.id?.id; // for comppleting pending student profile to get data if exists
  const studentInformation = hide ? studentInfoData : studentData;
  console.log(studentInformation, IdToAddStudent);
  const navigate = useNavigate();
  const [resetProfilePic, setResetProfilePic] = useState(false);
  const [resetPassportUpload, setResetPassportUpload] = useState(false);
  const studentId = IdToAddStudent ||  studentFormId ||  localStorage.getItem("form") || studentInformation?.data?.studentInformation?._id;
  const personalInfo =
    studentInformation?.data?.studentInformation?.personalInformation;

  const dispatch = useDispatch();
  const passportInfo =
    studentInformation?.data?.studentInformation?.passportDetails;
  const editForm = hide === true ? "edit" : null;

  const [personalData, setPersonalData] = useState({
    personalInformation: {
      profilePicture: "",
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      maritalStatus: "",
      dob: "",
      firstLanguage: "",
      email: "",
      phone: {
        countryCode: "",
        phone: "",
      },
    },
    passportDetails: {
      passportNumber: "",
      expireDate: "",
      passportUpload: [],
      countryOfCitizenship: "",
    },
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateFields = () => {
    const newErrors = {};
    const { personalInformation, passportDetails } = personalData;

    // Email validation: ensure it's required and formatted correctly
    if (!personalInformation.email) {
      newErrors["personalInformation.email"] = "Email is required";
    } else if (!emailRegex.test(personalInformation.email)) {
      newErrors["personalInformation.email"] = "Invalid email format";
    }

    // Other field validations...
    if (!personalInformation.title)
      newErrors["personalInformation.title"] = "Title is required";
    if (!personalInformation.firstName)
      newErrors["personalInformation.firstName"] = "First Name is required";
    if (!personalInformation.lastName)
      newErrors["personalInformation.lastName"] = "Last Name is required";
    if (!personalInformation.gender)
      newErrors["personalInformation.gender"] = "Gender is required";
    if (!personalInformation.dob)
      newErrors["personalInformation.dob"] = "Date of Birth is required";
    if (!passportDetails.countryOfCitizenship)
      newErrors["passportDetails.countryOfCitizenship"] =
        "Country of Citizenship is required";
    if (!passportDetails.passportNumber)
      newErrors["passportDetails.passportNumber"] =
        "Passport Number is required";
    if (!passportDetails.expireDate)
      newErrors["passportDetails.expireDate"] =
        "Passport Expiry Date is required";
    if (!passportDetails.passportUpload)
      newErrors["passportDetails.passportUpload"] =
        "Please upload your passport copy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (hide === true) {
      dispatch(studentInfo(studentFormId));
    }
    if (hide === false) {
      dispatch(getStudentData(studentId));
    }
  }, [dispatch]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    if (field === "email") {
      if (/\s/.test(value)) {
        return;
      }
    }

    if (field === "firstName" || field === "lastName") {
      const alphabetRegex = /^[a-zA-Z\s]*$/;
      if (!alphabetRegex.test(value)) {
        return;
      }
    }

    setPersonalData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));

    // Clear any existing errors for the field
    setErrors((prevErrors) => {
      const { [name]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  };

  const handlePhoneChange = (phoneData) => {
    setPersonalData((prevData) => ({
      ...prevData,
      personalInformation: {
        ...prevData.personalInformation,
        phone: {
          countryCode: phoneData.code,
          phone: phoneData.number,
        },
      },
    }));
  };

  const handleFileUpload = async (files, uploadType) => {
    if (!files || files.length === 0) return; // Ensure there are files to upload

    let uploadedUrls = []; // Array to store uploaded file URLs

    for (const file of files) {
      console.log(file, "Uploading file");

      const storageRef = ref(storage, `uploads/${file.name}`); // Upload with the file name

      try {
        // Upload each file
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL
        uploadedUrls.push(downloadURL); // Add the download URL to the array

        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(`Error uploading ${file.name}. Please try again.`);
      }
    }

    // Update state based on upload type (profilePicture or passportUpload)
    if (uploadType === "profilePicture" && uploadedUrls.length > 0) {
      setPersonalData((prevData) => ({
        ...prevData,
        personalInformation: {
          ...prevData.personalInformation,
          profilePicture: uploadedUrls[0], // Assuming a single profile picture is uploaded
        },
      }));
    } else if (uploadType === "passportUpload" && uploadedUrls.length > 0) {
      setPersonalData((prevData) => {
        // Debugging: Log the previous passportUpload and new uploadedUrls
        // console.log("Previous passportUpload:", prevData.passportDetails.passportUpload || []);
        // console.log("New URLs to be added:", uploadedUrls);

        return {
          ...prevData,
          passportDetails: {
            ...prevData.passportDetails,
            passportUpload: [...uploadedUrls],
          },
        };
      });
    }
  };

  //delete image and file from firebase

  const deleteFile = async (fileUrl, uploadType) => {
    if (!fileUrl) return;

    // Create a reference to the file to delete
    const storageRef = ref(storage, fileUrl);

    try {
      // Delete the file
      await deleteObject(storageRef);

      toast.success("File deleted successfully!");

      // Update the state based on the upload type (profilePicture or passportUpload)
      if (uploadType === "profilePicture") {
        setPersonalData((prevData) => ({
          ...prevData,
          personalInformation: {
            ...prevData.personalInformation,
            profilePicture: "", // Clear the profile picture after deletion
          },
        }));
        setResetProfilePic(true); // Trigger reset
      } else if (uploadType === "passportUpload") {
        setPersonalData((prevData) => ({
          ...prevData,
          passportDetails: {
            ...prevData.passportDetails,
            passportUpload: prevData.passportDetails.passportUpload.filter(
              (url) => url !== fileUrl
            ), // Remove deleted file URL
          },
        }));
        setResetPassportUpload(true); // Trigger reset
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file. Please try again.");
    }
  };

  useEffect(() => {
    if (personalInfo || passportInfo) {
      setPersonalData((prevData) => ({
        personalInformation: {
          ...prevData.personalInformation,
          ...personalInfo,
          dob: personalInfo.dob || "",
          phone: {
            countryCode: personalInfo?.phone?.countryCode || "",
            phone: personalInfo?.phone?.phone || "",
          },
        },
        passportDetails: {
          passportNumber: passportInfo?.passportNumber || "",
          expireDate: passportInfo?.expireDate || "",
          passportUpload: [passportInfo?.passportUpload] || [],
          countryOfCitizenship: passportInfo?.countryOfCitizenship || "",
        },
      }));
    }
  }, [personalInfo, passportInfo]);

  const handleSubmit = async () => {
    if (validateFields()) {
      const payload = {
        personalInformation: {
          ...personalData.personalInformation,

          phone: {
            countryCode: personalData.personalInformation.phone.countryCode,
            phone: personalData.personalInformation.phone.phone,
          },
        },
        passportDetails: {
          ...personalData.passportDetails,
          passportUpload: personalData.passportDetails.passportUpload?.[0],
        },
      };

      try {
        const res = (hide || location?.state?.hide === true || studentInformation?.data?.studentInformation?.pageStatus?.status === "rejected") 
          ? await StudentPersnalInfoEdit(payload, studentId)
          : await StudentPersnalInfo(payload);

        if (res?.statusCode === 201 || res?.statusCode === 200) {
          toast.success("Personal Information Submitted successfully");
          {
            hide === true
              ? updateData()
              : navigate(`/student-form/2`, { state: "passPage" });
          }
          window.scrollTo(0, 0);
        } else {
          toast.info(res?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Something went wrong");
      }
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen]">
      <div className={`${customClass}`}>
        {hide === true ? (
          ""
        ) : (
          <>
            <p className="text-heading font-semibold text-[30px] pt-7">
              Personal Information
            </p>
            <p className="text-secondary font-normal text-[14px]">
              Provide your personal information as indicated on your passport
            </p>
          </>
        )}
        <div
          className={`bg-white rounded-xl ${
            hide === true ? "mt-12" : " px-8 py-6 pb-12 mt-6"
          }`}
        >
          <FileUpload
            label="Upload Profile Picture"
            acceptedFormats={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg", ".jpg"],
            }}
            onFilesUploaded={(files) =>
              handleFileUpload(files, "profilePicture")
            }
            reset={resetProfilePic}
            setReset={setResetProfilePic}
            customClass=" border-dashed text-[14px]"
            value={personalData.personalInformation.profilePicture}
          />
          {errors.passportUpload && (
            <p className="text-red-500 mt-1 text-sm">{errors.passportUpload}</p>
          )}
          {personalData.personalInformation.profilePicture && (
            <div className="relative">
              <ImageComponent
                src={personalData.personalInformation.profilePicture}
                className="w-24 h-24 rounded-xl border border-black mt-6"
              />
              <span
                onClick={() =>
                  deleteFile(
                    personalData.personalInformation.profilePicture,
                    "profilePicture"
                  )
                }
                className="absolute text-primary top-1 left-[70px]  text-[20px] cursor-pointer rounded-md"
              >
                <ImBin />
              </span>
            </div>
          )}
          <SelectComponent
            name="personalInformation.title"
            label="Title"
            options={titleOption}
            value={personalData.personalInformation.title}
            handleChange={handleInput}
          />
          {errors["personalInformation.title"] && (
            <p className="text-red-500 mt-1 text-sm">
              {errors["personalInformation.title"]}
            </p>
          )}
          <span className="flex flex-row gap-6 items-center justify-between w-full">
            <span className="w-[50%]">
              <span className="flex flex-col">
                <span className="text-[14px] text-secondary ">
                  {" "}
                  First Name *
                </span>{" "}
                <CustomInput
                  name="personalInformation.firstName"
                  type="text"
                  className="mt-2 outline-none h-11 rounded-md px-4 font-poppins text-body bg-input"
                  placeHodler="First Name"
                  onChange={handleInput}
                  value={personalData.personalInformation.firstName}
                  errors={errors["personalInformation.firstName"]}
                />
              </span>
            </span>
            <span className="w-[50%]">
              <div className="relative">
                <span className="flex text-secondary items-center gap-2">
                  <span className="text-[14px]">Last Name *</span>
                  <span className="text-[20px] cursor-pointer relative group">
                    <CiCircleInfo />
                    {/* Tooltip */}
                    <span className="absolute hidden group-hover:inline-block bg-gray-200 text-gray-700 text-xs rounded-lg py-2 px-3 w-max left-10 top-[-10px] shadow-lg z-10">
                      If you don't have the last name repeat your first name
                    </span>
                  </span>
                </span>
                <CustomInput
                  name="personalInformation.lastName"
                  type="text"
                  onChange={handleInput}
                  className="mt-2 outline-none h-11 rounded-md px-4 font-poppins text-body bg-input w-full"
                  placeHodler="Last Name"
                  value={personalData.personalInformation.lastName}
                  errors={errors["personalInformation.lastName"]}
                />
              </div>
            </span>
          </span>
          <Register
            imp="*"
            name="personalInformation.dob"
            type="date"
            label="Date of Birth"
            handleInput={handleInput}
            value={personalData.personalInformation.dob}
            errors={errors["personalInformation.dob"]}
          />
          <SelectComponent
            name="personalInformation.gender"
            label="Gender"
            options={genderOption}
            value={personalData.personalInformation.gender}
            handleChange={handleInput}
          />
          {errors["personalInformation.gender"] && (
            <p className="text-red-500 mt-1 text-sm">
              {errors["personalInformation.gender"]}
            </p>
          )}

          <SelectComponent
            name="personalInformation.maritalStatus"
            label="Marital Status"
            options={maritalOption}
            value={personalData.personalInformation.maritalStatus}
            handleChange={handleInput}
          />
          {errors["personalInformation.maritalStatus"] && (
            <p className="text-red-500 mt-1 text-sm">
              {errors["personalInformation.maritalStatus"]}
            </p>
          )}
          <Register
            name="personalInformation.firstLanguage"
            type="text"
            label="First Language"
            handleInput={handleInput}
            value={personalData.personalInformation.firstLanguage}
            errors={errors["personalInformation.firstLanguage"]}
          />
          <Register
            imp="*"
            name="personalInformation.email"
            type="email"
            label="Email Id"
            handleInput={handleInput}
            value={personalData.personalInformation.email}
            errors={errors["personalInformation.email"]}
          />
          <div className="mt-8">
            <PhoneInputComponent
              label="Phone Number"
              phoneData={personalData.personalInformation.phone}
              onPhoneChange={handlePhoneChange}
            />
          </div>
        </div>
        <FormSection
          icon={<BsFillPassportFill />}
          title="Passport Details"
          customClass="mt-8"
        />
        <div className="bg-white rounded-xl px-8 py-4 pb-12 -mt-4 mb-7">
          <FileUpload
            label="Upload Documents"
            acceptedFormats={{
              "application/pdf": [".pdf"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
              "application/msword": [".doc"],
            }}
            reset={resetPassportUpload}
            setReset={setResetPassportUpload}
            onFilesUploaded={(files) =>
              handleFileUpload(files, "passportUpload")
            }
            customClass=" border-dashed"
            value={personalData.passportDetails.passportUpload}
          />
          {errors.passportUpload && (
            <p className="text-red-500 mt-1 text-sm">{errors.passportUpload}</p>
          )}

          {/* Show uploaded documents */}
          {Array.isArray(personalData.passportDetails.passportUpload) &&
            personalData.passportDetails.passportUpload.length > 0 && (
              <div className="mt-4">
                <p className="text-secondary font-semibold">
                  Uploaded Documents:
                </p>
                <ul>
                  {personalData.passportDetails.passportUpload
                    .filter(
                      (url) => typeof url === "string" && url.startsWith("http")
                    )
                    .map((url, index) => (
                      <li key={index} className="flex items-center mt-2">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary rounded-sm px-6 py-2 border border-greyishtext-primary  "
                        >
                          Uploaded Passport
                        </a>
                        <button
                          onClick={() => deleteFile(url, "passportUpload")}
                          className="ml-4 text-red-500 test-[21px]"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}

          <CountrySelect
            name="passportDetails.countryOfCitizenship"
            label="Country of citizenship"
            customClass="bg-input"
            options={countryOption}
            value={personalData.passportDetails.countryOfCitizenship}
            handleChange={handleInput}
          />
          {errors["passportDetails.countryOfCitizenship"] && (
            <p className="text-red-500 mt-1 text-sm">
              {errors["passportDetails.countryOfCitizenship"]}
            </p>
          )}
          <Register
            imp="*"
            name="passportDetails.passportNumber"
            type="text"
            label="Passport Number"
            handleInput={handleInput}
            value={personalData.passportDetails.passportNumber}
            errors={errors["passportDetails.passportNumber"]}
          />
          <Register
            imp="*"
            name="passportDetails.expireDate"
            type="date"
            label="Passport Expiry Date"
            handleInput={handleInput}
            value={personalData.passportDetails.expireDate}
            errors={errors["passportDetails.expireDate"]}
          />
        </div>
        {hide === true ? (
          <div className="flex justify-end mt-9 gap-4 ">
            <button
              className="border border-greyish text-black px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white px-6 py-2 rounded"
              onClick={() => {
                handleSubmit();
                handleCancel();
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className=" bg-primary mb-20 mt-6 text-white cursor-pointer px-6 py-2 rounded-md"
            >
              Submit and Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form1;
