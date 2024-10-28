import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AgentSidebar from "../components/dashboardComp/AgentSidebar";
import Header from "../components/dashboardComp/Header";
import { useDispatch, useSelector } from "react-redux";
import { applicationById } from "../features/agentSlice";
import OfferLetterEducationDetails from "../components/dashboardComp/editfiles/OfferLetterEducationDetails";
import IeltsScore from "../components/dashboardComp/editfiles/IeltsScore";
import OfferLetterPreferences from "../components/dashboardComp/editfiles/OfferLetterPreferences";
import TofelScore from "../components/dashboardComp/editfiles/TofelEdit";
import PteScoreEdit from "../components/dashboardComp/editfiles/PteScoreEdit";
import CertificateEdit from "../components/dashboardComp/editfiles/CertificateEdit";
import { toast } from "react-toastify";
import { offerLetterReSubmit } from "../features/generalApi";
import OffLetterPersonalInfo from "../components/dashboardComp/editfiles/OffLetterPersonalInfo";
import Sidebar from "../components/dashboardComp/Sidebar";

const OfferLetterEdit = () => {
  const { applicationDataById } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
  const location = useLocation();
  const profileView = location.state?.isprofileView;
  const appId = profileView ? location.state.id : location.state;
  const [isUpdated, setIsUpdated] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    dispatch(applicationById(appId));
  }, [dispatch, isUpdated]);
  const handleProfileUpdate = () => {
    setIsUpdated((prev) => !prev);
  };
  const resSubmit = async () => {
    try {
      const section = "offerLetter";
      const res = await offerLetterReSubmit(appId, section);
      dispatch(applicationById(appId));
      toast.success(res.message || "Application Re-Submitted");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {profileView === "/admin/applications-review" ? (
        ""
      ) : (
        <>
          <Header customLink="/agent/shortlist" />
          <div>
            <span className="fixed overflow-y-scroll scrollbar-hide  bg-white">
            {role === "3" ? <Sidebar/> : <AgentSidebar/> }
              <AgentSidebar />
            </span>
          </div>
        </>
      )}
      <div className="bg-white">
        {profileView === "/admin/applications-review" ? (
          ""
        ) : (
          <span className="flex items-center justify-between pr-7 md:pt-20 sm:pt-28 md:ml-[16.5%] sm:ml-[20%] ">
            <span>
              <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
                Offer Letter 
              </p>
              <p className="mt-1 font-normal text-body mb-5 ml-9">
                View and Edit your offer Letter
              </p>
            </span>
            {applicationDataById?.status === "rejected" && (
              <span
                onClick={resSubmit}
                className="px-6 py-2 bg-primary rounded-md text-white cursor-pointer"
              >
                Re-Submit
              </span>
            )}
          </span>
        )}
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
            ? " mx-44 mt-20"
            : " ml-[19.5%] mt-9 mr-6"}  `}>
        <OffLetterPersonalInfo
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <OfferLetterEducationDetails
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <OfferLetterPreferences
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <IeltsScore
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <PteScoreEdit
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <TofelScore
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
      <div className={`${profileView === "/admin/applications-review" 
        
        ? " mx-44 mt-20"
        : " ml-[19.5%] mt-9 mr-6"}  `}>
        <CertificateEdit
          appId={appId}
          updatedData={handleProfileUpdate}
          profileViewPath={profileView}
        />
      </div>
    </>
  );
};

export default OfferLetterEdit;
