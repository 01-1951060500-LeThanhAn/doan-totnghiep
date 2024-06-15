export const saveRole = (token: string) => {
  localStorage.setItem("role", JSON.stringify(token));
};
