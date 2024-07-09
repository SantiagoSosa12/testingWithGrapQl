type Props = {
  name: string;
  description: string;
  starts: number;
};

const FoundRepo = ({ name, description, starts }: Props) => {
  return (
    <div className="py-4">
      <div className="flex flex-row items-center-justify-between mb-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="px-4 py-2 rounded-xl text-gray-800 gb-gray-200 font-semibold text-sm flex aling-center w-max">
          {starts} Starts
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FoundRepo;
