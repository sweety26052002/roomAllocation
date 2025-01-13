import React from 'react';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import styles from './index.module.scss';
import FilterOptions from '../FilterOptions';
import { Button } from '../../common/components/Button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import line from '../../assets/images/line.svg';
import filter_close from '../../assets/images/filter-close.svg';
import horizontal_line from '../../assets/images/hor-line.svg';
// import { getAllArrayElementsAsString } from '../../utils/functions';
// import { checkCombination } from '../../utils/filters';
// import { useDispatch, useSelector } from 'react-redux';

// import Select from 'react-select';
// import DropdownIndicator from '../../common/components/DropdownIndicator';

interface FilterProps {
  isOpen: boolean;
  closeFilter: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleData: (data: any, type: string, globalType: string) => void;
  // filteredData: any;
}

interface SelectedFilters {
  register_status?: string[];
  shirt_size?: string[];
  id_type?: string[];
  age?: string[];
  gender?: string[];
  Rm?: string[];
}
interface setTypes {
  type: string;
  global: string;
}
const FilterComponent: React.FC<FilterProps> = ({
  isOpen,
  closeFilter,
  handleData,
  // filteredData,
}) => {
  
 
  const {
    status,
    selectedPaymentStatus,
    selectedInvoiceStatus,
    selectedTravelPlanStatus,
    selectedRoomStatus,
    selectTShirtSizeStatus,
    selectIdProofStatus,
    selectedLogisticStatus,
    selectedRMStatus,
    selectedGenderStatus,
    selectedAgeStatus,
  } = {
    status: [],
    selectedPaymentStatus: [],
    selectedInvoiceStatus: [],
    selectedTravelPlanStatus: [],
    selectedRoomStatus: [],
    selectTShirtSizeStatus: [],
    selectIdProofStatus: [],
    selectedLogisticStatus: [],
    selectedRMStatus: [],
    selectedGenderStatus: [],
    selectedAgeStatus: [],
  };
  // console.log(filteredData, 'filteredData', isOpen);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [selectedFilters, setSelectedFilters] = useState<any>({
    status: status,
    selectedPaymentStatus: selectedPaymentStatus,
    selectedInvoiceStatus: selectedInvoiceStatus,
    selectedTravelPlanStatus: selectedTravelPlanStatus,
    selectedRoomStatus: selectedRoomStatus,
    selectTShirtSizeStatus: selectTShirtSizeStatus,
    selectIdProofStatus: selectIdProofStatus,
    selectedLogisticStatus: selectedLogisticStatus,
    selectedRMStatus,
    selectedGenderStatus,
    selectedAgeStatus,
  });

  const handleClose = () => {
    setSelectedFilters({
      status: status,
      selectedPaymentStatus: selectedPaymentStatus,
      selectedInvoiceStatus: selectedInvoiceStatus,
      selectedTravelPlanStatus: selectedTravelPlanStatus,
      selectedRoomStatus: selectedRoomStatus,
      selectTShirtSizeStatus: selectTShirtSizeStatus,
      selectIdProofStatus: selectIdProofStatus,
      selectedLogisticStatus: selectedLogisticStatus,
      selectedRMStatus,
      selectedGenderStatus,
      selectedAgeStatus,
    });
    closeFilter();
  };
  const levelOptions = ['Ground Floor', '1st Floorrrrrrrrr', '2nd Floor', '3rd Floor'];
  const genderOptions = ['M', 'F'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleChange = (data: any, type: string, globalType: string) => {
  //    console.log(data, type, globalType, 'selected');
  //   // dispatch(addFilters({ [type]: selected }));
  // }
  const handleChange = (selected: string[], type: string) => {
    // console.log(selected, type, 'selected');
    // dispatch(addFilters({ [type]: selected }));

    if (type === 'Seats') {
      // console.log(type, selected);
      setSelectedFilters({ ...selectedFilters, status: selected });
      // dispatch(addFilters({ status: selected }));
    }
    else if (type === 'Payments') {
      // console.log(type, selected);
      setSelectedFilters({
        ...selectedFilters,
        selectedPaymentStatus: selected,
      });
      // dispatch(addFilters({ selectedPaymentStatus: selected }));
    }
    else if (type === 'Invoices') {
      // console.log(type, selected);
      setSelectedFilters({
        ...selectedFilters,
        selectedInvoiceStatus: selected,
      });
      // dispatch(addFilters({ selectedInvoiceStatus: selected }));
    }
    else if (type === 'TravelAndGoodies') {
      // console.log(type, selected);
      setSelectedFilters({
        ...selectedFilters,
        selectedTravelPlanStatus: selected,
      });
      // dispatch(addFilters({ selectedTravelPlanStatus: selected }));
    }
    else if (type === 'logistics') {
      // console.log(type, selected);
      setSelectedFilters({
        ...selectedFilters,
        selectedLogisticStatus: selected,
      });
      // dispatch(addFilters({ selectedLogisticStatus: selected }));
    }
    else if (type === 'Rooms') {
      // console.log(type, selected);
      setSelectedFilters({ ...selectedFilters, selectedRoomStatus: selected });
      // dispatch(addFilters({ selectedRoomStatus: selected }));
    }
    else if (type === 'TShirt') {
      // console.log(type, selected);
      setSelectedFilters({
        ...selectedFilters,
        selectTShirtSizeStatus: selected,
      });
      // dispatch(addFilters({ selectTShirtSizeStatus: selected }));
    }
    else if (type === 'ID') {
      // console.log(type, selected);
      setSelectedFilters({ ...selectedFilters, selectIdProofStatus: selected });
      // dispatch(addFilters({ selectIdProofStatus: selected }));
    }
    else if (type === 'RM') {
      setSelectedFilters({ ...selectedFilters, selectedRMStatus: selected });
      // dispatch(addFilters({ selectedRMStatus: selected }));
    }
    else if (type === 'age') {
      setSelectedFilters({ ...selectedFilters, selectedAgeStatus: selected });
      // dispatch(addFilters({ selectedRMStatus: selected }));
    }
    else if (type === 'gender') {
      setSelectedFilters({ ...selectedFilters, selectedGenderStatus: selected });
      // dispatch(addFilters({ selectedRMStatus: selected }));
    }
  };
  let finalSelectedFilters: SelectedFilters = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isEmpty = Object.values(finalSelectedFilters).every(
    (item) => Array.isArray(item) && item.length === 0
  );
  // useEffect(() => {}, [selectedFilters]);
  const handleSubmit = () => {
    // console.log(selectedFilters, 'ffff3');
    // dispatch(addFilters(selectedFilters));
    // if (isEmpty) {
    //   setTypes['type'] = 'All';
    //   setTypes['global'] = 'All';
    // }
    // if (setTypes['global'] === 'All') {
    //   dispatch(applyFilters({ ...isApply, singleType: true }));
    // }
    // // setTimeout(() => {
    // handleData(finalSelectedFilters, setTypes.type, setTypes.global);
    // // }, 1000);
    // closeFilter();
  };

  const clearFilter = () => {
    // dispatch(clearFilters());
    // setSelectedFilters({
    //   status: [],
    //   selectedPaymentStatus: [],
    //   selectedInvoiceStatus: [],
    //   selectedTravelPlanStatus: [],
    //   selectedRoomStatus: [],
    //   selectTShirtSizeStatus: [],
    //   selectIdProofStatus: [],
    //   selectedLogisticStatus: [],
    //   selectedRMStatus: [],
    //   selectedGenderStatus: [],
    //   selectedAgeStatus: [],
    // });
    finalSelectedFilters = {};
    handleData({}, 'All', 'All');
  };

  // finalSelectedFilters['register_status'] = status.concat(
  //   selectedPaymentStatus,
  //   selectedInvoiceStatus,
  //   selectedTravelPlanStatus,
  //   selectedLogisticStatus,
  //   selectedRoomStatus
  // // );
  // if (selectTShirtSizeStatus.length > 0) {
  //   finalSelectedFilters['shirt_size'] = selectTShirtSizeStatus;
  // }
  // if (selectIdProofStatus.length > 0) {
  //   finalSelectedFilters['id_type'] = selectIdProofStatus;
  // }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setTypes: setTypes = { type: 'All', global: '' };
  // useEffect(() => {
  // if (
  //   (selectTShirtSizeStatus && selectTShirtSizeStatus.length > 0) ||
  //   (status && status.length > 0) ||
  //   (selectedPaymentStatus && selectedPaymentStatus.length > 0) ||
  //   (selectedInvoiceStatus && selectedInvoiceStatus.length > 0) ||
  //   (selectedTravelPlanStatus && selectedTravelPlanStatus.length > 0) ||
  //   (selectedLogisticStatus && selectedLogisticStatus.length > 0) ||
  //   (selectedRoomStatus && selectedRoomStatus.length > 0)
  // ) {
  //   const lengths = [
  //     { type: 'Seats', array: status },
  //     { type: 'Payments', array: selectedPaymentStatus },
  //     { type: 'Invoices', array: selectedInvoiceStatus },
  //     { type: 'TravelAndGoodies', array: selectedTravelPlanStatus },
  //     { type: 'logistics', array: selectedLogisticStatus },
  //     { type: 'Rooms', array: selectedRoomStatus },
  //   ];
  //   const arraysWithLengthGreaterThanOne = lengths.filter(
  //     (item) => Array.isArray(item.array) && item.array.length > 0
  //   );
  //   if (arraysWithLengthGreaterThanOne.length === 1) {
  //     // console.log('single type', arraysWithLengthGreaterThanOne);
  //     setTypes['global'] = arraysWithLengthGreaterThanOne[0].type;
  //   } else if (arraysWithLengthGreaterThanOne.length > 1) {
  //     setTypes['global'] = 'All';
  //   }
  //   // console.log('single type', arraysWithLengthGreaterThanOne);

  //   finalSelectedFilters['register_status'] = status.concat(
  //     selectedPaymentStatus,
  //     selectedInvoiceStatus,
  //     selectedTravelPlanStatus,
  //     selectedLogisticStatus,
  //     selectedRoomStatus
  //   );
  // }

  // if (selectTShirtSizeStatus && selectTShirtSizeStatus.length > 0) {
  //   setTypes['global'] = 'All';
  //   finalSelectedFilters['shirt_size'] = selectTShirtSizeStatus;
  // }
  // if (selectIdProofStatus && selectIdProofStatus.length > 0) {
  //   setTypes['global'] = 'All';
  //   finalSelectedFilters['id_type'] = selectIdProofStatus;
  // }
  // if (selectedAgeStatus && selectedAgeStatus.length > 0) {
  //   setTypes['global'] = 'All';
  //   finalSelectedFilters['age'] = selectedAgeStatus;
  // }
  return (
    <Modal
      open={isOpen}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.filterComponentContainer}>
        <div className={`${styles.subHeading} ${styles.filter}`}>
          <div className={styles.subHeadingName}>Filter</div>
          <div className={styles.lineWraper}>
            <img
              className={styles.lineIcon3}
              loading="lazy"
              alt="icon"
              src={horizontal_line}
            />
          </div>
          <div>
            <button
              type="button" 
              onClick={handleClose}
              className={` ${styles.closeButton} `}
            >
              <img
                src={filter_close}
                loading="lazy"
                alt="icon"
              ></img>
            </button>
          </div>
        </div>
        <div className={styles.filtersContainer}>
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Seat Status</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="Seats"
                  filters={seatStatusOptions}
                  selectedFilters={selectedFilters?.status}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Payments</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="Payments"
                  filters={paymentStatusOptions}
                  selectedFilters={selectedFilters?.selectedPaymentStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Invoices</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="Invoices"
                  filters={invoiceOptions}
                  selectedFilters={selectedFilters?.selectedInvoiceStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Travel Plan & Goodies</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="TravelAndGoodies"
                  filters={travelPlanOptions}
                  selectedFilters={selectedFilters?.selectedTravelPlanStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Logistics</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt=""
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="logistics"
                  filters={logisticsOptions}
                  selectedFilters={selectedLogisticStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Room Status</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt=""
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="Rooms"
                  filters={roomStatusOptions}
                  selectedFilters={selectedFilters?.selectedRoomStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>T Shirt Size</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="TShirt"
                  filters={tShirtSizeOptions}
                  selectedFilters={selectedFilters?.selectTShirtSizeStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}
          {/* <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>ID Proof</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.lastInputFieldsContainer}>
                <FilterOptions
                  type="ID"
                  filters={idProofOptions}
                  selectedFilters={selectedFilters?.selectIdProofStatus}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div> */}

          <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Floor level</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src={horizontal_line}
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="age"
                  filters={levelOptions}
                  selectedFilters={[]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>Gender</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src="../../../../assets/images/line.svg"
                />
              </div>
              <div className={styles.inputFieldsContainer}>
                <FilterOptions
                  type="gender"
                  filters={genderOptions}
                  selectedFilters={[]}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.seatStatusContainer}>
            <div className={styles.subHeading}>
              <div className={styles.subHeadingName}>RM</div>
              <div className={styles.lineWraper}>
                <img
                  className={styles.lineIcon3}
                  loading="lazy"
                  alt="icon"
                  src={horizontal_line}
                />
              </div>
              {/* <div className={styles.inputFieldsContainer}>
                <Select
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      // border: 'none',
                      borderRadius: '2px',
                      boxShadow: state.isFocused
                        ? '0 0 0 1px gray'
                        : provided.boxShadow,
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#051B46', // Set text color to blue for the selected option
                    }),
                    indicatorSeparator: (provided) => ({
                      ...provided,
                      display: 'none', // Hide the separator
                    }),
                    indicatorsContainer: (provided) => ({
                      ...provided,
                      padding: '0 8px', // Adjust the padding for the container of indicators
                    }),
                  }}
                  options={RMDetails}
                  onChange={(val: any) => handleChange(val, 'RM')}
                  className={styles.dropdownInput}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className={styles.seatStatusContainer}>
          <div className={styles.lineWraper}>
            <img
              className={styles.lineIcon3}
              loading="lazy"
              alt="icon"
              src={horizontal_line}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            buttonClassName={styles.button1}
            buttonTextClassName={styles.buttontextContainer}
            type="button"
            onClick={clearFilter}
          >
            clear filter
          </Button>
          <Button onClick={handleSubmit} buttonClassName={styles.button}>
            apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(FilterComponent);
