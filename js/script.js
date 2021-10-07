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
   document.querySelector(".tur__top-link").innerHTML = "Все";
   document.querySelector(".tur__top-link-2").innerHTML = "Все";
   document.querySelector(".tur__top-link-3").innerHTML = "Все";
};