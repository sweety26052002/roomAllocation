import styles from "../LandingPage/index.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import locationIcon from '../../assets/images/location.svg'

const LandingPage = () => {
  //   const availablePrograms:AvailableProgram[] = [
  // {
  //   programName: 'HDB 1',
  //   timeLine: '8Days',
  //   schedule: '29th Sept’24 - 6th Oct’24',
  //   investment: '₹ 2,34,000'
  // }
  //   ]

  function createData(
    programName: string,
    timeline: string,
    schedule: string,
    investment: string,
  ) {
    return { programName, timeline, schedule, investment };
  }

  const rows = [
    createData("HDB 1", "9 Days", "29th Sept’24 - 6th Oct’24", "₹ 2,32,000"),
    createData("HDB 2", "5 Days", "29th Sept’24 - 6th Oct’24", "₹ 2,56,000"),
    createData("HDB 3", "4 Days", "29th Sept’24 - 6th Oct’24", "₹ 2,42,000"),
    createData("HDB 4", "6 Days", "29th Sept’24 - 6th Oct’24", "₹ 2,76,000"),
    createData("HDB 5", "7 Days", "29th Sept’24 - 6th Oct’24", "₹ 2,12,000"),
  ];

  return (
    <div className={styles.landingPageWrapper}>
      {/* <table className={styles.programsTable}>
        <tr>
          <th>Program Name</th>
          <th>Timeline</th>
          <th>Schedule</th>
          <th>Investment (Inc. Taxes)</th>
        </tr>
      </table> */}
      <div className={styles.landingPage}>
        <div className={styles.pageHeading}>
          Welcome to
          <span className={styles.mahatriaName}> Mahatria&#39;s </span> HDB
          program, an invite-only experience.
        </div>
        <div className={styles.pageDescription}>
          HDB is an unparalleled 8-day residential spiritual retreat with
          Mahatria. Thousands of seekers who have had the privilege to
          experience HDB, consider it a re-birth in all dimensions of human life
          - psychological, emotional, and spiritual.
        </div>
        <div className={styles.availableProgramsTitle}>
          Here are the available program details
        </div>

        <div className={styles.availableProgramsTable}>
          <TableContainer
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 10px 50px 0px rgba(232, 241, 249, 0.40);",
              border: "1px solid #E7EEF3",
            }}
          >
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: "1px solid #E7EEF3" }}>
                    Program Name
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #E7EEF3" }}
                    align="right"
                  >
                    Timeline
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #E7EEF3" }}
                    align="right"
                  >
                    Schedule
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "1px solid #E7EEF3" }}
                    align="right"
                  >
                    Investment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.programName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ borderBottom: "1px solid #E7EEF3" }}
                      component="th"
                      scope="row"
                    >
                      {row.programName}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: "1px solid #E7EEF3" }}
                      align="right"
                    >
                      {row.timeline}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: "1px solid #E7EEF3" }}
                      align="right"
                    >
                      {row.schedule}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: "1px solid #E7EEF3" }}
                      align="right"
                    >
                      {row.investment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={styles.addressAndButtons}>
          <div className={styles.locationSection}>
            <img src={locationIcon} className={styles.locationIcon} alt="location" />
            <div className={styles.venue}>
            Venue : Leonia Resort, Hyderabad, Telangana
            </div>
            <a className={styles.viewOnMap} href="#">
                view on map
            </a>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.registerNowBtn}>register now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
