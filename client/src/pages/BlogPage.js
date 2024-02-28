import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { formatISO9075 } from "date-fns";
import Layout from "../components/Layout/Layout";
import { useTranslation } from "react-i18next";
import "../styles/Blog.css";

const BlogPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/post/get-post");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
     <Layout title={t("header:title")}>
      <div className="row dashboard">
        <div className="col-md-9">
          <h1 className="text-center">All Blogs List</h1>
          <div className="blog-list">
            {posts.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/post/${p.slug}`}
                className="blog-link"
              >
                <div className="blog-item">
                  <div className="blog-image">
                    <Link to={`/blog/${p.slug}`}>
                      <img
                        src={`/api/v1/post/post-photo/${p._id}`}
                        alt={p.title}
                      />
                    </Link>
                  </div>
                  <div className="blog-details">
                    <div className="blog-title">
                      <Link to={`/blog/${p.slug}`}>
                        <h2>{p.title}</h2>
                      </Link>
                    </div>
                    <div className="blog-info">
                      <time>{formatISO9075(new Date(p.createdAt))}</time>
                    </div>
                    <div className="blog-summary">
                      <p>{p.summary}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
