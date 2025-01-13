// import axios from "axios";
import { City, Country, State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import { useNavigate } from "react-router-dom";
import Select from "react-select";
import editProfile from "../EditForm/index.module.scss"
// import DropDown from "../../common/components/DropDown";
// import DropDown from "../../common/DropDown";
// import { options } from "../../constants";
interface UserData {
  field: string;
  value: string | { value: string; label: string };
}

const EditProfile: React.FC = () => {
//   const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // getValues,
  } = useForm();

  const onSubmit = () => {
    console.log("Form Data:");
  };
  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    const userData: UserData[] = [
      { field: "fullName", value: "" },
      { field: "dob", value: "" },
      { field: "phone", value: storedPhoneNumber || "" },
      { field: "email", value: "" },
      { field: "addressLine1", value: "" },
      { field: "addressLine2", value: "" },
      { field: "pinCode", value: "" },
      { field: "city", value: { value: "", label: "" } },
      { field: "state", value: { value: "", label: "" } },
      { field: "country", value: { value: "", label: "" } },
    ];

    userData.forEach((data) => setValue(data.field, data.value));
  }, [setValue]);

  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedState, setSelectedState] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);
//   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value,
      ).map((city) => ({
        value: city.name,
        label: city.name,
      }));

      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountry, selectedState]);

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const getStatesOfCountry = (countryIsoCode: string) => {
    return State.getStatesOfCountry(countryIsoCode).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
  };


  return (
    <div className={editProfile.main} data-testid="main">
      <form
        className={editProfile.profileConfirmationForm}
        data-testid="profileConfirmationForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={editProfile.firstRow}>
          <div className={editProfile.nameField} data-testid="nameField">
            <p className={editProfile.nameLable} data-testid="name">
              Full Name
            </p>
            <div className={editProfile.nameInput} data-testid="nameInput">

              {/* <DropDown defaultValue={"Miss"} options={options} handleChange={handleChange}/>  
              <select
                defaultValue="Miss"
                className={editProfile.nameTitle}
                data-testid="nameTitle"
                {...register("title", { required: true })}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
              </select> */}
              <input
                type="text"
                className={editProfile.nameInputField}
                data-testid="nameInputField"
                {...register("fullName", { required: true, minLength:3 })}
              />
              {errors.fullName && errors.fullName.type==="required" &&(
                <span className={editProfile.error}>This field is required</span>
              )}
              {errors.fullName && errors.fullName.type==="minLength" &&(
                <span className={editProfile.error}>Length should be greater than 3</span>
              )}
            </div>
          </div>
          <div className={editProfile.dateField} data-testid="dateField">
            <p className={editProfile.nameLable} data-testid="DOB">
              Date of Birth
            </p>
            <input
              type="date"
              className={editProfile.dateInput}
              data-testid="dateInput"
              {...register("dob", { required: true })}
            />
            {errors.dob && (
                <span className={editProfile.error}>This field is required</span>
              )}
          </div>
        </div>
        <div>
          <p className={editProfile.genderLabel} data-testid="gender">
            Gender
          </p>
          <div className={editProfile.firstRow} data-testid="genderRadioButton">
            <div
              className={editProfile.radioButton}
              data-testid="maleRadioButton"
            >
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender", { required: true })}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div
              className={editProfile.radioButton}
              data-testid="femaleRadioButton"
            >
              <input
                type="radio"
                id="female"
                value="female"
                defaultChecked
                {...register("gender", { required: true })}
              />
              <label htmlFor="female">Female</label>
            </div>
            {errors.gender &&(
                <span className={editProfile.error}>This field is required</span>
              )}
          </div>
        </div>
        <div className={editProfile.contactInfo} data-testid="contactInfo">
          <div
            className={editProfile.contactInfoheading}
            data-testid="contactInfoheading"
          >
            <p>Contact Information</p>
            <span></span>
          </div>
          <div className={editProfile.firstRow} data-testid="mobileAndMail">
            <div
              className={editProfile.mobileNumber}
              data-testid="mobileNumber"
            >
              <p
                className={editProfile.mobileNumberLabel}
                data-testid="mobileNumberLabel"
              >
                Mobile number
              </p>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className={editProfile.phoneInputContainer}>
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry="IN"
                      placeholder="Enter phone number"
                      className={editProfile.phoneInput}
                      data-testid="phoneInput"
                    />
                  </div>
                )}
              />
            </div>
            <div className={editProfile.email} data-testid="email">
              <p className={editProfile.mailLabel} data-testid="mail">
                Email
              </p>
              <input
                type="email"
                {...register("email", { required: true, 
                            pattern:{
                                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                                message:"invalid mail"
                             }})}
                className={editProfile.mailInputField}
              />
              {errors.email && errors.email.type==="required" &&(
                <span className={editProfile.error}>This field is required</span>
              )}
              {errors.email && errors.email.type==="pattern" &&(
                <span className={editProfile.error}>invalid mail</span>
              )}
            </div>
          </div>
        </div>
        <div className={editProfile.addressBlock}>
          <div
            className={editProfile.myAddressHeading}
            data-testid="myAddressheading"
          >
            <p>My Address</p>
          </div>
          <div className={editProfile.firstRow}>
            <div className={editProfile.myAddress} data-testid="myAddress1">
              <p>Address Line 1</p>
              <input
                type="text"
                {...register("addressLine1", { required: true })}
                className={editProfile.addressInput}
              />
              {errors.addressLine1 &&(
                <span className={editProfile.error}>This field is required</span>
              )}
            </div>
            <div className={editProfile.myAddress} data-testid="myAddress2">
              <p>Address Line 2</p>
              <input
                type="text"
                {...register("addressLine2", { required: true })}
                className={editProfile.addressInput}
              />
            
            </div>
          </div>
          <div className={editProfile.firstRow} data-testid="pincodeAndCity">
            <div className={editProfile.pinCode} data-testid="pincode">
              <p>Pin Code</p>
              <input
                type="text"
                {...register("pinCode", { required: true , pattern:{value:/^[0-9]/, message:"please enter digits only"}})}
                className={editProfile.addressInput}
              />
                {errors.pinCode && errors.pinCode.type==="required" &&(
                <span className={editProfile.error}>PIN Code is required</span>
              )}
              {errors.pinCode && errors.pinCode.type==="pattern" &&(
                <span className={editProfile.error}>please enter digits only</span>
              )}
            </div>
            <div className={editProfile.country} data-testid="city">
              <p>City</p>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    isDisabled={!selectedState}
                    className={editProfile.selectInput}
                  />
                )}
              />
            </div>
          </div>
          <div className={editProfile.firstRow} data-testid="stateAndCountry">
            <div className={editProfile.country} data-testid="state">
              <p>State</p>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={
                      selectedCountry
                        ? getStatesOfCountry(selectedCountry.value)
                        : []
                    }
                    onChange={(val) => {
                      field.onChange(val);
                      setSelectedState(val);
                    }}
                    className={editProfile.stateSelectInput}
                  />
                )}
              />
            </div>
            <div className={editProfile.country} data-testid="country">
              <p>Country</p>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    onChange={(val) => {
                      field.onChange(val);
                      setSelectedCountry(val);
                      setSelectedState(null);
                      setCityOptions([]);
                    }}
                    className={editProfile.selectInput}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <div
              className={editProfile.infiniDetails}
              data-testid="infiniDetails"
            >
              <p>Infinitheism Details</p>
              <span></span>
            </div>
            <div
              className={editProfile.regionalManagerContainer}
              data-testid="regionalManagerContainer"
            >
              <div
                className={editProfile.regionalManager}
                data-testid="regionalManager"
              >
                <p
                  className={editProfile.regionalManagerHeading}
                  data-testid="regionalManagerHeading"
                >
                  My Regional Manager
                </p>
                <Controller
                  name="regionalManager"
                  control={control}
                  defaultValue={{
                    value: "Raj Shekhar",
                    label: "Raj Shekhar",
                  }}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { value: "Raj Shekhar", label: "Raj Shekhar" },
                        { value: "Raj", label: "Raj" },
                        { value: "Shekhar", label: "Shekhar" },
                      ]}
                      className={editProfile.selectInput}
                    />
                  )}
                />
              </div>
              {/* <img
                src={regionalManager}
                alt="regionalManager"
                className={editProfile.regionalManagerPhoto}
                data-testid="regionalManagerPhoto"
              /> */}
            </div>
            <div>
              <div
                className={editProfile.proInvoiceDetails}
                data-testid="proInvoiceDetails"
              >
                <p>Pro Forma Invoice Details</p>
                <span></span>
              </div>
              <div>
                <p
                  className={editProfile.personalInfoName}
                  data-testid="personalInfoInvoice"
                >
                  <input type="radio" name="pro_forma" value="yes" /> 
                  Use my personal information for pro forma invoicing
                </p>
                <p
                  className={editProfile.personalInfoName}
                  data-testid="personalInfoName"
                >
                  <input
                    type="radio"
                    name="pro_forma"
                    value="no"
                    defaultChecked
                  />{" "}
                  Preeti Sharma
                </p>
                <p
                  className={editProfile.personalInfoAddress}
                  data-testid="personalInfoAddress"
                >
                  <span>8598ZA47SDRG11A</span> 123, Sunshine Apartments, Hill
                  Road, Bandra (West), Mumbai, Maharashtra, India - 400050
                </p>
              </div>
            </div>
            <a
              href="#"
              className={editProfile.addProForma}
              data-testid="addProForma"
            >
              + {""} Add new Pro forma invoicing details
            </a>
          </div>
        </div>

        <div className={editProfile.buttonBlock}>
          <button
            className={editProfile.backButton}
            data-testid="backButton"
            // disabled={isLoading}
          >
            Back
          </button>
          <button
            type="submit"
            className={editProfile.updateButton}
            data-testid="updateButton"
            // onClick={}
            // disabled={isLoading}
            >
            update profile
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
