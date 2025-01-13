/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, createContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./index.module.scss";
import RoomCard from "../../RoomCard";
import RoomAllocationKPI from "../../RoomAllocationKPI";
import filterIcon from "../../../assets/images/filter-icon.svg";
import searchIcon from "../../../assets/images/search-icon.svg";
// import deleteIcon from "../../../assets/images/delete-icon.svg";
// import unpairSeeker from "../../../assets/images/unpair-seekers-icon.svg";
// import backIcon from "../../../assets/images/allocation-back-icon.svg";
import SeekerCard from "../../SeekerCard";
import SeekerOccupantCard from "../../SeekerOccupantCard";
import CommonTextField from "../../../common/components/SearchField";
import CustomModal from "../../CustomModal";
import RoomAllocationFilterPopUp from "../../RoomAllocationFilterPopUp";
import ImageAndText from "../../ImageAndText";
import crossIcon from "../../../assets/images/crossIcon.svg";
import crossHoverIcon from "../../../assets/images/crossIconHover.svg";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pairIcon from "../../../assets/images/pairIcon.svg";
import pairedIcon from "../../../assets/images/pairedIcon.svg";
import unpairIcon from "../../../assets/images/UnpairIcon.svg";
import mahatriaIcon from "../../../assets/images/rules-icon.svg";
import {
  deleteCall,
  getCall,
  postCall,
  putCall,
} from "../../../services/apiGetService";
import Loader from "../../../common/components/Loader";
// import AlertDialog from "../../../common/components/AlertDialogue";
import { abbreviateGender, calculateAge } from "../../../utils/functions";
// import { reload } from "firebase/auth";
import { UpdateReloadType } from "../../../reducers/FilterReducer";
import { useSelector } from "react-redux";
import { getItemInLocalStorage } from "../../../services/localStorage";
import { endPoints } from "../../../common/constants/urlConstants";
import { Select, MenuItem, Tooltip } from "@mui/material";
import dropDownIcon from "../../../assets/images/dropdown-icon.svg";
import AlertDialog from "../../../common/components/AlertDialogue";
import refreshIcon from "../../../assets/images/icons8-refresh.svg";
import {
  checkRoomisOccupied,
  editRoomAllocationForPair,
  getOtherRoommateId,
  handleRoomAllocateForPair,
  pairYetToAssignSeekers,
  unallocateRoomForPair,
} from "./allocateRoomsUtils";
import BorderButton from "../../../common/components/BorderButton";
import RuleEnginePopUp from "../../RuleEnginePopUp";

const ItemType = {
  USER: "USER",
};
interface KPIData {
  status: string;
  status_count: number;
}
interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: string;
  name: string;
  age: number;
  city: string;
  profile: string | null;
  gender: string;
}

interface SelectedFilters {
  floor: string[];
  roomStatus: string[];
  gender: string[];
  age: string[];
  location: string[];
}

const PairContext = createContext();
const initialRooms = [
  {
    floor: "floor-1",
    roomId: "101",
    capacity: 2,
    occupants: [
      { id: "o1101", value: null },
      { id: "o1102", value: null },
    ],
  },
  {
    floor: "floor-1",
    roomId: "102",
    capacity: 3,
    occupants: [
      { id: "o11021", value: null },
      { id: "o11022", value: null },
      { id: "o11023", value: null },
    ],
  },
  {
    floor: "floor-1",
    roomId: "103",
    capacity: 2,
    occupants: [
      { id: "o11031", value: null },
      { id: "o11032", value: null },
    ],
  },
  {
    floor: "floor-2",
    roomId: "201",
    capacity: 3,
    occupants: [
      { id: "o22011", value: null },
      { id: "o22012", value: null },
      { id: "o22013", value: null },
    ],
  },
  {
    floor: "floor-2",
    roomId: "202",
    capacity: 2,
    occupants: [
      { id: "o22021", value: null },
      { id: "o22022", value: null },
    ],
  },
  {
    floor: "floor-2",
    roomId: "203",
    capacity: 3,
    occupants: [
      { id: "o22031", value: null },
      { id: "o22032", value: null },
      { id: "o22033", value: null },
    ],
  },
  {
    floor: "floor-3",
    roomId: "301",
    capacity: 2,
    occupants: [
      { id: "o33011", value: null },
      { id: "o33012", value: null },
    ],
  },
  {
    floor: "floor-3",
    roomId: "302",
    capacity: 3,
    occupants: [
      { id: "o33021", value: null },
      { id: "o33022", value: null },
      { id: "o33023", value: null },
    ],
  },
  {
    floor: "floor-3",
    roomId: "303",
    capacity: 3,
    occupants: [
      { id: "o33031", value: null },
      { id: "o33032", value: null },
      { id: "o33033", value: null },
    ],
  },
  {
    floor: "floor-4",
    roomId: "401",
    capacity: 2,
    occupants: [
      { id: "o44011", value: null },
      { id: "o44012", value: null },
    ],
  },
];

//Unassigned drag for paired seekers in usersList
const User = ({
  user,
  setSelectedSeekers,
  selectedSeekers,
  pairCodes,
  index,
  users,
  setLoader,
  setCheckReload,
  setToastState,
  dataLength,
}: {
  user: User;
  setSelectedSeekers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedSeekers: User[];
  pairCodes: Array<number>;
  index: number;
  users: User[];
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>;
  setToastState: React.Dispatch<
    React.SetStateAction<{ message: string; open: boolean }>
  >;
  dataLength: number;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.USER,
      item: () => {
        return { user };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [user],
  );

  const handleSelectSeekers = (user: User) => {
    const selectedSeekerIds = selectedSeekers?.map((seeker) => seeker?.id);
    if (
      !user?.isPaired &&
      selectedSeekers?.[0]?.isPaired &&
      selectedSeekers?.[1]?.isPaired &&
      dataLength > 1
    ) {
      setSelectedSeekers([user]);
    } else if (
      user?.isPaired &&
      selectedSeekers?.[0]?.pairCode === user?.pairCode
    ) {
      setSelectedSeekers([]);
    } else if (user?.isPaired) {
      const seekerPairedWith = users?.filter(
        (item) => item?.pairCode === user?.pairCode,
      );
      // console.log("seekerPairedWith", seekerPairedWith);
      setSelectedSeekers(seekerPairedWith);
    } else if (
      selectedSeekers?.length < 2 &&
      !selectedSeekers?.includes(user) &&
      dataLength > 1
    ) {
      setSelectedSeekers((prev) => [...prev, user]);
    } else if (selectedSeekerIds?.includes(user?.id)) {
      setSelectedSeekers((prev) =>
        prev.filter((seeker) => seeker?.id !== user?.id),
      );
    } else if (dataLength > 1) {
      // alert("MAX two seekers only");
      setToastState({
        message: "You can select only two seekers to pair",
        open: true,
      });
    }
  };

  // console.log(user, "UsersList", pairCodes);
  // console.log(
  //   "selectedSeekersInSidePanel",
  //   selectedSeekers,
  //   user,
  //   selectedSeekers?.includes(user),
  // );
  return (
    <>
      {user?.pairCode ? (
        <div
          className={` ${isDragging ? styles.userItemDragging : ""}`}
          onClick={() => handleSelectSeekers(user)}
        >
          <SeekerCard
            profile={user.profile}
            gender={user.gender}
            name={user.name}
            age={user.age}
            city={user.city}
            selectedSeekerIds={selectedSeekers?.map((seeker) => seeker?.id)}
            userId={user.id}
            pairCodes={pairCodes}
            index={index}
            userPairCode={user?.pairCode}
            setLoader={setLoader}
            setCheckReload={setCheckReload}
            setSelectedSeekers={setSelectedSeekers}
          />
        </div>
      ) : (
        <div
          ref={drag}
          className={` ${isDragging ? styles.userItemDragging : ""}`}
          onClick={() => handleSelectSeekers(user)}
        >
          <SeekerCard
            profile={user.profile}
            gender={user.gender}
            name={user.name}
            age={user.age}
            city={user.city}
            selectedSeekerIds={selectedSeekers?.map((seeker) => seeker?.id)}
            userId={user.id}
            pairCodes={pairCodes}
            index={index}
            userPairCode={user?.pairCode}
            setLoader={setLoader}
            setCheckReload={setCheckReload}
            setSelectedSeekers={setSelectedSeekers}
          />
        </div>
      )}
    </>
  );
};

interface OccupantSlotProps {
  occupantId: string;
  occupant: User | null;
  roomvalue: Room;
  onDropUser: (user: User, occupantId: string) => void;
  onCheckboxChange: (
    isChecked: boolean,
    occupant: User | null,
    roomId: string,
  ) => void;
  roomId: string;
  clear: boolean;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  ispairHighlight: boolean;
  setIsPairHighlight: React.Dispatch<React.SetStateAction<boolean>>;
}

//Unassigned drag for paired seekers in rooms
// const OccupantSlot: React.FC<OccupantSlotProps> = ({
//   occupantId,
//   occupant,
//   roomvalue,
//   onDropUser,
//   onCheckboxChange,
//   roomId,
//   clear,
//   setIsClicked,
//   isClicked,
// }) => {
//   // const [isClicked, setIsClicked] = useState(false);

//   const handleCardClick = () => {
//     setIsClicked(!isClicked);
//     // onCheckboxChange(!isClicked, occupant, roomId);
//     if (roomvalue) {
//       roomvalue.occupants.map((item) => {
//         if (item?.value?.programRegistrationId) {
//           onCheckboxChange(!isClicked, item?.value, roomId);
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     setIsClicked(false);
//   }, [clear]);

//   const [, drop] = useDrop({
//     accept: ItemType.USER,
//     drop: (item: { user: User }) => onDropUser(item.user, occupantId),
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType.USER,
//     item: {
//       user: occupant,
//     },

//     canDrag: !!occupant,
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   // console.log("profilee", occupant);
//   return (
//     <>
//       {" "}
//       {occupant?.isPaired ? (
//         <div
//           className={`${styles.occupantSlot} ${
//             occupant ? styles.occupantSlotFilled : ""
//           } ${isDragging ? styles.occupantSlotDragging : ""}`}
//         >
//           <div className={styles.roomBlock}>
//             {occupant?.user?.fullName ? (
//               <SeekerOccupantCard
//                 occupantProfile={occupant?.user?.profilePicture}
//                 occupantGender={abbreviateGender(
//                   occupant?.user?.userDetail?.gender,
//                 )}
//                 occupantName={occupant?.user?.fullName}
//                 occupantAge={calculateAge(occupant?.user?.userDetail?.dob)}
//                 occupantCity={occupant?.user?.userDetail?.city}
//                 isClicked={isClicked}
//                 onCardClick={handleCardClick}
//                 setIsClicked={setIsClicked}
//               />
//             ) : null}
//           </div>
//         </div>
//       ) : (
//         <div
//           ref={occupant ? drag : drop}
//           className={`${styles.occupantSlot} ${
//             occupant ? styles.occupantSlotFilled : ""
//           } ${isDragging ? styles.occupantSlotDragging : ""}`}
//         >
//           <div className={styles.roomBlock}>
//             {occupant?.user?.fullName ? (
//               <SeekerOccupantCard
//                 occupantProfile={occupant?.user?.profilePicture}
//                 occupantGender={abbreviateGender(
//                   occupant?.user?.userDetail?.gender,
//                 )}
//                 occupantName={occupant?.user?.fullName}
//                 occupantAge={calculateAge(occupant?.user?.userDetail?.dob)}
//                 occupantCity={occupant?.user?.userDetail?.city}
//                 isClicked={isClicked}
//                 onCardClick={handleCardClick}
//                 setIsClicked={setIsClicked}
//               />
//             ) : null}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
const OccupantSlot: React.FC<OccupantSlotProps> = ({
  occupantId,
  occupant,
  roomvalue,
  onDropUser,
  onCheckboxChange,
  roomId,
  clear,
  setIsClicked,
  isClicked,
  ispairHighlight,
  setIsPairHighlight,
}) => {
  const handleCardClick = () => {
    setIsClicked(!isClicked);
    if (roomvalue) {
      roomvalue.occupants.map((item) => {
        if (item?.value?.programRegistrationId) {
          onCheckboxChange(!isClicked, item?.value, roomId);
        }
      });
    }
  };
 const [saveDetail, setSaveDetail] = useState(false);
  useEffect(() => {
    setIsClicked(false);
  }, [clear]);

  const [{ isOver }, drop] = useDrop({
    accept: ItemType.USER,
    drop: (item: { user: User }) => onDropUser(item.user, occupantId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  
  useEffect(() => {
    if(isOver){
      setIsPairHighlight(true)
    }
    else{
      setIsPairHighlight(false)
    }
  },[isOver])
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.USER,
    item: {
      user: occupant,
    },
    canDrag: !!occupant,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
     
      if(occupant?.isPaired){
        // setSaveDetail(false)
         console.log("dragging", occupant);
      }
      else{
        console.log("draggings", occupant);
        // setSaveDetail(true)
     
      }
    
    } else {
      // onDragUser(null);
      console.log("draggingcheck", saveDetail) ;
      // setSaveDetail(false)
    }
  }, [isDragging]);

  return (
    <>
      {occupant?.isPaired ? (
        <div
          className={`${styles.occupantSlot} ${
            occupant ? styles.occupantSlotFilled : ""
          } ${isDragging ? styles.occupantSlotDragging : ""} ${ saveDetail ? isOver ? styles.occupantSlotHighlight : "" : ispairHighlight? styles.occupantSlotHighlight : "" } `}

        >
          <div className={styles.roomBlock}>
            {occupant?.user?.fullName ? (
              <SeekerOccupantCard
                occupantProfile={occupant?.user?.profilePicture}
                occupantGender={abbreviateGender(
                  occupant?.user?.userDetail?.gender,
                )}
                occupantName={occupant?.user?.fullName}
                occupantAge={calculateAge(occupant?.user?.userDetail?.dob)}
                occupantCity={occupant?.user?.userDetail?.city}
                isClicked={isClicked}
                onCardClick={handleCardClick}
                setIsClicked={setIsClicked}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div
          ref={occupant ? drag : drop}
          className={`${styles.occupantSlot} ${
            occupant ? styles.occupantSlotFilled : ""
          } ${isDragging ? styles.occupantSlotDragging : ""} ${ saveDetail ? isOver ? styles.occupantSlotHighlight : "" : ispairHighlight? styles.occupantSlotHighlight : "" } `}
        >
          <div className={styles.roomBlock}>
            {occupant?.user?.fullName ? (
              <SeekerOccupantCard
                occupantProfile={occupant?.user?.profilePicture}
                occupantGender={abbreviateGender(
                  occupant?.user?.userDetail?.gender,
                )}
                occupantName={occupant?.user?.fullName}
                occupantAge={calculateAge(occupant?.user?.userDetail?.dob)}
                occupantCity={occupant?.user?.userDetail?.city}
                isClicked={isClicked}
                onCardClick={handleCardClick}
                setIsClicked={setIsClicked}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};


// Room Component
interface Room {
  floor: string;
  roomId: string;
  capacity: number;
  occupants: { id: string; value: User | null }[];
  isChecked: boolean;
  remainingOccupancy: number;
}

//Assigned drag for paired seekers in rooms
const Room = ({
  room,
  onDropUser,
  onCheckboxChange,
  clear,
  isChecked,
  setLoader,
  setCheckReload,
  setCheckedOccupants,
  checkedOccupants,
}: {
  room: Room;
  onDropUser: (user: User, occupantId: string) => void;
  onCheckboxChange: (
    isChecked: boolean,
    occupant: User | null,
    roomId: string,
  ) => void;
  clear: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isChecked: any;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedOccupants: React.Dispatch<React.SetStateAction<User[]>>;
  checkedOccupants: User[];
}) => {
  // const { isPaired, setIsPaired } = useContext(PairContext);
  const roomIdsChecked = isChecked.map((item) => item.roomId);
  const idStore = room.occupants.map((item) => item);

  const roomId = idStore[0].value;
  console.log(roomId, "idStore");
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.USER,
    item: {
      user: roomId,
    },
    canDrag: !!roomId,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  // const isPaired = isChecked?.map((item) => item.isPaired);
  // console.log("isPaired", isPaired);
  const [isClicked, setIsClicked] = useState(false);
  const [ispairHighlight, setIsPairHighlight] = useState(false);
  // const filterByRoomId = (array: any, roomId: number) => {
  //   return array
  //     .filter((user: any) => user.roomId === roomId) // Filter users by roomId
  //     .map((user: any) => user.programRegistrationId); // Map to programRegistrationId
  // };

  const pairSeekers = () => {
    // console.log(seekers, "SeekersToPair");
    // const userIds = room?.occupants?.map((item) => item?.value?.userId);
    /** getting programRegistrationIds in the same room */
    const Ids = room?.occupants?.map(
      (item) => item?.value?.programRegistrationId,
    );
    const payload = {
      programRegistrationIds: Ids,
      comments: "",
      pairCreatedBy: getItemInLocalStorage("userId"),
    };

    // Start loader before making the API call
    setLoader(true);

    postCall(endPoints.pairSeekers, payload)
      .then((response) => {
        console.log("Paired successfully", response, Ids);
        setIsClicked(false);
        const checkedIds = checkedOccupants?.filter(
          (item) =>
            item?.programRegistrationId !== Ids[0] &&
            item?.programRegistrationId !== Ids[1],
        );
        setCheckedOccupants(checkedIds);
      })
      .catch((error) => {
        console.error("Error pairing seekers", error);
      })
      .finally(() => {
        // Stop loader and set reload after the API call is completed
        setLoader(false);
        setCheckReload(true);
      });
  };

  const unpairSeekers = () => {
    // console.log(roomId, "room Id for unpairing", isChecked);
    // const userIds = room?.occupants?.map((item) => item?.value?.userId);
    /** getting programRegistrationIds in the same room */
    const Ids = room?.occupants?.map(
      (item) => item?.value?.programRegistrationId,
    );
    const payload = {
      programRegistrationIds: Ids,
    };
    setLoader(true);
    postCall(endPoints.unpairSeekers, payload)
      .then((response) => {
        console.log("Paired successfully", response);
        setIsClicked(false);
        const checkedIds = checkedOccupants?.filter(
          (item) =>
            item?.programRegistrationId !== Ids[0] &&
            item?.programRegistrationId !== Ids[1],
        );
        setCheckedOccupants(checkedIds);
      })
      .catch((error) => {
        console.error("Error pairing seekers", error);
      })
      .finally(() => {
        // Stop loader and set reload after the API call is completed
        setLoader(false);
        setCheckReload(true);
      });
  };
  return (
    <div>
      <div className={styles.floorRooms}>
        <RoomCard floorName={room.floor} roomNumber={room.roomId} />
        <>
          {room?.occupants?.[0]?.value?.isPaired ? (
            <div
              className={styles.roomOccupants}
              ref={drag}
              style={{ opacity: isDragging ? 0.5 : 1 }}
            >
              {isChecked?.length > 0 &&
              roomIdsChecked?.includes(room.roomId) &&
              room?.remainingOccupancy === 0 &&
              isClicked ? (
                <div className={styles.pairingButtons}>
                  {room?.occupants?.[0]?.value?.isPaired ? (
                    <img
                      src={unpairIcon}
                      alt="unpair Icon"
                      onClick={() => unpairSeekers()}
                    />
                  ) : (
                    <img
                      src={pairIcon}
                      alt="pair icon"
                      onClick={() => pairSeekers()}
                    />
                  )}
                </div>
              ) : null}

              {/* Only show the paired icon if the pairing button is not shown */}
              {!(
                isChecked?.length > 0 &&
                roomIdsChecked?.includes(room.roomId) &&
                room?.remainingOccupancy === 0 &&
                isClicked
              ) && room?.occupants?.[0]?.value?.isPaired === true ? (
                <div className={styles.pairedButton}>
                  <img src={pairedIcon} alt="paired icon" />
                </div>
              ) : null}
              {room.occupants.map((occupant) => (
                <OccupantSlot
                  key={occupant.id}
                  roomvalue={room}
                  occupantId={occupant.id}
                  occupant={occupant.value}
                  onDropUser={onDropUser}
                  onCheckboxChange={onCheckboxChange}
                  roomId={room.roomId}
                  clear={clear}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  ispairHighlight={ispairHighlight}
                  setIsPairHighlight={setIsPairHighlight}
                />
              ))}
            </div>
          ) : (
            <div className={styles.roomOccupants}>
              {isChecked?.length > 0 &&
              roomIdsChecked?.includes(room.roomId) &&
              room?.remainingOccupancy === 0 &&
              isClicked ? (
                <div className={styles.pairingButtons}>
                  {room?.occupants?.[0]?.value?.isPaired ? (
                    <img
                      src={unpairIcon}
                      alt="unpair Icon"
                      onClick={() => unpairSeekers(room?.roomId)}
                    />
                  ) : (
                    <img
                      src={pairIcon}
                      alt="pair icon"
                      onClick={() => pairSeekers()}
                    />
                  )}
                </div>
              ) : null}

              {/* Only show the paired icon if the pairing button is not shown */}
              {!(
                isChecked?.length > 0 &&
                roomIdsChecked?.includes(room.roomId) &&
                room?.remainingOccupancy === 0 &&
                isClicked
              ) && room?.occupants?.[0]?.value?.isPaired === true ? (
                <div className={styles.pairedButton}>
                  <img src={pairedIcon} alt="paired icon" />
                </div>
              ) : null}
              {room.occupants.map((occupant) => (
                <OccupantSlot
                  key={occupant.id}
                  roomvalue={room}
                  occupantId={occupant.id}
                  occupant={occupant.value}
                  onDropUser={onDropUser}
                  onCheckboxChange={onCheckboxChange}
                  roomId={room.roomId}
                  clear={clear}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                  ispairHighlight={ispairHighlight}
                  setIsPairHighlight={setIsPairHighlight}
                />
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

interface UsersListProps {
  users: User[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onDropUser: (user: User, occupantId: string | null) => void;
  userListRef: React.RefObject<HTMLDivElement>;
  handleUserListScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSeekers: User[];
  setSelectedSeekers: React.Dispatch<React.SetStateAction<User[]>>;
  setToastState: React.Dispatch<
    React.SetStateAction<{ message: string; open: boolean }>
  >;
  dataLength: number;
}

interface PairedUsersProps {
  user1: User;
  user2: User;
  selectedSeekers: User[];
  setSelectedSeekers: React.Dispatch<React.SetStateAction<User[]>>;
  pairCodes: number[];
  setLoader: (loader: boolean) => void;
  setCheckReload: (check: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToastState: (state: any) => void;
  users: User[];
  index: number;
}
//made seperate component to get drag for the paired seekers div in userslist
//Assigned drag for paired seekers in usersList
const PairedUsers: React.FC<PairedUsersProps> = ({
  user1,
  user2,
  selectedSeekers,
  setSelectedSeekers,
  pairCodes,
  setLoader,
  setCheckReload,
  setToastState,
  users,
  index,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.USER,
    item: {
      user: user1,
    },
    canDrag: !!user1,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className={styles.pairedUsers}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, marginRight: "16px" }}
    >
      <User
        key={user1.id}
        user={user1}
        selectedSeekers={selectedSeekers}
        setSelectedSeekers={setSelectedSeekers}
        pairCodes={pairCodes}
        index={index}
        users={users}
        setLoader={setLoader}
        setCheckReload={setCheckReload}
        setToastState={setToastState}
      />
      <User
        key={user2.id}
        user={user2}
        selectedSeekers={selectedSeekers}
        setSelectedSeekers={setSelectedSeekers}
        pairCodes={pairCodes}
        index={index + 1}
        users={users}
        setLoader={setLoader}
        setCheckReload={setCheckReload}
        setToastState={setToastState}
      />
    </div>
  );
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  onDropUser,
  userListRef,
  setSearchValue,
  handleUserListScroll,
  setLoader,
  setCheckReload,
  selectedSeekers,
  setSelectedSeekers,
  setToastState,
  dataLength,
}) => {
  const [, drop] = useDrop<{ user: User }>({
    accept: [ItemType.USER],
    drop: (item) => onDropUser(item.user, null),
  });
  // const [searchTerm, setSearchTerm] = useState('');
  const [search] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [pairCodes, setPairCodes] = useState<Array<number>>([]);

  const handlePairCode = (user: User) => {
    if (user?.pairCode && !pairCodes?.includes(user?.pairCode)) {
      setPairCodes((prev) => [...prev, user?.pairCode]);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((user) => {
        handlePairCode(user);
      });
    }
  }, [users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    setSearchValue(e.target.value);
  };
  // const filteredUsers = users.filter((user) => {
  //   const searchLower = searchTerm.toLowerCase();
  //   const nameMatch = user.name
  //     ? user.name.toLowerCase().includes(searchLower)
  //     : false;
  //   const ageMatch = user.age
  //     ? user.age.toString().includes(searchLower)
  //     : false;
  //   const cityMatch = user.city
  //     ? user.city.toLowerCase().includes(searchLower)
  //     : false;
  //   const genderMatch = user.gender ? user.gender.toLowerCase().includes(searchLower) : false;

  //   // Return true if any match is found
  //   return nameMatch || ageMatch || cityMatch || genderMatch;
  // });

  return (
    <div ref={drop} className={styles.usersListContainer}>
      <div className={styles.assignSearchContainer}>
        <div className={styles.yetToAssignContainer}>
          {!search && (
            <h3 className={styles.heading}>Yet To Assign ({dataLength})</h3>
          )}
          <>
            <CommonTextField
              placeholder="search seeker by name, age or city"
              name=""
              className={styles.searchInput2}
              onChange={handleSearchChange}
            />

            <img
              src={searchIcon}
              alt="search icon"
              className={styles.searchIcon}
              // onClick={() => setSearch(!search)}
            />
            {/* <div className={styles.filterBlock}>
              <p className={styles.saperatorLine}></p>
              <img
                src={filterIcon}
                alt="filter icon"
                className={styles.filterIcon}
              // onClick={() => setSearch(!search)}
              />
            </div> */}
          </>
        </div>
      </div>
      {selectedSeekers?.length === 1 &&
      !selectedSeekers?.[0]?.isPaired &&
      dataLength > 1 ? (
        <p>Select another seeker to pair</p>
      ) : (
        <></>
      )}
      {selectedSeekers?.length === 2 && !selectedSeekers?.[0]?.isPaired ? (
        <div className={styles.pairSeekersBtn}>
          <BorderButton
            text="pair seekers"
            onClick={() =>
              pairYetToAssignSeekers(
                selectedSeekers,
                setLoader,
                setSelectedSeekers,
                setCheckReload,
              )
            }
          />
        </div>
      ) : (
        <></>
      )}
      <div
        ref={userListRef}
        onScroll={handleUserListScroll}
        className={styles.usersContainer}
      >
        {users && users?.length > 0
          ? users.reduce(
              (
                acc: { elements: JSX.Element[]; skipNext: boolean },
                user,
                index,
              ) => {
                if (acc.skipNext) {
                  acc.skipNext = false;
                  return acc;
                }
                //If item has paired seeker then skip the next item
                //call pairedUsers component to assign drag for paired seekers
                const hasPairCode =
                  user.pairCode !== undefined && user.pairCode !== null;
                if (hasPairCode && index + 1 < users.length) {
                  acc.elements.push(
                    <PairedUsers
                      key={`pair-${user.id}`}
                      user1={user}
                      user2={users[index + 1]}
                      selectedSeekers={selectedSeekers}
                      setSelectedSeekers={setSelectedSeekers}
                      pairCodes={pairCodes}
                      index={index}
                      users={users}
                      setLoader={setLoader}
                      setCheckReload={setCheckReload}
                      setToastState={setToastState}
                    />,
                  );
                  acc.skipNext = true;
                } else {
                  acc.elements.push(
                    <div style={{ marginRight: "16px" }}>
                      <User
                        key={user.id}
                        user={user}
                        selectedSeekers={selectedSeekers}
                        dataLength={dataLength}
                        setSelectedSeekers={setSelectedSeekers}
                        pairCodes={pairCodes}
                        index={index}
                        users={users}
                        setLoader={setLoader}
                        setCheckReload={setCheckReload}
                        setToastState={setToastState}
                      />
                    </div>,
                  );
                }
                return acc;
              },
              { elements: [], skipNext: false },
            ).elements
          : searchString.length > 0 && (
              <p className={styles.notFound}>Seeker not found!</p>
            )}
      </div>
    </div>
  );
};

const DragDropApp = () => {
  const dispatch = useDispatch();
  // const
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [kpivalue, setKpivalue] = useState("All");
  const [searchvalue, setSearchValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reloadType = useSelector((state: any) => state.FilterData.reloadType);
  const [checkReload, setCheckReload] = useState(false);
  console.log("reloadType", reloadType);
  const [search, setSearch] = useState(false);
  // const [yetToAllocate, setYetToAllocate] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clear, setClear] = useState(false);
  const [checkedOccupants, setCheckedOccupants] = useState<User[]>([]);
  const [loader, setLoader] = useState(true);
  // const navigate = useNavigate();
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [totalUsers, setTotalUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [limit, setLimit] = useState(20);
  const [roomsLimit, setRoomsLimit] = useState(20);
  const [dataLength, setDataLength] = useState(0);
  const [roomsDataLength, setRoomsDataLength] = useState(0);
  const [toastState, setToastState] = useState({ message: "", open: false });
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    floor: [],
    roomStatus: [],
    gender: [],
    age: [],
    location: [],
  });
  const [pairSeeker, setPairSeeker] = useState(false);
  const [selectedSeekers, setSelectedSeekers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [ruleEnginePopUpOpen, setRuleEnginePopUpOpen] = useState(false);
  
  const handleIconClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };
  const userListContainerRef = useRef<HTMLDivElement>(null);
  
  const [kpiData, setKpiData] = useState([]);
  const [allottedProgramRegIds, setAllottedProgramRegIds] = useState([]);
  useEffect(() => {
    // console.log("totalUsers", totalUsers);
    // if (totalUsers.length > 0) {
    const transformedData = totalUsers.map((item) => {
      return {
        id: item?.programRegistrationId.toString(),
        name: item.user.fullName,
        age: calculateAge(item.user.userDetail.dob),
        gender:
          item.user.userDetail.gender.toLowerCase() === "male" ? "M" : "F",
        city: item.user?.userAddress?.address?.city,
        profile: item.user.userDetail.profilePicture || "",
        isPaired: item?.isPaired,
        pairCode: item?.userPairMaps?.[0]?.userPairId,
      };
    });
    setUsers(transformedData);
    // }
  }, [totalUsers]);
  
  // Function to fetch yet to allocate room data from the API
  const fetchApi = async (isLoader:boolean) => {
    try {
      // setLoader(true);
      // setCheckReload(true);
      if(isLoader){
        setLoader(true);
      }
      const response = await getCall(
        `${endPoints?.yetToAllocateRoomList}?limit=${limit}&offset=0&search=${searchvalue}`,
      );
      const data = response.data;
      // console.log("hiidata", response.data.totalCount);
      setDataLength(response.data.totalCount);
      setTotalUsers(data.data);
      if(isLoader){
        setTimeout(() => {
          setLoader(false);
        },200);
      }
      // setCheckReload(false);
      // setLoader(false);
    } catch (error) {
      console.error(error);
      // setCheckReload(false);
    }
  };

  //added another useEffect by keeping checkReload as dependency and to fetch yet to allocate data only when checkReload is true
  useEffect(() => {
    if (checkReload == true) {
      fetchApi(false);
    }
  }, [checkReload]);

  //the below useEffect is for fetching the yet to allocate data by keeping limit and searchvalue as dependency
  useEffect(() => {
    fetchApi(true);
  }, [limit, searchvalue]);

   // Function to fetch room data from the API
  const fetchRoomData = async (isLoader:boolean) => {
    try {
      let url = `${endPoints?.roomInventoryList}?limit=${roomsLimit}&offset=0`;
      if (kpivalue !== "All") {
        url = `${endPoints?.roomInventoryList}?limit=${roomsLimit}&offset=0&roomType=${kpivalue}`;
      }

      // Add filter parameters if selected filters are applied
      if (Object.values(selectedFilters).some((value) => value.length > 0)) {
        const filtersParam = encodeURIComponent(
          JSON.stringify(selectedFilters),
        );
        url += `&filters=${filtersParam}`;
      }
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      if(isLoader){
        setLoader(true);
      }

      // Fetch data from the API
      const response = await getCall(url);
      // setLoader(false);
      const { statusCounts, data } = response.data;

      // Transform KPI data
      const transformedKpiData = statusCounts.map((current: KPIData) => ({
        subheading: current.status,
        mainHeading: current.status_count.toString(),
        type: current.status,
      }));

      // Transform room allocation data
      const transformedRoomData = data.map((room) => {
        const capacity = room.occupancy;
        const occupants = [];
        const remainingOccupancy = room?.remainingOccupancy;

        // Create an array of bed positions from 1 to capacity
        for (let i = 1; i <= capacity; i++) {
          const allocation = room.roomAllocations.find(
            (allocation) => allocation.bedPosition === `${i}`,
          );
          occupants.push({
            id: `${room.room}${i}`,
            bedId: i,
            value: allocation ? allocation.programRegistration : null,
          });
        }
        setRoomsDataLength(data.length);

        return {
          floor: `${room.floor}`,
          roomId: room.room,
          roomInventoryId: room.roomInventoryId,
          capacity,
          occupants,
          remainingOccupancy,
        };
      });

      // Set the transformed data to state
      setKpiData(transformedKpiData);
      setRooms(transformedRoomData);
      if(isLoader){
        setTimeout(() => {
          setLoader(false);
        }, 200);
      }

      dispatch(UpdateReloadType());

      const allottedRegIds = transformedRoomData?.flatMap(
        (room: unknown) =>
          room?.occupants?.map(
            (item: unknown) => item?.value?.programRegistrationId,
          ) || [],
      );
      setAllottedProgramRegIds(allottedRegIds);
      setCheckReload(false);
    } catch (error) {
      console.error(error);
      setCheckReload(false);
      // setLoader(false);
    }
  };
  //added another useEffect by keeping checkReload as dependency and to fetch room data only when checkReload is true
  useEffect(() => {
    if (checkReload == true) {
      fetchRoomData(false);
    }
    setCheckReload(false);
  }, [checkReload]);

  //the below useEffect is for fetching the room data by keeping selectedFilters, kpivalue, roomsLimit and  searchTerm as dependency
  useEffect(() => {
    fetchRoomData(true);
    setCheckReload(false);
  }, [selectedFilters, kpivalue, roomsLimit, searchTerm]);
  //add dependancy above searchTerm

  function calculateAge(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
  // Function to filter users by name, age, or city
  // const filteredUsers = users.filter((user) => {
  //   const searchLower = searchTerm.toLowerCase();
  //   const nameMatch = user.name
  //     ? user.name.toLowerCase().includes(searchLower)
  //     : false;
  //   const ageMatch = user.age
  //     ? user.age.toString().includes(searchLower)
  //     : false;
  //   const cityMatch = user.city
  //     ? user.city.toLowerCase().includes(searchLower)
  //     : false;

  //   // Return true if any match is found
  //   return nameMatch || ageMatch || cityMatch;
  // });
  // useEffect(() => {
  //   console.log(reloadType, "reloadType");
  // }, [reloadType]);

  // Function to handle the API call
  const editRoomAllocation = (
    programRegistrationId: number,
    roomInventoryId: number,
    bedPosition: number,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const payload = {
      editRoomAllocation: [
        {
          programRegistrationId: programRegistrationId,
          roomInventoryId: roomInventoryId,
          bedPosition: bedPosition,
        },
      ],
    };
    setLoader(true);
    putCall(endPoints?.editAllocation, payload)
      .then((response) => {
        console.log("Room allocation updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating room allocation", error);
        // const errorMessage =
        //   error?.response?.body?.message || "Failed to update room allocation";
        // setOpenToast({
        //   message: `${errorMessage}`,
        //   open: true,
        // });
      })
      .finally(() => {
        setCheckReload(true);
        setTimeout(() => {
          setLoader(false);
        }, 200);
      });
  };

  // useEffect to track when checkReload becomes true
  // useEffect(() => {
  //   if (checkReload) {
  //     setLoader(false);
  //   }
  // }, [checkReload]);

  // Function to handle the allocation API call
  const handleRoomAllocate = (
    programRegistrationId: number,
    roomInventoryId: number,
    bedPosition: number,
  ) => {
    const payload = {
      allocateRoom: [
        {
          programRegistrationId: programRegistrationId,
          roomInventoryId: roomInventoryId,
          bedPosition: bedPosition,
        },
      ],
    };

    // Start loader before making the API call
    setLoader(true);

    postCall(endPoints?.allocateRoom, payload)
      .then((response) => {
        console.log("Room allocated successfully", response);

        // Other success actions can be added here if needed
      })
      .catch((error) => {
        console.error("Error allocating room", error);
      })
      .finally(() => {
        // Stop loader and set reload after the API call is completed

        setTimeout(() => {
          setLoader(false);
        }, 200);
        setCheckReload(true);
      });
  };

  // useEffect(() => {
  //   if (checkReload === true) {
  //     setLoader(true);
  //     setCheckReload(false);

  //   } else {
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 2000);
  //     // setLoader(false);
  //   }
  // }, [checkReload]);

  const handleRemoveFromRoom = () => {
    const checkedOccupantIds = checkedOccupants.map(
      (occ) => occ.programRegistrationId,
    );
    const userIds = checkedOccupants.map((occupant) => occupant.id);

    const hasMixedValues = (arr) =>
      arr.some((val) => val === undefined) &&
      arr.some((val) => val !== undefined);

    if (hasMixedValues(checkedOccupantIds) || hasMixedValues(userIds)) {
      console.error("seeker ids are undefined.");
      // setOpenToast({
      //   message: "seeker ids are undefined.",
      //   open: true,
      // });
      return;
    }

    const payloadIds =
      checkedOccupantIds.length > 0 && !checkedOccupantIds.includes(undefined)
        ? checkedOccupantIds
        : userIds;

    setLoader(true);

    deleteCall(endPoints?.deleteAllocation, {
      programRegistrationIds: payloadIds,
    })
      .then((response) => {
        console.log("API", response);

        // const updatedRooms = rooms.map((room) => ({
        //   ...room,
        //   occupants: room.occupants.map((occupant) => {
        //     if (checkedOccupants.some((occ) => occ.id === occupant.value?.id)) {
        //       return { ...occupant, value: null };
        //     }
        //     return occupant;
        //   }),
        // }));

        // setRooms(updatedRooms);
        setUsers((prevUsers) => {
          const newUsers = [...prevUsers, ...checkedOccupants];
          newUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
          return newUsers;
        });
        setLoader(false);
        setCheckedOccupants([]);
        setClear((prev) => !prev);
        dispatch(UpdateReloadType());
      })
      .catch((error) => {
        console.error("Room unallocation failed!", error);
      })
      .finally(() => {
        setCheckReload(true);
        // Delay loader stopping and toast message
        // setTimeout(() => {
        // setLoader(false);
        // Show toast message after loader is false
        // setOpenToast({
        //   message: "Room unallocated successfully!",
        //   open: true,
        // });
        // }, 500); // 1-second delay (adjust as needed)
      });
  };

  const handleDropUser = (user: User, newOccupantId: string | null) => {
    // console.log("draggeduser", user, newOccupantId, rooms);
    // let prevOccupantId = null;
    // let prevRoomInfo = null;
    /* Check if the user is paired */
    if (user?.isPaired) {
      const roomOccupied = checkRoomisOccupied(rooms, newOccupantId);

      /* For unallocating room condition, if newOccupantId is null */
      if (newOccupantId === null && user.programRegistrationId) {
        const roommateIds = getOtherRoommateId(
          rooms,
          user?.programRegistrationId,
        );
        unallocateRoomForPair(roommateIds, setLoader, setCheckReload);
        setClear((prev) => !prev);
        setSelectedSeekers([]);
        /*Check for room is partially alloatted*/
      } else if (roomOccupied[1] === true && newOccupantId !== null) {
        setToastState({
          message:
            "Please choose another room that can accommodate two seekers",
          open: true,
        });
        setTimeout(() => {
          setToastState({ message: "", open: false });
        }, 6000);
      } else if (newOccupantId !== null) {
        // console.log(users, "LISTOFUSERS");
        /* Check for room is getting edited for paired seeker */
        if (allottedProgramRegIds?.includes(user?.id)) {
          const roommateIds = getOtherRoommateId(
            rooms,
            user?.programRegistrationId,
          );
          editRoomAllocationForPair(
            roommateIds,
            Number(roomOccupied[0]),
            setLoader,
            setCheckReload,
          );
          setClear((prev) => !prev);
          setSelectedSeekers([]);
          /* this else case is for allocate rooms for a pair */
        } else {
          const pairedIds = users
            .filter((item) => item?.pairCode === user?.pairCode)
            .map((item) => Number(item?.id));
          // console.log(pairedIds, "pairedIds");
          handleRoomAllocateForPair(
            pairedIds,
            Number(roomOccupied[0]),
            setLoader,
            setCheckReload,
          );
          setClear((prev) => !prev);
          setSelectedSeekers([]);
        }
      }
    } else {
      // Find the previous room and occupant slot of the user (if they were previously assigned)
      // const updatedRooms = rooms.map((room) => {
      //   const updatedOccupants = room.occupants.map((occupant) => {
      //     // console.log("occupant value", occupant);
      //     if (occupant.value && occupant.value.id === user.id) {
      //       prevOccupantId = occupant.id;
      //       prevRoomInfo = { roomId: room.roomId, floor: room.floor }; // Store previous room and floor
      //       console.log("prev room info ", prevRoomInfo);
      //       console.log(
      //         `User ${prevOccupantId} ${user.name} (ID: ${user.id}) removed from room ${room.roomId} on ${room.floor}`,
      //       );
      //       // console.log("edit checking", prevOccupantId);
      //       // putCall("/dev/hdb-edit-room-allocation", {
      //       //   programRegistrationId: parseInt(user.id),
      //       //   roomInventoryId: parseInt(room.roomInventoryId),
      //       //   bedPosition: parseInt(occupant?.bedId),
      //       // });
      //       return { ...occupant, value: null }; // Clear the occupant slot
      //     }
      //     return occupant;
      //   });
      //   return { ...room, occupants: updatedOccupants };
      // });
      if (newOccupantId === null && user.programRegistrationId) {
        setLoader(true);

        // const checkedOccupantIds = checkedOccupants.map((occupant) => occupant.id);
        deleteCall(endPoints?.deleteAllocation, {
          programRegistrationIds: [user.programRegistrationId],
        })
          .then((response) => {
            console.log("API", response);
            // const updatedRooms = rooms.map((room) => ({
            //   ...room,
            //   occupants: room.occupants.map((occupant) => {
            //     if (
            //       checkedOccupants.some((occ) => occ.id === occupant.value?.id)
            //     ) {
            //       return { ...occupant, value: null };
            //     }
            //     return occupant;
            //   }),
            // }));
            // setOpenToast({
            //   message: "Room unallocated successfully!",
            //   open: true,
            // });
            setClear((prev) => !prev);
            setSelectedSeekers([]);
            dispatch(UpdateReloadType());
            // setRooms(updatedRooms);

            setUsers((prevUsers) => {
              const newUsers = [...prevUsers, ...checkedOccupants];
              newUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
              return newUsers;
            });

            setCheckedOccupants([]);
          })
          .catch((error) => {
            console.error("Room unallocation failed!", error);
          })
          .finally(() => {
            setCheckReload(true);
            // Delay loader stopping and toast message
            // setTimeout(() => {
            setLoader(false);
            // Show toast message after loader is false
            // setOpenToast({
            //   message: "Room unallocated successfully!",
            //   open: true,
            // });
            // }, 500); // 1-second delay (adjust as needed)
          });
      }
      const newRoomInfos = rooms.find((room) =>
        room.occupants.some((occupant) => occupant.id === newOccupantId),
      );
      const bedId = newRoomInfos?.occupants.find(
        (occupant) => occupant.id === newOccupantId,
      );
      // console.log(bedId, "bedIdss");
      // console.log("newRoomInfoss", newRoomInfos);
      // console.log("newRoomInfosss", user);

      if (user?.programRegistrationId && newOccupantId !== null) {
        // Call the new function to handle the API request
        editRoomAllocation(
          parseInt(parseInt(user?.programRegistrationId)),
          parseInt(newRoomInfos?.roomInventoryId),
          parseInt(bedId?.bedId),
          setLoader,
        );
        setClear((prev) => !prev);
        setSelectedSeekers([]);

        //   const putcallPayload = {
        //     programRegistrationId: parseInt(parseInt(user?.programRegistrationId)),
        //     roomInventoryId: parseInt(newRoomInfos?.roomInventoryId),
        //     bedPosition: parseInt(bedId?.bedId),
        //   }
        //   console.log("putcallPayload", putcallPayload);
        //   putCall("/dev/hdb-edit-room-allocation", putcallPayload);
        //  setCheckReload(true);
      }

      // setRooms(updatedRooms);
      if (newOccupantId) {
        const newRoomInfo = rooms.find((room) =>
          room.occupants.some((occupant) => occupant.id === newOccupantId),
        );

        setRooms((prevRooms: Room[]) =>
          prevRooms.map((room: Room) => ({
            ...room,
            occupants: room.occupants.map((occupant) =>
              occupant.id === newOccupantId
                ? { ...occupant, value: user }
                : occupant,
            ),
          })),
        );
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

        // Log the new room assignment
        if (newRoomInfo) {
          if (user?.id) {
            const occupantSlot = newRoomInfo.occupants.find(
              (occupant) => occupant.id === newOccupantId,
            );
            // console.log(
            //   `User ${user.name} (ID: ${user.id}) added to room ${newRoomInfo.roomId} on ${newRoomInfo.floor} in occupant slot ${occupantSlot?.id}`,
            // );
            // console.log("prevOccupantId123", newRoomInfo);
            handleRoomAllocate(
              parseInt(user.id),
              parseInt(newRoomInfo.roomInventoryId),
              parseInt(occupantSlot?.bedId),
            );
            setClear((prev) => !prev);
            setSelectedSeekers([]);
            // setYetToAllocate(true);
          }
        }
      } else {
        // If the user is removed and returned to the user list
        setUsers((prevUsers) =>
          prevUsers.some((u) => u.id === user.id)
            ? prevUsers
            : [...prevUsers, user],
        );

        // if (prevRoomInfo) {
        //   console.log(
        //     `User ${user.name} (ID: ${user.id}) removed from room ${prevRoomInfo.roomId} on ${prevRoomInfo.floor} and returned to the user list.`,
        //   );
        // }
      }
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottomReached = scrollTop + clientHeight >= scrollHeight;
    if (bottomReached) {
      // Handle if scroll reached the bottom
    }
  };

  const handleUserListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      // console.log("Hellomji", roomsDataLength, limit);

      if (limit <= dataLength) {
        setLimit((prevLimit) => prevLimit + 20);
      }
    }
  };
  const handleRoomListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } =
      e.target as HTMLDivElement;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      if (roomsLimit <= roomsDataLength) {
        setRoomsLimit((prevLimit) => prevLimit + 20);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollableRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // console.log("528", encodeURIComponent(JSON.stringify(selectedFilters)));
  const [flattenedFilters, setFlattenedFilters] = useState<string[]>([]);

  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleRuleEngineModal = () => {
    setRuleEnginePopUpOpen(!ruleEnginePopUpOpen);
  };
  const handleApplyClick = (newFilters: SelectedFilters) => {
    setSelectedFilters(newFilters);
    handleModal();
  };

  // const handleClearClick = () => {
  //   setSelectedFilters({
  //     floor: [],
  //     roomStatus: [],
  //     gender: [],
  //     age: [],
  //     location: [],
  //   });
  //   // handleModal();
  // };
  // useEffect(() => {
  //   const flatFilters = Object.values(selectedFilters).flat();
  //   setFlattenedFilters(flatFilters);
  // }, [selectedFilters]);
  useEffect(() => {
    const flatFilters = Object.values(selectedFilters)
      .flat()
      .map((filter) => {
        // console.log("filtehr", filter);
        if (filter === "Available") {
          return "Available";
        } else if (filter === "Allotted") {
          return "Allotted";
        } else if (filter === "Partially Allotted") {
          return "Partially Allotted";
        } else {
          return filter;
        }
      });
    setFlattenedFilters(flatFilters);
  }, [selectedFilters]);
  // useEffect(() => {
  //   console.log("filters", flattenedFilters);
  // }, [flattenedFilters]);

  const handleImageClick = (filterToRemove: string) => {
    const newSelectedFilters: SelectedFilters = { ...selectedFilters };

    Object.keys(newSelectedFilters).forEach((key) => {
      if (Array.isArray(newSelectedFilters[key as keyof SelectedFilters])) {
        // Handle array filters (floor, roomStatus, age, location)
        newSelectedFilters[key as keyof SelectedFilters] = (
          newSelectedFilters[key as keyof SelectedFilters] as string[]
        ).filter((filter) => filter !== filterToRemove);
      } else if (
        typeof newSelectedFilters[key as keyof SelectedFilters] === "string"
      ) {
        // Handle the gender filter
        if (
          newSelectedFilters[key as keyof SelectedFilters] === filterToRemove
        ) {
          delete newSelectedFilters[key as keyof SelectedFilters]; // Remove the gender key if it matches
        }
      }
    });

    setSelectedFilters(newSelectedFilters);
  };

  const setOpenToast = (params: { message: string; open: boolean }) => {
    setToastState(params);
    // console.log("params", params);
  };
  const handleClearAll = () => {
    setSelectedFilters({
      floor: [],
      roomStatus: [],
      gender: [],
      age: [],
      location: [],
    });
  };
  // const handleBreadCrumbClick = () => {
  //   navigate(-1);
  // };
  const handleCheckboxChange = (
    isChecked: boolean,
    occupant: User | null,
    roomId: string,
  ) => {
    // console.log("occupant", occupant, isChecked, "ischeddddd");
    if (isChecked) {
      // Add the occupant to checkedOccupants
      setCheckedOccupants((prev) => [...prev, { ...occupant, roomId }]);
    } else {
      // Remove the occupant from checkedOccupants
      setCheckedOccupants((prev) =>
        prev.filter((occ) => occ.userId !== occupant?.userId),
      );
    }
  };
  // const isPaired = checkedOccupants.length === 2 && checkedOccupants.every((occupant) => occupant.roomId === checkedOccupants)

  // const handlePairThem = () => {
  //   console.log("Pairing users: ", checkedOccupants);
  //   // Implement pairing logic if needed
  // };

  // const handleUnpairThem = () => {
  //   console.log("Unpairing users: ", checkedOccupants);
  //   // Implement unpairing logic if needed
  // }
  // console.log("checkedOccupants", checkedOccupants, rooms);
  const renderButtons = () => {
    // const occupantsInSameRoom = checkedOccupants.filter(
    //   (occupant) => occupant.roomId === checkedOccupants[0]?.roomId,
    // );

    return (
      <div className={styles.clearAppliedContainer}>
        {/* <div className={styles.optionsList}>List of Rooms</div> */}
        {/* {checkedOccupants.length > 0 && (
          <div className={styles.separator}></div>
        )} */}
        {/* {checkedOccupants.length === 2 && occupantsInSameRoom.length === 2 && (
          <div onClick={handlePairThem} className={styles.TextButton}>
            <img src={unpairSeeker} alt="unpair" />
          </div>
        )} */}
        {/* {checkedOccupants.length === 2 &&
          occupantsInSameRoom.length === 2 && (
            <div
              onClick={isPaired ? handleUnpairThem : handlePairThem}
              className={styles.TextButton}
            >
              {isPaired ? <img src={unpairSeeker} alt="pair" /> : <img src={pairIcon} alt="unpair" />}
            </div>
          )} */}
        {console.log("sweety", checkedOccupants)}
        {checkedOccupants.length > 0 && (
          <BorderButton onClick={handleRemoveFromRoom} text={"clear room"} />
        )}
      </div>
    );
  };

  const autoAllocate = () => {
    // Start loader before making the API call
    setLoader(true);

    getCall(endPoints.autoAllocate)
      .then((response) => {
        console.log("Auto allocation successfully done", response);
        // setOpenToast({
        //   message: "Auto allocation successfully done",
        //   open: true,
        // });
        // setTimeout(() => {
        //   setOpenToast({ message: "", open: false });
        // }, 2000);
      })
      .catch((error) => {
        console.error("Auto allocation failed", error);
        // setOpenToast({
        //   message: "Auto allocation failed, please try again",
        //   open: true,
        // });
        // setTimeout(() => {
        //   setOpenToast({ message: "", open: false });
        // }, 2000);
      })
      .finally(() => {
        // Stop loader and set reload after the API call is completed
        setLoader(false);
        setCheckReload(true);
      });
  };
  // console.log(kpivalue, "kpiData");
  return (
    <>
      <PairContext.Provider value={{ pairSeeker, setPairSeeker }}>
        {/* {loader ? (
        <Loader />
      ) : ( */}
        <div>
          {loader && <Loader />}
          <DndProvider backend={HTML5Backend}>
            <div className={styles.backgroundImage}>
              <div className={styles.container}>
                <div className={styles.leftRoomsContainer}>
                  <div className={styles.headingContainer}>
                    <div className={styles.resortContent}>
                      {/* <ImageAndText
                    handleImageClick={handleBreadCrumbClick}
                    additionalTextClassName={styles.breadCrumbText}
                    image={backIcon}
                    text={"Room allocation"}
                  /> */}
                      <p className={styles.breadCrumbText}>Room Allocation</p>
                      <div className={styles.separator}></div>
                      <div className={styles.resortContent}>
                        {/* <div className={styles.grayRound}></div> */}
                        {/* <p className={styles.breadCrumbText}>
                          Leonia Holistic Destination
                        </p> */}
                        <Select
                          labelId="custom-select-label"
                          id="custom-select"
                          value={1}
                          open={open}
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          IconComponent={() => (
                            <img
                              src={dropDownIcon}
                              alt="dropdown icon"
                              onClick={handleIconClick}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                          sx={{
                            border: "none !important",
                            height: "28px",
                            fontSize: "16px !important",
                            color: "#051B46",
                            paddingRight: "8px",

                            "& .MuiSelect-select": {
                              border: "none", // Remove border from the select element
                              paddingRight: "7px !important",
                              paddingLeft: "0px !important",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none", // Remove border from the outlined input
                            },
                          }}
                        >
                          <MenuItem value={1} className={styles.menuItemsText}>
                            HDB 1
                          </MenuItem>
                          {/* <MenuItem value={2}>Option 2</MenuItem>
                            <MenuItem value={3}>Option 3</MenuItem> */}
                        </Select>
                      </div>
                    </div>
                    <div className={styles.filtersContainer}>
                      {/* <CommonTextField
                        placeholder="Search by name, age, room number or floor"
                        name="search"
                        className={`${styles.searchInput} ${search ? styles.searchActive : styles.searchInactive}`}
                        onChange={handleSearchChange}
                      /> */}
                      {search && (
                        <input
                          type="text"
                          autoFocus
                          className={styles.searchInput}
                          placeholder="search by name, age, room number or floor"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      )}

                      <Tooltip title="search" arrow>
                        <div>
                          <ImageAndText
                            image={searchIcon}
                            text={""}
                            handleContainerClick={() => setSearch(!search)}
                          />
                        </div>
                      </Tooltip>
                      {/* <div className={styles.borderLine}></div> */}
                      <Tooltip title="filters" arrow>
                        <div className={styles.filterIcon}>
                          <ImageAndText
                            handleContainerClick={handleModal}
                            image={filterIcon}
                            text={""}
                          />
                          {flattenedFilters.length > 0 && (
                            <div className={styles.grayRoundFilter}></div>
                          )}
                        </div>
                      </Tooltip>
                      <div className={styles.separator}></div>
                      <div>
                        <Tooltip
                          title="auto allocate"
                          arrow
                          className={styles.refreshIcon}
                        >
                          <div>
                            <ImageAndText
                              handleContainerClick={autoAllocate}
                              image={refreshIcon}
                              text={""}
                            />
                          </div>
                        </Tooltip>
                      </div>
                      <div>
                        <Tooltip
                          title="rules engine"
                          arrow
                          className={styles.refreshIcon}
                        >
                          <div>
                            <ImageAndText
                              handleContainerClick={handleRuleEngineModal}
                              image={mahatriaIcon}
                              text={""}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className={styles.roomAllocationContainer}>
                    <div className={styles.roomAllocationContainer}>
                      <div className={styles.roomsKPIContainer}>
                        <RoomAllocationKPI
                          handleKpiClick={(type) => {
                            setKpivalue(type);
                            console.log(`Typeclicked: ${type}`);
                          }}
                          headingsData={kpiData}
                          activeKpi={kpivalue}
                        />
                        <div
                          className={
                            checkedOccupants.length > 0 &&
                            flattenedFilters.length > 0
                              ? styles.filtersBlock
                              : styles.filterGap
                          }
                        >
                          {renderButtons()}
                          {checkedOccupants.length > 0 &&
                            flattenedFilters.length > 0 && (
                              <div className={styles.separator}></div> // Add a separator here
                            )}
                          {flattenedFilters.length > 0 && (
                            <div className={styles.filterContainer}>
                              <div className={styles.filterContainer}>
                                <div className={styles.filterAppliedContainer}>
                                  <p className={styles.filtersText}>
                                    Filters applied:
                                  </p>
                                  <div className={styles.filterChipsContainer}>
                                    {/* Show only the first 3 filters */}
                                    {flattenedFilters
                                      .slice(0, 3)
                                      .map((filter, index) => (
                                        <ImageAndText
                                          additionalClassName={
                                            styles.filterChip
                                          }
                                          additionalTextClassName={
                                            styles.filterChipText
                                          }
                                          handleImageClick={() =>
                                            handleImageClick(filter)
                                          }
                                          key={index}
                                          image={crossIcon}
                                          hoverImage={crossHoverIcon}
                                          text={filter}
                                        />
                                      ))}

                                    {/* Show the "+X" for the remaining filters if there are more than 3 */}
                                    {flattenedFilters.length > 3 && (
                                      <div>
                                        <span className={styles.filterChipText}>
                                          +{flattenedFilters.length - 3}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p
                                  className={styles.clearAll}
                                  onClick={handleClearAll}
                                >
                                  clear all
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={styles.roomsContainer}>
                          <div
                            className={styles.floorsBlock}
                            ref={userListContainerRef}
                            onScroll={handleRoomListScroll}
                          >
                            {rooms.length === 0 && (
                              <div className={styles.noRooms}> No rooms</div>
                            )}
                            {rooms.map((room, index) => (
                              <Room
                                key={index}
                                room={room}
                                onDropUser={handleDropUser}
                                onCheckboxChange={handleCheckboxChange}
                                clear={clear}
                                isChecked={checkedOccupants}
                                setLoader={setLoader}
                                setCheckReload={setCheckReload}
                                setCheckedOccupants={setCheckedOccupants}
                                checkedOccupants={checkedOccupants}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <UsersList
                  userListRef={userListContainerRef}
                  users={users}
                  onDropUser={handleDropUser}
                  setSearchValue={setSearchValue}
                  handleUserListScroll={handleUserListScroll}
                  setLoader={setLoader}
                  setCheckReload={setCheckReload}
                  selectedSeekers={selectedSeekers}
                  setSelectedSeekers={setSelectedSeekers}
                  setToastState={setToastState}
                  dataLength={dataLength}
                />
              </div>
            </div>
          </DndProvider>
          <CustomModal open={showModal} handleClose={handleModal}>
            <RoomAllocationFilterPopUp
              selectedFilters={selectedFilters}
              onApplyClick={handleApplyClick}
              onClose={handleModal}
            />
          </CustomModal>
          <CustomModal
            open={ruleEnginePopUpOpen}
            handleClose={handleRuleEngineModal}
          >
            <RuleEnginePopUp
              // selectedFilters={selectedFilters}
              onClose={handleRuleEngineModal}
            />
            {/* <RoomAllocationFilterPopUp
              selectedFilters={selectedFilters}
              onApplyClick={handleApplyClick}
              onClose={handleModal}
            /> */}
          </CustomModal>
        </div>
        {/* )} */}
        <AlertDialog
          title={"Notification"}
          message={toastState.message}
          isOpen={toastState.open}
          setOpenToast={setOpenToast}
        />
      </PairContext.Provider>
    </>
  );
};

export default DragDropApp;
