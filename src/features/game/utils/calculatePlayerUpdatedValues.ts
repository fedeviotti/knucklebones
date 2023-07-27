type CalculatePlayerUpdatedValuesProps = {
  values: number[];
  valueToPlace: number;
  position: number;
};
export const calculatePlayerUpdatedValues = ({
  values,
  valueToPlace,
  position,
}: CalculatePlayerUpdatedValuesProps) => [
  ...values.slice(0, position),
  valueToPlace,
  ...values.slice(position + 1),
];
