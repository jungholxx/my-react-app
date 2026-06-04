import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { boardPosts } from "../../data/boardData";

import "./BoardDetail.css";

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentId = Number(id);

  const currentIndex = boardPosts.findIndex(
    (item) => item.id === currentId
  );

  const post = boardPosts[currentIndex];

  const prevPost = boardPosts[currentIndex - 1];
  const nextPost = boardPosts[currentIndex + 1];

  const [views, setViews] = useState(0);

  const increaseViewCount = (postId, defaultViews) => {
    const storageKey = "board-views";

    const savedData =
      JSON.parse(localStorage.getItem(storageKey)) || {};

    const currentViews =
      savedData[postId] ?? defaultViews;

    const nextViews = currentViews + 1;

    savedData[postId] = nextViews;

    localStorage.setItem(
      storageKey,
      JSON.stringify(savedData)
    );

    return nextViews;
  };

  useEffect(() => {
    if (!post) {
      return;
    }

    const nextViews = increaseViewCount(
      post.id,
      post.views
    );

    setViews(nextViews);
  }, [post]);

  if (!post) {
    return (
      <div className="board-detail-empty">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <section className="board-detail-page">
      <button
        type="button"
        className="board-back-button"
        onClick={() => navigate("/board")}
      >
        ← 목록으로
      </button>

      <div className="board-detail-card">
        <div className="board-detail-header">
          <h1>{post.title}</h1>

          <div className="board-detail-meta">
            <span>작성자 {post.writer}</span>
            <span>{post.regDate}</span>
            <span>조회수 {views}</span>
          </div>
        </div>

        <div className="board-detail-content">
          {post.content}
        </div>
      </div>

      <div className="board-detail-button-wrap">
        <button
          type="button"
          className="board-detail-button"
          disabled={!prevPost}
          onClick={() => {
            if (prevPost) {
              navigate(`/board/${prevPost.id}`);
            }
          }}
        >
          이전
        </button>

        <button
          type="button"
          className="board-detail-button"
          disabled={!nextPost}
          onClick={() => {
            if (nextPost) {
              navigate(`/board/${nextPost.id}`);
            }
          }}
        >
          다음
        </button>
      </div>
    </section>
  );
}

export default BoardDetail;