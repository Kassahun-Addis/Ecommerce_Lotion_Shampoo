import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

import { useTranslation } from "react-i18next";
export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
const { t } = useTranslation();
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("summary", summary);
      postData.append("photo", photo);
      postData.append("content", content);
      
    const { data } = await axios.post("/api/v1/post/create-post", postData);
   
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/posts");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Layout title={"Dashboard - Create post"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
        <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>{t("createBlog:createBlog")}</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder={t("createBlog:blogTitle")}
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={summary}
                  placeholder={t("createBlog:Entersummarofblog")}
                  className="form-control"
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    hidden
                  />
                </label>
              </div>

              {photoUrl && (
                <div className="mb-2">
                  <img src={photoUrl} alt="Uploaded" className="img-thumbnail" />
                </div>
              )}

              <div className="mb-3">
                <textarea
                  value={content}
                  placeholder={t("createBlog:Entercontenttheblog")}
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handlePost}>
                  {t("createBlog:CreateBlog")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}