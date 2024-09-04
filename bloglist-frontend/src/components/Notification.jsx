const NotificationBox = ({ message, type }) => {
  if (type === 'error') {
    return (
      <div className="fixed right-0 top-0 m-2 rounded-xl border border-secondary-50 bg-white p-4 text-sm shadow-lg min-w-[400px]">
        <button className="ttop-4 absolute right-4 ml-auto text-secondary-500 hover:text-secondary-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div className="flex space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="pr-6 font-medium text-secondary-900">Error</h4>
            <div className="mt-1 text-secondary-500">{message}</div>
          </div>
        </div>
      </div>
    )
  } else if (type === 'success') {
    return (
      <div className="fixed right-0 top-0 m-2 rounded-xl border border-secondary-50 bg-white p-4 text-sm shadow-lg min-w-[400px]">
        <button className="ttop-4 absolute right-4 ml-auto text-secondary-500 hover:text-secondary-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div className="flex space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="pr-6 font-medium text-secondary-900">Success!</h4>
            <div className="mt-1 text-secondary-500">{message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotificationBox
