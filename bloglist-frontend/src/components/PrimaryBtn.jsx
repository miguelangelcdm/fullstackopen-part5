const PrimaryRoundedButton = ({text}) => {
  return (
    <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-6 border border-gray-400 rounded-full shadow w-fit">
      {text}
    </button>
  );
};

export default PrimaryRoundedButton;
