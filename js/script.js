class DynamicAdapt {
   constructor(type) {
     this.type = type;
   }
 
   init() {
     // массив объектов
     this.оbjects = [];
     this.daClassname = '_dynamic_adapt_';
     // массив DOM-элементов
     this.nodes = [...document.querySelectorAll('[data-da]')];
 
     // наполнение оbjects объктами
     this.nodes.forEach((node) => {
       const data = node.dataset.da.trim();
       const dataArray = data.split(',');
       const оbject = {};
       оbject.element = node;
       оbject.parent = node.parentNode;
       оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
       оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
       оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
       оbject.index = this.indexInParent(оbject.parent, оbject.element);
       this.оbjects.push(оbject);
     });
 
     this.arraySort(this.оbjects);
 
     // массив уникальных медиа-запросов
     this.mediaQueries = this.оbjects
       .map(({
         breakpoint
       }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
       .filter((item, index, self) => self.indexOf(item) === index);
 
     // навешивание слушателя на медиа-запрос
     // и вызов обработчика при первом запуске
     this.mediaQueries.forEach((media) => {
       const mediaSplit = media.split(',');
       const matchMedia = window.matchMedia(mediaSplit[0]);
       const mediaBreakpoint = mediaSplit[1];
 
       // массив объектов с подходящим брейкпоинтом
       const оbjectsFilter = this.оbjects.filter(
         ({
           breakpoint
         }) => breakpoint === mediaBreakpoint
       );
       matchMedia.addEventListener('change', () => {
         this.mediaHandler(matchMedia, оbjectsFilter);
       });
       this.mediaHandler(matchMedia, оbjectsFilter);
     });
   }
 
   // Основная функция
   mediaHandler(matchMedia, оbjects) {
     if (matchMedia.matches) {
       оbjects.forEach((оbject) => {
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.moveTo(оbject.place, оbject.element, оbject.destination);
       });
     } else {
       оbjects.forEach(
         ({ parent, element, index }) => {
           if (element.classList.contains(this.daClassname)) {
             this.moveBack(parent, element, index);
           }
         }
       );
     }
   }
 
   // Функция перемещения
   moveTo(place, element, destination) {
     element.classList.add(this.daClassname);
     if (place === 'last' || place >= destination.children.length) {
       destination.append(element);
       return;
     }
     if (place === 'first') {
       destination.prepend(element);
       return;
     }
     destination.children[place].before(element);
   }
 
   // Функция возврата
   moveBack(parent, element, index) {
     element.classList.remove(this.daClassname);
     if (parent.children[index] !== undefined) {
       parent.children[index].before(element);
     } else {
       parent.append(element);
     }
   }
 
   // Функция получения индекса внутри родителя
   indexInParent(parent, element) {
     return [...parent.children].indexOf(element);
   }
 
   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   arraySort(arr) {
     if (this.type === 'min') {
       arr.sort((a, b) => {
         if (a.breakpoint === b.breakpoint) {
           if (a.place === b.place) {
             return 0;
           }
           if (a.place === 'first' || b.place === 'last') {
             return -1;
           }
           if (a.place === 'last' || b.place === 'first') {
             return 1;
           }
           return a.place - b.place;
         }
         return a.breakpoint - b.breakpoint;
       });
     } else {
       arr.sort((a, b) => {
         if (a.breakpoint === b.breakpoint) {
           if (a.place === b.place) {
             return 0;
           }
           if (a.place === 'first' || b.place === 'last') {
             return 1;
           }
           if (a.place === 'last' || b.place === 'first') {
             return -1;
           }
           return b.place - a.place;
         }
         return b.breakpoint - a.breakpoint;
       });
       return;
     }
   }
 }

const da = new DynamicAdapt("max");  
da.init();;
const animItems = document.querySelectorAll('._anim-items');

if(animItems.length>0){
   window.addEventListener('scroll', animOnScroll);
    
   function animOnScroll (){
       for(let index=0; index < animItems.length;index++){
           const animItem = animItems[index];
           const animItemHeight = animItem.offsetHeight;
           const animItemOffset = offset(animItem).top;
           const animStart = 4;
           
           let animItemPoint = window.innerHeight - animItemHeight / animStart;
           if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
           }
           
           if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
              animItem.classList.add('_active');
            }else{
              if(!animItem.classList.contains('anim-no-hide')){
                 animItem.classList.remove('_active');
              }    
              
            }
       }
   }  
   function offset(el){
       const rect = el.getBoundingClientRect(),
             scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
             scrollTop = window.pageYOffset || document.documentElement.scrollTop;
       return { top:rect.top + scrollTop, left: rect.left + scrollLeft}
   }  
    
   setTimeout(() => {
       animOnScroll();
   }, 500);
   
};
const swipedfbdfr = new Swiper('.registr-swiper', {
   pagination: {
      el: '.registr-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.25,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 4,
         spaceBetween: 30,
      }
   }
});
const swidvgdbvper = new Swiper('.cal-swiper', {
   pagination: {
      el: '.cal-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.25,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 4,
         spaceBetween: 30,
      }
   }
});
var body = document.body;
const iconMenu = document.querySelector('.header__menu-open');
if (iconMenu) {
   const menuBody = document.querySelector('.header__mob');
   iconMenu.addEventListener('click', function () {
      iconMenu.classList.toggle('open');
      menuBody.classList.toggle('open');
      body.classList.toggle('lock');
   })
}
if (document.getElementsByClassName("tabcontent")[1]) {
   document.getElementsByClassName("tabcontent")[1].style.display = "none";
}

function openCity(evt, cityName) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent" and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks" and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
   document.getElementById(cityName).style.display = "block";
   evt.currentTarget.className += " active";
}

const swipeoyhgr = new Swiper('.services-swiper', {

   pagination: {
      el: '.services-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.55,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 5,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 6,
         spaceBetween: 30,
      }
   }
});

const swipfbver = new Swiper('.proj-swiper', {
   navigation: {
      nextEl: ".proj-button-next",
      prevEl: ".proj-button-prev",
   },
   pagination: {
      el: '.proj-pagination',
      clickable: true
   },
   slidesToScroll: 1,

   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.75,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 5,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 6,
         spaceBetween: 30,
      }
   }
});
const swipgjher = new Swiper('.tur-swiper', {
   pagination: {
      el: '.tur-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.25,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 4,
         spaceBetween: 30,
      }
   }
});
const swipgjhепреer = new Swiper('.tur-swiper-2', {
   pagination: {
      el: '.tur-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 1.25,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 2,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 3,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 4,
         spaceBetween: 30,
      }
   }
});
const swipdfgjher = new Swiper('.spons-swiper', {
   navigation: {
      nextEl: ".spons-next",
      prevEl: ".spons-prev",
   },
   pagination: {
      el: '.spons-pagination',
      clickable: true
   },
   slidesToScroll: 1,
   breakpoints: {
      // when window width is >= 320px
      320: {
         slidesPerView: 2.5,
         spaceBetween: 20,
      },
      488: {
         slidesPerView: 4,
         spaceBetween: 20,
      },
      // when window width is >= 480px
      760: {
         slidesPerView: 6,
         spaceBetween: 20,
      },
      // when window width is >= 640px
      1172: {
         slidesPerView: 7,
         spaceBetween: 30,
      }
   }
});

if (window.innerWidth < 600) {
   if (document.querySelector(".tur__top-link")) {
      document.querySelector(".tur__top-link").innerHTML = "Все";
   }
   if (document.querySelector(".tur__top-link-2")) {
      document.querySelector(".tur__top-link-2").innerHTML = "Все";
   }
   if (document.querySelector(".tur__top-link-3")) {
      document.querySelector(".tur__top-link-3").innerHTML = "Все";
   }
   if (document.querySelector(".tur__top-link-4")) {
      document.querySelector(".tur__top-link-4").innerHTML = "Все";
   }
};

if (document.querySelectorAll('a[href*="#"]')) {
   const smoothLinks = document.querySelectorAll('a[href^="#"]');
   for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener('click', function (e) {
         e.preventDefault();
         const id = smoothLink.getAttribute('href');

         document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      });
   };
};
if (pageYOffset == 0) {
   if (document.querySelector('.swim')) {
      document.querySelector('.swim').classList.add('hide');
   }
   if (document.querySelector('.header')) {
      document.querySelector('.header').classList.remove('hide');
   }
   if (document.querySelector('.header__mob')) {
      document.querySelector('.header__mob').classList.remove('higher');
   }
} else {
   if (document.querySelector('.swim')) {
      document.querySelector('.swim').classList.remove('hide');
   }
   if (document.querySelector('.header')) {
      document.querySelector('.header').classList.add('hide');
   }
   if (document.querySelector('.header__mob')) {
      document.querySelector('.header__mob').classList.add('higher');
   }
}
window.addEventListener('scroll', function () {
   if (pageYOffset == 0) {
      if (document.querySelector('.swim')) {
         document.querySelector('.swim').classList.add('hide');
      }
      if (document.querySelector('.header')) {
         document.querySelector('.header').classList.remove('hide');
      }
      if (document.querySelector('.header__mob')) {
         document.querySelector('.header__mob').classList.remove('higher');
      }
   } else {
      if (document.querySelector('.swim')) {
         document.querySelector('.swim').classList.remove('hide');
      }
      if (document.querySelector('.header')) {
         document.querySelector('.header').classList.add('hide');
      }
      if (document.querySelector('.header__mob')) {
         document.querySelector('.header__mob').classList.add('higher');
      }
   }
});







parcelRequire = function (e, r, t, n) {
   var i, o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

   function f(t, n) {
      if (!r[t]) {
         if (!e[t]) {
            var i = "function" == typeof parcelRequire && parcelRequire;
            if (!n && i) return i(t, !0);
            if (o) return o(t, !0);
            if (u && "string" == typeof t) return u(t);
            var c = new Error("Cannot find module '" + t + "'");
            throw c.code = "MODULE_NOT_FOUND", c
         }
         p.resolve = function (r) {
            return e[t][1][r] || r
         }, p.cache = {};
         var l = r[t] = new f.Module(t);
         e[t][0].call(l.exports, p, l, l.exports, this)
      }
      return r[t].exports;

      function p(e) {
         return f(p.resolve(e))
      }
   }
   f.isParcelRequire = !0, f.Module = function (e) {
      this.id = e, this.bundle = f, this.exports = {}
   }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
      e[r] = [function (e, r) {
         r.exports = t
      }, {}]
   };
   for (var c = 0; c < t.length; c++) try {
      f(t[c])
   } catch (e) {
      i || (i = e)
   }
   if (t.length) {
      var l = f(t[t.length - 1]);
      "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
         return l
      }) : n && (this[n] = l)
   }
   if (parcelRequire = f, i) throw i;
   return f
}({
   "IvXu": [function (require, module, exports) {
      "use strict";

      function e(e) {
         var n, t, o, r, a = null !== (n = document.querySelectorAll(e.elements)) && void 0 !== n ? n : console.warn("parallaxMouse: Elements is empty!"),
            i = null !== (t = e.moveFactor) && void 0 !== t ? t : 5,
            l = null !== (o = e.wrap) && void 0 !== o ? o : ".container",
            c = null !== (r = e.perspective) && void 0 !== r && r;
         a.forEach(function (e) {
            c && (e.style.transformStyle = "preserve-3d")
         }), document.querySelector(l).addEventListener("mousemove", function (e) {
            var n = (0 - e.pageX / window.innerWidth * i - i / 2 + i) / 2,
               t = (0 - e.pageY / window.innerHeight * i - i / 2 + i) / 2;
            a.forEach(function (o) {
               if (o.style.transform = "translate(".concat(n, "%, ").concat(t, "%)"), c) {
                  var r = (e.pageX - window.pageYOffset - window.innerWidth / 2) / window.innerWidth,
                     a = (e.pageY - window.pageXOffset - window.innerHeight / 2) / window.innerWidth;
                  o.style.transform += "rotateX(".concat(30 * r, "deg) rotateY(").concat(-30 * a, "deg) perspective(").concat(c, ")")
               }
            })
         })
      }
      Object.defineProperty(exports, "__esModule", {
         value: !0
      }), exports.parallaxMouse = e, window.parallaxMouse = e;
   }, {}]
}, {}, ["IvXu"], null)



parallaxMouse({
   elements: '.world__image ',
   moveFactor: 10,
   wrap: 'body'
});

parallaxMouse({
   elements: '.world__image-2 ',
   moveFactor: 10,
   wrap: '.world',
   perspective: '100px'
})

parallaxMouse({
   elements: '.world__image-3 ',
   moveFactor: 10,
   wrap: '.world',
   perspective: '50px'
})

parallaxMouse({
   elements: '.s1-bg-1 ',
   moveFactor: 10,
   wrap: '.world',
   perspective: '50px'
})

parallaxMouse({
   elements: '.more__image-2 ',
   moveFactor: 10,
   wrap: 'body',
   perspective: '50px'
})

parallaxMouse({
   elements: '.info__image-1',
   moveFactor: 10,
   wrap: 'body',
})

parallaxMouse({
   elements: '.decor',
   moveFactor: 1,
   wrap: 'body',
})