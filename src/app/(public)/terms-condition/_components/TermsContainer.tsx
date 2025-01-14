"use client";

import { useGetTermsQuery } from "@/redux/api/settingApi";

const TermsContainer = () => {
  const { data: terms } = useGetTermsQuery(undefined);

  return (
    <div className="md:my-10 my-5">
      <h1 className="xl:text-5xl md:text-3xl text-xl font-bold md:mb-10 mb-5 ">
        Terms of use →
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: terms?.data?.content || "",
        }}
        className="break-words"
      ></div>
    </div>
  );
};

export default TermsContainer;
