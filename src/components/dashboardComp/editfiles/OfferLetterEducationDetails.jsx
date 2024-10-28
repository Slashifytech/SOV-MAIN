// import React, { useState } from "react";
// import { TbPencilMinus } from "react-icons/tb";
// import { GiGraduateCap } from "react-icons/gi";
// import { CustomInput } from "../../reusable/Input";
// import OfferLetterPop from "../OfferLetterPop";
// import { OfferLetterEduInfoEdit } from "../../../features/generalApi";
// import { useSelector } from "react-redux";
// import { FiUpload } from "react-icons/fi";
// import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../../../utils/fireBase";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";
// const educationLevels = {
//   diploma: ["markSheet10"],
//   underGraduate: ["markSheet10", "markSheet12"],
//   postGraduate: ["markSheet10", "markSheet12", "markSheetUnderGraduate"],
//   diplomaPG: [
//     "markSheet10",
//     "markSheet12",
//     "markSheetUnderGraduate",
//     "markSheetPostGraduate",
//   ],
//   certificationCourse: [
//     "markSheet10",
//     "markSheet12",
//     "markSheetUnderGraduate",
//     "markSheetPostGraduate",
//   ],
// };

// const initialEducationDetails = {
//   educationLevel: "",
//   markSheet10: "",
//   markSheet12: "",
//   markSheetUnderGraduate: "",
//   markSheetPostGraduate: "",
// };
// const OfferLetterEducationDetails = ({ appId }) => {
//   const [offerLater, setOfferLater] = useState({
//     educationDetails: { ...initialEducationDetails },
//   });
//   const [isPopUp, setIsPopUp] = useState(false);
//   const [resetDoc, setResetDoc] = useState(false);
//   const [selectedEducation, setSelectedEducation] = useState("");
//   const [isOne, setIsOne] = useState(false);
//   const [errors, setErrors] = useState({});
//   const { applicationDataById } = useSelector((state) => state.agent);
//   const [isFileType, seFileType] = useState();

//   const PopUpOpen = () => {
//     setResetDoc(false);
//     setIsPopUp(true);
//   };
//   const PopUpClose = () => {
//     setIsPopUp(false);
//   };
//   const handleOneToggle = () => {
//     setIsOne((prev) => !prev);
//   };
//   const handleCancelOne = () => {
//     setIsOne(false);
//   };

//   const handleInput = (e, sectionType) => {
//     const { name, value, type } = e.target;

//     // Split the name by dots (e.g., personalInformation.address.street)
//     const nameParts = name.split(".");

//     // Check if the input type is 'radio' to handle education level
//     if (type === "radio") {
//       setSelectedEducation(value);
//       setOfferLater((prevState) => ({
//         ...prevState,
//         educationDetails: {
//           ...initialEducationDetails,
//           educationLevel: value, // Update education level in the state
//         },
//       }));
//       return;
//     }

//     // Update nested object fields
//     setOfferLater((prevState) => ({
//       ...prevState,
//       educationDetails: {
//         ...prevState.educationDetails,
//         [name]: value,
//       },
//     }));
//   };
//   const handleFilePopupOpen = (fileType) => {
//     seFileType(fileType);
//     PopUpOpen();
//   };
//   const handleFileUpload = async (files, uploadType) => {
//     if (!files || files.length === 0) return;

//     let uploadedUrls = [];

//     for (const file of files) {
//       const storageRef = ref(storage, `uploads/${file.name}`);

//       try {
//         const snapshot = await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(snapshot.ref);
//         uploadedUrls.push(downloadURL);
//         toast.success(`${file.name} uploaded successfully!`);
//       } catch (error) {
//         toast.error(`Error uploading ${file.name}. Please try again.`);
//       }
//     }

//     if (uploadedUrls.length > 0) {
//       const updatedEducationDetails = { ...offerLater.educationDetails };

//       switch (uploadType) {
//         case "markSheet10":
//           updatedEducationDetails.markSheet10 = uploadedUrls[0];
//           break;
//         case "markSheet12":
//           updatedEducationDetails.markSheet12 = uploadedUrls[0];
//           break;
//         case "markSheetUnderGraduate":
//           updatedEducationDetails.markSheetUnderGraduate = uploadedUrls[0];
//           break;
//         case "markSheetPostGraduate":
//           updatedEducationDetails.markSheetPostGraduate = uploadedUrls[0];
//           break;
//         default:
//           updatedEducationDetails.certificationCourse = uploadedUrls;
//           break;
//       }

//       setOfferLater((prevData) => ({
//         ...prevData,
//         educationDetails: updatedEducationDetails,
//       }));
//     }
//   };

//   const deleteFile = async (fileUrl, uploadType) => {
//     if (!fileUrl) return;

//     const storageRef = ref(storage, fileUrl);

//     try {
//       await deleteObject(storageRef);
//       toast.success("File deleted successfully!");

//       setOfferLater((prevData) => ({
//         ...prevData,
//         educationDetails: {
//           ...prevData.educationDetails,
//           [uploadType]: "",
//         },
//       }));
//     } catch (error) {
//       toast.error("Error deleting file. Please try again.");
//     }
//   };

//  // Validation logic
//  const validateFields = () => {
//   const errors = {};

//   // Validate if an education level is selected
//   if (!selectedEducation) {
//     errors.educationLevel = "Please select an education level.";
//   }

//   // Validate required documents for selected education level
//   if (selectedEducation) {
//     const requiredDocs = educationLevels[selectedEducation];
//     const uploadedDocs = offerLater.educationDetails[selectedEducation];

//     requiredDocs.forEach((doc, index) => {
//       if (!uploadedDocs[index]) {
//         errors[`${selectedEducation}_doc_${index}`] = `Please upload ${doc}.`;
//       }
//     });
//   }

//   return errors;
// };

//   const handleSubmit = async () => {
//     const validationErrors = validateFields();

//     if (Object.keys(validationErrors).length === 0) {
//       console.log("Form is valid");
//     } else {
//       setErrors(validationErrors);
//       toast.error("Form contains errors");
//       console.log("Form has errors", validationErrors);
//     }
//     try {
//       const updatedOfferLater = {
//         ...offerLater,

//         educationDetails: {
//           educationLevel: selectedEducation,
//           markSheet10: offerLater.educationDetails.markSheet10,
//           markSheet12: offerLater.educationDetails.markSheet12,
//           markSheetUnderGraduate: offerLater.educationDetails.markSheetUnderGraduate,
//           markSheetPostGraduate: offerLater.educationDetails.markSheetPostGraduate,
//         },

//       };

//       const section = "offerLetter";
//       const res = await OfferLetterEduInfoEdit(appId, updatedOfferLater, section);
//       toast.success(res.message || "Data Added successfully");
//       handleCancelOne();
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white rounded-md px-6 py-4 font-poppins ">
//         <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
//           <span className="flex flex-row gap-4 items-center pb-3">
//             <span className="text-[24px]">
//               <GiGraduateCap />
//             </span>
//             <span className="font-semibold text-[22px]">
//             Education Details
//             </span>
//           </span>
//           {!isOne && (
//             <span
//               className="text-[24px] cursor-pointer transition-opacity duration-300 ease-in-out"
//               onClick={handleOneToggle}
//               style={{ opacity: isOne ? 0 : 1 }}
//             >
//               <TbPencilMinus />
//             </span>
//           )}
//         </div>
//         <div className="flex flex-row w-full justify-between mt-6">
//           <span className="w-1/2 flex flex-col text-[15px]">
//             <span className="font-light">Level of Education </span>
//             <span className="font-medium">
//               {applicationDataById?.educationDetails?.educationLevel || "NA"}
//             </span>
//           </span>
//           <span className="w-1/2 flex flex-col text-[15px]">
//             <span className="font-light mt-4">10th Marksheet</span>
//             <span className="font-medium">
//               {applicationDataById?.educationDetails?.address || "NA"}
//             </span>
//           </span>
//         </div>
//         <div
//           className={`transition-all duration-500 ease-in-out transform ${
//             isOne
//               ? "min-h-[50vh] translate-y-0 opacity-100"
//               : "max-h-0 -translate-y-10 opacity-0 overflow-hidden"
//           }`}
//         >
//           {isOne && (
//             <div className="bg-white  rounded-xl  py-4 pb-12 mt-6">

//               <div className="grid grid-cols-3 mt-4 text-body">
//                 <span className="flex items-center gap-4 border  border-[#CFCFD7] rounded-md py-3 w-64 justify-evenly ">
//                   Diploma
//                   <CustomInput
//                     type="radio"
//                     label="Diploma"
//                     value="diploma"
//                     name="educationLevel"
//                     onChange={handleInput}
//                     checked={selectedEducation === "diploma"}
//                   />
//                 </span>
//                 <span className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-64 justify-evenly ">
//                   Under Graduate
//                   <CustomInput
//                     type="radio"
//                     label="Under Graduate"
//                     value="underGraduate"
//                     name="educationLevel"
//                     onChange={handleInput}
//                     checked={selectedEducation === "underGraduate"}
//                   />
//                 </span>
//                 <span className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-64 justify-evenly ">
//                   Post Graduate
//                   <CustomInput
//                     type="radio"
//                     label="Post Graduate"
//                     value="postGraduate"
//                     name="educationLevel"
//                     onChange={handleInput}
//                     checked={selectedEducation === "postGraduate"}
//                   />
//                 </span>
//               </div>
//               <div className="flex flex-row gap-12 mt-6 text-body">
//                 <span className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-72 justify-evenly ">
//                   Post Graduate Diploma
//                   <CustomInput
//                     type="radio"
//                     label="Diploma PG"
//                     value="diplomaPG"
//                     name="educationLevel"
//                     onChange={handleInput}
//                     checked={selectedEducation === "diplomaPG"}
//                   />
//                 </span>
//                 <span className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-72 justify-evenly ">
//                   Certificate Course
//                   <CustomInput
//                     type="radio"
//                     label="Certification Course"
//                     value="certificationCourse"
//                     name="educationLevel"
//                     onChange={handleInput}
//                     checked={selectedEducation === "certificationCourse"}
//                   />
//                 </span>
//               </div>

//               {selectedEducation && (
//                 <div className="mt-6">
//                   {educationLevels[selectedEducation].map((fileType) => (
//                     <div
//                       key={fileType}
//                       className="flex flex-col justify-center items-center border-2 border-dashed border-body rounded-md py-9 mt-9 mb-4"
//                     >
//                       <button
//                         className="text-black flex items-center"
//                         onClick={() => handleFilePopupOpen("markSheet")}
//                       >
//                         <FiUpload className="mr-2 text-primary text-[29px]" />
//                       </button>
//                       <p>{fileType}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {Array.isArray(offerLater.educationDetails[selectedEducation]) &&
//                 offerLater.educationDetails[selectedEducation].length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-secondary font-semibold">
//                       Uploaded Documents:
//                     </p>
//                     <ul>
//                       {offerLater.educationDetails[selectedEducation]
//                         .filter(
//                           (url) =>
//                             typeof url === "string" && url.startsWith("http")
//                         )
//                         .map((url, index) => (
//                           <li key={index} className="flex items-center mt-2">
//                             <a
//                               href={url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-primary rounded-sm px-6 py-2 border border-greyish"
//                             >
//                               Uploaded Document
//                             </a>
//                             <button
//                               onClick={() => deleteFile(url, "markSheet")}
//                               className="ml-4 text-red-500 text-[21px]"
//                             >
//                             <RiDeleteBin6Line/>
//                             </button>
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 )}
//             </div>
//           )}
//         </div>
//         {isOne && (
//           <div className="flex justify-end  gap-4">
//             <button
//               className="border border-greyish text-black px-4 py-2 rounded"
//               onClick={handleCancelOne}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-primary text-white px-6 py-2 rounded"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </div>
//       <OfferLetterPop
//         isPopUp={isPopUp}
//         docLabel="Upload Marksheet"
//         resetDoc={resetDoc}
//         PopUpClose={PopUpClose}
//         setResetDoc={setResetDoc}
//         handleFileUpload={(files) => handleFileUpload(files, isFileType)}
//         uploadedFiles={offerLater.educationDetails[selectedEducation]}
//         // handleDeleteFile={(fileUrl) => deleteFile(fileUrl, isFileType)}
//         errors={errors}
//         onSubmit={() => {
//           console.log("Form Submitted");
//         }}
//       />
//     </>
//   );
// };

// export default OfferLetterEducationDetails;

import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { CustomInput } from "../../reusable/Input";
import OfferLetterPop from "../OfferLetterPop";
import { OfferLetterEduInfoEdit } from "../../../features/generalApi";
import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../utils/fireBase";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPencilMinus } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";

// Define required marksheets for each education level
const educationLevels = {
  diploma: ["markSheet10"],
  underGraduate: ["markSheet10", "markSheet12"],
  postGraduate: ["markSheet10", "markSheet12", "markSheetUnderGraduate"],
  diplomaPG: [
    "markSheet10",
    "markSheet12",
    "markSheetUnderGraduate",
    "markSheetPostGraduate",
  ],
  certificationCourse: [
    "markSheet10",
    "markSheet12",
    "markSheetUnderGraduate",
    "markSheetPostGraduate",
  ],
};

const initialEducationDetails = {
  educationLevel: "",
  markSheet10: "",
  markSheet12: "",
  markSheetUnderGraduate: "",
  markSheetPostGraduate: "",
};

const OfferLetterEducationDetails = ({ appId, updatedData, profileViewPath }) => {
  const [offerLater, setOfferLater] = useState({
    educationDetails: { ...initialEducationDetails },
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState("");
  const [isFileType, seFileType] = useState();
  const [isOne, setIsOne] = useState(false);
  const [errors, setErrors] = useState({});
  const { applicationDataById } = useSelector((state) => state.agent);
  const [resetDoc, setResetDoc] = useState(false);

  const PopUpOpen = () => setIsPopUp(true);
  const PopUpClose = () => setIsPopUp(false);
  const handleOneToggle = () => {
    setIsOne((prev) => !prev);
  };
  const handleCancelOne = () => {
    setIsOne(false);
  };

  const handleInput = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSelectedEducation(value);
      setOfferLater({
        ...offerLater,
        educationDetails: { ...initialEducationDetails, educationLevel: value },
      });
    }
  };

  const handleFilePopupOpen = (fileType) => {
    seFileType(fileType);
    PopUpOpen();
  };

  const handleFileUpload = async (files, uploadType) => {
    if (!files || files.length === 0) return;

    const uploadedUrls = [];

    for (const file of files) {
      const storageRef = ref(storage, `uploads/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadURL);
        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        toast.error(`Error uploading ${file.name}. Please try again.`);
      }
    }

    // If a file is uploaded successfully, update the correct state field based on `uploadType`
    if (uploadedUrls.length > 0) {
      setOfferLater((prevState) => ({
        ...prevState,
        educationDetails: {
          ...prevState.educationDetails,
          [uploadType]: uploadedUrls[0],
        },
      }));
    }
  };

  const deleteFile = async (fileUrl, uploadType) => {
    if (!fileUrl) return;

    const storageRef = ref(storage, fileUrl);

    try {
      await deleteObject(storageRef);
      toast.success("File deleted successfully!");

      // Clear the respective field in the state when a file is deleted
      setOfferLater((prevState) => ({
        ...prevState,
        educationDetails: {
          ...prevState.educationDetails,
          [uploadType]: "",
        },
      }));
    } catch (error) {
      toast.error("Error deleting file. Please try again.");
    }
  };

  const validateFields = () => {
    const errors = {};

    if (!selectedEducation) {
      errors.educationLevel = "Please select an education level.";
    }

    const requiredDocs = educationLevels[selectedEducation] || [];
    requiredDocs.forEach((doc) => {
      if (!offerLater.educationDetails[doc]) {
        errors[doc] = `Please upload ${doc.replace("markSheet", "Marksheet")}.`;
      }
    });

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Form contains errors.");
      return;
    }

    try {
      const updatedOfferLater = {
        ...offerLater,
        educationDetails: {
          educationLevel: selectedEducation,
          markSheet10: offerLater.educationDetails.markSheet10,
          markSheet12: offerLater.educationDetails.markSheet12,
          markSheetUnderGraduate:
            offerLater.educationDetails.markSheetUnderGraduate,
          markSheetPostGraduate:
            offerLater.educationDetails.markSheetPostGraduate,
        },
      };

      const section = "offerLetter";
      const res = await OfferLetterEduInfoEdit(
        appId,
        updatedOfferLater,
        section
      );
      updatedData();
      toast.success(res.message || "Data added successfully.");
      handleCancelOne();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    if (applicationDataById?.educationDetails) {
      setOfferLater((prevState) => ({
        ...prevState,
        educationDetails: {
          educationLevel:
            applicationDataById.educationDetails.educationLevel || "",
          markSheet10: applicationDataById.educationDetails.markSheet10 || "",
          markSheet12: applicationDataById.educationDetails.markSheet12 || "",
          markSheetUnderGraduate:
            applicationDataById.educationDetails.markSheetUnderGraduate || "",
          markSheetPostGraduate:
            applicationDataById.educationDetails.markSheetPostGraduate || "",
        },
      }));

      setSelectedEducation(
        applicationDataById.educationDetails.educationLevel || ""
      );
    }
  }, [applicationDataById]);
  const educationLevelLabels = {
    diploma: "Diploma",
    underGraduate: "Under Graduate",
    postGraduate: "Post Graduate",
    diplomaPG: "Diploma (PG)",
    certificationCourse: "Certification Course",
  };
  return (
    <>
      <div className="bg-white rounded-md px-6 py-4 font-poppins ">
        <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
          <span className="flex flex-row gap-4 items-center pb-3">
            <span className="text-[24px]">
              <GiGraduateCap />
            </span>
            <span className="font-semibold text-[22px]">Education Details</span>
          </span>
          {profileViewPath === "/admin/applications-review"
            ? ""
            : !isOne && (
                <span
                  className="text-[24px] cursor-pointer transition-opacity duration-300 ease-in-out"
                  onClick={handleOneToggle}
                  style={{ opacity: isOne ? 0 : 1 }}
                >
                  <TbPencilMinus />
                </span>
              )}
        </div>

        <div className="flex flex-row w-full justify-between mt-6">
          <span className="w-full flex flex-row  text-[15px] justify-between">
            <span className="w-1/2 ">
              <span className="flex flex-col ">
                {" "}
                <span className="font-light">Level of Education</span>
                <span className="font-medium ">
                  {educationLevelLabels[
                    applicationDataById?.educationDetails?.educationLevel
                  ] || "NA"}
                </span>
              </span>

              <span className="flex flex-col ">
                <span className="font-light mt-4">10th Marksheet</span>

                <a
                  className="flex items-center gap-3 text-primary font-medium"
                  href={
                    applicationDataById?.educationDetails?.markSheet10 || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {applicationDataById?.educationDetails?.markSheet10
                    ? "Uploaded"
                    : "NA"}
                  <span>
                    <FaRegEye />
                  </span>
                </a>
              </span>

              {applicationDataById?.educationDetails?.markSheet12 && (
                <>
                  <span className="font-light mt-4">12th Marksheet</span>
                  <a
                    className="flex items-center gap-3 text-primary font-medium"
                    href={applicationDataById?.educationDetails?.markSheet12}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {applicationDataById?.educationDetails?.markSheet12
                      ? "Uploaded"
                      : "NA"}
                    <span>
                      <FaRegEye />
                    </span>
                  </a>
                </>
              )}
            </span>
            <span className="w-1/2">
              {applicationDataById?.educationDetails
                ?.markSheetUnderGraduate && (
                <>
                  <span className="font-light mt-4">Under Graduate</span>
                  <a
                    className="flex items-center gap-3 text-primary font-medium"
                    href={
                      applicationDataById?.educationDetails
                        ?.markSheetUnderGraduate
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {applicationDataById?.educationDetails
                      ?.markSheetUnderGraduate
                      ? "Uploaded"
                      : "NA"}
                    <span>
                      <FaRegEye />
                    </span>
                  </a>
                </>
              )}

              {applicationDataById?.educationDetails?.markSheetPostGraduate && (
                <>
                  <span className="font-light mt-4">Post Graduate</span>
                  <a
                    className="flex items-center gap-3 text-primary font-medium"
                    href={
                      applicationDataById?.educationDetails
                        ?.markSheetPostGraduate
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {applicationDataById?.educationDetails
                      ?.markSheetPostGraduate
                      ? "Uploaded"
                      : "NA"}
                    <span>
                      <FaRegEye />
                    </span>
                  </a>
                </>
              )}
            </span>
          </span>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isOne
              ? "min-h-[50vh] translate-y-0 opacity-100"
              : "max-h-0 -translate-y-10 opacity-0 overflow-hidden"
          }`}
        >
          {isOne && (
            <div className="bg-white  rounded-xl  py-4 pb-12 mt-6">
              {/* Education Level Selection */}
              <div className="flex flex-wrap mt-4 gap-6 text-body">
                {Object.keys(educationLevels).map((level) => (
                  <span
                    key={level}
                    className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-64 justify-evenly"
                  >
                    {educationLevelLabels[level] ||
                      level.replace(/([A-Z])/g, " $1")}{" "}
                    {/* Convert camelCase to readable format */}
                    <CustomInput
                      type="radio"
                      label={level}
                      value={level}
                      name="educationLevel"
                      onChange={handleInput}
                      checked={selectedEducation === level}
                    />
                  </span>
                ))}
              </div>

              {/* File Upload Section */}
              {selectedEducation && (
                <div className="mt-6">
                  {educationLevels[selectedEducation].map((fileType) => (
                    <div
                      key={fileType}
                      className="flex flex-col justify-center items-center border-2 border-dashed border-body rounded-md py-9 mt-9 mb-4"
                    >
                      <button
                        className="text-black flex items-center"
                        onClick={() => handleFilePopupOpen(fileType)}
                      >
                        <FiUpload className="mr-2 text-primary text-[29px]" />
                      </button>
                      <p className="mt-6">
                        {fileType.replace("markSheet", "Marksheet ")}
                      </p>

                      {/* Display uploaded file */}
                      {offerLater.educationDetails[fileType] && (
                        <div className="mt-4 flex items-center">
                          <a
                            href={offerLater.educationDetails[fileType]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary rounded-sm px-6 py-2 border border-greyish"
                          >
                            View Uploaded Document
                          </a>
                          <button
                            onClick={() =>
                              deleteFile(
                                offerLater.educationDetails[fileType],
                                fileType
                              )
                            }
                            className="ml-4 text-red-500 text-[21px]"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Error Display */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-6">
                  {Object.values(errors).map((error, index) => (
                    <p key={index} className="text-red-500">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              {/* Save Button */}
              {isOne && (
                <div className="flex justify-end gap-4 mt-20">
                  <button
                    className="border border-greyish text-black px-4 py-2 rounded"
                    onClick={handleCancelOne}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-white px-6 py-2 rounded"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <OfferLetterPop
        isPopUp={isPopUp}
        docLabel="Upload Marksheet"
        PopUpClose={PopUpClose}
        setResetDoc={setResetDoc}
        handleFileUpload={(files) => handleFileUpload(files, isFileType)}
        onSubmit={() => {
          console.log("Form Submitted");
        }}
      />
    </>
  );
};

export default OfferLetterEducationDetails;
