/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StylesConfig, SingleValue } from "react-select"

export const reactSelectStyles: StylesConfig<SingleValue<{ label: string; value: string }>, false> = {

  control: (provided, state) => ({
    ...provided,
    backgroundColor: "hsl(var(--b1) / var(--tw-bg-opacity))",
    borderRadius: "var(--rounded-btn, 0.5rem)",
    padding: "0.375rem",
    borderColor: "hsl(var(--bc) / var(--tw-border-opacity, 0.2))",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "hsl(var(--bc) / var(--tw-bg-opacity, 0.3))"
      : state.isFocused
      ? "hsl(var(--bc) / var(--tw-bg-opacity, 0.15))"
      : "transparent",
    color: "inherit",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "hsl(var(--b2,var(--b1))/var(--tw-bg-opacity, 1))",
  }),
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: "hsl(var(--b2,var(--b1))/var(--tw-bg-opacity, 1))",
  }),
  placeholder: (provided, state) => ({
    ...provided,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "inherit",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
  }),
  input: (provided, state) => ({
    ...provided,
    color: "inherit",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
  }),
  loadingIndicator: (provided, state) => ({
    ...provided,
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
  }),
  group: (provided, state) => ({
    ...provided,
  }),
  groupHeading: (provided, state) => ({
    ...provided,
  }),
  multiValue: (provided, state) => ({
    ...provided,
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
  }),
  container: (provided, state) => ({
    ...provided,
  }),
}
