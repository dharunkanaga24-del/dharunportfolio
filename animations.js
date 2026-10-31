/**
 * DHARUN P — Advanced Motion Design & Interactions
 * Features:
 * - Subtitle Typing Animation
 * - Scroll Progress Indicator
 * - Smart Scroll-Aware Navbar
 * - Custom Glowing Cursor & Magnetic Interactions
 * - 3D Card Tilt Engine
 * - Interactive Skill Filter System
 * - Animated Number Counters
 * - Keyboard Accessibility Shortcuts
 */

(function initAnimations() {
  // 1. Hero Subtitle Typing Effect
  const typingElement = document.getElementById('hero-typing');
  if (typingElement) {
    const roles = [
      'Aspiring AI Engineer',
      'Computer Science Student',
      'Machine Learning Enthusiast',
      'Creative Web Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const deleteSpeed = 35;
    const pauseDelay = 1800;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(typeLoop, timeout);
    }

    typeLoop();
  }

  // 2. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // 3. Navbar Hide on Scroll Down, Reveal on Scroll Up
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  const scrollThreshold = 10;

  function handleNavbarScroll() {
    if (!navbar) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // 4. ScrollSpy: Highlight Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY + 160;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. Custom Cursor & Spotlight Follower (Desktop only)
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  const spotlight = document.getElementById('cursor-spotlight');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';

      if (spotlight) {
        spotlight.style.left = mouseX + 'px';
        spotlight.style.top = mouseY + 'px';
      }
    }, { passive: true });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover effect on clickable elements
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .skill-card, .contact-card, .project-featured-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 6. 3D Tilt Interaction on Skill Cards
  const tiltCards = document.querySelectorAll('.skill-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 7. Interactive Skill Filter Tabs
  const filterButtons = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 8. Animated Counter for Stats
  const statNumbers = document.querySelectorAll('[data-counter]');
  let counted = false;

  function countUp(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const isYear = target >= 2000;
    const duration = 1800;
    const start = isYear ? target - 10 : 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCount);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        statNumbers.forEach((num) => countUp(num));
        counted = true;
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.about-stats-grid');
  if (statsSection) observer.observe(statsSection);

  // 9. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.classList.toggle('open');
      mobileOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 10. Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If typing in input or textarea, don't hijack keys
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    const key = e.key.toUpperCase();
    if (key === 'H') {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'A') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'S') {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'P') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'J') {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'R') {
      document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'C') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (key === '?') {
      const helpModal = document.getElementById('shortcuts-modal');
      if (helpModal) helpModal.classList.add('open');
    } else if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.remove('open'));
      mobileToggle?.classList.remove('open');
      mobileOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

