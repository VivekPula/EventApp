export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // !! converts token to true/false
};
