/* eslint-disable react/prop-types */
import edit from "../../assets/images/edit.svg";
import confirmation from "../ProfileConfirmation/index.module.scss";
import user from "../../assets/images/user.png";
import rm from "../../assets/images/rmimage.png";
// import EditForm from "../EditForm";
import { useEffect, useState } from "react";
import Questiones from "../Questionaire";
import { useDispatch } from "react-redux";
import { updateProgress } from "../../actions/AppActions";
import EditProfile from "../EditForm";
// import { updateProgress } from "../../store/AppActions";

const ProfileConfirmation: React.FC = () => {
  // const [Edit, setEdit] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Assuming you want to track completion of Profile Confirmation
  useEffect(() => {
    // setEdit(editMode);
    // console.log("edit",edit);
    // setEdit(false)
    dispatch(updateProgress({ myDetailsCompleted: editMode }));
  }, [editMode]);


  return (
    <div className={confirmation.container}>
      <div className={confirmation.header}>
        <span className={confirmation.heading}>Profile Confirmation</span>
        <div className={confirmation.headicon}>
          <img src={edit} onClick={() => setEditMode(true)} />
          <span>edit profile</span>
        </div>
      </div>
      <div className={confirmation.profile}>
        <div className={confirmation.profile_image}>
          <img src={user} alt="user profile" />
        </div>
        {
        editMode ? (
          // <EditForm />
          <EditProfile />
        ) : (
          <div className={confirmation.profile_details_container}>
            <div className={confirmation.profile_details}>
              <p className={confirmation.name}>Dr. Preeti Sharma</p>
              <div className={confirmation.profile_details_data}>
                <span>32 yrs</span>
                <span className={confirmation.separator}></span>
                <span>F</span>
                <span className={confirmation.separator}></span>
                <span>(+91) 9876543210</span>
                <span className={confirmation.separator}></span>
                <span>preetisharma@gmail.com</span>
              </div>
              <p className={confirmation.profile_details_data}>
                Address: 123, Sunshine Apartments, Hill Road, Bandra (West),
                Mumbai, Maharashtra, India - 400050
              </p>
            </div>

            <div className={confirmation.other_details}>
              <span className={confirmation.name}>Other Information</span>
              <span className={confirmation.horizontalseparator}></span>
              <div className={confirmation.profile_details_data}>
                <span>Jacket Size - Medium</span>
                <span className={confirmation.separator}></span>
                <span>
                  <img src={rm} />
                </span>
                <span className={confirmation.separator}></span>
                <span>Raj Shekhar - Regional Manager</span>
              </div>
            </div>

            <div className={confirmation.other_details}>
              <span className={confirmation.name}>
                Pro forma Invoice Information
              </span>
              <span className={confirmation.horizontalseparator}></span>
              <div className={confirmation.profile_details_data}>
                <span>Preeti Sharma</span>
                <span className={confirmation.separator}></span>
                <span>8598ZA47SDRG11A</span>
              </div>
              <p className={confirmation.profile_details_data}>
                Address: 123, Sunshine Apartments, Hill Road, Bandra (West),
                Mumbai, Maharashtra, India - 400050
              </p>
            </div>
            <Questiones/>

          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileConfirmation;
