import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});
  const analyticsData: any = [];

  data &&
    data.Orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, Count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={` ${isDashboard ? "h-[30vh]" : "h-screen"}  `}>
          <div
            className={` ${
              isDashboard ? "mt-0 pl-[40px] mb-2" : "mt-[50px]"
            }  `}
          >
            <h1
              className={`${styles.title} ${
                !isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 Months Analytics Data
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[90%]" : "h-full"
            }  flex items-center justify-center `}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  bottom: 20,
                  left: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
