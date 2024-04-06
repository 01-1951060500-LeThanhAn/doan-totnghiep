import { advancedApi } from ".";

const getUserInfo = async () => {
  const response = await advancedApi.get(`/users`);

  return response.data;
};

export { getUserInfo };
