function MessageBox(props) {
  return (
    <div>
      <h3>전달받은 메시지</h3>
      <p>메세지: {props.message}</p>
      <p>사용자: {props.user}</p>
      <button onClick={props.onChangeMessage}>
        메시지 변경
      </button>
      <button onClick={props.onChangeUser}>
        사용자 변경
      </button>
    </div>
  );
}

export default MessageBox;