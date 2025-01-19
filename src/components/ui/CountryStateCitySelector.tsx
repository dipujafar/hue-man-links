import React, { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function CountryStateCitySelector({
  control,
  userAddress,
  register,
  setValue,
  errors,
  hiddenArea = false,
}: any) {
  const [allData, setAllData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(
    userAddress?.country
  );
  const [selectedState, setSelectedState] = useState<any>(userAddress?.state);
  const [selectedCity, setSelectedCity] = useState<any>(userAddress?.city);
  const [statesOfCountry, setStatesOfCountry] = useState<any>([]);
  const [citiesOfState, setCitiesOfState] = useState<any>([]);

  // -------- Get all data ------------- //
  useEffect(() => {
    fetch("/data/countries-states-cities.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  // -------- Keep data memoized to load once ------------ //
  const memoizedAllCountries = useMemo<any>(() => allData, [allData]);

  // -------- Load states of selected country -------- //
  useEffect(() => {
    if (selectedCountry) {
      const countryData = memoizedAllCountries?.find((country: any) => {
        if (selectedCountry === country.name) {
          return country;
        }
      });

      setStatesOfCountry(countryData?.states);
    }
  }, [memoizedAllCountries, selectedCountry]);

  // ----------- Load cities of selected state ------- //
  useEffect(() => {
    if (selectedState) {
      const stateData = statesOfCountry?.find(
        (state: any) => state.name === selectedState
      );
      setCitiesOfState(stateData?.cities);
    }
  }, [memoizedAllCountries, selectedState, statesOfCountry]);

  useEffect(() => {
    if (userAddress?.country) {
      setSelectedCountry(userAddress.country);
      setSelectedState(userAddress.state);
      setSelectedCity(userAddress.city);

      setValue("country", userAddress.country);
      setValue("state", userAddress.state);
      setValue("city", userAddress.city);
    }
  }, [userAddress?.country]);

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-3",
          hiddenArea && "lg:grid-cols-2"
        )}
      >
        {/* Country Selector */}
        <div className="hidden">
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            defaultValue={selectedCountry}
            render={({ field }) => (
              <div>
                <Select
                  onValueChange={(countryName) => {
                    field.onChange(countryName);
                    setSelectedCountry(countryName);
                  }}
                  value={selectedCountry || ""}
                >
                  <SelectTrigger className="py-5 bg-primary-light-gray">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {memoizedAllCountries?.map((country: any) => (
                      <SelectItem key={country.name} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors?.country && (
                  <p className="text-red-600 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* State Selector */}
        <div className="hidden">
          {selectedCountry ? (
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              defaultValue={selectedState}
              render={({ field }) => (
                <div>
                  <Select
                    onValueChange={(stateName) => {
                      field.onChange(stateName);
                      setSelectedState(stateName);
                    }}
                    value={selectedState || ""}
                  >
                    <SelectTrigger className="py-5 bg-primary-light-gray">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {statesOfCountry?.map((state: any) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors?.state && (
                    <p className="text-red-600 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              )}
            />
          ) : (
            <Select>
              <SelectTrigger disabled className="py-5 bg-primary-light-gray">
                <SelectValue placeholder="Select a country first" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          )}
        </div>

        {/* City Selector */}
        <div>
          {selectedState ? (
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              defaultValue={selectedCity}
              render={({ field }) => (
                <div>
                  <Select
                    onValueChange={(cityName) => {
                      field.onChange(cityName);
                      setSelectedCity(cityName);
                    }}
                    value={selectedCity || ""}
                  >
                    <SelectTrigger className="py-5 bg-primary-light-gray">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {citiesOfState?.map((city: any) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors?.city && (
                    <p className="text-red-600 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              )}
            />
          ) : (
            <Select>
              <SelectTrigger disabled className="py-5 bg-primary-light-gray">
                <SelectValue placeholder="Select a state first" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          )}
        </div>

        {/* area */}
        <div className={cn(hiddenArea && "hidden")}>
          <Input
            type="text"
            defaultValue={userAddress?.area}
            placeholder="Type Address"
            className="py-5 bg-primary-light-gray"
            {...register("area", { required: "Area is required" })}
          />
          {errors?.area && (
            <p className="text-red-600 text-sm">{errors.area.message}</p>
          )}
        </div>

        {/* zip code */}
        <div>
          <Input
            defaultValue={userAddress?.zipCode}
            type="text"
            placeholder="Type Zip Code"
            className="py-5 bg-primary-light-gray"
            {...register("zipCode")}
          />
          {errors?.zipCode && (
            <p className="text-red-600 text-sm">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3 lg:grid-cols-3">
        <div className="hidden">
          <Input
            defaultValue={userAddress?.house}
            type="text"
            placeholder="Type House No"
            className="py-5 bg-primary-light-gray"
            {...register("house")}
          />
          {errors?.house && (
            <p className="text-red-600 text-sm">{errors.house.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
