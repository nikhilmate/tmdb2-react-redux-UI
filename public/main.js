window.addEventListener('load', function(e) {
  window.setInterval(keyloader, 2000);
});

let arr = ['GENRE', 'POPULARITY', 'RANKING', 'YEAR-BY'];
let i = 1;
let content = ['movie', 'tv', 'casts', 'reviews'];
function keyloader() {
  if (i >= arr.length) {
    i = 0;
  }
  let loader = document.querySelector('span.keyload');
  let val =  loader.innerHTML == null ? '' : loader.innerHTML;
  loader.innerHTML = arr[i];
  let changer = document.querySelector('.content-changer');
  changer.innerHTML = content[i];
  i++;
}


function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function staticHeader(e) {
  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('static');
    document.querySelector('.search').style.paddingTop = '60px';
  } else if(window.scrollY == 0) {
    document.querySelector('.header').classList.remove('static');
    document.querySelector('.search').style.paddingTop = '0px';
  }
}
window.addEventListener('scroll', staticHeader);