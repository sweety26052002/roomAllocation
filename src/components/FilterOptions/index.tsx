// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react from 'react';
import styles from './index.module.scss';
import React from 'react';
import unchecked from '../../assets/images/unchecked.svg';
import checked from '../../assets/images/checked.svg';
import { Checkbox } from '@mui/material';
interface FilterOptionsProps {
  filters: string[];
  type: string;
  selectedFilters: string[];
  onChange: (selected: string[], type: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filters,
  type,
  selectedFilters,
  onChange,
}) => {
  const handleChange = (filter: string) => {
    const newSelectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item: string) => item !== filter)
      : [...selectedFilters, filter];
    onChange(newSelectedFilters, type);
  };

  return (
    <>
      {filters.map((filter: string) => (
        <div key={filter}>
          <label className={styles.field}>
            <Checkbox
              icon={<img src={unchecked} alt="unchecked" loading="lazy" />}
              checkedIcon={<img src={checked} alt="Checked" loading="lazy" />}
              onChange={() => handleChange(filter)}
              checked={selectedFilters.includes(filter)}
            />
            {/* <input
              type="checkbox"
              checked={selectedFilters.includes(filter)}
              onChange={() => handleChange(filter)}
              className={styles.checkBoxInput}
            /> */}
            {filter}
          </label>
        </div>
      ))}
    </>
  );
};
export default FilterOptions;
