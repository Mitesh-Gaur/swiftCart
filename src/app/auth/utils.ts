// src/app/auth/utils.ts
import wretch from "wretch";
import Cookies from "js-cookie";

export const baseUrl = "http://127.0.0.1:8001";

// Base API setup for making HTTP requests
const api = wretch("http://localhost:8000").accept("application/json");

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string): string | undefined => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const register = (email: string, username: string, password: string) => {
  return api.post({ email, username, password }, "/api/auth/users/");
};

const login = (email: string, password: string) => {
  return api.post({ email: email, password }, "/api/auth/jwt/create");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/api/auth/logout/");
};

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/api/auth/jwt/refresh");
};

const resetPassword = (email: string) => {
  return api.post({ email }, "/api/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
) => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "/api/auth/users/reset_password_confirm/"
  );
};

// Function to update profile
const updateProfile = (
  token: string,
  uid: string,
  profileData: { [key: string]: any }
) => {
  return api
    .url("/api/auth/update_profile/")
    .auth(`Bearer ${token}`)
    .json({
      uid,
      token,
      ...profileData,
    })
    .put(); // Use .put() or .patch() instead of .post()
};

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    storeToken,
    getToken,
    logout,
    removeTokens,
    updateProfile
  };
};