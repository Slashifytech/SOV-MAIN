import apiurl from "../util";

export const countryOptions = async () => {
  try {
    const res = await apiurl.get("country/all");
    return res.data;
  } catch (error) {
    console.error("Error fetching country options:", error);
    throw new Error("Failed to fetch country options.");
  }
};

export const prefferedCountry = async () => {
  try {
    const res = await apiurl.get(`country/preferred`);
    return res.data;
  } catch (error) {
    console.error("Error fetching country options:", error);
    throw new Error("Failed to fetch country options.");
  }
};

export const countryInstituteOptions = async (country, instituteName) => {
  try {
    const res = await apiurl.get(`institute/all`, {
      params: {
        instituteName: instituteName,
        country: country,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching country options:", error);
    throw new Error("Failed to fetch country options.");
  }
};
export const courseData = async () => {
  try {
    const res = await apiurl.get(`country/courses`);
    return res.data;
  } catch (error) {
    console.error("Error fetching country options:", error);
    throw new Error("Failed to fetch country options.");
  }
};

export const getStudentDataById = async (id) => {
  try {
    const res = await apiurl.get(
      `/studentinformation/student-information/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching country options:", error);
    throw new Error("Failed to fetch country options.");
  }
};
export const newOfferLetter = async (data) => {
  try {
    const response = await apiurl.post(`/institution/register-offerletter`, {
      offerLetter: data,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterPersonalInfoEdit = async (
  appId,
  offerLater,
  section
) => {
  try {
    const response = await apiurl.patch(
      `/institution/personal-information/${appId}`,
      {
        ...offerLater,
        section,
      }
    );

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterEduInfoEdit = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(
      `/institution/education-details/${appId}`,
      {
        ...offerLater,
        section,
      }
    );

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterIeltsInfo = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(`/institution/ielts-score/${appId}`, {
      ...offerLater,
      section,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterPrefEdit = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(`/institution/preference/${appId}`, {
      ...offerLater,
      section,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const OfferLetterToeflScore = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(`/institution/toefl-score/${appId}`, {
      ...offerLater,
      section,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterPteScore = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(`/institution/ptl-score/${appId}`, {
      ...offerLater,
      section,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const OfferLetterCertificate = async (appId, offerLater, section) => {
  try {
    const response = await apiurl.patch(`/institution/certificate/${appId}`, {
      ...offerLater,
      section,
    });

    return response.data?.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
export const offerLetterReSubmit = async (applicationId, section) => {
    try {
      const response = await apiurl.patch(
        `/institution/reSubmit-application/${applicationId}`,
        {},
        {
          params: {
            section: section,
          },
        }
      );

      return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while submitting the form"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
