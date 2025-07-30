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
        // Enhanced iOS compatibility
        playsinline: true,
        autopause: false,
        resetOnEnd: false,
        clickToPlay: true,
        disableContextMenu: false,
        loadSprite: true,
        iconPrefix: 'plyr',
        iconUrl: 'https://cdn.plyr.io/3.6.12/plyr.svg',
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
          video.setAttribute("muted", "false");
          
          // Add error handling for iOS
          video.addEventListener('error', function(e) {
            console.error('Video error on iOS:', e);
            // Fallback: try to reload the video
            setTimeout(() => {
              if (this.readyState === 0) {
                this.load();
              }
            }, 1000);
          });
          
          // Handle loading states
          video.addEventListener('loadstart', function() {
            console.log('Video load started');
          });
          
          video.addEventListener('canplay', function() {
            console.log('Video can play');
          });
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
      // Add click handlers to video play buttons for better iOS compatibility
      document.querySelectorAll(".pulsating-play-btn").forEach((button) => {
        button.addEventListener("click", function (e) {
          // First try GLightbox, but have a fallback for iOS issues
          const videoUrl = this.getAttribute("href");
          
          // Enhanced iOS video modal as fallback
          button.addEventListener("error", function() {
            e.preventDefault();
            createIOSVideoModal(videoUrl);
          });
        });
      });
    }
    
    // Create iOS-optimized video modal
    function createIOSVideoModal(videoUrl) {
      // Remove any existing modal
      const existingModal = document.querySelector('.ios-video-modal');
      if (existingModal) {
        existingModal.remove();
      }

      const modal = document.createElement("div");
      modal.className = 'ios-video-modal';
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      `;

      const videoContainer = document.createElement("div");
      videoContainer.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 800px;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const video = document.createElement("video");
      video.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 80vh;
        border-radius: 8px;
      `;
      
      // Essential iOS attributes
      video.setAttribute("controls", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("x-webkit-airplay", "allow");
      video.setAttribute("preload", "metadata");
      video.setAttribute("poster", "assets/img/about.jpg");
      
      // Multiple source formats for better compatibility
      const mp4Source = document.createElement("source");
      mp4Source.src = videoUrl;
      mp4Source.type = "video/mp4";
      video.appendChild(mp4Source);
      
      // Add error handling
      video.addEventListener('error', function(e) {
        console.error('Video failed to load:', e);
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
          color: white;
          text-align: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        errorMsg.innerHTML = `
          <h3>Video no disponible</h3>
          <p>No se pudo cargar el video. <a href="${videoUrl}" target="_blank" style="color: #007AFF;">Descargar video</a></p>
        `;
        videoContainer.replaceChild(errorMsg, video);
      });

      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "×";
      closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        border: none;
        color: white;
        font-size: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
      };

      closeBtn.addEventListener("click", closeModal);
      modal.addEventListener("click", function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      videoContainer.appendChild(video);
      videoContainer.appendChild(closeBtn);
      modal.appendChild(videoContainer);
      document.body.appendChild(modal);

      // Auto-play attempt (will only work if user initiated)
      setTimeout(() => {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      }, 100);
    }
  }

  /**
   * Initialize everything when DOM is loaded
   */
  document.addEventListener('DOMContentLoaded', function() {
    enhanceIOSVideoPlayback();
    
    // Log iOS detection for debugging
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      console.log('iOS device detected - video enhancements activated');
    }
  });

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
