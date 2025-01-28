import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../requestMethods";
import { toast } from "react-toastify";
import "./style.css";

export default function UserList() {
  const [data, setData] = useState([]);

  const deleteUserHandler = (id) => {
    const deleteUser = async () => {
      try {
        await Axios.delete(`/admin/user/${id}`);
        toast.success("User deleted successfully.");
        setData((data) => data.filter((item) => item._id !== id));
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };
    deleteUser();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await Axios.get("/admin/users");
        setData(data.users);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 230, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 230,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 130,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/user/${params.row.id}`}
              state={{
                uemail: params.row.email,
                uname: params.row.name,
                urole: params.row.role,
              }}
            >
              <Edit fontSize="small" color="primary" sx={{ marginRight: 5 }} />
            </Link>

            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteUserHandler(params.row.productId)}
            />
          </>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <div className="userList page">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}
