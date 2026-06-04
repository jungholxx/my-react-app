import useInput from "../../hooks/useInput";
import UserForm from "../../components/UserForm";

function Practice() {

  const name = useInput("");

  return (
    <div>

      <h1>Practice Page</h1>

      <p>This is the practice page.</p>

      <input
        type="text"
        {...name.inputProps}
      />

      <button onClick={name.reset}>
        Reset
      </button>

      <hr />

      <UserForm />

    </div>
  );
}

export default Practice;