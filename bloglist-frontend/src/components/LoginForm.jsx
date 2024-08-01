import InputForm from "./Input";
import PrimaryRoundedButton from "./PrimaryBtn";
const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return (
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <InputForm
          value={username}
          text={"Username"}
          name={"username"}
          onChange={({ target }) => setUsername(target.value)}
        />
        <InputForm
            value={password}
            text={'Password'}
            name={"name"}
            type={"password"}
            onChange={({ target }) => setPassword(target.value)}
          />
        <PrimaryRoundedButton
          text={"Login"}
        />
      </form>
    );
  };
  
  export default LoginForm;