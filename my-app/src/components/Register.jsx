import  { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    email: "",
    gender: "",
    address: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
  const res = await axios.get("http://localhost:5000/api/users");
  setUsers(res.data);
};

const handleSubmit = async (e) => {
  e.preventDefault();
 

  if (!form.email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!form.address.trim()) {
    toast.error("Address is required");
    return;
  }

  if (!form.gender) {
    toast.error("Please select gender");
    return;
  }

  // ✅ Create payload here
  const payload = {
    email: form.email,
    gender: form.gender,
    address: form.address
  };

  try {
    console.log("Payload to be sent:", payload); // Debugging log
    if (editId) {
      await axios.put(
        `http://localhost:5000/api/users/${editId}`,
        payload
      );
      toast.success("User updated successfully");
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/users",
        payload
      );
      toast.success("User registered successfully");
    }

    fetchUsers();
    setForm({ email: "", gender: "", address: "" });

  } catch (error) {
      console.error("Error in handleSubmit:", error); // Debugging log
   console.error("Something went wrong");
  }
};
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      email: user.email,
      gender: user.gender,
      address: user.address
    });
    setEditId(user._id);
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Enter Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          rows="3"
        />

        <select
          value={form.gender}
          onChange={e => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit">
          {editId ? "Update" : "Register"}
        </button>
      </form>

      <hr />

      <h2>User Table</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.gender}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}