import React, { useState } from "react";
import styles from "./index.module.scss";
import backArrow from "../../assets/images/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import razorPay from "../../assets/images/razor-pay.svg";
import { DateInputField } from "../../common/components/DateInputField/DateInputField";
import { DropdownField } from "../../common/components/DropdownField/Dropdownfield";
import { InputField } from "../../common/components/InputField/InputField";

const MakeInvestment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [gstSelection, setGstSelection] = useState("");

  const handleChange = (method: string): void => {
    setSelectedMethod(method);
  };
  const navigateBakeToProfileConfirmaiton = () => {
    navigate("/profile-confiramation");
  };
  const handleDropdownChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <div className={styles.main}>
      <div
        className={styles.navigateBack}
        onClick={navigateBakeToProfileConfirmaiton}
      >
        <img
          src={backArrow}
          alt="backArrow"
          className={styles.navigateBackImage}
        />
        <p className={styles.navigateBackHeading}>Make Investment </p>
      </div>
      <div className={styles.body}>
        <div className={styles.GSTBlock}>
          <h2 className={styles.GSTBlockHeading}>
            Do you have an Indian GST No.?
          </h2>
          <div className={styles.GSTBlockBody}>
            <label className={styles.noRadioButton}>
              <input
                type="radio"
                name="gst"
                value="no"
                onChange={() => setGstSelection("no")}
              />{" "}
              No
            </label>
            <label className={styles.yesRadioButton}>
              <input
                type="radio"
                name="gst"
                value="yes"
                onChange={() => setGstSelection("yes")}
                className={styles.yesRadioButtonInput}
              />{" "}
              Yes
              <input
                type="text"
                placeholder="Enter Indian GST no."
                className={styles.GSTInput}
              />
            </label>
          </div>
          {gstSelection === "no" && (
            <div className={styles.unregisteredGSTMessage}>
              This transaction will be under “unregistered category in our GST
              return” if you do not provide your GSTIN
            </div>
          )}
        </div>
        <div className={styles.invoiceDetails}>
          <h2 className={styles.invoiceDetailsHeading}>
            Invoice Details{" "}
            <span className={styles.invoiceDetailsNote}>
              (Invoice details cannot be changed post submission)
            </span>
          </h2>
          <label className={styles.invoiceRadioButtonBlock}>
            <input
              type="radio"
              name="invoice"
              className={styles.invoiceRadioButton}
            />{" "}
            Use my pro forma invoice for invoicing
          </label>
          <div className={styles.invoiceName}>
            <p className={styles.invoiceNameLabel}>Invoice name</p>
            <input
              type="text"
              placeholder="Invoice name"
              className={styles.invoiceNameInput}
            />
          </div>
          <div className={styles.invoiceAddress}>
            <p className={styles.invoiceAddressLabel}>Address</p>
            <input
              type="text"
              placeholder="Address"
              className={styles.invoiceAddressInput}
            />
          </div>
          <div className={styles.invoicePincode}>
            <p className={styles.invoicePincodeLabel}>Pin Code</p>
            <input
              type="text"
              placeholder="Pin Code"
              className={styles.invoicePincodeInput}
            />
          </div>
        </div>
        <div className={styles.TDSForm}>
          <h2 className={styles.TDSFormHeading}>
            Would you like to have a TDS?
          </h2>
          <p className={styles.TDSFormLabel}>TDS amount ( optional)</p>
          <input
            type="text"
            placeholder="Enter TDS amount (optional)"
            className={styles.TDSFormInput}
          />
        </div>
        <div className={styles.paymentMethods}>
          <h2 className={styles.paymentMethodsHeading}>Payment Method</h2>
          <div className={styles.methods}>
            <label className={styles.methodTypes}>
              <input
                type="radio"
                name="payment"
                onChange={() => handleChange("gateway")}
                className={styles.methodTypesInput}
              />{" "}
              Investment gateway
            </label>
            <label className={styles.methodTypes}>
              <input
                type="radio"
                name="payment"
                onChange={() => handleChange("cheque")}
                className={styles.methodTypesInput}
              />{" "}
              Cheque/DD
            </label>
            <label className={styles.methodTypes}>
              <input
                type="radio"
                name="payment"
                onChange={() => handleChange("bank")}
                className={styles.methodTypesInput}
              />{" "}
              Bank transfer
            </label>
            <label className={styles.methodTypes}>
              <input
                type="radio"
                name="payment"
                onChange={() => handleChange("card")}
                className={styles.methodTypesInput}
              />{" "}
              Card Swipe
            </label>
            <label className={styles.methodTypes}>
              <input
                type="radio"
                name="payment"
                onChange={() => handleChange("cash")}
                className={styles.methodTypesInput}
              />{" "}
              Cash
            </label>
          </div>
          {selectedMethod === "gateway" && (
            <div className={styles.gateway}>
              <div className={styles.gatewayName}>
                <img
                  src={razorPay}
                  alt="razorPay-image"
                  className={styles.gatewayImage}
                />
                <p>Invest Via Razorpay Gateway</p>
              </div>
              <div className={styles.gatewayLink}>
                {" "}
                <a>
                  You will be redirected to the payment gateway upon submitting
                  the form{" "}
                </a>
              </div>
            </div>
          )}
          {selectedMethod === "cheque" && (
            <div>
              <div className={styles.amountAndCheque}>
                <InputField
                  placeholder="2,34,000"
                  label="Amount"
                  type="text"
                  name="amount"
                  disabled={true}
                  onChange={() => {}}
                  className={styles.amountInputContainer}
                  inputClassName={styles.amountTextFieldInput}
                  labelClassName={styles.amountTextFieldLabel}
                />
                <InputField
                  placeholder="12345"
                  label="Cheque "
                  type="text"
                  name="chequeNo"
                  onChange={() => {}}
                  className={styles.amountInputContainer}
                  inputClassName={styles.chequeTextFieldInput}
                  labelClassName={styles.amountextFieldLabel}
                />
              </div>
              <div className={styles.amountAndCheque}>
                <DropdownField
                  label="Bank Name"
                  options={[
                    { value: "", label: "-Select-" },
                    {
                      value: "option1",
                      label: "option1",
                    },
                    { value: "option2", label: "option2" },
                  ]}
                  name="paymentMethod"
                  onChange={() => {}}
                  defaultValue=""
                  className={styles.CardSwipeDropDown}
                  labelClassName={styles.dropdownLabel}
                  selectClassName={styles.CardSwipedropdownSelect}
                />

                <DateInputField
                  label="Cheque Date"
                  name="date"
                  onChange={() => {}}
                  className={styles.chequeDate}
                  classLabel={styles.chequeDateInputLabel}
                  classInput={styles.chequeDateInput}
                />
              </div>
              <div className={styles.amountAndCheque}>
                <DropdownField
                  label="Handed over to "
                  options={[
                    { value: "", label: "-Select-" },
                    {
                      value: "Swiped at the office",
                      label: "Swiped at the office",
                    },
                    { value: "Raj Shekhar", label: "Raj Shekhar" },
                    { value: "Chandra Harsha", label: "Chandra Harsha" },
                    { value: "Smriti Chawla", label: "Smriti Chawla" },
                    { value: "Jitesh Guntur", label: "Jitesh Guntur" },
                  ]}
                  name="Handover Date"
                  onChange={() => {}}
                  defaultValue=""
                  className={styles.CardSwipeDropDown}
                  labelClassName={styles.dropdownLabel}
                  selectClassName={styles.CardSwipedropdownSelect}
                />

                <DateInputField
                  label="Cheque Date"
                  name="date"
                  onChange={() => {}}
                  className={styles.chequeDate}
                  classLabel={styles.chequeDateInputLabel}
                  classInput={styles.chequeDateInput}
                />
              </div>
            </div>
          )}
          {selectedMethod === "bank" && <div>Bank transfer details</div>}
          {selectedMethod === "card" && (
            <div>
              <div className={styles.inputRow}>
                <DateInputField
                  label="Date"
                  name="date"
                  onChange={() => {}}
                  className={styles.InputContainerCardSwipe}
                  classLabel={styles.dateInputLabel}
                  classInput={styles.dateInput}
                />
                <InputField
                  placeholder="Enter reference no. "
                  label="Amount"
                  type="text"
                  name="amount"
                  onChange={() => {}}
                  className={styles.InputContainerCardSwipe}
                  inputClassName={styles.textFieldInput}
                  labelClassName={styles.textFieldLabel}
                />
              </div>
              <DropdownField
                label="Payment Method"
                options={[
                  { value: "", label: "-Select-" },
                  {
                    value: "Swiped at the office",
                    label: "Swiped at the office",
                  },
                  { value: "Raj Shekhar", label: "Raj Shekhar" },
                  { value: "Chandra Harsha", label: "Chandra Harsha" },
                  { value: "Smriti Chawla", label: "Smriti Chawla" },
                  { value: "Jitesh Guntur", label: "Jitesh Guntur" },
                ]}
                name="paymentMethod"
                onChange={() => {}}
                defaultValue=""
                className={styles.CardSwipeDropDown}
                labelClassName={styles.dropdownLabel}
                selectClassName={styles.CardSwipedropdownSelect}
              />
            </div>
          )}
          {selectedMethod === "cash" && (
            <div className={styles.datefield}>
              <DateInputField
                label="Cash Handover Date"
                name="cashHandoverDate"
                onChange={() => {}}
                className={styles.InputContainer}
                classLabel={styles.dateInputLabel}
                classInput={styles.dateInput}
              />
              <DropdownField
                label="Handed over to "
                options={[
                  { value: "", label: "-Select-" },
                  {
                    value: "Swiped at the office",
                    label: "Swiped at the office",
                  },
                  { value: "Raj Shekhar", label: "Raj Shekhar" },
                  { value: "Chandra Harsha", label: "Chandra Harsha" },
                  { value: "Smriti Chawla", label: "Smriti Chawla" },
                  { value: "Jitesh Guntur", label: "Jitesh Guntur" },
                ]}
                name="dropdown"
                onChange={handleDropdownChange}
                defaultValue=""
                className={styles.InputContainer}
                labelClassName={styles.dropdownLabel}
                selectClassName={styles.dropdownSelect}
              />
            </div>
          )}
        </div>
      </div>
      <footer className={styles.footer}>
        <button className={styles.backButton}>Back</button>
        <button className={styles.submitButton}>Submit</button>
      </footer>
    </div>
  );
};

export default MakeInvestment;
