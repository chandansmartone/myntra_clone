import { useEffect, useState } from "react";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/productRedux";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import "./style.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [Images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, error, message } = useSelector((state) => state.product);

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

  const createProductSubmitHandler = (e) => {
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

    dispatch(addProduct(product));
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
          onSubmit={createProductSubmitHandler}
        >
          <h1>Create Product</h1>

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
              required
              onChange={(e) => setMrp(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
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
            {loading && <ButtonLoader />} Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
