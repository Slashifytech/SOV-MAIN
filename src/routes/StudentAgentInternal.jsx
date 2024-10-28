import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const StudentAgentInternal = ({ children }) => {
  const { studentInfoData } = useSelector((state) => state.student);
  const { agentData } = useSelector((state) => state.agent);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center md:ml-32 sm:ml-20 md:mt-48 mt-60 sm:mt-80">
        <Loader />
      </div>
    );
  }

  const roleType = localStorage.getItem("role");
  if (
    (roleType === "3" && studentInfoData?.data?.studentInformation?.pageStatus?.status !== "completed") ||
    (roleType === "2" && agentData?.pageStatus?.status !== "completed")
  ) {
    return <Navigate to="/login" replace={true} />;
  }
  
  return children;
};

export default StudentAgentInternal;
