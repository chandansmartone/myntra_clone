import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import { Axios } from "../../requestMethods";
import "../User/style.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const deleteOrderHandler = (id) => {
    const deleteUser = async () => {
      try {
        await Axios.delete(`order/${id}`);
        toast.success("User deleted successfully.");
        setOrders((data) => data.filter((item) => item._id !== id));
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };
    deleteUser();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await Axios.get("order");
        setOrders(data);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },
    {
        field: "name",
        headerName: "Ordered By",
        type: "String",
        minWidth: 150,
        flex: 0.5,
      },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return <button className={`widgetLgButton ${params.row.status}` } >
        {params.row.status}
        </button>
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.row.id}`}>
              <EditIcon
                fontSize="small"
                color="primary"
                sx={{ marginRight: 5 }}
              />
            </Link>

            <DeleteIcon
              className="productListDelete"
              onClick={() => deleteOrderHandler(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.products.length,
        amount: item.amount,
        status: item.status,
        name: item.user.name,
      });
    });

  return (
    <div className="productList page">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default OrderList;
