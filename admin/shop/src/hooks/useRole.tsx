import { getRoles } from "@/api/userApi";
import { RoleData } from "@/types";
import { useEffect, useState } from "react";

const useRole = () => {
  const [roles, setRoles] = useState<RoleData[]>([]);

  useEffect(() => {
    const fetchListRoles = async () => {
      const response = await getRoles();
      setRoles(response.data);
    };

    fetchListRoles();
  }, []);
  return { roles };
};

export default useRole;
