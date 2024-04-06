export const saveToken = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};
