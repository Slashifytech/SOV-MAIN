import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../utils/fireBase";
import { toast } from "react-toastify";
import OfferLetterPop from "../OfferLetterPop";
import { FiUpload } from "react-icons/fi";
import { TbPencilMinus } from "react-icons/tb";
import { FaFileUpload, FaRegEye } from "react-icons/fa";
import { OfferLetterCertificate } from "../../../features/generalApi";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

const CertificateEdit = ({ appId, updatedData, profileViewPath }) => {
  const [offerLater, setOfferLater] = useState({
    certificate: { url: [] },
  });
  const [isPopUp, setIsPopUp] = useState(false);
  const [isFileType, seFileType] = useState();

  const [errors, setErrors] = useState({});
  const [isOne, setIsOne] = useState(false);
  const { applicationDataById } = useSelector((state) => state.agent);

  const [resetDoc, setResetDoc] = useState(false);
  const PopUpOpen = () => {
    setResetDoc(false);
    setIsPopUp(true);
  };
  const PopUpClose = () => {
    setIsPopUp(false);
  };
  const handleOneToggle = () => {
    setIsOne((prev) => !prev); // Toggle the form visibility
  };

  const handleCancelOne = () => {
    setIsOne(false);
  };
  const handleFilePopupOpen = (fileType) => {
    seFileType(fileType);
    PopUpOpen();
  };

  const handleFileUpload = async (files, uploadType) => {
    if (!files || files.length === 0) return;

    let uploadedUrls = [];

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
    if (uploadType === "certificate" && uploadedUrls.length > 0) {
      setOfferLater((prevData) => ({
        ...prevData,
        certificate: {
          url: [
            ...(prevData.certificate.url || []), // Spread existing URLs
            ...uploadedUrls, // Append the newly uploaded URLs
          ].filter((url) => url !== null), // Filter out null values
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

      if (uploadType === "certificate") {
        setOfferLater((prevData) => ({
          ...prevData,
          certificate: {
            url: prevData.certificate.url.filter((url) => url !== fileUrl), // Remove the deleted file URL
          },
        }));
      }
    } catch (error) {
      toast.error("Error deleting file. Please try again.");
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (applicationDataById) {
      setOfferLater({
        certificate: {
          url: applicationDataById?.certificate?.url || "",
        },
      });
    }
  }, [applicationDataById]);
  const validateFields = () => {
    const errors = {};

    if (!offerLater.certificate.url.length) {
      errors.certificate = "Certificate file is required.";
    }

    return errors;
  };
  const handleSubmit = async () => {
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = {
          certificates: offerLater.certificate.url, // Use the URLs directly
        };
        const section = "offerLetter";
        
        const res = await OfferLetterCertificate(appId, payload, section);
        toast.success(res?.message || "Data added successfully");
        updatedData();
        handleCancelOne();
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    } else {
      setErrors(validationErrors);
      toast.error("Please resolve the errors before submitting.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-md px-6 py-4 font-poppins mb-20 ">
        <div className="flex flex-row text-sidebar items-center justify-between border-b border-greyish">
          <span className="flex flex-row gap-4 items-center pb-3">
            <span className="text-[24px]">
              <FaFileUpload />
            </span>
            <span className="font-semibold text-[22px]">
              Certificate Details
            </span>
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
          <span className="w-1/2 flex flex-col text-[15px]">
            <span className="font-light">IELTS/PTE/TOEFL/Certificate*</span>
            <span className="font-medium mt-2">
              {applicationDataById?.certificate?.url?.map((url, index) => (
                
                <a
                  className="flex items-center gap-3 text-primary font-medium"
                  href={
                  url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                      Uploaded Document {index + 1 || "NA"}
                  <span>
                    <FaRegEye />
                  </span>
                </a>
              ))}
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
          <div className="bg-white rounded-xl  py-4 pb-12 mt-6">
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-body rounded-md py-9 mt-9 mb-4">
              <button
                className="text-black flex items-center"
                onClick={() => handleFilePopupOpen("certificate")}
              >
                <FiUpload className="mr-2 text-primary text-[29px]" />
              </button>
              <p>Upload Certificates</p>
            </div>

            {Array.isArray(offerLater.certificate.url) &&
              offerLater.certificate.url?.length > 0 && (
                <div className="mt-4">
                  <p className="text-secondary font-semibold">
                    Uploaded Documents:
                  </p>
                  <ul>
                    {offerLater.certificate?.url
                      .filter(
                        (url) =>
                          typeof url === "string" && url.startsWith("http")
                      )
                      .map((url, index) => (
                        <li key={index} className="flex items-center mt-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary rounded-sm px-6 py-2 border border-greyish"
                          >
                            Uploaded Document
                          </a>
                          <button
                            onClick={() => deleteFile(url, "certificate")}
                            className="ml-4 text-red-500 text-[21px]"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
          </div>

          {isOne && (
            <div className="flex justify-end  gap-4">
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
        <OfferLetterPop
          isPopUp={isPopUp}
          docLabel="Upload Marksheet"
          resetDoc={resetDoc}
          PopUpClose={PopUpClose}
          setResetDoc={setResetDoc}
          handleFileUpload={(files) => handleFileUpload(files, isFileType)}
          // handleDeleteFile={(fileUrl) => deleteFile(fileUrl, isFileType)}
          errors={errors}
          onSubmit={() => {
            console.log("Form Submitted");
          }}
        />
      </div>
    </>
  );
};

export default CertificateEdit;
