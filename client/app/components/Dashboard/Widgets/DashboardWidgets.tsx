import React, { FC, useEffect, useState } from "react";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
        color={value && value > 90 ? "info" : "error"}
      />

      <Box
        sx={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  const [userIncrementAnalyticsPecent, setUserIncrementAnalyticsPecent] =
    useState<any>();
  const [orderIncrementAnalyticsPecent, setOrderIncrementAnalyticsPecent] =
    useState<any>();

  const { data: userAnalytis, isLoading: userLoading } =
    useGetUsersAnalyticsQuery({});
  const { data: orderAnalytis, isLoading: orderLoading } =
    useGetOrdersAnalyticsQuery({});


  useEffect(() => {
    if (userLoading && orderLoading) {
      return;
    } else {
      if (userAnalytis && orderAnalytis) {
        const userslast2Months = userAnalytis?.users.last12Months.slice(-2);
        const orderslast2Months = orderAnalytis?.Orders.last12Months.slice(-2);

        if (userslast2Months.length === 2 && orderslast2Months.length === 2) {
          const usersPreviousMonth = userslast2Months[0].count;
          const usersCurrentMonth = userslast2Months[1].count;

          const ordersPreviousMonth = userslast2Months[0].count;
          const ordersCurrentMonth = userslast2Months[1].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;
          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUserIncrementAnalyticsPecent({
            percentChange: usersPercentChange,
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
          });
          setOrderIncrementAnalyticsPecent({
            percentChange: ordersPercentChange,
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
          });
        }
      }
    }
  }, [userLoading, orderLoading, orderAnalytis, userAnalytis]);

  return (
    // <div className={`${styles.title}`}>Widgets</div>
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UsersAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45cba0] text-[#2190ff] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderIncrementAnalyticsPecent?.currentMonth}
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    orderIncrementAnalyticsPecent?.percentChange > 0 ? 100 : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4  dark:text-[#fff] text-black">
                  {orderIncrementAnalyticsPecent?.percentChange > 0
                    ? "+ " +
                      orderIncrementAnalyticsPecent?.percentChange.toFixed(2)
                    : "- " +
                      orderIncrementAnalyticsPecent?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-5">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45cba0] text-[#2190ff] text-[30px] " />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userIncrementAnalyticsPecent?.currentMonth}
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    userIncrementAnalyticsPecent?.percentChange > 0 ? 100 : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-4 dark:text-[#fff] text-black">
                  {userIncrementAnalyticsPecent?.percentChange > 0
                    ? "+ " +
                      userIncrementAnalyticsPecent?.percentChange.toFixed(2)
                    : "- " +
                      userIncrementAnalyticsPecent?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[63%,35%]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[42vh] shadow-sm m-auto">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className={`${styles.title} !text-start text-[20px] font-[400] pb-3 font-Poppins dark:text-[#fff] text-black`}>
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
