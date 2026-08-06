(function () {
  const $ = window.jQuery;

  function initScrollAnimations() {
    if (typeof window.jsScrollAnimations === "function") {
      window.jsScrollAnimations().init();
    } else {
      document.querySelectorAll("[data-jsscroll]").forEach((node) => {
        node.classList.add("jsScroll__scrolled");
      });
    }
  }

  function initSlick() {
    if (!$ || !$.fn || !$.fn.slick) return;

    $(".sm-dress-code__slider1").not(".slick-initialized").slick({
      slidesToShow: 1,
      infinite: true,
      adaptiveHeight: false,
      nextArrow: $(".sm-dress-code__slider1").closest(".sm-dress-code__box-gallery__item").find(".arrow-next"),
      prevArrow: $(".sm-dress-code__slider1").closest(".sm-dress-code__box-gallery__item").find(".arrow-prev")
    });

    $(".sm-dress-code__slider2").not(".slick-initialized").slick({
      slidesToShow: 1,
      infinite: true,
      adaptiveHeight: false,
      nextArrow: $(".sm-dress-code__slider2").closest(".sm-dress-code__box-gallery__item").find(".arrow-next"),
      prevArrow: $(".sm-dress-code__slider2").closest(".sm-dress-code__box-gallery__item").find(".arrow-prev")
    });
  }

  function initFancybox() {
    if (window.Fancybox) {
      window.Fancybox.bind("[data-fancybox]", {
        touch: true,
        closeButton: true,
        Thumbs: false,
        caption: false,
        autoScale: true
      });
    }
  }

  function initModals() {
    const body = document.body;
    const questModal = document.querySelector(".sm-quest-modal");
    const thanksModal = document.getElementById("thankYouMessage");

    document.querySelectorAll(".open-modal").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        questModal?.classList.add("sm-open");
        body.classList.add("lock");
      });
    });

    document.querySelector(".sm-quest-modal-close")?.addEventListener("click", () => {
      questModal?.classList.remove("sm-open");
      body.classList.remove("lock");
    });

    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        questModal?.classList.remove("sm-open");
        thanksModal?.classList.add("sm-open");
        body.classList.add("lock");
        form.reset();
      });
    });

    document.getElementById("sm-modal-close")?.addEventListener("click", () => {
      thanksModal?.classList.remove("sm-open");
      body.classList.remove("lock");
    });
  }

  function initMobileButton() {
    const button = document.querySelector(".sm-mob-btn");
    const update = () => {
      if (!button) return;
      button.classList.toggle("sm-hidden_slow", window.scrollY < window.innerHeight / 2);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function declension(value, words) {
    const mod10 = value % 10;
    const mod100 = value % 100;
    if (mod10 === 1 && mod100 !== 11) return words[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return words[1];
    return words[2];
  }

  function setDigits(selector, value, minLength) {
    const root = document.querySelector(selector);
    if (!root) return;
    const digits = String(Math.max(0, value)).padStart(minLength, "0").split("");
    root.innerHTML = digits.map((digit) => (
      `<div class="sm-timer-time_number sm-time__item_number"><span class="sm-timer-time_number-span">${digit}</span></div>`
    )).join("");
  }

  function initCountdown() {
    const target = new Date("2026-09-12T15:00:00+03:00");
    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor(diff / 3600000) % 24;
      const minutes = Math.floor(diff / 60000) % 60;
      const seconds = Math.floor(diff / 1000) % 60;

      setDigits("#days", days, days > 99 ? 3 : 2);
      setDigits("#hours > .sm-time__item_number", hours, 2);
      setDigits("#minutes", minutes, 2);
      setDigits("#seconds > .sm-time__item_number", seconds, 2);

      const daysTitle = document.getElementById("days-title");
      const hoursTitle = document.getElementById("hours-title");
      const minutesTitle = document.getElementById("minutes-title");
      const secondsTitle = document.getElementById("seconds-title");
      if (daysTitle) daysTitle.textContent = declension(days, ["День", "Дня", "Дней"]);
      if (hoursTitle) hoursTitle.textContent = declension(hours, ["Час", "Часа", "Часов"]);
      if (minutesTitle) minutesTitle.textContent = declension(minutes, ["Минута", "Минуты", "Минут"]);
      if (secondsTitle) secondsTitle.textContent = declension(seconds, ["Секунда", "Секунды", "Секунд"]);
    };
    update();
    window.setInterval(update, 1000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initSlick();
    initFancybox();
    initModals();
    initMobileButton();
    initCountdown();
  });
}());
