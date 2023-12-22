import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Navigate, Link } from "react-router-dom";
import { fetchSingleTeamAction } from "../../../redux/slices/team/teamSlice";
import Loader from "../../../utils/Loader/Loader";

const OrgViewProjectTeam = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleTeamAction(id));
  }, [dispatch, id]);

  const Team = useSelector((state) => state?.team);
  const { singleTeam, loading, appErr, serverErr } = Team;
  const { TeamName } = singleTeam ? singleTeam : "";

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="cs_div_profile">
          <div className="cs_edit_div">
            <div>
              <Link
                to={`/organization/team`}
                className="cs_edit_employee_head_div"
              >
                <div>
                  <svg
                    className="cs_font_icons"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </div>
                <div>
                  <h2 className="cs_edit_employee_head"> View Team</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                <h1 className="cs_edit_side_head">Team</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Team Name:</h1>

                      <h1 className="cs_view_right_input">{TeamName}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/organization/team`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgViewProjectTeam;
