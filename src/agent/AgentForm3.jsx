import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formThreeSubmit } from "../features/agentApi";
import { useDispatch, useSelector } from "react-redux";
import Register from "../components/reusable/Register";
import {
  CountrySelect,
  FormNavigationButtons,
} from "../components/reusable/Input";
import { useNavigate } from "react-router-dom";
import { agentInformation } from "../features/agentSlice";

const AgentForm3 = ({hide, handleCancel, updateData}) => {
  const { countryOption } = useSelector((state) => state.general);
  const { agentData } = useSelector((state) => state.agent);
  const getData = agentData?.bankDetails;
  const [bankData, setBankData] = useState({
    bankName: "",
    branchName: "",
    country: "",
    provinceState: "",
    address: "",
    city: "",
    postalCode: "",
    swiftBicCode: "",
    sortCode: "",
    bankAccountName: "",
    intermediarySwiftCode: "",
    bankAccountNumber: "",
    iban: "",
  });
  const editForm = hide === true ? "edit":null;

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(agentInformation());
  }, [dispatch]);
  const validateFields = () => {
    const newErrors = {};
    if (!bankData.bankName) newErrors.bankName = "Bank Name is required";
    if (!bankData.branchName) newErrors.branchName = "Branch Name is required";
    if (!bankData.country) newErrors.country = "Country is required";
    if (!bankData.provinceState)
      newErrors.provinceState = "State/Province is required";
    if (!bankData.address) newErrors.address = "Address is required";
    if (!bankData.city) newErrors.city = "City is required";
    if (!bankData.postalCode)
      newErrors.postalCode = "Zip/Postal Code is required";
    if (!bankData.swiftBicCode)
      newErrors.swiftBicCode = "Swift/BIC Code is required";
    if (!bankData.sortCode) newErrors.sortCode = "Sort Code is required";
    if (!bankData.bankAccountName)
      newErrors.bankAccountName = "Bank Account Name is required";
    if (!bankData.bankAccountNumber)
      newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!bankData.iban) newErrors.iban = "IBAN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBankData({ ...bankData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  //getData
  useEffect(() => {
    if (getData) {
      setBankData(getData);
    }
  }, [getData]);

  // Handle form submission
  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const res = await formThreeSubmit(bankData, editForm);
      
        toast.success(res?.message || "Data added successfully");
        {hide === true ?   updateData() : 
        navigate("/agent-form/4", { state: "passPage" })}
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen font-poppins">
  <div className={`${hide === true? "" : "md:mx-48 sm:mx-10"}`}>
      {hide === true ? "" : <>
        <p className="text-heading font-semibold text-[25px] pt-7">
          Bank Details
        </p></>}
        <div
          className={`bg-white rounded-xl ${
            hide === true ? "" : "px-8"
          } py-4 pb-12 mt-6`}
        >
          <div className="flex items-center justify-between gap-6 w-full">
            <span className="w-[50%]">
              <Register
                imp="*"
                name="bankName"
                type="text"
                label="Bank Name"
                handleInput={handleInput}
                value={bankData.bankName}
                errors={errors.bankName}
              />
              <CountrySelect
                name="country"
                label="Country"
                customClass="bg-input"

                options={countryOption}
                value={bankData.country}
                handleChange={(e) =>
                  handleInput({
                    target: { name: "country", value: e.target.value },
                  })
                }
                errors={errors.country}
              />
            </span>
            <span className="w-[50%]">
              <Register
                imp="*"
                name="branchName"
                type="text"
                label="Branch Name"
                handleInput={handleInput}
                value={bankData.branchName}
                errors={errors.branchName}
              />
              <Register
                imp="*"
                name="provinceState"
                type="text"
                label="Province/State"
                handleInput={handleInput}
                value={bankData.provinceState}
                errors={errors.provinceState}
              />
            </span>
          </div>

          <Register
            imp="*"
            name="address"
            type="text"
            label="Address"
            handleInput={handleInput}
            value={bankData.address}
            errors={errors.address}
            className=" py-2 "
          />

          <div className="flex items-center justify-between gap-6 w-full">
            <span className="w-[50%]">
              <Register
                imp="*"
                name="city"
                type="text"
                label="City"
                handleInput={handleInput}
                value={bankData.city}
                errors={errors.city}
              />
              <Register
                imp="*"
                name="swiftBicCode"
                type="text"
                label="Swift/BIC Code"
                handleInput={handleInput}
                value={bankData.swiftBicCode}
                errors={errors.swiftBicCode}
              />
              <Register
                imp="*"
                name="bankAccountName"
                type="text"
                label="Bank Account Name"
                handleInput={handleInput}
                value={bankData.bankAccountName}
                errors={errors.bankAccountName}
              />
              <Register
                imp="*"
                name="iban"
                type="text"
                label="IBAN"
                handleInput={handleInput}
                value={bankData.iban}
                errors={errors.iban}
              />
            </span>
            <span className="w-[50%]">
              <Register
                imp="*"
                name="postalCode"
                type="number"
                label="Zip/Postal Code"
                handleInput={handleInput}
                value={bankData.postalCode}
                errors={errors.postalCode}
              />
              <Register
                imp="*"
                name="sortCode"
                type="text"
                label="Sort Code/BSB Number"
                handleInput={handleInput}
                value={bankData.sortCode}
                errors={errors.sortCode}
              />
              <Register
                imp="*"
                name="bankAccountNumber"
                type="text"
                label="Bank Account Number"
                handleInput={handleInput}
                value={bankData.bankAccountNumber}
                errors={errors.bankAccountNumber}
              />
              <Register
                name="intermediarySwiftCode"
                type="text"
                label="Intermediary Swift Code"
                handleInput={handleInput}
                value={bankData.intermediarySwiftCode}
                errors={errors.intermediarySwiftCode}
              />
            </span>
          </div>
        </div>
        {hide === true ?
        <div className="flex justify-end mt-9 gap-4 ">
            <button
              className="border border-greyish text-black px-4 py-2 rounded"
              onClick={() => handleCancel("isThree")}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white px-6 py-2 rounded"
              onClick={() => {
                handleSubmit();
                handleCancel("isThree");
              }}
            >
              Save
            </button> 
            </div> :  
        <FormNavigationButtons
          backLink="/agent-form/2"
          backText="Back"
          buttonText="Submit and Continue"
          handleButtonClick={handleSubmit}
        />}
      </div>
    </div>
  );
};

export default AgentForm3;
