const getColumnByIndex = (index: number) => index % 3;

type CalculateOpponentUpdatedValuesProps = {
  values: number[];
  valueToPlace: number;
  position: number;
};
export const calculateOpponentUpdatedValues = ({
  values,
  valueToPlace,
  position,
}: CalculateOpponentUpdatedValuesProps) => [
  ...values.map((value, i) => {
    if (getColumnByIndex(i) === getColumnByIndex(position)) {
      return (value === valueToPlace ? 0 : value);
    }
    return value;
  }),
];
