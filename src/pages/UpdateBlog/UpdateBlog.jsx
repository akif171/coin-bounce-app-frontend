import { useState, useEffect } from "react";
import styles from "./UpdateBlog.module.css";
import { useNavigate, useParams, useparams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBlogById, updateBlog } from "../../api/internal";
import TextInput from "../../components/TextInput/TextInput";

function UpdateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const blogId = params.id;

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const author = useSelector((state) => state.user._id);

  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        author,
        title,
        content,
        blogId,
      };
    } else {
      data = {
        author,
        title,
        content,
        photo,
        blogId,
      };
    }

    console.log(data);
    const response = await updateBlog(data);

    if (response.status === 200) {
      navigate("/");
    }
  };

  useEffect(() => {
    async function getBlogDetails() {
      const response = await getBlogById(blogId);
      if (response.status === 200) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    }

    getBlogDetails();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Edit your Blog!</div>
      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        placeholder="your content goes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={400}
        className={styles.content}
      />
      <div className={styles.photoPrompt}>
        <p>Chosse a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
        />
        <img src={photo} width={150} height={150} />
      </div>
      <button
        className={styles.update}
        onClick={updateHandler}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateBlog;
