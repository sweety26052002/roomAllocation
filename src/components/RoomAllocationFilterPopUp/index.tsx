import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./index.module.scss";
// import CustomButton from "../CustomButton"; // Import your CustomButton component
import FormLine from "../../common/components/FormLine";
import closeIcon from "../../assets/images/closeIcon.svg";
import CustomCheckbox from "../../common/components/CustomCheckBox";
import Button from "../../common/components/Button";
import CustomRadioButton from "../../common/components/CustomRadioButton";

export const roomAllocationDashboardFilters = {
  floor: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"],
  roomStatus: ["Available Rooms", "Partially Occupied", "Occupied Rooms"],
  gender: ["Male", "Female"],
  age: ["below 20", "20 - 30", "30 - 40", "40 - 50"],
  age2: ["above 50"],
  location: ["Chennai", "Bangalore", "Ahmedabad", "Hyderabad", "Pune"],
};

// Define the structure of selected filters
interface SelectedFilters {
  floor: string[];
  roomStatus: string[];
  gender: string[];
  age: string[];
  location: string[];
}

interface RoomAllocationFilterPopUpProps {
  onApplyClick: (selectedFilters: SelectedFilters) => void;
  // handleClearClick: () => void;
  onClose: () => void;
  selectedFilters: SelectedFilters; // New prop to receive selected filters
  // handleModal: () => void;
}

const RoomAllocationFilterPopUp: React.FC<RoomAllocationFilterPopUpProps> = ({
  onApplyClick,
  // handleClearClick,
  onClose,
  selectedFilters, // Destructure the new prop
  // handleModal,
}) => {
  const [checkedState, setCheckedState] =
    useState<SelectedFilters>(selectedFilters);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const isAnyFilterSelected = Object.values(checkedState).some(
      (filterArray) => filterArray.length > 0,
    );
    setDisable(!isAnyFilterSelected); // Disable if no filters are selected
  }, [checkedState]);

  const handleChange =
    (filterType: keyof SelectedFilters, value: string) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        if (filterType === "gender") {
          // Wrap the selected gender in an array
          setCheckedState((prevState) => ({
            ...prevState,
            [filterType]: isChecked ? [value] : [],
          }));
        } else {
          const updatedValues = isChecked
            ? [...checkedState[filterType], value]
            : checkedState[filterType].filter((item) => item !== value);

          setCheckedState((prevState) => ({
            ...prevState,
            [filterType]: updatedValues,
          }));
        }
      };

  const handleApplyClick = () => {
    onApplyClick(checkedState); // Now onApplyClick receives the correctly typed selected filters
  };

  const handleClear = () => {
    setCheckedState({
      floor: [],
      roomStatus: [],
      gender: [],
      age: [],
      location: [],
    });
    // handleClearClick();
  };
  const getStatusValue = (status: string) => {
    switch (status) {
      case "Available Rooms":
        return "Available";
      case "Partially Occupied":
        return "Partially Allotted";
      case "Occupied Rooms":
        return "Allotted";
      default:
        return ""; // Add a default return statement
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.filtersHeader}>
        <p className={styles.heading}>Filters</p>
        <FormLine />
        <img
          src={closeIcon}
          alt="close icon"
          onClick={onClose}
          className={styles.closeIcon}
        />
      </div>
      <div className={styles.floorLevelContainer}>
        {/* <p className={styles.heading}>Room Level</p> */}
        <div className={styles.overAllFloorLevelContainer}>
          <div className={styles.levelContainer}>
            <p className={styles.levelHeading}>Floor Level</p>
            <div className={styles.checkboxesContainer}>
              {roomAllocationDashboardFilters.floor.map((floor) => (
                <CustomCheckbox
                  key={floor}
                  text={floor}
                  checked={checkedState.floor.includes(floor)}
                  onChange={handleChange("floor", floor)}
                />
              ))}
            </div>
          </div>
          <div className={styles.levelContainer}>
            <p className={styles.levelHeading}>Room Occupancy</p>
            <div className={styles.checkboxesContainer}>
              {roomAllocationDashboardFilters.roomStatus.map((status) => (
                <CustomCheckbox
                  key={status}
                  text={status}
                  checked={checkedState.roomStatus.includes(
                    getStatusValue(status),
                  )}
                  onChange={handleChange("roomStatus", getStatusValue(status))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.personLevelContainer}>
        <div className={styles.filtersHeader}>
          <p className={styles.heading}>Person Level</p>
          <FormLine />
        </div>
        <div className={styles.overAllLevelContainer}>
          <div className={styles.levelContainer}>
            <p className={styles.levelHeading}>Gender</p>
            <div className={styles.radioButtonsContainer}>
              {roomAllocationDashboardFilters.gender.map((gender) => (
                <CustomRadioButton
                  key={gender}
                  text={gender}
                  name="gender"
                  value={gender}
                  checked={checkedState.gender.includes(gender)} // Handle radio button selection
                  onChange={handleChange("gender", gender)}
                />
              ))}
            </div>
          </div>
          <div className={styles.levelContainer}>
            <p className={styles.levelHeading}>Age</p>
            <div className={styles.checkboxesContainer}>
              {roomAllocationDashboardFilters.age.map((age) => (
                <CustomCheckbox
                  key={age}
                  text={age}
                  checked={checkedState.age.includes(age)}
                  onChange={handleChange("age", age)}
                />
              ))}
            </div>
            <div className={styles.checkboxesContainer}>
              {roomAllocationDashboardFilters.age2.map((age2) => (
                <CustomCheckbox
                  key={age2}
                  text={age2}
                  checked={checkedState.age.includes(age2)}
                  onChange={handleChange("age", age2)}
                />
              ))}
            </div>
          </div>
          {/* <div className={styles.levelContainer}>
            <p className={styles.levelHeading}>Location</p>
            <div className={styles.checkboxesContainer}>
              {roomAllocationDashboardFilters.location.map((location) => (
                <CheckboxWithText
                  key={location}
                  text={location}
                  checked={checkedState.location.includes(location)}
                  onChange={handleChange("location", location)}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
      <FormLine />
      <div className={styles.buttonsContainer}>
        {!disable && (
          <div onClick={handleClear} className={styles.buttonCancel}>
            clear filter
          </div>
        )}
        <Button
          onClick={handleApplyClick}
          buttonClassName={styles.buttonContainer}
          buttonTextClassName={styles.buttonContainerText}
          type="submit"
        >
          {" "}
          apply
        </Button>
      </div>
    </div>
  );
};

export default RoomAllocationFilterPopUp;
