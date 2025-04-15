document.addEventListener('DOMContentLoaded', () => {
  const showReviewFormLink = document.getElementById('show-review-form');
  const reviewForm = document.getElementById('add-review-form');

  if (showReviewFormLink && reviewForm) {
    showReviewFormLink.addEventListener('click', (event) => {
      event.preventDefault();
      reviewForm.style.display =
        reviewForm.style.display === 'none' ? 'block' : 'none';
    });
  }
});
