import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(`/api/v1/post/get-post/${params.slug}`);
      setTitle(data.post.title);
      setId(data.post._id);
      setSummary(data.post.summary);
      setContent(data.post.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
    //eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("summary", summary);
      postData.append("content", content);
      photo && postData.append("photo", photo);
      const { data } = axios.put(`/api/v1/post/update-post/${id}`, postData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("blog Updated Successfully");
        navigate("/dashboard/admin/posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this blog ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/post/delete-post/${id}`);
      toast.success("Post Deleted Succfully");
      navigate("/dashboard/admin/posts");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Update bolg"}>
      <div
        className="container-fluid"
        style={{ marginTop: "3rem", padding: "3rem" }}
      >
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{t("updateProduct:UpdateProduct")}</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/post/post-photo/${id}`}
                      alt="blog_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder={t("updateProduct:writename")}
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={summary}
                  placeholder={t("updateProduct:writeDescription")}
                  className="form-control"
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  {t("updateProduct:UPDATEPRODUCT")}
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  {t("updateProduct:DELETEPRODUCT")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
