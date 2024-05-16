import { useState, useEffect } from "react";

export type City = {
  level1_id: string;
  name: string;
  type: string;
  level2s?: District[];
};

export type District = {
  level2_id: string;
  name: string;
  type: string;
  level3s?: Ward[];
};

export type Ward = {
  level3_id: string;
  name: string;
  type: string;
};

const useGetCityandDistrict = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json"
    )
      .then((response) => response.json())
      .then((data: { data: City[] }) => {
        setCities(data.data);
      });
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value as string;

    const districts =
      cities.find((city) => city.level1_id === cityId)?.level2s || [];

    setDistricts(districts);
    setWards([]);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = event.target.value as string;
    const wards =
      districts.find((district) => district.level2_id === districtId)
        ?.level3s || [];

    setWards(wards);
  };

  return { cities, districts, wards, handleCityChange, handleDistrictChange };
};

export default useGetCityandDistrict;
