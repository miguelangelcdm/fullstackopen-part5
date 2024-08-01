import PrimaryRoundedButton from "./PrimaryBtn";
import InputForm from "./Input";
const BlogForm = ({ newBlog, setNewBlog, addBlog }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };
  return (
    <form onSubmit={addBlog} className="flex flex-col xl:flex-row gap-2">
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
  );
};

export default BlogForm;
