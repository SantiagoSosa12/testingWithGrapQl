type Props = {
  onClick: () => void;
  isStart: boolean;
};

const StartRepoButton = ({ onClick, isStart }: Props) => {
  return (
    <button
      type="button"
      className="mt-2 h-10 px-6 font-semibold bg-black text-white"
      onClick={onClick}
    >
      {isStart ? 'Start' : 'Unstart'}
    </button>
  );
};

export default StartRepoButton;
