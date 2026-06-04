import useUserForm from '../hooks/useUserForm';

function UserForm() {
  const {
    form,
    error,
    submit
  } = useUserForm();

  return (
    <div>
      <h1>User Form</h1>

      {error && (
        <p>{error}</p>
      )}

      <button onClick={submit}>
        저장
      </button>
    </div>
  );
}

export default UserForm;