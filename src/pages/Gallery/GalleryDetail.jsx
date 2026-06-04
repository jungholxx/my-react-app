import { useParams, useNavigate } from "react-router-dom";

import { galleryImages } from "../../data/galleryData";

import "./GalleryDetail.css";

function GalleryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentId = Number(id);

  const currentIndex = galleryImages.findIndex(
    (item) => item.id === currentId
  );

  const image = galleryImages[currentIndex];

  const prevImage = galleryImages[currentIndex - 1];
  const nextImage = galleryImages[currentIndex + 1];

  if (!image) {
    return (
      <div className="gallery-detail-empty">
        이미지를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <section className="gallery-detail-page">

      <button
        type="button"
        className="gallery-back-button"
        onClick={() => navigate("/gallery")}
      >
        ← 목록으로
      </button>

      <div className="gallery-detail-card">
        <div className="gallery-detail-image-wrap">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="gallery-detail-image"
          />
        </div>

        <div className="gallery-detail-body">
          <h1>{image.title}</h1>

          <div className="gallery-detail-meta">
            <span>{image.regDate}</span>
          </div>

          <div className="gallery-detail-content">
            {image.description}
          </div>
        </div>
      </div>

      <div className="gallery-detail-button-wrap">
        <button
          type="button"
          className="gallery-detail-close"
          disabled={!prevImage}
          onClick={() => {
            if (prevImage) {
              navigate(`/gallery/${prevImage.id}`);
            }
          }}
        >
          이전
        </button>

        <button
          type="button"
          className="gallery-detail-close"
          disabled={!nextImage}
          onClick={() => {
            if (nextImage) {
              navigate(`/gallery/${nextImage.id}`);
            }
          }}
        >
          다음
        </button>
      </div>
    </section>
  );
}

export default GalleryDetail;