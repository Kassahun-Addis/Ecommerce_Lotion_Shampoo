import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../styles/BlogDetail.css';
import { useCart } from "../context/cart";


const BlogDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPost();
  }, [params?.slug]);

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/v1/post/get-post/${params.slug}`);
      setPost(data?.post);
    } catch (error) {
      console.log(error);
    }
  };
  
return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
        <h3> {post.title}</h3>
        <div>
        <img
            src={`/api/v1/post/post-photo/${post._id}`}
            className="card-img-top"
            alt={post.title}
            height="300"
            width="350px"
          />
        </div>
        
        <div>
        <p> {post.content}</p>
        </div>
     
          <button  onClick={() => navigate(-1)}>
            Back
          </button> {/* Corrected `class` to `className` and added onClick event */}
    
      </div>

</div>
    </Layout>
  );
};

export default BlogDetails;