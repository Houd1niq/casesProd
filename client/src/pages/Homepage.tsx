import { BoxesContainer } from "../components/BoxesContainer";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { useAppSelector } from "../store/store";
import VectorBox from "../assets/images/VectorBox.svg";
import VectorOnline from "../assets/images/VectorOnline.svg";
import VectorUsers from "../assets/images/VectorUsers.svg";
import VectorUpgrade from "../assets/images/VectorUpgrade.svg";
import { StatisticItem } from "../components/StatisticItem";
import { HomePageImages } from "../components/HomePageImages";

export const Homepage = () => {
  const userCount = userApiSlice.useGetUserCountQuery();
  const onlineUsers = useAppSelector(
    (state) => state.applicationReducer.onlineUsersCount
  );
  const countOfOpenedBoxes = useAppSelector(
    (state) => state.applicationReducer.boxesOpenedCount
  );

  return (
    <div className="flex flex-col items-center">
      <HomePageImages></HomePageImages>
      <div className="flex justify-center rounded-[13px] flex-col sm:flex-row font-sf-ui justify-between max-w-[70%] sm:max-w-[670px] w-full items-center gradient-border ">
        <StatisticItem
          image={VectorBox}
          name={"Openings"}
          value={countOfOpenedBoxes}
        ></StatisticItem>
        <StatisticItem
          image={VectorUsers}
          name={"Users"}
          value={userCount.data ? userCount.data.usersCount : "Loading..."}
        ></StatisticItem>
        <StatisticItem
          image={VectorOnline}
          name={"Online"}
          value={onlineUsers}
        ></StatisticItem>
        <StatisticItem
          image={VectorUpgrade}
          name={"Upgrade"}
          value={"soon"}
        ></StatisticItem>
      </div>
      <BoxesContainer></BoxesContainer>
    </div>
  );
};
