import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import { formatDate } from "@/app/utils/formatDate";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();

  const [addNewMemberModalOpen, setAddNewMemberModalOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [
    updateUserRole,
    { error: updateUserRoleError, isSuccess: isUpdateUserRoleSuccess },
  ] = useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateUserRoleError) {
      if ("data" in updateUserRoleError) {
        const errorMessage = updateUserRoleError.data as any;
        toast.error(errorMessage.message);
      }
    }
    if (isUpdateUserRoleSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setAddNewMemberModalOpen(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully");
      setOpen(!open);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError.data as any;
        toast.error(errorMessage.message);
      }
    }
  }, [
    updateUserRoleError,
    isUpdateUserRoleSuccess,
    deleteSuccess,
    deleteError,
  ]);

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Send Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className=" text-green-600" size={20} />
            </a>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete className=" text-red-500" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newTeam =
      data && data.users.filter((user: any) => user.role === "admin");
    newTeam &&
      newTeam.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: formatDate(user.createdAt),
          updated_at: formatDate(user.updatedAt),
        });
      });
  } else {
    data &&
      data?.users.forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: formatDate(user.createdAt),
          updated_at: formatDate(user.updatedAt),
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  const handleAddUser = async () => {
    await updateUserRole({ email, role });
  };

  return (
    <div className="mt-[120px] ml-5 ">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[220px] dark:bg-[#57c7a3] !h-[35px] dark:border border-[#ffffff6c]`}
              onClick={() => setAddNewMemberModalOpen(true)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m="20px 0 0 0"
            height="72vh"
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon ": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon ": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row ": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root ": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell ": {
                borderBottom: "none",
                padding: "20px",
              },
              "& .name-column--cell ": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders ": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde!important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[35%] left-[35%] translate-x-1/2 transform-x-1/2 p-5 dark:bg-[#090909] bg-[#ffffffeb] rounded-lg">
                <h1 className={`${styles.title}`}>
                  Are you sure, want to delete <br /> this User?
                </h1>
                <div className="w-full flex items-center justify-between mb-4 mt-12">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f41]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {addNewMemberModalOpen && (
            <Modal
              open={addNewMemberModalOpen}
              onClose={() => setAddNewMemberModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[25%] left-[35%] translate-x-1/2 transform-x-1/2 p-5 dark:bg-[#090909] bg-[#ffffffeb] rounded-lg">
                <h1 className={`${styles.title}`}>
                  Add new user to the team..
                </h1>
                <div className="w-full flex flex-col items-center mb-4 mt-8">
                  <input
                    type="text"
                    value={email}
                    className={`${styles.input} mb-4`}
                    placeholder="Email of the user"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <select
                    className={`${styles.input}  bg-[#ffffffeb] dark:bg-[#090909]`}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <div className="w-full flex items-center justify-between mb-4 mt-12">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f41]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={handleAddUser}
                  >
                    Save
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
