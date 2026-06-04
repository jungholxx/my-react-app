import { useNavigate } from "react-router-dom";

import "./BoardWrite.css";

function BoardWrite() {
    const navigate = useNavigate();
    const handleWrite = (e) => {
        e.preventDefault();
        
        localStorage.setItem("board-posts", JSON.stringify([
            {
                id: 999,
                title: e.target.title.value,
                content: e.target.content.value,
                writer: "홍길동",
                regDate: new Date().toISOString().split("T")[0],
                views: 0
            },
            ...(JSON.parse(localStorage.getItem("board-posts")) || [])
        ]));

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
                            <input type="text" id="title" name="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">내용</label>
                            <textarea id="content" name="content"></textarea>
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