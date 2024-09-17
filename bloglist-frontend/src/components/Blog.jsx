import { useState } from "react";
import PrimaryRoundedButton from "./PrimaryBtn"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [blogVisible, setBlogVisible] = useState(false);
  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Remove blog "${blog.title}" by "${blog.author}"`
    );
    if (confirmDelete) {
      try {
        await blogService.remove(blog.id);
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error("Failed to delete blog: ", error);
      }
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <div className="text-sm font-semibold leading-6 text-gray-900 flex justify-start items-center gap-1">
            <span className="blog-title">{blog.title}</span>
            <div>by</div>
            <div>{blog.author}</div>
              {(user && user.username === blog.user.username) && <PrimaryRoundedButton text={"delete"} onClick={handleDelete} />}
          </div>
          {blogVisible && (
            <div>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {blog.url}
              </p>
              <div className="text-sm font-semibold leading-6 text-gray-900 flex justify-start items-center gap-2">
                likes: <span className="blog-likes" name={'likes'}>{blog.likes}</span>
                <PrimaryRoundedButton text={"like"} onClick={handleLike} />
              </div>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {blog.user.username}
                {user.username}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <PrimaryRoundedButton
          text={blogVisible ? "hide" : "show"}
          onClick={toggleVisibility}
        />
      </div>
    </div>
  );
};

export default Blog;
