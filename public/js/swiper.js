document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 2400,
      navigation: false,
      pagination: false,
    });
  }
});