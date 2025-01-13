/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { City, Country, State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from "react-select";
import editPen from "../../assets/images/edit-pen.svg";
import profilePhoto from "../../assets/images/defulat-profile.svg";
import regionalManager from "../../assets/images/regional-manager.svg";
import Loader from "../../common/components/Loader";
import editProfile from "../EditProfile/index.module.scss";
import Overlay from "./Model";
interface UserData {
  field: string;
  value: string | { value: string; label: string };
}

const EditProfile: React.FC = () => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [informationToggle, setInformationToggle] = useState('newInfo');

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

  // useEffect(()=>{
  //   if(informationToggle == 'personal'){
  //     SetInvFullName(getValues().fullName);
  //   }
  // }, [informationToggle])
  const selectedOption = watch(informationToggle);
  const nameValue = watch(getValues('fullName'));
  const add1 = watch('addressLine1');
  const add2 = watch('addressLine2');
  useEffect(() => {
    console.log(getValues(), 'VVVVVVVV');
    if (informationToggle === 'personal') {
      setValue('billingName', getValues('fullName'));
      setValue('invaddressLine1', getValues('addressLine1'));
      setValue('invaddressLine2', getValues('addressLine2'));
      setValue('invpinCode', getValues('pinCode'));
    } else {
      setValue('billingName', getValues(''));
      setValue('invaddressLine1', getValues(''));
      setValue('invaddressLine2', getValues(''));
    }
  }, [informationToggle, setValue, nameValue, selectedOption, add1, add2]);

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
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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

  const paymentHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const BASE_URL = process.env.REACT_APP_PAYMENT_INTEGRATION_URL;
    const IMAGE_URL = process.env.REACT_APP_PAYMENT_IMAGE;
    console.log(IMAGE_URL, "imageURL");
    try {
      const fullName = getValues("fullName");
      const mail = getValues("email");
      const response = await fetch(
        `${BASE_URL}/payment/initiate`,
        //"https://ah5a2chgn8.execute-api.us-east-1.amazonaws.com/dev/payment/initiate",
        {
          method: "POST",
          body: JSON.stringify({
            amount: 1000,
            currency: "INR",
            user_id: 1,
            program_registration_id: 1,
            billing_name: "John Doe",
            billing_address: "123 Main Street, City, Country",
            pan: "ABCDE1234F",
            tan: "TAN12345",
            tax_amount: 100,
            created_by: "admin",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const order = await response.json();
      console.log(order);
      console.log("fullName", fullName, mail);
      const options = {
        key: "rzp_test_G15Zq2XYua59gR",
        amount: order.amount,
        currency: order.currency,
        name: "HDB",
        description: "Test Transaction",
        image: IMAGE_URL,
        order_id: order.id,
        handler: async function (response: any) {
          const emailResponse = await axios.post(
            `${BASE_URL}/sendEmail`,
            //"https://ah5a2chgn8.execute-api.us-east-1.amazonaws.com/dev/sendEmail",
            {
              from: "vinay.dudi@divami.com",
              to: mail,
              name: fullName,
              amount: 100,
              qr: true,
            },
          );
          console.log(IMAGE_URL);
            setShowOverlay(true);
            setIsLoading(false);
          console.log(emailResponse, "as email response");
          console.log(response, " as response from razorpay");
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      setIsLoading(false);
    }
  };

  const onSubmit = (data: Record<string, string>) => {
    // paymentHandler();
    console.log("Form Data:", data);
  };
  console.log(getValues(), 'values');
  console.log(errors, 'error');
  return (
    <div className={editProfile.main} data-testid="main">
      <p className={editProfile.heading} data-testid="heading">
        My TAT Registration Form
      </p>
      <div className={editProfile.profile} data-testid="profile">
        <div className={editProfile.sideBar} data-testid="sideBar"></div>
        <div>
          <div
            className={editProfile.profileConfirmationBlock}
            data-testid="profileConfirmationBlock"
          >
            <div
              className={editProfile.profileConfirmationHeadingBlock}
              data-testid="headingblock"
            >
              <p
                className={editProfile.profileConfirmationHeading}
                data-testid="profileConfirmationHeading"
              >
                Profile Confirmation
              </p>
              <p
                className={editProfile.profileConfirmationcompleted}
                data-testid="completed"
              >
                02/11 answers completed
              </p>
            </div>
            <div
              className={editProfile.profileConfirmationDetails}
              data-testid="profileConfirmationDetails"
            >
              <div
                className={editProfile.profileImageContainer}
                data-testid="profileImageContainer"
              >
                <img
                  src={profilePhoto}
                  alt="profilephoto"
                  data-testid="profilePhoto"
                  className={editProfile.profilePhoto}
                />
                <button className={editProfile.editPen} data-testid="editIcon">
                  <img src={editPen} alt="editpen" data-testid="editPen" />
                </button>
              </div>
              <form
                className={editProfile.profileConfirmationForm}
                data-testid="profileConfirmationForm"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={editProfile.firstRow}>
                  <div
                    className={editProfile.nameField}
                    data-testid="nameField"
                  >
                    <p className={editProfile.nameLable} data-testid="name">
                      Full Name
                    </p>
                    <div
                      className={editProfile.nameInput}
                      data-testid="nameInput"
                    >
                      <select
                        defaultValue="Mr"
                        className={editProfile.nameTitle}
                        data-testid="nameTitle"
                        {...register("title", { required: true })}
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                      </select>
                      <input
                        type="text"
                        className={editProfile.nameInputField}
                        data-testid="nameInputField"
                        {...register("fullName", { required: true })}
                      />
                    </div>
                    {errors.fullName && (
                        <span className={editProfile.error}>
                          This field is required
                        </span>
                      )}
                  </div>
                  <div
                    className={editProfile.dateField}
                    data-testid="dateField"
                  >
                    <p className={editProfile.nameLable} data-testid="DOB">
                      Date of Birth
                    </p>
                    <input
                      type="date"
                      className={editProfile.dateInput}
                      data-testid="dateInput"
                      {...register("dob", { required: true })}
                    />
                  </div>
                </div>
                <div>
                  <p className={editProfile.genderLabel} data-testid="gender">
                    Gender
                  </p>
                  <div
                    className={editProfile.firstRow}
                    data-testid="genderRadioButton"
                  >
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
                        {...register("gender", { required: true })}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <div
                  className={editProfile.contactInfo}
                  data-testid="contactInfo"
                >
                  <div
                    className={editProfile.contactInfoheading}
                    data-testid="contactInfoheading"
                  >
                    <p>Contact Information</p>
                    <span></span>
                  </div>
                  <div
                    className={editProfile.firstRow}
                    data-testid="mobileAndMail"
                  >
                    <div
                      className={editProfile.mobileNumber}
                      data-testid="mobileNumber"
                    >
                      <p
                        className={editProfile.mobileNumberLabel}
                        data-testid="mobileNumberLabel"
                      >
                        Mobile Number
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
                        E-Mail ID
                      </p>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className={editProfile.mailInputField}
                      />
                    </div>
                  </div>
                </div>
                <div className={editProfile.addressBlock}>
                  <div
                    className={editProfile.myAddressHeading}
                    data-testid="myAddressheading"
                  >
                    <p>My Address</p>
                    <span></span>
                  </div>
                  <div className={editProfile.firstRow}>
                    <div
                      className={editProfile.myAddress}
                      data-testid="myAddress1"
                    >
                      <p>Address Line 1</p>
                      <input
                        type="text"
                        {...register("addressLine1", { required: true })}
                        className={editProfile.addressInput}
                      />
                    </div>
                    <div
                      className={editProfile.myAddress}
                      data-testid="myAddress2"
                    >
                      <p>Address Line 2</p>
                      <input
                        type="text"
                        {...register("addressLine2", { required: true })}
                        className={editProfile.addressInput}
                      />
                    </div>
                  </div>
                  <div
                    className={editProfile.firstRow}
                    data-testid="pincodeAndCity"
                  >
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
                  </div>
                  <div
                    className={editProfile.firstRow}
                    data-testid="stateAndCountry"
                  >
                    <div className={editProfile.country} data-testid="city">
                      <p>City</p>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={cityOptions}
                            className={editProfile.selectInput}
                          />
                        )}
                      />
                    </div>
                    <div className={editProfile.pinCode} data-testid="pincode">
                      <p>Pin Code</p>
                      <input
                        type="text"
                        {...register("pinCode", { required: true })}
                        className={editProfile.addressInput}
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
                      <img
                        src={regionalManager}
                        alt="regionalManager"
                        className={editProfile.regionalManagerPhoto}
                        data-testid="regionalManagerPhoto"
                      />
                    </div>
                    <div>
                      <div
                        className={editProfile.proInvoiceDetails}
                        data-testid="proInvoiceDetails"
                      >
                        <p>Pro Forma Invoice Details</p>
                        <span></span>
                      </div>

                      <div className={editProfile.informationToggle}>
                        <div
                        className={editProfile.radioButton}
                        data-testid="personalRadioButton"
                        >
                          <input
                          type="radio"
                          id="personal"
                          value="personal"
                          {...register("informationToggle", { required: true })}
                          onChange={() => setInformationToggle('personal')}
                          />
                          <label htmlFor="personal">Use my personal information for pro forma invoicing</label>
                        </div>
                        <div
                          className={editProfile.radioButton}
                          data-testid="newInfoRadioButton"
                        >
                          <input
                          type="radio"
                          id="newInfo"
                          value="newInfo"
                          defaultChecked
                          {...register("informationToggle", { required: true })}
                          onChange={() => setInformationToggle('newInfo')}
                          />
                          <label htmlFor="newInfo">Add new invoicing details</label>
                        </div>
                      </div>

                      <div>
                        <div className={editProfile.firstRow}>
                          <div
                            className={editProfile.myAddress}
                            data-testid="billingName"
                          >
                            <p>Billing Name</p>
                            <input
                              type="text"
                              {...register("billingName", { required: true })}
                              className={editProfile.addressInput}
                              // value={informationToggle === 'personal' ? getValues('fullName'): ""}
                            />
                            {errors.billingName && (
                              <span className={editProfile.error}>
                                This field is required
                              </span>
                            )}
                          </div>
                          
                        </div>
                        <div className={editProfile.firstRow1}>
                          <div
                            className={editProfile.myAddress}
                            data-testid="billingName"
                          >
                            <p>Address Line 1</p>
                            <input
                              type="text"
                              {...register("invaddressLine1", { required: true })}
                              className={editProfile.addressInput}
                              // value={informationToggle === 'personal' ? getValues('addressLine1'): ""}
                            />
                            {errors.billingName && (
                              <span className={editProfile.error}>
                                This field is required
                              </span>
                            )}
                          </div>
                          <div
                            className={editProfile.myAddress}
                            data-testid="GSTNo"
                          >
                            <p>Address Line 2</p>
                            <input
                              type="text"
                              {...register("invaddressLine2", { required: true })}
                              className={editProfile.addressInput}
                              // value={informationToggle === 'personal' ? getValues('addressLine2'): ""}
                            />
                            {errors.GSTNo && (
                              <span className={editProfile.error}>
                                This field is required
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          className={editProfile.firstRow}
                        >
                          <div
                            className={editProfile.landmark}
                            data-testid="billingName"
                          >
                            <p>Landmark(Optional)</p>
                            <input
                              type="text"
                              {...register("infinilandMark", { required: false })}
                              className={editProfile.landMarkInput}
                            />
                            {errors.infinilandMark && (
                              <span className={editProfile.error}>
                                This field is required
                              </span>
                            )}
                          </div>
                          <div
                          className={editProfile.country}
                          data-testid="country"
                        >
                          <p>Country</p>
                          <Controller
                            name="country"
                            control={control}
                            rules={{ required: 'Country is required' }}
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
                                // {...register("country", { required: true })}
                              />
                            )}
                          />
                          {/* {errors.country && (
                            <span className={editProfile.error}>
                              This field is required
                            </span>
                          )} */}
                        </div>
                        </div>
                      </div>
                      <div
                        className={editProfile.firstRow}
                        data-testid="stateAndCountry"
                      >
                        <div
                          className={editProfile.country}
                          data-testid="state"
                        >
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
                                required
                              />
                            )}
                          />
                        </div>
                        
                      </div>
                      <div className= {editProfile.firstRow}>
                        <div
                            className={editProfile.pinCode}
                            data-testid="pincode"
                          >
                            <p>Pin Code</p>
                            <input
                              type="text"
                              {...register("invpinCode", {
                                required: true,
                                pattern: {
                                  value: /^[0-9]/,
                                  message: "please enter digits only",
                                },
                              })}
                              className={editProfile.addressInput}
                              // value={informationToggle === 'personal' ? getValues('pinCode'): ""}
                            />
                            {errors.pinCode &&
                              errors.pinCode.type === "required" && (
                                <span className={editProfile.error}>
                                  PIN Code is required
                                </span>
                              )}
                            {errors.pinCode &&
                              errors.pinCode.type === "pattern" && (
                                <span className={editProfile.error}>
                                  please enter digits only
                                </span>
                              )}
                          </div>
                          <div
                            className={editProfile.landmark}
                            data-testid="GSTNo"
                          >
                            <p>GST No. for invoice (Optional)</p>
                            <input
                              type="text"
                              {...register("GSTNo", { required: true })}
                              className={editProfile.addressInput}
                            />
                            {errors.GSTNo && (
                              <span className={editProfile.error}>
                                This field is required
                              </span>
                            )}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={editProfile.buttonBlock}>
                  <button
                    className={editProfile.backButton}
                    data-testid="backButton"
                    disabled={isLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={editProfile.updateButton}
                    data-testid="updateButton"
                    // onClick={handleSubmit(onSubmit)}
                    onClick={paymentHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader /> : "Pay"}
                  </button>
                  {showOverlay && <Overlay onClose={() => setShowOverlay(false)} />}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;

