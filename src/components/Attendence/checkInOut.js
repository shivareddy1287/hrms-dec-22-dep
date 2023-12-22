import React, { useEffect, useState } from "react";
import Timer from "./timer";
import "./attendence.css";

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiTwotoneHome } from "react-icons/ai";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { attendencePunchInAction } from "../../redux/slices/attendence/attendenceSlices";
import { fetchDetailsProfileAction } from "../../redux/slices/profileSlice/profileSlice";
import AttendenceTimer from "./timer";

// form schema

const formSchema = Yup.object({
  workFrom: Yup.string().required("Work From is Required"),
});

const CheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchDetailsProfileAction(userProfile?.userAuth?._id));
  }, []);

  const profile = useSelector((state) => state.profile);
  const { profileData, userProfloading } = profile;

  const attendance = useSelector((state) => state.attendence);
  const { isPunChedIn } = attendance;

  // console.log(userProfile);
  if (isPunChedIn) {
    console.log("isPunChedIn");
    dispatch(fetchDetailsProfileAction(userProfile?.userAuth?._id));
  }

  const formik = useFormik({
    initialValues: {
      workFrom: "Work from Office",
    },
    onSubmit: (values) => {
      // console
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isPunchIn = profileData?.attendence.some((attendence) => {
    const attendanceDate = new Date(attendence.date);
    const todaysDate = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    attendanceDate.setHours(0, 0, 0, 0);
    todaysDate.setHours(0, 0, 0, 0);

    // console.log("Attendance Date:", attendanceDate);
    // console.log("Today's Date:", attendanceDate.getTime());

    return attendanceDate.getTime() === todaysDate.getTime();
  });
  // console.log(isPunchIn);

  const punchInTime = profileData?.attendence.filter((attendence) => {
    const attendanceDate = new Date(attendence.date);
    const todaysDate = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 for both dates
    attendanceDate.setHours(0, 0, 0, 0);
    todaysDate.setHours(0, 0, 0, 0);

    // console.log("Attendance Date:", attendanceDate);
    // console.log("Today's Date:", attendanceDate.getTime());

    return attendanceDate.getTime() === todaysDate.getTime();
  });

  useEffect(() => {
    const time = punchInTime?.[0]?.date;
    const startTime = new Date(time);
    const currentTime = new Date();
    const secondsElapsed = Math.floor((currentTime - startTime) / 1000);
    console.log(secondsElapsed);
    setDuration(secondsElapsed);
  }, [punchInTime]);

  console.log(userProfloading);

  return (
    <div>
      <div className="bl_a_checkin_card">
        <div className="bl_a_checkin_card_head">
          <h1>Attendence</h1>
        </div>
        {userProfloading ? (
          <p>Loading</p>
        ) : (
          <>
            {isPunchIn ? (
              <div>
                <AttendenceTimer seconds={duration} />
                <button className="butto" disabled={true}>
                  Punch In{" "}
                </button>
                <button className="button">Punch Out</button>
              </div>
            ) : (
              <>
                <div className="bl_a_checkin_card_wf">
                  <p className="bl_a_checkin_card_wf_text">Work Mode </p>

                  <div className="bl_a_checkin_card_wf_inputs">
                    <input
                      type="radio"
                      value="Work from Home"
                      checked={formik.values.workFrom === "Work from Office"}
                      onChange={() =>
                        formik.setFieldValue("workFrom", "Work from Office")
                      }
                      name="workFrom"
                      id="officeRadio"
                    />
                    <label htmlFor="officeRadio">
                      <HiOutlineBuildingOffice2 />
                      Office
                    </label>
                    <input
                      type="radio"
                      value="Work from Office"
                      checked={formik.values.workFrom === "Work from Home"}
                      onChange={() =>
                        formik.setFieldValue("workFrom", "Work from Home")
                      }
                      id="homeRadio"
                      name="workFrom"
                    />

                    <label htmlFor="homeRadio">
                      <AiTwotoneHome />
                      Home
                    </label>
                  </div>
                </div>
                <div className="bl_a_checkin_card_body">
                  <h1>{formattedTime}</h1>
                  <h2>{formattedDate}</h2>

                  <button
                    className="button"
                    onClick={() => {
                      dispatch(
                        attendencePunchInAction({
                          workFrom: formik.values.workFrom,
                          date: currentTime,
                          punchIn: formattedTime,
                        })
                      );
                    }}
                  >
                    Punch In
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckInOut;
