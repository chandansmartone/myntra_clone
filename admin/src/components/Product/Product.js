import { useState } from "react";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Axios } from "../../requestMethods";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import { clearError } from "../../redux/productRedux";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [gender, setGender] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [Images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await Axios.get(`/product/${productId}`);
        setName(data?.product?.name || "");
        setBrand(data?.product?.brand || "");
        setGender(data?.product?.gender || "");
        setMrp(data?.product?.mrp || 0);
        setPrice(data?.product?.price || 0);
        setAdditionalInfo(data?.product?.additionalInfo || "");
        setCategory(data?.product?.category || "");
        setStock(data?.product?.stock || "");
        setImages(data?.product?.Images || "");
        setImagesPreview(data?.product?.Images || "");
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/products");
      dispatch(clearError());
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, navigate, message]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const product = {
      name,
      brand,
      mrp,
      price,
      additionalInfo,
      gender,
      category,
      stock,
      Images,
    };

    dispatch(updateProduct(productId, product));
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="newProductContainer newproduct">
        <form
          className="createProductForm newproduct"
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          <h1>Update Product</h1>

          <div>
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Brand"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="MRP"
              value={mrp}
              required
              onChange={(e) => setMrp(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Additional Info"
              required
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading && <ButtonLoader />} Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
