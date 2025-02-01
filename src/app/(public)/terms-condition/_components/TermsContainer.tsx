"use client";

import { useGetTermsQuery } from "@/redux/api/settingApi";

const TermsContainer = () => {
  const { data: terms, isLoading: isTermsLoading } =
    useGetTermsQuery(undefined);

  return (
    <div className="md:my-10 my-5 min-h-[50vh]">
      <h1 className="xl:text-5xl md:text-3xl text-xl font-bold md:mb-10 mb-5 ">
        Terms of use →
      </h1>
      {isTermsLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: terms?.data?.content || "",
          }}
          className="break-words"
        ></div>
      )}
    </div>
  );
};

export default TermsContainer;
