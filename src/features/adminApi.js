import apiurl from "../util";

export const getAllApplicationforApproval = async (
  tabType,
  page,
  perPage,
  searchQuery,
) => {
  try {
    const response = await apiurl.get(`/admin/all/applications`, {
      params: {
        status: tabType,
        page: page,
        limit: perPage,
        searchQuery: searchQuery,
      },
    });
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

export const getAllApproval = async (
  tabType,
  search,
  page,
  perPage,
) => {
  try {
    const response = await apiurl.get(`/admin/all/student-agent-data`, {
      params: {
        status: tabType || "notapproved",
        search: search,
        page: page,
        limit: perPage,
      },
    });
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
export const chngeApplicationStatus = async (id, status, section, message) => {
  try {
    const response = await apiurl.patch(
      `/admin/change-application-status/${id}`,
      { status, section, message }
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
      throw new Error("An unexpected error occurred", error);
    }
  }
};
export const changeApprovalStatus = async (id, status, type, message) => {
  try {
    const response = await apiurl.patch(`/admin/change-page-status/${id}`, {
      status,
      type,
      message,
    });
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
export const adminLogin = async (role, email, password) => {
  try {
    const response = await apiurl.post(`/auth/admin/login`, {
      role,
      email,
      password,
    });
    localStorage.setItem("userAuthToken", response?.data?.data?.accessToken);
    localStorage.setItem("role", "0" )
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
export const getAgentDataByAdmin = async (id) => {
  try {
    const response = await apiurl.get(`/admin/company/${id}`);
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

export const getStudentDataByAdmin = async (id) => {
  try {
    const response = await apiurl.get(`admin/student-information/${id}`);
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