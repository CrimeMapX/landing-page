/**
 * Template Name: Logis
 * Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
    plyr: {
      css: "https://cdn.plyr.io/3.6.12/plyr.css",
      js: "https://cdn.plyr.io/3.6.12/plyr.js",
      config: {
        ratio: "16:9",
        fullscreen: {
          enabled: true,
          iosNative: true,
        },
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
        settings: ["captions", "quality", "speed"],
        speed: {
          selected: 1,
          options: [0.5, 0.75, 1, 1.25, 1.5, 2],
        },
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
        vimeo: {
          byline: false,
          portrait: false,
          title: false,
          transparent: false,
        },
      },
    },
    autoplayVideos: false, // Disable autoplay for iOS compatibility
    autofocusVideos: false, // Disable autofocus for iOS compatibility
    touchNavigation: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
    onOpen: () => {
      // Add iOS-specific video handling
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const videoElements = document.querySelectorAll(".glightbox video");
        videoElements.forEach((video) => {
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          video.setAttribute("x-webkit-airplay", "allow");
          video.setAttribute("controls", "");
          video.setAttribute("preload", "metadata");
        });
      }
    },
  });

  /**
   * iOS Video Playback Enhancement
   */
  function enhanceIOSVideoPlayback() {
    // Check if it's iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      console.log("iOS/Android video playback enhancement enabled");
      // Add click handlers to video play buttons for better iOS compatibility
      document.querySelectorAll(".pulsating-play-btn").forEach((button) => {
        button.addEventListener("click", function (e) {
          // Prevent default behavior and handle manually for iOS
          e.preventDefault();

          // Get the video URL from the href
          const videoUrl = "https://link.storjshare.io/s/jw6ag7bkei575tgkubd3m5x2ny3a/cmpx/cmpx_ad_video.mp4";

          // Create a simple video modal for iOS
          const modal = document.createElement("div");
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          `;

          const video = document.createElement("video");
          video.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
          `;
          video.setAttribute("controls", "");
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          video.setAttribute("x-webkit-airplay", "allow");
          video.setAttribute("preload", "metadata");
          video.src = videoUrl;

          const closeBtn = document.createElement("button");
          closeBtn.innerHTML = "×";
          closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10000;
          `;

          modal.appendChild(video);
          modal.appendChild(closeBtn);
          document.body.appendChild(modal);

          // Close modal handlers
          const closeModal = () => {
            video.pause();
            document.body.removeChild(modal);
          };

          closeBtn.addEventListener("click", closeModal);
          modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
          });

          // Try to play video after user interaction
          video.addEventListener("canplay", () => {
            video.play().catch((e) => {
              console.log("Video play failed:", e);
              // Show a fallback message if video fails to play
              const fallbackMsg = document.createElement("div");
              fallbackMsg.innerHTML = `
                <div style="color: white; text-align: center; padding: 20px;">
                  <p>Video playback not supported on this device.</p>
                  <p><a href="${videoUrl}" target="_blank" style="color: #007bff;">Click here to download video</a></p>
                </div>
              `;
              modal.appendChild(fallbackMsg);
            });
          });

          // Handle video load errors
          video.addEventListener("error", () => {
            const errorMsg = document.createElement("div");
            errorMsg.innerHTML = `
              <div style="color: white; text-align: center; padding: 20px;">
                <p>Unable to load video.</p>
                <p><a href="${videoUrl}" target="_blank" style="color: #007bff;">Click here to download video</a></p>
              </div>
            `;
            modal.appendChild(errorMsg);
          });
        });
      });
    }
  }

  // Initialize iOS video enhancement
  window.addEventListener("load", enhanceIOSVideoPlayback);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });
})();
