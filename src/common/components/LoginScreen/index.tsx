import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from '../../common/components/Button';
import Button from "../../../common/components/Button";
import styles from "./index.module.scss";
// import cloudFadeEffectImage from '../../assets/images/cloud-fade-effect@2x.png';
// import editIconImage from '../../assets/images/edit-icon-image.svg';
import { useForm } from "react-hook-form";
import { postCall } from "../../../services/apiGetService";
import {
  setItemInLocalStorage,
  removeItemInLocalStorage,
  getItemInLocalStorage,
} from "../../../services/localStorage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import Loader from '../../common/components/Loader';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loader from "../Loader";
import { endPoints } from "../../constants/urlConstants";

// import AnimationLogin from '../../common/components/AnimationLogin';
// import { endPoints } from '../../common/constants/urlConstants';
// import { useDispatch, useSelector } from 'react-redux';
// import { StoreRMDetails } from '../../reducers/AllSeekersData';
// import entrainment from '../../assets/images/entrainment.webp';

const LoginScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordField, setpasswordField] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [newPassword, setNewPassword] = useState(false);
  // const schema = yup.object().shape({
  //   userName: yup.string().required('User name is required'),
  //   password: yup.string().required('Password is required'),
  //   newPassword: yup
  //     .string()
  //     // .required('Password is required')
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //       'Password must be at least 8 characters long 1 uppercase, 1 lowercase, 1 number and 1 special character'
  //     ),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  // });

  const schema = yup.object().shape({
    userName: yup.string().required("Enter a valid email address"),
    password: yup.string().test({
      name: "password",
      message: "Password is required",
      test: function (value) {
        if (passwordField && !value) {
          return false;
        }
        return true;
      },
    }),
    newPassword: yup.string().test({
      name: "newPassword",
      message:
        "Password must be at least 8 characters long with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      test: function (value) {
        if (!passwordField) {
          return value
            ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                value,
              )
            : false;
        }
        return true;
      },
    }),
    confirmPassword: yup.string().test({
      name: "confirmPassword",
      message: "Passwords must match",
      test: function (value) {
        if (!passwordField && value !== this.parent.newPassword) {
          return false;
        }
        return true;
      },
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
    // setValue,
    watch,
    // getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const username = watch("userName");
  const password = watch("password");
  useEffect(() => {
    setError(false);
  }, [username]);
  useEffect(() => {
    setError(false);
  }, [password]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = getItemInLocalStorage("token");
    if (token) {
      removeItemInLocalStorage("token");
      // navigate('/admin-dashboard',{replace:true});
    }
  }, []);

  // console.log(errors);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleForgotPassword = () => {
  //   setpasswordField(false);
  //   // setNewPassword(true);
  // };

  const forgotPasswordApi = () => {
    // const forgotPasswordPayload = {
    //   userName: data.userName,
    //   newPassword: data.newPassword,
    // };
    // console.log('forgot password api called', forgotPasswordPayload);
  };

  // const checkAccessForQrCheckin = (roleName: string) => {
  //   if (roleName?.includes('Regional') || roleName?.includes('Travel')) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const payload = {
      email: data.userName,
      password: data.password,
      ...(window?.location?.href?.includes("qrscan") && { isQrCode: true }),
    };
    setLoading(true);
    // try {
    //   setLoading(true);
    //   const response = await postCall('auth/login', payload);

    //   setItemInLocalStorage('token', response.data.data.token);
    //   setItemInLocalStorage('roleName', response.data.data.roleName);
    //   setItemInLocalStorage('userName', response.data.data?.userName);
    //   setItemInLocalStorage('userId', response.data.data?.userId);
    //   // console.log(response.data.data.roleName, 'rolename');
    //   // console.log(data);
    //   if (window.innerWidth >= 1024) {
    //     if (response.data.data.token !== '') {
    //       navigate('/admin-dashboard');
    //     }
    //   } else {
    //     if (response.data.data.token !== '') {
    //       navigate('/admin/checkin-dashboard');
    //     }
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   setError(true);
    //   // console.log(error);
    // }

    await postCall(endPoints?.login, payload)
      .then((response) => {
        if (response?.status === 200) {
          setItemInLocalStorage("token", response.data.data.token);
          setItemInLocalStorage("roleName", response.data.data.roleName);
          setItemInLocalStorage("userName", response.data.data?.userName);
          setItemInLocalStorage("userId", response.data.data?.userId);

          // if (window.innerWidth >= 1024) {
          if (response.data.data.token !== "") {
            navigate("/room-allocation");
          }
          // } else {
          //   if (
          //     response.data.data.token !== '' &&
          //     checkAccessForQrCheckin(response.data.data.roleName)
          //   ) {
          //     navigate('/admin/checkin-dashboard');
          //   } else {
          //     setLoading(false);
          //     setError(true);
          //     setErrorMsg('Access denied');
          //   }
          // }
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorMsg(error?.length > 0 ? error : "Invalid credentials");
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (data: any) => {
    if (passwordField) {
      onSubmit(data);
    } else {
      forgotPasswordApi(data);
    }
  };

  const toggleEyeForPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleEyeForNewPassword = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  // const toggleEyeForConfirmPassword = () => {
  //   setConfirmPasswordVisible(!confirmPasswordVisible);
  // };

  return (
    // loading ? (
    //   <Loader />
    // ) : (
    <div className={styles.organisationLandingPage}>
      {loading && <Loader />}
      {/* <img
        className={styles.bgImageIcon}
        alt=""
        src="../../assets/images/BG.svg"
      /> */}
      {/* <div className={styles.bgImageIcon}>
        <AnimationLogin />
      </div>
      <div className={styles.bgImageIconn}>
        <AnimationLogin />
      </div> */}
      {/* <img
        className={styles.entrainmentLogo}
        src="../../assets/images/admin-login-logo.svg"
        alt=""
      /> */}
      <div className={styles.cardsWrapper}>
        {/* <div className={styles.entrainmentLogoContainer} > */}

        {/* </div> */}
        <div className={styles.cards}>
          <div className={styles.signUpSection1}>
            <div className={styles.signUpContainer}>
              <div className={styles.signIn}>
                {/* <img
                  src={entrainment}
                  alt="entrainment logo"
                  className={styles.entrainmentLogos}
                /> */}
                {/* <img
                  src="../../assets/images/signin-img.svg"
                  alt="Sign-in image"
                /> */}
              </div>
              <div className={styles.info}>
                {/* To manage Your Account and Access Administrative Functions */}
              </div>
              {/* <img className={styles.icons} alt="" src="/icons1.svg" /> */}
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className={styles.formTag}
            >
              <div className={styles.formFields}>
                <div className={styles.form}>
                  <div className={styles.fieldGroup}>
                    <div className={styles.text}>Email address</div>
                    <div className={styles.formContainer}>
                      <input
                        className={styles.input}
                        placeholder="Enter your email"
                        type="text"
                        {...register("userName", { required: true })}
                      />
                    </div>
                    {errors.userName && (
                      <i className={styles.error}>
                        {errors.userName.message?.toString()}
                      </i>
                    )}
                  </div>
                  {/* {passwordField && (
                    <div className={styles.fieldGroup}>
                      <div className={styles.text}>Password</div>
                      <div className={styles.formContainer}>
                        <input
                          className={styles.input}
                          placeholder="Enter your password"
                          type="password"
                          {...register('password', { required: true })}
                        />
                      </div>
                      {errors.password && (
                        <i className={styles.error}>
                          {errors.password.message?.toString()}
                        </i>
                      )}
                    </div>
                  )}
                  {newPassword && (
                    <div className={styles.fieldGroup}>
                      <div className={styles.text}>New password</div>
                      <div className={styles.formContainer}>
                        <input
                          className={styles.input}
                          placeholder="New password"
                          type="password"
                          {...register('newPassword', { required: true })}
                        />
                      </div>
                      {errors.newPassword && (
                        <i className={styles.error}>
                          {errors.newPassword.message?.toString()}
                        </i>
                      )}
                    </div>
                  )}
                  {newPassword && (
                    <div className={styles.fieldGroup}>
                      <div className={styles.text}>Confirm new password</div>
                      <div className={styles.formContainer}>
                        <input
                          className={styles.input}
                          placeholder="Confirm new password"
                          type="password"
                          {...register('confirmPassword', { required: true })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <i className={styles.error}>
                          {errors.confirmPassword.message?.toString()}
                        </i>
                      )}
                    </div>
                  )} */}

                  {passwordField ? (
                    <div className={styles.fieldGroupPassword}>
                      <div className={styles.text}>Password</div>
                      <div className={styles.formContainer}>
                        <input
                          className={styles.input}
                          placeholder="Enter your password"
                          // type="password"
                          type={newPasswordVisible ? "text" : "password"}
                          {...register("password", { required: true })}
                        />
                        {newPasswordVisible ? (
                          <RemoveRedEyeIcon
                            className={styles.eyeIcon}
                            onClick={toggleEyeForNewPassword}
                          />
                        ) : (
                          <VisibilityOffIcon
                            className={styles.eyeIcon}
                            onClick={toggleEyeForNewPassword}
                          />
                        )}
                      </div>
                      {errors.password && (
                        <i className={styles.error}>
                          {errors.password.message?.toString()}
                        </i>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className={styles.fieldGroup}>
                        <div className={styles.text}>New password</div>
                        <div className={styles.formContainerPassword}>
                          <input
                            className={styles.input}
                            placeholder="New password"
                            type="password"
                            {...register("newPassword", { required: true })}
                          />
                          {passwordVisible ? (
                            <RemoveRedEyeIcon
                              className={styles.eyeIcon}
                              onClick={toggleEyeForPassword}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className={styles.eyeIcon}
                              onClick={toggleEyeForPassword}
                            />
                          )}
                        </div>
                        {errors.newPassword && (
                          <i className={styles.error}>
                            {errors.newPassword.message?.toString()}
                          </i>
                        )}
                      </div>
                      <div className={styles.fieldGroup}>
                        <div className={styles.text}>Confirm new password</div>
                        <div className={styles.formContainer}>
                          <input
                            className={styles.input}
                            placeholder="Confirm new password"
                            type="password"
                            {...register("confirmPassword", { required: true })}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <i className={styles.error}>
                            {errors.confirmPassword.message?.toString()}
                          </i>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {error &&
                !errors.newPassword &&
                !errors.userName &&
                !errors.password && (
                  <i className={styles.errorCreds}>{errorMsg}</i>
                )}
              <div className={styles.buttonContainer}>
                {/* {passwordField && (
                  <Button buttonClassName={styles.submitButton} type="submit">
                    sign in
                  </Button>
                )}
                {newPassword && (
                  <Button buttonClassName={styles.submitButton} type="submit">
                    submit
                  </Button>
                )} */}
                {passwordField ? (
                  <Button buttonClassName={styles.submitButton} type="submit">
                    sign in
                  </Button>
                ) : (
                  <Button buttonClassName={styles.submitButton} type="submit">
                    submit
                  </Button>
                )}
                {/* forgot password text here */}
                {/* <div className={styles.forgotPassword}>
                  Forgot password?{' '}
                  <span
                    className={styles.resetPassword}
                    onClick={handleForgotPassword}
                  >
                    Reset Password
                  </span>
                </div> */}
              </div>
            </form>
          </div>
          <div className={styles.signUpSection2}>
            <div className={styles.textIcon}>
              {/* <img className={styles.icons1} alt="" src="/icons2.svg" /> */}
              <div className={styles.forgotPasswordResetContainer}>
                {/* <span>{`Forgot password? `}</span> */}
                {/* <span className={styles.resetPassword}>Reset Password</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // );
};

export default LoginScreen;
