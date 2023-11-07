import { useGetAllCourseQuery } from "@/redux/features/courses/coursesAPi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCourseQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date.toLocaleString(undefined, options);
  };

  useEffect(() => {
    if (data && usersData && coursesData) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "₹ " + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  console.log("orderData==>", orderData);
  const columns: any = [
    { field: "id", headName: "ID", flex: 0.3 },
    { field: "userName", headName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headName: "Email", flex: 1 },
          { field: "title", headName: "Course Title", flex: 1 },
        ]),
    { field: "price", headName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headName: "Created At", flex: 0.5 }]
      : [
          {
            field: "  ",
            headName: "Send Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    size={20}
                    className="dark:text-white text-black"
                  />
                </a>
              );
            },
          },
        ]),
  ];

  // const rows: any = [
  //   {
  //     id: "12345",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  //   {
  //     id: "123456",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  //   {
  //     id: "123457",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  //   {
  //     id: "1234578",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  //   {
  //     id: "1234579",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  //   {
  //     id: "1234580",
  //     userName: "Tazheeb Shamsi",
  //     userEmail: "info@gmail.corn",
  //     title: "React JS Course",
  //     price: "$500",
  //     created_at: "2 days ago",
  //   },
  // ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: formatDate(item.createdAt),
      });
    });

  return (
    <div className={isDashboard ? "mt-0" : "mt-[120px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0px 0px 0px"}
            height={isDashboard ? "35vh" : "80vh"}
            width={isDashboard ? "auto" : "100%"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "none !important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#aaa9fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#aaa9fc",
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbar-container .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              // components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
