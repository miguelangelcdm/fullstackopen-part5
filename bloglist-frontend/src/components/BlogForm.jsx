import { useState } from "react";
import PrimaryRoundedButton from "./PrimaryBtn";
import InputForm from "./Input";

const BlogForm = ({ newBlog, setNewBlog, addBlog }) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };
  
  return (
    <div className="flex flex-col gap-2">
      <div style={hideWhenVisible}>
        <PrimaryRoundedButton text={'add blog'} onClick={()=>setBlogFormVisible(true)}/>
      </div>
      <form onSubmit={addBlog} className="flex flex-col xl:flex-row gap-2" style={showWhenVisible}>
        <InputForm
          text={"Title"}
          name={"title"}
          value={newBlog.title}
          onChange={handleChange}
        />
        <InputForm
          text={"Author"}
          name={"author"}
          value={newBlog.author}
          onChange={handleChange}
        />
        <InputForm
          text={"URL"}
          name={"url"}
          value={newBlog.url}
          onChange={handleChange}
        />
        <PrimaryRoundedButton text={"save"} />
      </form>
      <PrimaryRoundedButton text={"cancel"} onClick={()=>setBlogFormVisible(false)} style={showWhenVisible} />
    </div>
  );
};

export default BlogForm;
