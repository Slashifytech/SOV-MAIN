import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCountryOption,
  getCourses,
  getPrefCountryOption,
} from "./features/generalSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "./routes/Route";
import { agentInformation } from "./features/agentSlice";
import { studentInfo } from "./features/studentSlice";

function App() {
  const role = localStorage.getItem("role");
  const studentId = localStorage.getItem("student")
  const dispatch = useDispatch();
  const { prefCountryOption, courses, countryOption } = useSelector(
    (state) => state.general
  );

  useEffect(() => {
    if (!countryOption || countryOption.length === 0) {
      dispatch(getCountryOption());
    }
    if (!prefCountryOption || prefCountryOption.length === 0) {
      dispatch(getPrefCountryOption());
    }
    if (!courses || courses.length === 0) {
      dispatch(getCourses());
    }
    if (role === "2") {
      dispatch(agentInformation());
    }
    if (role==="3"){
      dispatch(studentInfo(studentId))
    }

    // Interval to check every 3 seconds
    const intervalId = setInterval(() => {
      if (countryOption.length === 0) {
        dispatch(getCountryOption());
      }
      if (prefCountryOption.length === 0) {
        dispatch(getPrefCountryOption());
      }
      if (courses.length === 0) {
        dispatch(getCourses());
      }
      
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dispatch, countryOption, prefCountryOption, courses]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
      <div className="overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
