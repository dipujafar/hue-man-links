const priceData = [
  {
    child: 1,
    price: 18,
    color: "#038C7F",
  },
  {
    child: 2,
    price: 25,
    color: "#2E3559",
  },
  {
    child: 3,
    price: 30,
    color: "#976FBF",
  },
  {
    child: 4,
    price: 45,
    color: "#F26D6D",
  },
];

const LinkRates = () => {
  return (
    <div className="space-y-10">
      <h1 className="section-title text-center text-primary-orange">
        Link Rates
      </h1>
      <p className="text-primary-black text-xl text-center max-w-7xl mx-auto">
        Our linkers are compensated directly by members immediately after each
        scheduled sit. Payment can be made through cash, check, or
        electronically, whichever is most convenient for you. The listed rates
        are our minimum requirements; however, if you are pleased with the
        service, we encourage you to consider offering a higher rate or a tip.
      </p>
      <p className="text-primary-black text-xl text-center max-w-7xl mx-auto">
        Please note that our linkers are compensated based on their sitting
        duties, so kindly avoid requesting tasks that fall outside the scope of
        sitting services.
      </p>

      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {priceData?.map((data, idx) => (
          <div
            key={idx}
            className={`px-6 py-5 rounded-xl bg-[${data?.color}] text-primary-white space-y-2 flex flex-col justify-center items-center`}
          >
            <h6 className="text-3xl font-medium">1 {data?.child} Child</h6>
            <h3 className="text-5xl font-bold">$ {data?.price}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkRates;
