import MessageBox from "../../components/MessageBox";
import Counter from "../../features/counter/Counter";

import useInput from "../../hooks/useInput";
import useTodos from "../../hooks/useTodos";

function Contact() {
  const message = useInput("");
  const user = useInput("");

  const name = useInput("");
  const email = useInput("");

  const todos = useTodos([
    { id: 1, text: "할 일 1" },
    { id: 2, text: "할 일 2" },
    { id: 3, text: "할 일 3" }
  ]);

  const handleSubmit = () => {
    alert(`
      이름: ${name.value}
      이메일: ${email.value}
    `);

    name.reset();
    email.reset();
  };

  const changeMessage = () => {
    message.setValue("MessageBox에서 변경됨");
  };

  const changeUser = () => {
    user.setValue("MessageBox 사용자");
  };

  return (
    <div>
      <section style={{ marginBottom: "40px" }}>
        <h1>Contact Page</h1>

        <ul style={{ lineHeight: "1.8em" }}>
          <li>
            <button
              onClick={() => alert("Contact us at contact@example.com")}
            >
              Alert Button
            </button>
          </li>

          <li>
            <input
              type="text"
              placeholder="Enter your message"
              {...message.inputProps}
            />

            <button onClick={message.reset}>
              초기화
            </button>

            <input
              type="text"
              placeholder="Enter your name"
              {...user.inputProps}
            />

            <button onClick={user.reset}>
              초기화
            </button>

            <MessageBox
              message={message.value}
              user={user.value}
              onChangeMessage={changeMessage}
              onChangeUser={changeUser}
            />
          </li>
        </ul>
      </section>

      <section
        style={{
          marginTop: "40px",
          paddingTop: "30px",
          borderTop: "2px solid #ddd"
        }}
      >
        <h1>Todo List</h1>

        <input
          type="text"
          placeholder="할 일을 입력하세요"
          {...todos.inputProps}
        />

        <button onClick={todos.addTodo}>
          추가
        </button>

        <button onClick={todos.clearTodos}>
          전체 삭제
        </button>

        <ul>
          {todos.todoList.map((todo) => (
            <li key={todo.id}>
              {todo.text}
            </li>
          ))}
        </ul>
      </section>

      <section
        style={{
          marginTop: "40px",
          paddingTop: "30px",
          borderTop: "2px solid #ddd"
        }}
      >
        <h1>Redux Test</h1>
        <Counter />
      </section>

      <section
        style={{
          marginTop: "40px",
          paddingTop: "30px",
          borderTop: "2px solid #ddd"
        }}
      >
        <h1>Custom Hook Test</h1>

        <h2>회원 정보 입력</h2>

        <div>
          <input
            type="text"
            placeholder="이름"
            {...name.inputProps}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="이메일"
            {...email.inputProps}
          />
        </div>

        <button onClick={handleSubmit}>
          제출
        </button>
      </section>
    </div>
  );
}

export default Contact;