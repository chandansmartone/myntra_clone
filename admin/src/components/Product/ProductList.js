import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { clearError } from "../../redux/productRedux";
import { toast } from "react-toastify";
import "./style.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { products, total_products, loading, error, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getProducts(page + 1));
  }, [dispatch, error, message, page]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "productId", headerName: "Product ID", minWidth: 150 },
    {
      field: "product",
      headerName: "Product",
      minWidth: 320,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.displayImage}
              alt=""
            />
            {params.row.additionalInfo}
          </div>
        );
      },
    },
    { field: "category", headerName: "Category", minWidth: 150 },
    { field: "stock", headerName: "Stock", minWidth: 120 },
    {
      field: "price",
      headerName: "Price",
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row.productId}`}>
              <Edit fontSize="small" color="primary" sx={{ marginRight: 5 }} />
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.productId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList page">
      <DataGrid
        rows={products}
        rowCount={total_products}
        columns={columns}
        disableSelectionOnClick
        loading={loading}
        getRowId={(row) => row.productId}
        paginationMode="server"
        pageSize={8}
        rowsPerPageOptions={[8]}
        autoHeight
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
