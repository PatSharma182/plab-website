document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const siteNav = document.querySelector(".plab-nav");
  const siteMenu = siteNav ? siteNav.querySelector(".plab-menu") : null;
  const mobileNavQuery = window.matchMedia("(max-width: 768px)");

  if (siteNav && siteMenu) {
    if (!siteNav.querySelector(".mobile-nav-toggle")) {
      const mobileToggle = document.createElement("button");
      mobileToggle.className = "mobile-nav-toggle";
      mobileToggle.type = "button";
      mobileToggle.setAttribute("aria-label", "Open navigation menu");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.setAttribute("aria-controls", "plabMobileMenu");
      mobileToggle.innerHTML = "<span></span><span></span><span></span>";
      siteNav.insertBefore(mobileToggle, siteMenu);
    }

    if (!siteNav.querySelector(".mobile-menu-panel")) {
      const mobilePanel = document.createElement("div");
      mobilePanel.className = "mobile-menu-panel";
      mobilePanel.id = "plabMobileMenu";
      mobilePanel.setAttribute("aria-label", "Mobile navigation");

      [
        { href: "index.html", text: "Home" },
        { href: "brand-story-videos.html", text: "Brand Story Videos" },
        { href: "social-media-content.html", text: "Social Media Content" },
        { href: "testimonial-videos.html", text: "Testimonial Videos" },
        { href: "portfolio.html", text: "Portfolio" },
        { href: "strategy-call.html", text: "Strategy Call" },
        { href: "quote.html", text: "Get Quote" },
        { href: "organic-marketing-audit-start.html", text: "Free Marketing Audit" }
      ].forEach(item => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        mobilePanel.appendChild(link);
      });

      siteNav.appendChild(mobilePanel);
    }

    const mobileToggle = siteNav.querySelector(".mobile-nav-toggle");
    const mobilePanel = siteNav.querySelector(".mobile-menu-panel");
    let mobileCloseTimer = null;
    const mobileMotionDuration = 460;

    const closeMobileNav = () => {
      if (!siteNav.classList.contains("is-mobile-open")) return;

      window.clearTimeout(mobileCloseTimer);
      siteNav.classList.remove("is-mobile-open");
      siteNav.classList.add("is-mobile-closing");
      document.body.classList.add("mobile-nav-closing");

      if (mobileToggle) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.setAttribute("aria-label", "Open navigation menu");
      }

      mobileCloseTimer = window.setTimeout(() => {
        siteNav.classList.remove("is-mobile-closing");
        document.body.classList.remove("mobile-nav-open", "mobile-nav-closing");
      }, mobileMotionDuration);
    };

    const openMobileNav = () => {
      window.clearTimeout(mobileCloseTimer);
      siteNav.classList.remove("is-mobile-closing");
      document.body.classList.remove("mobile-nav-closing");
      siteNav.classList.add("is-mobile-open");
      document.body.classList.add("mobile-nav-open");

      if (mobileToggle) {
        mobileToggle.setAttribute("aria-expanded", "true");
        mobileToggle.setAttribute("aria-label", "Close navigation menu");
      }
    };

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        if (!mobileNavQuery.matches) return;

        if (siteNav.classList.contains("is-mobile-open")) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (mobilePanel) {
      mobilePanel.addEventListener("click", event => {
        const link = event.target.closest("a");

        if (link && mobileNavQuery.matches) {
          closeMobileNav();
        }
      });
    }

    document.addEventListener("click", event => {
      if (!mobileNavQuery.matches || !siteNav.classList.contains("is-mobile-open")) return;
      if (siteNav.contains(event.target)) return;

      closeMobileNav();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && siteNav.classList.contains("is-mobile-open")) {
        closeMobileNav();
        if (mobileToggle) mobileToggle.focus();
      }
    });

    mobileNavQuery.addEventListener("change", event => {
      if (!event.matches) {
        window.clearTimeout(mobileCloseTimer);
        closeMobileNav();
        siteNav.classList.remove("is-mobile-open", "is-mobile-closing");
        document.body.classList.remove("mobile-nav-open", "mobile-nav-closing");
      }
    });
  }

  const navServices = document.querySelectorAll(".nav-services");

  if (navServices.length) {
    const desktopNavQuery = window.matchMedia("(min-width: 901px)");

    navServices.forEach(dropdown => {
      const summary = dropdown.querySelector(".nav-services-summary");
      let closeTimer = null;

      const openDropdown = () => {
        if (!desktopNavQuery.matches) return;

        window.clearTimeout(closeTimer);
        dropdown.classList.remove("is-nav-closing");
        dropdown.setAttribute("open", "");

        window.requestAnimationFrame(() => {
          dropdown.classList.add("is-nav-open");
        });
      };

      const closeDropdown = () => {
        if (!desktopNavQuery.matches) return;

        dropdown.classList.remove("is-nav-open");
        dropdown.classList.add("is-nav-closing");
        window.clearTimeout(closeTimer);

        closeTimer = window.setTimeout(() => {
          dropdown.classList.remove("is-nav-closing");
          dropdown.removeAttribute("open");
        }, 210);
      };

      dropdown.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseleave", closeDropdown);
      dropdown.addEventListener("focusin", openDropdown);
      dropdown.addEventListener("focusout", () => {
        window.setTimeout(() => {
          if (!dropdown.contains(document.activeElement)) {
            closeDropdown();
          }
        }, 0);
      });

      if (summary) {
        summary.addEventListener("mousedown", event => {
          if (desktopNavQuery.matches) {
            event.preventDefault();
          }
        });

        summary.addEventListener("click", event => {
          if (desktopNavQuery.matches) {
            event.preventDefault();
          }
        });
      }

      desktopNavQuery.addEventListener("change", event => {
        window.clearTimeout(closeTimer);
        dropdown.classList.remove("is-nav-open", "is-nav-closing");

        if (event.matches) {
          dropdown.removeAttribute("open");
        }
      });
    });
  }

  const reviewsMarquee = document.querySelector(".reviews-marquee");

  if (reviewsMarquee) {
    const reviewsMobileQuery = window.matchMedia("(max-width: 768px)");
    let reviewsResumeTimer = null;

    const pauseReviewsAutoScroll = () => {
      if (!reviewsMobileQuery.matches) return;

      reviewsMarquee.classList.add("is-user-interacting");
      window.clearTimeout(reviewsResumeTimer);
    };

    const scheduleReviewsAutoScrollResume = () => {
      if (!reviewsMobileQuery.matches) return;

      window.clearTimeout(reviewsResumeTimer);
      reviewsResumeTimer = window.setTimeout(() => {
        reviewsMarquee.classList.remove("is-user-interacting");
      }, 2000);
    };

    ["touchstart", "pointerdown"].forEach(eventName => {
      reviewsMarquee.addEventListener(eventName, pauseReviewsAutoScroll, { passive: true });
    });

    ["touchend", "touchcancel", "pointerup", "pointercancel"].forEach(eventName => {
      reviewsMarquee.addEventListener(eventName, scheduleReviewsAutoScrollResume, { passive: true });
    });

    ["touchmove", "wheel", "scroll"].forEach(eventName => {
      reviewsMarquee.addEventListener(eventName, () => {
        pauseReviewsAutoScroll();
        scheduleReviewsAutoScrollResume();
      }, { passive: true });
    });

    reviewsMobileQuery.addEventListener("change", event => {
      if (!event.matches) {
        window.clearTimeout(reviewsResumeTimer);
        reviewsMarquee.classList.remove("is-user-interacting");
      }
    });
  }

  const servicesEngine = document.querySelector(".services-engine");

  if (servicesEngine) {
    const servicesEngineMobileQuery = window.matchMedia("(max-width: 768px)");
    const servicesEngineReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const servicesEngineStages = Array.from(servicesEngine.querySelectorAll(".engine-step"));
    const SERVICES_ENGINE_HOLD_MS = 250;
    const SERVICES_ENGINE_RESUME_MS = 2000;
    let servicesEngineResumeTimer = null;
    let servicesEngineHoldTimer = null;
    let servicesEngineRaf = null;
    let servicesEngineIndex = 0;
    let servicesEnginePaused = false;
    let servicesEngineIsAutoPanning = false;
    let servicesEngineInView = false;
    let servicesEngineWasInView = false;
    let servicesEngineUserInteracting = false;

    const canAutoPanServicesEngine = () => (
      servicesEngineMobileQuery.matches &&
      !servicesEngineReducedMotionQuery.matches &&
      servicesEngineInView &&
      servicesEngineStages.length > 1
    );

    const getServicesEngineTargets = () => {
      const engineRect = servicesEngine.getBoundingClientRect();
      const maxScroll = servicesEngine.scrollWidth - servicesEngine.clientWidth;

      return servicesEngineStages.map(stage => {
        const stageRect = stage.getBoundingClientRect();
        const stageCenter = stageRect.left - engineRect.left + servicesEngine.scrollLeft + stageRect.width / 2;
        return Math.max(0, Math.min(maxScroll, stageCenter - servicesEngine.clientWidth / 2));
      });
    };

    const stopServicesEngineAutoPan = () => {
      window.clearTimeout(servicesEngineHoldTimer);
      window.clearTimeout(servicesEngineResumeTimer);

      if (servicesEngineRaf) {
        window.cancelAnimationFrame(servicesEngineRaf);
        servicesEngineRaf = null;
      }

      servicesEngineIsAutoPanning = false;
    };

    const animateServicesEngineTo = (target, duration = 820) => {
      const start = servicesEngine.scrollLeft;
      const distance = target - start;
      const startedAt = window.performance.now();

      servicesEngineIsAutoPanning = true;

      const step = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = progress < .5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        servicesEngine.scrollLeft = start + distance * eased;

        if (progress < 1 && !servicesEnginePaused && canAutoPanServicesEngine()) {
          servicesEngineRaf = window.requestAnimationFrame(step);
          return;
        }

        servicesEngineRaf = null;
        servicesEngineIsAutoPanning = false;

        if (!servicesEnginePaused && canAutoPanServicesEngine()) {
          servicesEngineHoldTimer = window.setTimeout(runServicesEngineAutoPan, SERVICES_ENGINE_HOLD_MS);
        }
      };

      servicesEngineRaf = window.requestAnimationFrame(step);
    };

    const runServicesEngineAutoPan = () => {
      if (servicesEnginePaused || !canAutoPanServicesEngine()) return;

      const targets = getServicesEngineTargets();
      if (!targets.length) return;

      if (servicesEngineIndex >= targets.length - 1) {
        servicesEngineIndex = 0;
        animateServicesEngineTo(targets[0], 1150);
        return;
      }

      servicesEngineIndex += 1;
      animateServicesEngineTo(targets[servicesEngineIndex]);
    };

    const pauseServicesEngineAutoPan = () => {
      if (!canAutoPanServicesEngine()) return;

      servicesEnginePaused = true;
      stopServicesEngineAutoPan();
    };

    const scheduleServicesEngineResume = () => {
      if (!canAutoPanServicesEngine()) return;

      window.clearTimeout(servicesEngineResumeTimer);
      servicesEngineResumeTimer = window.setTimeout(() => {
        servicesEnginePaused = false;

        const targets = getServicesEngineTargets();
        if (targets.length) {
          const current = servicesEngine.scrollLeft;
          servicesEngineIndex = targets.reduce((closestIndex, target, index) => {
            return Math.abs(target - current) < Math.abs(targets[closestIndex] - current) ? index : closestIndex;
          }, 0);
        }

        servicesEngineHoldTimer = window.setTimeout(runServicesEngineAutoPan, SERVICES_ENGINE_HOLD_MS);
      }, SERVICES_ENGINE_RESUME_MS);
    };

    const handleServicesEngineInteraction = event => {
      if (servicesEngineIsAutoPanning && event.type === "scroll") return;

      if (event.type === "touchstart" || event.type === "pointerdown") {
        servicesEngineUserInteracting = true;
      } else if (event.type === "touchend" || event.type === "touchcancel" || event.type === "pointerup" || event.type === "pointercancel") {
        servicesEngineUserInteracting = false;
      }

      pauseServicesEngineAutoPan();
      scheduleServicesEngineResume();
    };

    ["touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointerup", "pointercancel", "wheel", "scroll"].forEach(eventName => {
      servicesEngine.addEventListener(eventName, handleServicesEngineInteraction, { passive: true });
    });

    const resetServicesEngineAutoPan = () => {
      stopServicesEngineAutoPan();
      servicesEnginePaused = false;
      servicesEngineIndex = 0;

      if (canAutoPanServicesEngine()) {
        servicesEngine.scrollLeft = 0;
        servicesEngineHoldTimer = window.setTimeout(runServicesEngineAutoPan, SERVICES_ENGINE_HOLD_MS);
      } else if (servicesEngineMobileQuery.matches && !servicesEngineReducedMotionQuery.matches) {
        servicesEngine.scrollLeft = 0;
      }
    };

    servicesEngineMobileQuery.addEventListener("change", resetServicesEngineAutoPan);
    servicesEngineReducedMotionQuery.addEventListener("change", resetServicesEngineAutoPan);

    if ("IntersectionObserver" in window) {
      const servicesEngineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          servicesEngineInView = entry.isIntersecting;

          if (entry.isIntersecting) {
            if (!servicesEngineWasInView) {
              servicesEngineWasInView = true;
              resetServicesEngineAutoPan();
            }
            return;
          }

          if (servicesEngineWasInView) {
            servicesEngineWasInView = false;
            if (servicesEngineUserInteracting) {
              window.setTimeout(resetServicesEngineAutoPan, SERVICES_ENGINE_RESUME_MS);
            } else {
              resetServicesEngineAutoPan();
            }
          }
        });
      }, { threshold: .2 });

      servicesEngineObserver.observe(servicesEngine);
    } else {
      servicesEngineInView = true;
      resetServicesEngineAutoPan();
    }
  }

  const brandUseDeck = document.querySelector(".brand-use-deck");

  if (brandUseDeck) {
    const brandUseMobileQuery = window.matchMedia("(max-width: 768px)");
    const brandUseReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const brandUseCards = Array.from(brandUseDeck.querySelectorAll(".brand-placement-card"));
    const BRAND_USE_HOLD_MS = 300;
    const BRAND_USE_SCROLL_MS = 800;
    const BRAND_USE_RESUME_MS = 500;
    let brandUseResumeTimer = null;
    let brandUseHoldTimer = null;
    let brandUseRaf = null;
    let brandUseIndex = 0;
    let brandUsePaused = false;
    let brandUseIsAutoPanning = false;
    let brandUseInView = false;
    let brandUseWasInView = false;
    let brandUseUserInteracting = false;

    const canAutoPanBrandUse = () => (
      brandUseMobileQuery.matches &&
      !brandUseReducedMotionQuery.matches &&
      brandUseInView &&
      brandUseCards.length > 1
    );

    const getBrandUseTargets = () => {
      const maxScroll = brandUseDeck.scrollWidth - brandUseDeck.clientWidth;

      return brandUseCards.map(card => {
        const target = card.offsetLeft - ((brandUseDeck.clientWidth - card.offsetWidth) / 2);
        return Math.max(0, Math.min(maxScroll, target));
      });
    };

    const getClosestBrandUseIndex = () => {
      const targets = getBrandUseTargets();
      if (!targets.length) return 0;

      const current = brandUseDeck.scrollLeft;
      return targets.reduce((closestIndex, target, index) => (
        Math.abs(target - current) < Math.abs(targets[closestIndex] - current) ? index : closestIndex
      ), 0);
    };

    const stopBrandUseAutoPan = () => {
      window.clearTimeout(brandUseHoldTimer);
      window.clearTimeout(brandUseResumeTimer);

      if (brandUseRaf) {
        window.cancelAnimationFrame(brandUseRaf);
        brandUseRaf = null;
      }

      brandUseIsAutoPanning = false;
      brandUseDeck.classList.remove("is-auto-panning");
    };

    const animateBrandUseTo = (target, duration = BRAND_USE_SCROLL_MS) => {
      const start = brandUseDeck.scrollLeft;
      const distance = target - start;
      const startedAt = window.performance.now();

      brandUseIsAutoPanning = true;
      brandUseDeck.classList.add("is-auto-panning");

      const step = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = progress < .5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        brandUseDeck.scrollLeft = start + distance * eased;

        if (progress < 1 && !brandUsePaused && canAutoPanBrandUse()) {
          brandUseRaf = window.requestAnimationFrame(step);
          return;
        }

        brandUseRaf = null;
        brandUseIsAutoPanning = false;
        brandUseDeck.classList.remove("is-auto-panning");

        if (!brandUsePaused && canAutoPanBrandUse()) {
          brandUseHoldTimer = window.setTimeout(runBrandUseAutoPan, BRAND_USE_HOLD_MS);
        }
      };

      brandUseRaf = window.requestAnimationFrame(step);
    };

    const runBrandUseAutoPan = () => {
      if (brandUsePaused || !canAutoPanBrandUse()) return;

      const targets = getBrandUseTargets();
      if (!targets.length) return;

      if (brandUseIndex >= targets.length - 1) {
        brandUseIndex = 0;
        animateBrandUseTo(targets[0], BRAND_USE_SCROLL_MS);
        return;
      }

      brandUseIndex += 1;
      animateBrandUseTo(targets[brandUseIndex]);
    };

    const pauseBrandUseAutoPan = () => {
      if (!canAutoPanBrandUse()) return;

      brandUsePaused = true;
      stopBrandUseAutoPan();
    };

    const scheduleBrandUseResume = () => {
      if (!canAutoPanBrandUse()) return;

      window.clearTimeout(brandUseResumeTimer);
      brandUseResumeTimer = window.setTimeout(() => {
        brandUsePaused = false;
        brandUseIndex = getClosestBrandUseIndex();
        brandUseHoldTimer = window.setTimeout(runBrandUseAutoPan, BRAND_USE_HOLD_MS);
      }, BRAND_USE_RESUME_MS);
    };

    const handleBrandUseInteraction = event => {
      if (brandUseIsAutoPanning && event.type === "scroll") return;

      if (event.type === "touchstart" || event.type === "pointerdown") {
        brandUseUserInteracting = true;
      } else if (event.type === "touchend" || event.type === "touchcancel" || event.type === "pointerup" || event.type === "pointercancel") {
        brandUseUserInteracting = false;
      }

      pauseBrandUseAutoPan();
      brandUseIndex = getClosestBrandUseIndex();
      scheduleBrandUseResume();
    };

    ["touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointerup", "pointercancel", "wheel", "scroll"].forEach(eventName => {
      brandUseDeck.addEventListener(eventName, handleBrandUseInteraction, { passive: true });
    });

    const resetBrandUseAutoPan = () => {
      stopBrandUseAutoPan();
      brandUsePaused = false;
      brandUseIndex = 0;

      if (canAutoPanBrandUse()) {
        const targets = getBrandUseTargets();
        brandUseDeck.scrollLeft = targets[0] || 0;
        brandUseHoldTimer = window.setTimeout(runBrandUseAutoPan, BRAND_USE_HOLD_MS);
      } else if (brandUseMobileQuery.matches && !brandUseReducedMotionQuery.matches) {
        const targets = getBrandUseTargets();
        brandUseDeck.scrollLeft = targets[0] || 0;
      }
    };

    brandUseMobileQuery.addEventListener("change", resetBrandUseAutoPan);
    brandUseReducedMotionQuery.addEventListener("change", resetBrandUseAutoPan);

    if ("IntersectionObserver" in window) {
      const brandUseObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          brandUseInView = entry.isIntersecting;

          if (entry.isIntersecting) {
            if (!brandUseWasInView) {
              brandUseWasInView = true;
              resetBrandUseAutoPan();
            }
            return;
          }

          if (brandUseWasInView) {
            brandUseWasInView = false;
            if (brandUseUserInteracting) {
              window.setTimeout(resetBrandUseAutoPan, BRAND_USE_RESUME_MS);
            } else {
              resetBrandUseAutoPan();
            }
          }
        });
      }, { threshold: .2 });

      brandUseObserver.observe(brandUseDeck);
    } else {
      brandUseInView = true;
      resetBrandUseAutoPan();
    }
  }

  const scrollActiveGroups = [
    Array.from(document.querySelectorAll(".problem-card")),
    Array.from(document.querySelectorAll(".services-grid .service-card")),
    Array.from(document.querySelectorAll(".brand-benefit-grid .brand-glass-card")),
    Array.from(document.querySelectorAll(".brand-process-grid .brand-process-step")),
    Array.from(document.querySelectorAll(".brand-faq-grid .brand-faq-card")),
    Array.from(document.querySelectorAll(".testimonial-use-grid span")),
    Array.from(document.querySelectorAll(".content-proof-video-grid .content-proof-video-card")),
    Array.from(document.querySelectorAll(".content-transformation-list .content-transformation-item")),
    Array.from(document.querySelectorAll(".audit-step-stack .audit-journey-step")),
    Array.from(document.querySelectorAll(".audit-feature-grid .audit-feature-card")),
    Array.from(document.querySelectorAll(".audit-industry-grid span")),
    Array.from(document.querySelectorAll(".audit-report-grid .audit-report-card")),
    Array.from(document.querySelectorAll(".audit-next-grid .audit-next-card"))
  ].filter(group => group.length);

  if (scrollActiveGroups.length) {
    const scrollActiveMobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const MOBILE_CARD_ACTIVE_Y_RATIO = 0.64;
    let scrollActiveRaf = null;

    const clearActiveCards = () => {
      scrollActiveGroups.forEach(group => {
        group.forEach(card => card.classList.remove("is-scroll-active"));
      });
    };

    const updateActiveCards = () => {
      scrollActiveRaf = null;

      if (!scrollActiveMobileQuery.matches || reducedMotionQuery.matches) {
        clearActiveCards();
        return;
      }

      const activeLineY = window.innerHeight * MOBILE_CARD_ACTIVE_Y_RATIO;

      scrollActiveGroups.forEach(group => {
        let activeCard = null;
        let closestDistance = Infinity;

        group.forEach(card => {
          const rect = card.getBoundingClientRect();
          const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

          if (!isVisible) return;

          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - activeLineY);

          if (distance < closestDistance) {
            closestDistance = distance;
            activeCard = card;
          }
        });

        group.forEach(card => {
          card.classList.toggle("is-scroll-active", card === activeCard);
        });
      });
    };

    const requestScrollActiveUpdate = () => {
      if (scrollActiveRaf) return;
      scrollActiveRaf = window.requestAnimationFrame(updateActiveCards);
    };

    window.addEventListener("scroll", requestScrollActiveUpdate, { passive: true });
    window.addEventListener("resize", requestScrollActiveUpdate);
    scrollActiveMobileQuery.addEventListener("change", requestScrollActiveUpdate);
    reducedMotionQuery.addEventListener("change", requestScrollActiveUpdate);
    requestScrollActiveUpdate();
  }

  const workCards = document.querySelectorAll(".work-card");
  const videoModal = document.getElementById("videoModal");
  const iframe = document.getElementById("youtubeFrame");
  const closeBtn = document.querySelector(".video-close");
  const modalBg = document.querySelector(".video-modal-bg");

  if (videoModal && iframe && closeBtn && modalBg) {
    workCards.forEach(card => {
      card.addEventListener("click", () => {
        const videoId = card.dataset.youtube;
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add("active");
      });
    });

    const closeVideoModal = () => {
      videoModal.classList.remove("active");
      iframe.src = "";
    };

    closeBtn.addEventListener("click", closeVideoModal);
    modalBg.addEventListener("click", closeVideoModal);
  }

  const usecaseCards = document.querySelectorAll(".brand-placement-card");

  if (usecaseCards.length) {
    const setActiveUsecase = activeCard => {
      usecaseCards.forEach(card => {
        card.classList.toggle("is-active-usecase", card === activeCard);
      });
    };

    const defaultUsecase = document.querySelector(".placement-website") || usecaseCards[0];
    setActiveUsecase(defaultUsecase);

    usecaseCards.forEach(card => {
      card.addEventListener("mouseenter", () => setActiveUsecase(card));
      card.addEventListener("focus", () => setActiveUsecase(card));
    });
  }

  const socialHeroVideos = document.querySelectorAll("[data-social-hero-video]");

  if (socialHeroVideos.length) {
    socialHeroVideos.forEach((video, index) => {
      video.pause();
      video.currentTime = 0;

      setTimeout(() => {
        video.play().catch(() => {});
      }, index * 200);
    });
  }

  const socialLibraryShowcase = document.querySelector(".social-library-showcase");

  if (socialLibraryShowcase) {
    const libraryCards = socialLibraryShowcase.querySelectorAll("[data-library-card]");
    const libraryChips = socialLibraryShowcase.querySelectorAll("[data-library-target]");
    const libraryStack = socialLibraryShowcase.querySelector(".social-library-stack");

    const setActiveLibraryCard = key => {
      libraryCards.forEach(card => {
        card.classList.toggle("is-library-active", card.dataset.libraryCard === key);
      });
    };

    libraryCards.forEach(card => {
      card.addEventListener("mouseenter", () => setActiveLibraryCard(card.dataset.libraryCard));
    });

    libraryChips.forEach(chip => {
      chip.addEventListener("mouseenter", () => setActiveLibraryCard(chip.dataset.libraryTarget));
      chip.addEventListener("focus", () => setActiveLibraryCard(chip.dataset.libraryTarget));
    });

    if ("IntersectionObserver" in window) {
      const libraryObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            socialLibraryShowcase.classList.add("is-visible");
            libraryObserver.disconnect();
          }
        });
      }, { threshold: 0.28 });

      libraryObserver.observe(socialLibraryShowcase);
    } else {
      socialLibraryShowcase.classList.add("is-visible");
    }

    if (libraryStack && libraryCards.length > 1) {
      const libraryMobileQuery = window.matchMedia("(max-width: 768px)");
      const libraryReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const libraryCardList = Array.from(libraryCards);
      const LIBRARY_HOLD_MS = 500;
      const LIBRARY_SCROLL_MS = 600;
      const LIBRARY_RESUME_MS = 2000;
      let libraryResumeTimer = null;
      let libraryHoldTimer = null;
      let libraryRaf = null;
      let libraryIndex = 0;
      let libraryPaused = false;
      let libraryIsAutoPanning = false;
      let libraryInView = false;
      let libraryWasInView = false;
      let libraryUserInteracting = false;

      const canAutoPanLibrary = () => (
        libraryMobileQuery.matches &&
        !libraryReducedMotionQuery.matches &&
        libraryInView &&
        libraryCardList.length > 1
      );

      const getLibraryTargets = () => {
        const maxScroll = libraryStack.scrollWidth - libraryStack.clientWidth;

        return libraryCardList.map(card => {
          const target = card.offsetLeft - ((libraryStack.clientWidth - card.offsetWidth) / 2);
          return Math.max(0, Math.min(maxScroll, target));
        });
      };

      const getClosestLibraryIndex = () => {
        const targets = getLibraryTargets();
        if (!targets.length) return 0;

        const current = libraryStack.scrollLeft;
        return targets.reduce((closestIndex, target, index) => (
          Math.abs(target - current) < Math.abs(targets[closestIndex] - current) ? index : closestIndex
        ), 0);
      };

      const stopLibraryAutoPan = () => {
        window.clearTimeout(libraryHoldTimer);
        window.clearTimeout(libraryResumeTimer);

        if (libraryRaf) {
          window.cancelAnimationFrame(libraryRaf);
          libraryRaf = null;
        }

        libraryIsAutoPanning = false;
        libraryStack.classList.remove("is-auto-panning");
      };

      const animateLibraryTo = (target, duration = LIBRARY_SCROLL_MS) => {
        const start = libraryStack.scrollLeft;
        const distance = target - start;
        const startedAt = window.performance.now();

        libraryIsAutoPanning = true;
        libraryStack.classList.add("is-auto-panning");

        const step = now => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = progress < .5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          libraryStack.scrollLeft = start + distance * eased;

          if (progress < 1 && !libraryPaused && canAutoPanLibrary()) {
            libraryRaf = window.requestAnimationFrame(step);
            return;
          }

          libraryRaf = null;
          libraryIsAutoPanning = false;
          libraryStack.classList.remove("is-auto-panning");
          setActiveLibraryCard(libraryCardList[libraryIndex].dataset.libraryCard);

          if (!libraryPaused && canAutoPanLibrary()) {
            libraryHoldTimer = window.setTimeout(runLibraryAutoPan, LIBRARY_HOLD_MS);
          }
        };

        libraryRaf = window.requestAnimationFrame(step);
      };

      const runLibraryAutoPan = () => {
        if (libraryPaused || !canAutoPanLibrary()) return;

        const targets = getLibraryTargets();
        if (!targets.length) return;

        if (libraryIndex >= targets.length - 1) {
          libraryIndex = 0;
          animateLibraryTo(targets[0], LIBRARY_SCROLL_MS);
          return;
        }

        libraryIndex += 1;
        animateLibraryTo(targets[libraryIndex]);
      };

      const pauseLibraryAutoPan = () => {
        if (!canAutoPanLibrary()) return;

        libraryPaused = true;
        stopLibraryAutoPan();
      };

      const scheduleLibraryResume = () => {
        if (!canAutoPanLibrary()) return;

        window.clearTimeout(libraryResumeTimer);
        libraryResumeTimer = window.setTimeout(() => {
          libraryPaused = false;
          libraryIndex = getClosestLibraryIndex();
          libraryHoldTimer = window.setTimeout(runLibraryAutoPan, LIBRARY_HOLD_MS);
        }, LIBRARY_RESUME_MS);
      };

      const handleLibraryInteraction = event => {
        if (libraryIsAutoPanning && event.type === "scroll") return;

        if (event.type === "touchstart" || event.type === "pointerdown") {
          libraryUserInteracting = true;
        } else if (event.type === "touchend" || event.type === "touchcancel" || event.type === "pointerup" || event.type === "pointercancel") {
          libraryUserInteracting = false;
        }

        pauseLibraryAutoPan();
        libraryIndex = getClosestLibraryIndex();
        scheduleLibraryResume();
      };

      ["touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointerup", "pointercancel", "wheel", "scroll"].forEach(eventName => {
        libraryStack.addEventListener(eventName, handleLibraryInteraction, { passive: true });
      });

      const resetLibraryAutoPan = () => {
        stopLibraryAutoPan();
        libraryPaused = false;
        libraryIndex = 0;

        if (canAutoPanLibrary()) {
          const targets = getLibraryTargets();
          libraryStack.scrollLeft = targets[0] || 0;
          setActiveLibraryCard(libraryCardList[0].dataset.libraryCard);
          libraryHoldTimer = window.setTimeout(runLibraryAutoPan, LIBRARY_HOLD_MS);
        } else if (libraryMobileQuery.matches && !libraryReducedMotionQuery.matches) {
          const targets = getLibraryTargets();
          libraryStack.scrollLeft = targets[0] || 0;
          setActiveLibraryCard(libraryCardList[0].dataset.libraryCard);
        }
      };

      libraryMobileQuery.addEventListener("change", resetLibraryAutoPan);
      libraryReducedMotionQuery.addEventListener("change", resetLibraryAutoPan);

      if ("IntersectionObserver" in window) {
        const libraryAutoPanObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            libraryInView = entry.isIntersecting;

            if (entry.isIntersecting) {
              if (!libraryWasInView) {
                libraryWasInView = true;
                resetLibraryAutoPan();
              }
              return;
            }

            if (libraryWasInView) {
              libraryWasInView = false;
              if (libraryUserInteracting) {
                window.setTimeout(resetLibraryAutoPan, LIBRARY_RESUME_MS);
              } else {
                resetLibraryAutoPan();
              }
            }
          });
        }, { threshold: .2 });

        libraryAutoPanObserver.observe(libraryStack);
      } else {
        libraryInView = true;
        resetLibraryAutoPan();
      }
    }
  }

  const socialMultiplierVisual = document.querySelector(".social-multiplier-visual");

  if (socialMultiplierVisual) {
    if ("IntersectionObserver" in window) {
      const multiplierObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            socialMultiplierVisual.classList.add("is-visible");
            multiplierObserver.disconnect();
          }
        });
      }, { threshold: 0.35 });

      multiplierObserver.observe(socialMultiplierVisual);
    } else {
      socialMultiplierVisual.classList.add("is-visible");
    }
  }

  const socialProcessJourney = document.querySelector(".social-process-journey");

  if (socialProcessJourney) {
    const processSteps = Array.from(socialProcessJourney.querySelectorAll(".brand-process-step"));

    if (processSteps.length) {
      socialProcessJourney.classList.add("is-process-ready");

      const activateProcessStep = activeIndex => {
        processSteps.forEach((step, index) => {
          step.classList.toggle("is-process-active", index === activeIndex);
        });

        const progress = processSteps.length > 1 ? (activeIndex / (processSteps.length - 1)) * 100 : 100;
        socialProcessJourney.style.setProperty("--process-progress", `${progress}%`);
        socialProcessJourney.style.setProperty("--process-pulse", `${progress}%`);
      };

      const setActiveProcessStep = () => {
        const viewportMid = window.innerHeight / 2;
        let activeIndex = 0;
        let closestDistance = Infinity;

        processSteps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          const stepMid = rect.top + rect.height / 2;
          const distance = Math.abs(stepMid - viewportMid);

          if (distance < closestDistance) {
            closestDistance = distance;
            activeIndex = index;
          }
        });

        activateProcessStep(activeIndex);
      };

      if ("IntersectionObserver" in window) {
        const processObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              socialProcessJourney.classList.add("is-process-visible");
            }
          });
        }, { threshold: 0.18 });

        processObserver.observe(socialProcessJourney);
      } else {
        socialProcessJourney.classList.add("is-process-visible");
      }

      processSteps.forEach((step, index) => {
        step.addEventListener("mouseenter", () => {
          activateProcessStep(index);
        });

        step.addEventListener("focus", () => {
          activateProcessStep(index);
        });
      });

      setActiveProcessStep();
      window.addEventListener("scroll", setActiveProcessStep, { passive: true });
      window.addEventListener("resize", setActiveProcessStep);
    }
  }

  const socialExamples = document.querySelector("[data-social-examples]");

  if (socialExamples) {
    const featuredSlot = socialExamples.querySelector("[data-social-featured]");
    const supportingSlot = socialExamples.querySelector("[data-social-supporting]");
    const scrollButtons = socialExamples.querySelectorAll("[data-social-scroll]");
    const exampleModal = document.getElementById("socialExampleModal");
    const exampleModalFrame = document.querySelector("[data-social-video-frame]");
    const exampleCloseEls = document.querySelectorAll("[data-social-video-close]");
    let lastSocialExampleTrigger = null;
    let activeExampleId = "offerAd";
    let carouselScrollTimer = null;
    let carouselArrowLocked = false;
    let carouselArrowUnlockTimer = null;
    const socialExamplesMobileQuery = window.matchMedia("(max-width: 768px)");
    const socialExamplesHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const playedFeaturedVideos = new Set();
    const featuredPosterUrl = "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/6a490bb96f5641e10506f2ab.png";

    const exampleVideos = {
      offerAd: {
        type: "youtube",
        id: "ZqX3RD6-TAo",
        title: "Offer Ad",
        label: "Ads",
        ratio: "wide"
      },
      promoVideo: {
        type: "youtube",
        id: "zRw4bEBI1To",
        title: "Promo Video",
        label: "Promos",
        ratio: "wide"
      },
      testimonial: {
        type: "youtube",
        id: "OFx5A7Rfdyg",
        title: "Testimonial Cutdown",
        label: "Testimonials",
        ratio: "wide"
      },
      promoBroll: {
        type: "youtube",
        id: "ufpdm3o4pO8",
        title: "Promo / B-roll Video",
        label: "Promos",
        ratio: "wide"
      },
      brollSocial: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/6a48ddfd81c60978b7c4be68.mp4",
        title: "B-roll Social Content",
        label: "Promos",
        ratio: "wide"
      },
      lifestyleClip: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/6a48de8381c60978b7c55fc6.mp4",
        title: "Lifestyle Clip",
        label: "Lifestyle",
        ratio: "wide"
      },
      educationalReel: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/67da1fa0652cf1e6ca869a85.mp4",
        title: "Educational Reel",
        label: "Reels",
        ratio: "vertical"
      },
      founderInsight: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/67da1fa0cfe91214a28c6f88.mp4",
        title: "Founder Insight",
        label: "Reels",
        ratio: "vertical"
      },
      offerReel: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/67da1fa0652cf1b46c869a87.mp4",
        title: "Offer Reel",
        label: "Ads",
        ratio: "vertical"
      },
      verticalReel: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/67da200d53365777fae6ecab.mov",
        title: "Educational Reel",
        label: "Reels",
        ratio: "vertical"
      },
      founderReel: {
        type: "mp4",
        src: "https://assets.cdn.filesafe.space/7UHry9g2nFC4BpFKvyik/media/6819d19cc0547b606747c33a.mp4",
        title: "Founder Insight",
        label: "Reels",
        ratio: "vertical"
      }
    };

    const exampleOrder = [
      "offerAd",
      "promoVideo",
      "educationalReel",
      "brollSocial",
      "founderInsight",
      "testimonial",
      "lifestyleClip",
      "offerReel",
      "verticalReel",
      "promoBroll",
      "founderReel"
    ];

    const getYoutubeThumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

    const createExampleCard = (video, videoKey, featured = false) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `social-example-card ${video.ratio === "vertical" ? "is-vertical" : "is-wide"}${featured ? " is-featured" : ""}`;
      card.setAttribute("aria-label", featured ? `Play ${video.title}` : `Feature ${video.title}`);

      const frame = document.createElement("div");
      frame.className = "social-example-frame";

      if (featured && video.type === "youtube") {
        const iframe = document.createElement("iframe");
        iframe.title = video.title;
        iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        const poster = document.createElement("img");
        poster.className = "social-example-poster";
        poster.src = featuredPosterUrl;
        poster.alt = "";

        frame.append(iframe, poster);

        if (playedFeaturedVideos.has(videoKey)) {
          iframe.src = `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`;
          card.classList.add("is-playing");
        }
      } else if (video.type === "youtube") {
        const image = document.createElement("img");
        image.src = getYoutubeThumb(video.id);
        image.alt = "";
        image.loading = "lazy";
        frame.appendChild(image);
      } else {
        const preview = document.createElement("video");
        preview.src = video.src;
        preview.muted = true;
        preview.playsInline = true;
        preview.preload = "metadata";
        frame.appendChild(preview);
      }

      const play = document.createElement("span");
      play.className = "social-example-play";
      play.setAttribute("aria-hidden", "true");

      card.append(frame, play);

      if (featured && video.type === "youtube") {
        card.addEventListener("click", () => {
          const iframe = card.querySelector("iframe");
          if (!iframe) return;

          if (!playedFeaturedVideos.has(videoKey)) {
            playedFeaturedVideos.add(videoKey);
            iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
          }

          card.classList.add("is-playing");
        });
      } else if (featured) {
        card.addEventListener("click", () => openSocialExample(video, card));
      } else {
        card.addEventListener("click", () => {
          activeExampleId = videoKey;
          renderExamples();
        });
      }

      return card;
    };

    const renderExamples = () => {
      socialExamples.classList.add("is-changing");

      setTimeout(() => {
        featuredSlot.replaceChildren(createExampleCard(exampleVideos[activeExampleId], activeExampleId, true));
        supportingSlot.replaceChildren(
          ...exampleOrder
            .filter(videoKey => videoKey !== activeExampleId)
            .map(videoKey => createExampleCard(exampleVideos[videoKey], videoKey))
        );
        socialExamples.classList.remove("is-changing");
      }, 160);
    };

    const openSocialExample = (video, trigger) => {
      if (!exampleModal || !exampleModalFrame) return;

      lastSocialExampleTrigger = trigger;
      exampleModalFrame.classList.toggle("is-vertical", video.ratio === "vertical");

      if (video.type === "youtube") {
        exampleModalFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1" title="${video.title}" allow="encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>`;
      } else {
        exampleModalFrame.innerHTML = `<video src="${video.src}" controls playsinline></video>`;
      }

      exampleModal.classList.add("is-open");
      exampleModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("social-example-modal-open");

      const closeButton = exampleModal.querySelector(".social-example-modal-close");
      if (closeButton) closeButton.focus();
    };

    const closeSocialExample = () => {
      if (!exampleModal || !exampleModalFrame) return;

      exampleModal.classList.remove("is-open");
      exampleModal.setAttribute("aria-hidden", "true");
      exampleModalFrame.innerHTML = "";
      exampleModalFrame.classList.remove("is-vertical");
      document.body.classList.remove("social-example-modal-open");

      if (lastSocialExampleTrigger) {
        lastSocialExampleTrigger.focus();
      }
    };

    const getSupportingCards = () => Array.from(supportingSlot.querySelectorAll(".social-example-card"));

    const getSupportingTargets = () => {
      const cards = getSupportingCards();
      const maxScroll = supportingSlot.scrollWidth - supportingSlot.clientWidth;

      return cards.map(card => {
        const target = card.offsetLeft - ((supportingSlot.clientWidth - card.offsetWidth) / 2);
        return Math.max(0, Math.min(maxScroll, target));
      });
    };

    const getClosestSupportingIndex = targets => {
      if (!targets.length) return 0;

      const current = supportingSlot.scrollLeft;
      return targets.reduce((closestIndex, target, index) => (
        Math.abs(target - current) < Math.abs(targets[closestIndex] - current) ? index : closestIndex
      ), 0);
    };

    const scrollCarousel = direction => {
      if (!supportingSlot) return;

      if (socialExamplesMobileQuery.matches) {
        if (carouselArrowLocked) return;

        const targets = getSupportingTargets();
        if (!targets.length) return;

        const currentIndex = getClosestSupportingIndex(targets);
        const nextIndex = Math.max(0, Math.min(targets.length - 1, currentIndex + (direction === "left" ? -1 : 1)));

        carouselArrowLocked = true;
        window.clearTimeout(carouselArrowUnlockTimer);
        supportingSlot.scrollTo({
          left: targets[nextIndex],
          behavior: "smooth"
        });

        carouselArrowUnlockTimer = window.setTimeout(() => {
          carouselArrowLocked = false;
        }, 720);
        return;
      }

      const amount = Math.max(260, supportingSlot.clientWidth * 0.62);
      supportingSlot.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth"
      });
    };

    const startCarouselHoverScroll = direction => {
      if (!socialExamplesHoverQuery.matches) return;

      stopCarouselHoverScroll();
      scrollCarousel(direction);
      carouselScrollTimer = window.setInterval(() => scrollCarousel(direction), 620);
    };

    const stopCarouselHoverScroll = () => {
      if (carouselScrollTimer) {
        window.clearInterval(carouselScrollTimer);
        carouselScrollTimer = null;
      }
    };

    scrollButtons.forEach(button => {
      const direction = button.dataset.socialScroll;

      button.addEventListener("click", () => scrollCarousel(direction));
      button.addEventListener("mouseenter", () => startCarouselHoverScroll(direction));
      button.addEventListener("mouseleave", stopCarouselHoverScroll);
      button.addEventListener("focus", () => startCarouselHoverScroll(direction));
      button.addEventListener("blur", stopCarouselHoverScroll);
    });

    exampleCloseEls.forEach(element => {
      element.addEventListener("click", closeSocialExample);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && exampleModal && exampleModal.classList.contains("is-open")) {
        closeSocialExample();
      }
    });

    renderExamples();
  }

  const serviceDetails = {
    meta: {
      title: "Meta Ad Creatives",
      copy: "We create scroll-stopping video ads designed to grab attention quickly, communicate your offer clearly and give people a reason to take the next step. These are not random videos boosted on Facebook. They are purpose-built ad creatives with hooks, messaging and formats designed for paid campaigns."
    },
    campaigns: {
      title: "Meta Campaign Management",
      copy: "We help get your content in front of the right people by setting up, managing and optimising Meta campaigns across Facebook and Instagram. This includes campaign structure, audience targeting, creative testing and performance monitoring so your best content has a better chance of generating qualified enquiries."
    },
    crm: {
      title: "CRM & Automation",
      copy: "Getting leads is only part of the job. We help connect your enquiries to follow-up systems so people are captured, nurtured and guided toward a real conversation. This can include enquiry forms, pipeline stages, email follow-up, reminders and simple automation that stops opportunities slipping through the cracks."
    },
    engine: {
      title: "The Full Content Engine",
      copy: "This is where everything works together. Strategy, filming, content creation, paid campaigns and follow-up systems are connected into one marketing engine. Instead of creating videos and hoping they work, we build a system designed to attract attention, build trust, capture enquiries and keep momentum moving."
    }
  };

  const serviceModal = document.getElementById("serviceModal");
  const serviceTitle = document.getElementById("serviceModalTitle");
  const serviceCopy = document.getElementById("serviceModalCopy");
  const serviceButtons = document.querySelectorAll("[data-service-modal]");
  const serviceCloseEls = document.querySelectorAll("[data-service-modal-close]");

  if (serviceModal && serviceTitle && serviceCopy && serviceButtons.length) {
    let lastFocusedElement = null;

    const openServiceModal = key => {
      const detail = serviceDetails[key];
      if (!detail) return;

      lastFocusedElement = document.activeElement;
      serviceTitle.textContent = detail.title;
      serviceCopy.textContent = detail.copy;
      serviceModal.classList.add("is-open");
      serviceModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("service-modal-open");

      const closeButton = serviceModal.querySelector(".service-modal-close");
      if (closeButton) closeButton.focus();
    };

    const closeServiceModal = () => {
      serviceModal.classList.remove("is-open");
      serviceModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("service-modal-open");

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    };

    serviceButtons.forEach(button => {
      button.addEventListener("click", () => {
        openServiceModal(button.dataset.serviceModal);
      });
    });

    serviceCloseEls.forEach(element => {
      element.addEventListener("click", closeServiceModal);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && serviceModal.classList.contains("is-open")) {
        closeServiceModal();
      }
    });
  }
});
