(function () {
    const entrance = {
      duration: 1000,
      distance: 200,
      heightOffset: 200,
  
      isElemInView(elem) {
        const rect = elem.getBoundingClientRect();
        return (
          (rect.top + this.heightOffset >= 0 &&
            rect.top + this.heightOffset <= window.innerHeight) ||
          (rect.bottom + this.heightOffset >= 0 &&
            rect.bottom + this.heightOffset <= window.innerHeight) ||
          (rect.top + this.heightOffset < 0 &&
            rect.bottom + this.heightOffset > window.innerHeight)
        );
      },
  
      setInitialStyles(elem) {
        document.body.style.overflowX = "hidden";
        const anim = elem.getAttribute("data-entrance");
        const delay = elem.getAttribute("data-entrance-delay");
        elem.style.transition = `all ${this.duration / 1000}s ease`;
        if (delay) {
          elem.style.transitionDelay = `${delay / 1000}s`;
        }
  
        elem.style.opacity = "0";
        if (anim === "fade") return;
        const transformMap = {
          "from-left": `translate(-${this.distance}px, 0)`,
          "from-right": `translate(${this.distance}px, 0)`,
          "from-top": `translate(0, -${this.distance}px)`,
          "from-bottom": `translate(0, ${this.distance}px)`,
        };
        elem.style.transform = transformMap[anim] || "translate(0, 0)";
      },
  
      enter(elem) {
        elem.style.opacity = "1";
        elem.style.transform = "translate(0, 0)";
        elem.classList.add("has-entered");
      },
  
      viewportChange() {
        Array.from(this.elements).forEach((item) => {
          if (this.isElemInView(item) && !item.classList.contains("has-entered")) {
            this.enter(item);
          }
        });
      },
  
      init() {
        this.elements = document.querySelectorAll("[data-entrance]");
        this.elements.forEach((elem) => {
          this.setInitialStyles(elem);
          if (this.isElemInView(elem)) {
            window.addEventListener("load", () => this.enter(elem));
          }
        });
      },
    };
  
    document.addEventListener("DOMContentLoaded", () => entrance.init());
    window.addEventListener("scroll", () => entrance.viewportChange());
    window.addEventListener("resize", () => entrance.viewportChange());
  })();
  


/* Demo purposes only */
$(".hover").mouseleave(
    function () {
      $(this).removeClass("hover");
    }
  );
  




// bizantine era 
const els = document.querySelectorAll("[type='radio']");
for (const el of els)
  el.addEventListener("input", e => reorder(e.target, els));
reorder(els[0], els);

function reorder(targetEl, els) {
  const nItems = els.length;
  let processedUncheck = 0;
  for (const el of els) {
    const containerEl = el.nextElementSibling;
    if (el === targetEl) {//checked radio
      containerEl.style.setProperty("--w", "100%");
      containerEl.style.setProperty("--l", "0");
    }
    else {//unchecked radios
      containerEl.style.setProperty("--w", `${100/(nItems-1)}%`);
      containerEl.style.setProperty("--l", `${processedUncheck * 100/(nItems-1)}%`);
      processedUncheck += 1;
    }
  }
}




document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;

  // Create 17 slides
  for (let i = 1; i <= 17; i++) {
      const slide = document.createElement('div');
      slide.className = 'slide';
      
      const img = document.createElement('img');
      img.src = `/api/placeholder/800/500?text=Image+${i}`;
      img.alt = `Slide ${i}`;
      
      slide.appendChild(img);
      slider.appendChild(slide);
  }

  function moveSlide() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % 17;
      moveSlide();
  });

  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + 17) % 17;
      moveSlide();
  });

  // Automatic sliding
  setInterval(() => {
      currentIndex = (currentIndex + 1) % 17;
      moveSlide();
  }, 3000);
});




var i = 0;
var txt = 'Lorem ipsum typing effect!'; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}