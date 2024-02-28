import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-user");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 my-5">
            <AdminMenu />
          </div>
          <div className="col-md-9 my-5">
            <h1>All Users</h1>

            <div className="table-container" style={{ maxHeight: "500px", overflowY: "scroll" }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.phone}</td>
                      <td>{p.address}</td>
                      <td>{p.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;