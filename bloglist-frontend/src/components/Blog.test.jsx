import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { expect } from "vitest";

// 5.13:
test('renders a blog title and author, but not its url or likes by default', () => {
  const blog = {
    title: 'fronttest2',
    author: 'Myself',
    url: 'http://localhost:5173/',
    likes: 0,
    user: { username: 'root' }
  }
  const user = { username: 'root' }
  render(<Blog blog={blog} user = {user}/>)

  const title = screen.getByText('fronttest2')
  const author = screen.getByText('Myself')
  const url = screen.queryByText('http://localhost:5173/')
  const likes = screen.queryByText('likes: 0')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

// 5.14:
test('renders blog URL and likes when the "show" button is clicked', async () => {
  const blog = {
    title: "fronttest2",
    author: "Myself",
    url: "http://localhost:5173/",
    likes: 0,
    user: { username: "root" },
  };

  const mockToggleVisibility = vi.fn();
  render(<Blog blog={blog} user={{ username: "root" }} />);
  const showButton = screen.getByText("show");
  showButton.onclick = mockToggleVisibility;
  const user = userEvent.setup();
  await user.click(showButton);

  expect(mockToggleVisibility).toHaveBeenCalledTimes(1);
});

// 5.15:
test('calls the handleLike function twice when the like button is clicked twice', async () => { 
  const handleLikeMock = vi.fn();

  const blog = {
    title: "fronttest2",
    author: "Myself",
    url: "http://localhost:5173/",
    likes: 0,
    user: { username: "root" },
  };
  const setBlogsMock = vi.fn();

  const { getByText } = render(<Blog blog={blog} setBlogs={setBlogsMock} user={blog.user} handleLike={handleLikeMock} />);
  
  const showButton = screen.getByText("show");
  await userEvent.click(showButton);

  const likeButton = getByText('like');
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(handleLikeMock).toHaveBeenCalledTimes(2);
 })

// 5.16
test('new blog is created while testing inputs', async () => { 
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)
  const title = screen.getByLabelText('Title')
  const author = screen.getByLabelText('Author')
  const url = screen.getByLabelText('URL')
  const submitBtn = screen.getByText('save')

  await user.type(title, 'title of a test blog')
  await user.type(author, 'author of a test blog')
  await user.type(url, 'url of a test blog')
  await user.click(submitBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title of a test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('author of a test blog')
  expect(createBlog.mock.calls[0][0].url).toBe('url of a test blog')


 })