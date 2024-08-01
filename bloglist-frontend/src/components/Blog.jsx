const Blog = ({ blog }) => (
  <ul role="list" className="border-y-4 border-white">
    <li key={blog.title} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {blog.title}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{blog.author}</p>
      </div>
    </li>
  </ul>
);

export default Blog;
