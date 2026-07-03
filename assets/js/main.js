document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

const workCards = document.querySelectorAll(".work-card");
const modal = document.getElementById("videoModal");
const iframe = document.getElementById("youtubeFrame");
const closeBtn = document.querySelector(".video-close");
const modalBg = document.querySelector(".video-modal-bg");

workCards.forEach(card => {
  card.addEventListener("click", () => {
    const videoId = card.dataset.youtube;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.add("active");
  });
});

function closeVideoModal() {
  modal.classList.remove("active");
  iframe.src = "";
}

closeBtn.addEventListener("click", closeVideoModal);
modalBg.addEventListener("click", closeVideoModal);