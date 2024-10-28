import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { toast } from "react-toastify";
import {
  changeApprovalStatus,
  chngeApplicationStatus,
} from "../../features/adminApi";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTabType } from "../../features/adminSlice";
import { DataNotFound } from "../Dnf";

const Pending = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [approvalUpdated, setApprovalUpdated] = useState(false);
  const [applicationUpdated, setApplicationUpdated] = useState(false);
  const fetchStatus =
    location.pathname === "/admin/applications-review"
      ? "underreview"
      : "notapproved";
  const handleApprovalUpdate = () => {
    setApprovalUpdated((prev) => !prev);
  };
  const handleApplicationUpdate = () => {
    setApplicationUpdated((prev) => !prev);
  };

  useEffect(() => {
    dispatch(setTabType(fetchStatus));
  }, [dispatch, applicationUpdated, approvalUpdated, location.pathname]);

  const updateStatus = async (id, status, type, message) => {
    try {
      const res = await changeApprovalStatus(id, status, type, message);
      handleApprovalUpdate();
      
      toast.success(res.message || "Approval Status Updated");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  const applicationStatus = async (id, status, type, message) => {
    try {
      const res = await chngeApplicationStatus(id, status, type, message);
      handleApplicationUpdate();
      toast.success(res.message || "Approval Status Updated");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const applications = data?.applications;

  return (
    <div className="mt-4">
      {location.pathname === "/admin/applications-review" ? (
        applications?.length > 0 ? (
          applications.map((application, index) => (
            <div key={index}>
              <AdminCard
                apId={application?.applicationId}
                isApproval={false}
                updateStatus={applicationStatus}
                newStatus="approved"
                linkTwo="/application-view"
                name={application.fullName}
                userId={application?.customUserId}
                applicationType={application?.type}
                description={
                  application?.customUserId?.startsWith("AG-")
                    ? `${application?.agentName} has filled ${application?.type} for his/her student ${application?.fullName}`
                    : application?.customUserId?.startsWith("ST-")
                    ? `${application?.fullName} has filled ${application?.type}`
                    : "Unknown type"
                }
                userType={
                  application?.customUserId?.startsWith("AG-")
                    ? "Agent"
                    : "Student"
                }
                id={application?.institutionId}
                sectionData={application?.type}
              pageType="application"

              />
            </div>
          ))
        ) : (
          <DataNotFound
            className="flex flex-col items-center mt-16"
            message="No Data Available"
            linkText="Back to Dashboard"
            linkDestination="/admin/dashboard"
          />
        )
      ) : data?.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <AdminCard
              userType={item?.type === "agent" ? "Agent" : "Student"}
              userId={item?.agId ? item?.agId : item?.stId}
              isApproval={true}
              updateStatus={updateStatus}
              newStatus="completed"
              id={item?._id}
              linkTwo="/agent-profile"
              linkOne="/student-profile"
              rejectStatus="rejected"
              name={`${item?.firstName} ${item?.lastName}` || "Unknown User"}
              description={
                `${item?.firstName} ${
                  item?.lastName
                } has requested to register as an ${
                  item?.type === "agent" ? "agent" : "student"
                } on SOV portal` || "Unknown User"
              }
              sectionData={item?.type === "agent" ? "company" : "student"}
              pageType="offerLetter"
            />
          </div>
        ))
      ) : (
        <DataNotFound
          className="flex flex-col items-center mt-16"
          message="No Data Available"
          linkText="Back to Dashboard"
          linkDestination="/admin/dashboard"
        />
      )}
    </div>
  );
};

export default Pending;
