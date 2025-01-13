import { endPoints } from "../../../common/constants/urlConstants";
import { deleteCall, postCall, putCall } from "../../../services/apiGetService";
import { getItemInLocalStorage } from "../../../services/localStorage";

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

interface Room {
  floor: string;
  roomId: string;
  capacity: number;
  occupants: { id: string; value: User | null }[];
  isChecked: boolean;
  remainingOccupancy: number;
}

export const pairYetToAssignSeekers = (
  seekers: unknown,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedSeekers: React.Dispatch<React.SetStateAction<User[]>>,
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  console.log(seekers, "seekersfromyettopair");
  const userIds = seekers?.map((item) => item?.id);

  const payload = {
    programRegistrationIds: userIds,
    comments: "",
    pairCreatedBy: getItemInLocalStorage("userId"),
  };

  // Start loader before making the API call
  setLoader(true);

  postCall(endPoints.pairSeekers, payload)
    .then((response) => {
      console.log("Paired successfully", response);
    })
    .catch((error) => {
      console.error("Error pairing seekers", error);
    })
    .finally(() => {
      // Stop loader and set reload after the API call is completed
      setLoader(false);
      setSelectedSeekers([]);
      setCheckReload(true);
    });
};

export const unpairYetToAssignSeekers = (
  seekerIds: Array<string>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedSeekers: React.Dispatch<React.SetStateAction<unknown[]>>,
) => {
  console.log(seekerIds, "seekerIds for unpairing");
  const payload = {
    programRegistrationIds: seekerIds?.map((item) => Number(item)),
  };
  setLoader(true);
  postCall(endPoints.unpairSeekers, payload)
    .then((response) => {
      console.log("Paired successfully", response);
    })
    .catch((error) => {
      console.error("Error pairing seekers", error);
    })
    .finally(() => {
      // Stop loader and set reload after the API call is completed
      setLoader(false);
      setCheckReload(true);
      setSelectedSeekers([]);
    });
};

export const checkRoomisOccupied = (
  rooms: Array<Room>,
  occupantRoomId: string | null,
) => {
  const room = rooms?.find((item) => occupantRoomId?.startsWith(item?.roomId));
  // console.log(room, "roomDropped");
  return [
    room?.roomInventoryId,
    room?.occupants?.some((item) => item?.value !== null),
  ];
  // return room?.occupants?.length > 0;
};

export const handleRoomAllocateForPair = (
  programRegistrationIds: Array<number>,
  roomInventoryId: number,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const payload = {
    allocateRoom: [
      {
        programRegistrationId: programRegistrationIds[0],
        roomInventoryId: roomInventoryId,
        bedPosition: 1,
      },
      {
        programRegistrationId: programRegistrationIds[1],
        roomInventoryId: roomInventoryId,
        bedPosition: 2,
      },
    ],
  };

  // console.log("Allocate Room for pair API Payload", payload);

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
      setLoader(false);
      setCheckReload(true);
    });
};

export const editRoomAllocationForPair = (
  programRegistrationIds: Array<number>,
  roomInventoryId: number,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const payload = {
    editRoomAllocation: [
      {
        programRegistrationId: programRegistrationIds[0],
        roomInventoryId: roomInventoryId,
        bedPosition: 1,
      },
      {
        programRegistrationId: programRegistrationIds[1],
        roomInventoryId: roomInventoryId,
        bedPosition: 2,
      },
    ],
  };
  // console.log("API Payload", payload);
  setLoader(true);
  putCall(endPoints?.editAllocation, payload)
    .then((response) => {
      console.log("Room allocation updated successfully", response);
    })
    .catch((error) => {
      console.error("Error updating room allocation", error);
    })
    .finally(() => {
      setCheckReload(true);
      setLoader(false);
    });
};

export const getOtherRoommateId = (rooms: unknown[], regId: number) => {
  // console.log(rooms, regId, "rooms");
  for (const room of rooms) {
    for (const occupant of room.occupants) {
      if (occupant?.value?.programRegistrationId === regId) {
        return room?.occupants?.map(
          (item) => item?.value?.programRegistrationId,
        );
      }
    }
  }
  return null; // Return null if no match is found
};

export const unallocateRoomForPair = (
  programRegistrationIds: Array<number>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckReload: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoader(true);
  deleteCall(endPoints?.deleteAllocation, {
    programRegistrationIds: programRegistrationIds,
  })
    .then((response) => {
      console.log("Room allocation updated successfully", response);
    })
    .catch((error) => {
      console.error("Error updating room allocation", error);
    })
    .finally(() => {
      setCheckReload(true);
      setLoader(false);
    });
};
