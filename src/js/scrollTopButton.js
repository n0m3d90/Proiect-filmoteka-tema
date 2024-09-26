//Get the button
let mybutton = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
  scrollFunction();
};

export function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}


mybutton.addEventListener('click', backToTop);

export function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
