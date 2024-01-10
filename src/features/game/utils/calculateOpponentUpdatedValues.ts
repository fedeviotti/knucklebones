const getColumnByIndex = (index: number) => index % 3;

type CalculateOpponentUpdatedValuesProps = {
  values: number[];
  valueToInsert: number;
  position: number;
};
export const calculateOpponentUpdatedValues = ({
  values,
  valueToInsert,
  position,
}: CalculateOpponentUpdatedValuesProps) => [
  ...values.map((value, i) => {
    if (getColumnByIndex(i) === getColumnByIndex(position)) {
      return (value === valueToInsert ? 0 : value);
    }
    return value;
  }),
];
