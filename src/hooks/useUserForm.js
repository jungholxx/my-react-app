import { useState } from "react";

function useUserForm() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const submit = () => {
    setError("");

    alert("저장되었습니다.");
  };

  return {
    form,
    setForm,
    error,
    submit
  };
}

export default useUserForm;