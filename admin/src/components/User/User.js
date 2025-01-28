import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ButtonLoader from "../Loader/ButtonLoader";
import { toast } from "react-toastify";
import { Axios } from "../../requestMethods";
import "./style.css";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uemail, uname, urole } = location.state;

  const [name, setName] = useState(uname);
  const [email, setEmail] = useState(uemail);
  const [role, setRole] = useState(urole);

  // for update api
  const [loading, setLoading] = useState(null);

  const { userId } = useParams();

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const updateUser = async () => {
      setLoading(true);
      try {
        await Axios.put(`/admin/user/${userId}`, {
          name,
          email,
          role,
        });
        setLoading(false);
        toast.success("User Updated Successfully.");
        navigate("/users");
      } catch (err) {
        toast.error(err.response?.data?.message);
        setLoading(false);
      }
    };
    updateUser();
  };

  return (
    <>
      <div className="newProductContainer">
        <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
          <h1>Update User</h1>

          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || role === "" ? true : false}
          >
            {loading && <ButtonLoader />} Update
          </button>
        </form>
      </div>
    </>
  );
};

export default User;
