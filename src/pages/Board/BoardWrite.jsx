import { useNavigate } from "react-router-dom";

import { boardPosts } from "../../data/boardData";

import "./BoardWrite.css";

function BoardWrite() {
  const navigate = useNavigate();

  const handleWrite = (e) => {
    e.preventDefault();

    const savedPosts =
      JSON.parse(localStorage.getItem("board-posts")) || [];

    const allPosts = [...savedPosts, ...boardPosts];

    const maxId = Math.max(
      ...allPosts.map((post) => post.id)
    );

    const newPost = {
      id: maxId + 1,
      title: e.target.title.value,
      summary: e.target.content.value,
      content: e.target.content.value,
      writer: "홍길동",
      regDate: new Date().toISOString().split("T")[0],
      views: 0,
    };

    localStorage.setItem(
      "board-posts",
      JSON.stringify([newPost, ...savedPosts])
    );

    alert("글이 등록되었습니다.");
    navigate("/board");
  };

  return (
    <section className="board-write-page">
      <button
        type="button"
        className="board-back-button"
        onClick={() => navigate("/board")}
      >
        ← 목록으로
      </button>

      <div className="board-detail-card">
        <div className="board-detail-header">
          <h2>글쓰기</h2>

          <form onSubmit={handleWrite}>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                name="title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                name="content"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="board-submit-button"
            >
              등록
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BoardWrite;