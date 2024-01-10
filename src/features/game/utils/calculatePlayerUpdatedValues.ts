type CalculatePlayerUpdatedValuesProps = {
  values: number[];
  valueToInsert: number;
  position: number;
};
export const calculatePlayerUpdatedValues = ({
  values,
  valueToInsert,
  position,
}: CalculatePlayerUpdatedValuesProps) => [
  ...values.slice(0, position),
  valueToInsert,
  ...values.slice(position + 1),
];
