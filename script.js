// قائمة الموبايل
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// اقفل القائمة لما تدوس على أي لينك
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// فورم التواصل: نحفظ الطلب محليًا ونورّي رسالة تأكيد
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const request = {
    name: document.getElementById("name").value.trim(),
    project: document.getElementById("project").value.trim(),
    message: document.getElementById("message").value.trim(),
    date: new Date().toLocaleString("ar-EG"),
  };

  try {
    const saved = JSON.parse(localStorage.getItem("zather_requests") || "[]");
    saved.push(request);
    localStorage.setItem("zather_requests", JSON.stringify(saved));
  } catch (err) {
    // لو التخزين المحلي مش متاح، نكمل عادي
  }

  form.reset();
  formMsg.hidden = false;
  setTimeout(() => {
    formMsg.hidden = true;
  }, 5000);
});

// ظهور الكروت بنعومة أثناء التمرير
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".card, .skill, .rules-list li").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});
