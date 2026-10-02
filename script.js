const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const dots = document.querySelectorAll('.slider-dot');
const filterButtons = document.querySelectorAll('.filter-button');
const courseCards = document.querySelectorAll('.course-card');
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryCards = document.querySelectorAll('.gallery-card');
const messageForm = document.querySelector('#message-form');
const messageStatus = document.querySelector('.contact-form-status');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  navigation?.classList.toggle('is-visible', isOpen);
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    dots.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('aria-current');
    });
    dot.classList.add('is-active');
    dot.setAttribute('aria-current', 'true');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    courseCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

galleryFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.galleryFilter;

    galleryFilters.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    galleryCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.galleryCategory !== filter;
    });
  });
});

messageForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const subject = `[Soul Touch Records] ${formData.get('subject')}`;
  const body = [
    `Name: ${formData.get('name')}`,
    `Email: ${formData.get('email')}`,
    '',
    formData.get('message'),
  ].join('\n');
  const mailto = `mailto:info@soultouchrecords.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (messageStatus) {
    messageStatus.textContent = 'Your email app should open with your message ready to send.';
  }
  window.location.href = mailto;
});
