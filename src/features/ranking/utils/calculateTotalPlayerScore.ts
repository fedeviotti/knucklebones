type Props = {
  delta: number;
};

export const calculateTotalPlayerScore = ({
  delta = 0,
}: Props) => (delta * 10);
