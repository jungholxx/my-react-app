import { useMemo } from "react";

import Card from "../../components/Card/Card";
import { boardPosts } from "../../data/boardData";
import { galleryImages } from "../../data/galleryData";
import "./Home.css";

function Home() {
  const recentCards = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(today.getDate() - 30);

    const savedBoardPosts =
      JSON.parse(localStorage.getItem("board-posts")) || [];

    const allBoardPosts = [
      ...savedBoardPosts,
      ...boardPosts,
    ];

    const boardCards = allBoardPosts.map((post) => ({
      id: post.id,
      type: "board",
      title: post.title,
      content: post.summary || post.content,
      regDate: post.regDate,
      to: `/board/${post.id}`,
    }));

    const galleryCards = galleryImages.map((image) => ({
      id: image.id,
      type: "gallery",
      title: image.title,
      content: image.description,
      regDate: image.regDate,
      to: `/gallery/${image.id}`,
    }));

    return [...boardCards, ...galleryCards]
      .filter((item) => {
        const regDate = new Date(item.regDate);

        return regDate >= thirtyDaysAgo && regDate <= today;
      })
      .sort(
        (a, b) =>
          new Date(b.regDate) - new Date(a.regDate)
      )
      .slice(0, 5);
  }, []);

  return (
    <div className="home-page">
      <h1>Home</h1>

      <p className="home-desc">
        최근 30일 이내 등록된 게시물입니다.
      </p>

      <div className="card-list">
        {recentCards.map((card) => (
          <Card
            key={`${card.type}-${card.id}`}
            to={card.to}
            title={card.title}
            content={card.content}
            type={card.type}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;