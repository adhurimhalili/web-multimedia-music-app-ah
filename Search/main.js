const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach((card) => {
  card.addEventListener('click', () => {
    console.log('Clicked:', card.querySelector('h3').textContent);
  });
});
