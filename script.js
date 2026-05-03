/* ============================================
   WEEKENDERLY — ADVANCED ANIMATIONS
   GSAP + ScrollTrigger + Lenis Smooth Scroll
   ============================================ */

// ── Wait for GSAP + Lenis to load ──
window.addEventListener('load', () => {

  // ── Safety Fallback ──
  const safetyTimeout = setTimeout(() => {
    if (loader && loader.style.display !== 'none') {
      loader.style.display = 'none';
      document.body.style.overflow = '';
      initAnimations();
    }
  }, 4000);

  const loader = document.getElementById('loader');
  if (loader) {
    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimeout);
        loader.style.display = 'none';
        document.body.style.overflow = '';
        initAnimations();
        setTimeout(() => {
          ScrollTrigger.refresh();
          if (window.lenisInstance) window.lenisInstance.resize();
        }, 100);
      }
    });
    tl.to('#loader-logo', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('#loader-bar-fill', { width: '100%', duration: 1.2, ease: 'power2.inOut' }, '-=0.2')
      .to('#loader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '+=0.2');
  } else {
    clearTimeout(safetyTimeout);
    document.body.style.overflow = '';
    initAnimations();
  }

});

function initAnimations() {

  // ══════════════════════════════════════
  // 2. LENIS SMOOTH SCROLL
  // ══════════════════════════════════════
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    window.lenisInstance = lenis;
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      // Safety check for velocity
      const velocity = e.velocity || 0;
      // Very subtle skew to avoid layout displacement
      const skew = velocity * 0.003;
      // Apply skew to sections, excluding the pinned horizontal section to prevent layout breaks
      gsap.to('section:not(.experience-horizontal)', { 
        skewY: skew, 
        duration: 0.6, 
        ease: 'power1.out' 
      });
    });

    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ══════════════════════════════════════
  // 3. GSAP + ScrollTrigger SETUP
  // ══════════════════════════════════════
  gsap.registerPlugin(ScrollTrigger);

  // ── Scroll Progress Bar ──
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    gsap.to(progressBar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { scrub: 0.3, start: 'top top', end: 'bottom bottom' }
    });
  }

  // ══════════════════════════════════════
  // 4. NAVBAR
  // ══════════════════════════════════════
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        navbar.classList.toggle('scrolled', self.scroll() > 80);
      }
    });
  }

  // ══════════════════════════════════════
  // 5. HERO ANIMATIONS
  // ══════════════════════════════════════
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroBg = document.querySelector('.hero-bg, .hero-video-wrap');
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from('.hero-eyebrow', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' })
      .from('.hero h1', { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .from('.hero-sub', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-actions', { opacity: 0, y: 25, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.float-card', { opacity: 0, y: 40, scale: 0.8, stagger: 0.15, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.3')
      .from('.hero-scroll', { opacity: 0, y: 10, duration: 0.5 }, '-=0.2');

    // Hero parallax & zoom
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 20,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { 
          trigger: '.hero', 
          start: 'top top', 
          end: 'bottom top', 
          scrub: true 
        }
      });
    }
  }

  // ══════════════════════════════════════
  // 6. TEXT WORD REVEAL (split lines)
  // ══════════════════════════════════════
  function splitAndReveal(selector, triggerEl) {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.innerText;
      const words = text.split(' ');
      el.innerHTML = words.map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`).join(' ');

      gsap.from(el.querySelectorAll('.word'), {
        opacity: 0,
        y: '100%',
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerEl || el,
          start: 'top 85%',
        }
      });
    });
  }

  // Apply word reveal to section headings
  document.querySelectorAll('.reveal-text').forEach(el => {
    const text = el.innerText;
    const words = text.split(' ');
    el.innerHTML = words.map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`).join(' ');
    gsap.from(el.querySelectorAll('.word'), {
      opacity: 0, y: '110%', duration: 0.8, stagger: 0.07, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // ══════════════════════════════════════
  // 7. SECTION REVEALS with clip-path
  // ══════════════════════════════════════
  // Image clip-path reveal
  gsap.utils.toArray('.img-reveal').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power4.inOut',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      }
    );
  });

  // Fade + slide up reveals
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        delay: parseFloat(el.dataset.delay || 0) / 1000
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // ── Word Reveal Animation ──
  const wordReveals = document.querySelectorAll('.word-reveal');
  wordReveals.forEach(el => {
    if (!el || !el.textContent.trim()) return;
    const text = el.textContent;
    el.textContent = '';
    text.split(' ').forEach(word => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.display = 'inline-block';
      el.appendChild(span);
    });

    gsap.from(el.querySelectorAll('span'), {
      opacity: 0,
      y: 20,
      rotationX: -45,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });
  });

  // ── Image Reveal Animation ──
  const imgReveals = document.querySelectorAll('.img-reveal');
  imgReveals.forEach(el => {
    gsap.fromTo(el, 
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        duration: 1.2, 
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        }
      }
    );
  });

  // ══════════════════════════════════════
  // 8. HORIZONTAL PINNED EXPERIENCE SCROLL
  // ══════════════════════════════════════
  const expTrack = document.querySelector('.exp-track');
  if (expTrack && window.innerWidth > 768) {
    const cards = gsap.utils.toArray('.exp-panel');
    const totalWidth = expTrack.scrollWidth - window.innerWidth;

    gsap.to(expTrack, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.experience-horizontal',
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${totalWidth + window.innerWidth * 0.5}`,
        invalidateOnRefresh: true,
      }
    });

    // Scale cards as they enter
    cards.forEach((card, i) => {
      gsap.fromTo(card, { scale: 0.88, opacity: 0.5 }, {
        scale: 1, opacity: 1,
        scrollTrigger: {
          trigger: '.experience-horizontal',
          start: () => `top top+=${i * (totalWidth / cards.length)}`,
          end: () => `top top+=${(i + 1) * (totalWidth / cards.length)}`,
          scrub: 1,
        }
      });
    });
  }

  // ══════════════════════════════════════
  // 9. PARALLAX SECTIONS
  // ══════════════════════════════════════
  gsap.utils.toArray('.parallax-img').forEach(el => {
    gsap.to(el, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), scrub: true }
    });
  });

  // Page hero parallax & zoom
  const pageHeroBg = document.querySelector('.page-hero-bg');
  if (pageHeroBg) {
    setTimeout(() => pageHeroBg.classList.add('loaded'), 100);
    gsap.to(pageHeroBg, {
      yPercent: 20, 
      scale: 1.15,
      ease: 'none',
      scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ══════════════════════════════════════
  // 10. HOW IT WORKS — stagger
  // ══════════════════════════════════════
  gsap.from('.how-card', {
    opacity: 0, y: 60, scale: 0.95, stagger: 0.18, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.how-cards', start: 'top 80%' }
  });

  // ══════════════════════════════════════
  // 11. STAT COUNTER ANIMATION
  // ══════════════════════════════════════
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out', roundProps: 'val',
          onUpdate: () => { el.textContent = obj.val + suffix; }
        });
      }
    });
  });

  // ══════════════════════════════════════
  // 12. MAGNETIC BUTTONS
  // ══════════════════════════════════════
  document.querySelectorAll('.btn-primary, .btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // ══════════════════════════════════════
  // 13. CUSTOM CURSOR
  // ══════════════════════════════════════
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursor && cursorDot && !('ontouchstart' in window)) {
    document.body.classList.add('has-custom-cursor');
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.05 });
    });

    gsap.ticker.add(() => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      gsap.set(cursor, { x: curX, y: curY });
    });

    document.querySelectorAll('a, button, .exp-panel, .card, .how-card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    document.querySelectorAll('.exp-track, .experience-carousel').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-drag'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-drag'));
    });
  }

  // ══════════════════════════════════════
  // 14. 3D TILT on experience panels
  // ══════════════════════════════════════
  document.querySelectorAll('.exp-panel, .exp-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 12, rotateX: -y * 10, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ══════════════════════════════════════
  // 15. MOBILE MENU
  // ══════════════════════════════════════
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        gsap.fromTo(mobileNav.querySelectorAll('a, .btn'),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ══════════════════════════════════════
  // 16. GALLERY LIGHTBOX
  // ══════════════════════════════════════
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `<div class="lightbox-overlay"></div><div class="lightbox-content"><button class="lightbox-close">&times;</button><img src="" alt="Gallery image" /></div>`;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.querySelector('img').src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        gsap.fromTo(lightbox.querySelector('.lightbox-content'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' });
      });
    });

    [lightbox.querySelector('.lightbox-close'), lightbox.querySelector('.lightbox-overlay')].forEach(el => {
      el.addEventListener('click', () => {
        gsap.to(lightbox.querySelector('.lightbox-content'), {
          scale: 0.85, opacity: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
        });
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.querySelector('.lightbox-close').click();
      }
    });
  }

  // ══════════════════════════════════════
  // 17. GALLERY FILTER
  // ══════════════════════════════════════
  document.querySelectorAll('.gallery-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        gsap.to(item, { opacity: show ? 1 : 0, scale: show ? 1 : 0.9, duration: 0.35, ease: 'power2.out' });
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ══════════════════════════════════════
  // 18. CONTACT FORM
  // ══════════════════════════════════════
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent! ✓';
      btn.disabled = true;
      gsap.to(btn, { backgroundColor: '#22c55e', duration: 0.3 });
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        gsap.to(btn, { backgroundColor: '', duration: 0.3 });
        contactForm.reset();
      }, 3000);
    });
  }

  // ══════════════════════════════════════
  // 19. VIDEO INTERSECTION PLAY
  // ══════════════════════════════════════
  document.querySelectorAll('.section-video').forEach(video => {
    ScrollTrigger.create({
      trigger: video, start: 'top 70%', end: 'bottom 30%',
      onEnter: () => video.play().catch(() => {}),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play().catch(() => {}),
      onLeaveBack: () => video.pause(),
    });
  });

  // ══════════════════════════════════════
  // 20. SECTION LABEL ANIMATION
  // ══════════════════════════════════════
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' } }
    );
  });

  // Refresh ScrollTrigger after images load
  window.addEventListener('load', () => ScrollTrigger.refresh());

} // end initAnimations

// ── Inject lightbox CSS ──
const lbCSS = `
#lightbox { display:none; position:fixed; inset:0; z-index:9999; align-items:center; justify-content:center; }
#lightbox.open { display:flex; }
.lightbox-overlay { position:absolute; inset:0; background:rgba(11,31,58,0.96); cursor:pointer; }
.lightbox-content { position:relative; z-index:1; max-width:90vw; max-height:90vh; border-radius:16px; overflow:hidden; box-shadow:0 30px 100px rgba(0,0,0,0.5); }
.lightbox-content img { width:100%; max-height:85vh; object-fit:contain; display:block; filter:brightness(1.1) contrast(1.05) saturate(1.1); }
.lightbox-close { position:absolute; top:14px; right:14px; background:rgba(255,255,255,0.15); border:none; color:white; width:38px; height:38px; border-radius:50%; font-size:1.4rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.25s; z-index:2; line-height:1; }
.lightbox-close:hover { background:var(--orange); }
.word-wrap { display:inline-block; overflow:hidden; vertical-align:bottom; }
.word { display:inline-block; }
`;
const s = document.createElement('style'); s.textContent = lbCSS; document.head.appendChild(s);
