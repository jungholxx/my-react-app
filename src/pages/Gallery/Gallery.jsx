import { useState } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";
import { galleryImages } from "../../data/galleryData";

import "./Gallery.css";

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageImages = galleryImages.slice(startIndex, endIndex);

  return (
    <section className="gallery-page">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>이미지 갤러리 샘플 페이지입니다.</p>
      </div>

      <div className="gallery-grid">
        {pageImages.map((image) => (
          <Link
            key={image.id}
            to={`/gallery/${image.id}`}
            className="gallery-link"
          >
            <div className="gallery-card">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="gallery-image"
              />

              <div className="gallery-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <span>{image.regDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={galleryImages.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default Gallery;