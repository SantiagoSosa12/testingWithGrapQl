type Props = {
  onClick: () => void;
};

const StartRepoButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="mt-2 h-10 px-6 font-semibold bg-black text-white"
      onClick={onClick}
    >
      Start
    </button>
  );
};

export default StartRepoButton;
