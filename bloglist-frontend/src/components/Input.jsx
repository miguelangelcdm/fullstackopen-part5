const InputForm = ({ text, name, type='text', value, onChange }) => {
  return (
    <div className="flex gap-2 flex-col items-start">
      <label htmlFor={name} className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        {text}
      </label>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 rounded-full"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
      />
    </div>
  )
}

export default InputForm
