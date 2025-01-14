const OwnerMsgCard = ({ message }: { message: string }) => {
  return (
    <div className="max-w-max rounded-xl border bg-primary-orange text-primary-white px-3 py-1">
      <p className="text-primaryWhite">{message}</p>
    </div>
  );
};

export default OwnerMsgCard;
