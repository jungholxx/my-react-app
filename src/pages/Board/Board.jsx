import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import { boardPosts } from "../../data/boardData";

import "./Board.css";

function Board() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const allPosts = useMemo(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem("board-posts")) || [];

    return [...savedPosts, ...boardPosts];
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pagePosts = allPosts.slice(startIndex, endIndex);

  const getViewCount = (post) => {
    const savedData =
      JSON.parse(localStorage.getItem("board-views")) || {};

    return savedData[post.id] ?? post.views;
  };

  return (
    <section className="board-page">
      <div className="board-header">
        <h1>Board</h1>
        <p>React 게시판 샘플 페이지입니다.</p>
      </div>

      <div className="board-list">
        {pagePosts.map((post) => (
          <Link
            key={post.id}
            to={`/board/${post.id}`}
            className="board-link"
          >
            <div className="board-card">
              <div className="board-card-top">
                <span className="board-id">#{post.id}</span>
                <span className="board-views">
                  조회수 {getViewCount(post)}
                </span>
              </div>

              <h3>{post.title}</h3>

              <p className="board-summary">
                {post.summary || post.content}
              </p>

              <div className="board-meta">
                <span>{post.writer}</span>
                <span>{post.regDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="board-actions">
        <Link
          to="/board/write"
          className="write-btn"
        >
          글쓰기
        </Link>
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={allPosts.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default Board;