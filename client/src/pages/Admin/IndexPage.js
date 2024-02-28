import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  // get all posts
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/post/get-post");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">{t("indexPage:AllBlog")}</h1>
          <table className="table">
            <thead>
              <tr>
                <th>{t("indexPage:Photo")}</th>
                <th>{t("indexPage:Title")}</th>
                <th>{t("indexPage:Summary")}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((p, index) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={`/api/v1/post/post-photo/${p._id}`}
                      alt={p.title}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{t(p.title)}</td>
                  <td>{t(p.summary)}</td>
                  <td>
                    <Link
                      to={`/dashboard/admin/edit-post/${p.slug}`}
                      className="btn btn-primary ms-2 text-white"
                    >
                      {t("indexPage:Edit")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;