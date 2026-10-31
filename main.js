/**
 * DHARUN P — Master Application Controller
 * Handles:
 * - Contact Form Validation & Mailto Trigger
 * - Copy Email / Phone to Clipboard with Toast
 * - Resume Modal & Download Management
 * - Project Architecture Modal
 * - Web Audio Micro-feedback (Subtle sci-fi click)
 */

(function initMainController() {
  // 1. Toast Notification Helper
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message, duration = 3200) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
  window.showPortfolioToast = showToast;

  // 2. Web Audio Subtle Sound FX (Toggleable / Default gentle)
  let audioCtx = null;
  function playClickSound() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio not permitted or supported; silent fallback
    }
  }

  // Attach sound to interactive buttons
  document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-link').forEach((el) => {
    el.addEventListener('click', () => {
      playClickSound();
    });
  });

  // 3. Copy to Clipboard Functionality
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'dharunkanaga24@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email address copied to clipboard!');
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.textContent = 'Copy';
        }, 2000);
      }).catch(() => {
        showToast('Email: dharunkanaga24@gmail.com');
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+91 80157 21946';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('✓ Phone number copied to clipboard!');
        copyPhoneBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyPhoneBtn.textContent = 'Copy';
        }, 2000);
      }).catch(() => {
        showToast('Phone: +91 80157 21946');
      });
    });
  }

  // 4. Contact Form Validation & Submission
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const subject = subjectInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill in all required fields (Name, Email, Message).';
        }
        return;
      }

      if (!emailRegex.test(email)) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // Generate mailto link
      const mailSubject = encodeURIComponent(subject ? `Portfolio Inquiry: ${subject}` : `Message from ${name}`);
      const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:dharunkanaga24@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      // Open mail client
      window.location.href = mailtoUrl;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✓ Opening your email client to dispatch message. Thank you for connecting!';
      }
      showToast('Opening email client for delivery...');

      contactForm.reset();
    });
  }

  // 5. Modal Management
  const modals = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function closeModal(modal) {
    if (modal) modal.classList.remove('open');
  }

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Resume Modal trigger
  const viewResumeBtns = document.querySelectorAll('.trigger-view-resume');
  const resumeModal = document.getElementById('resume-modal');
  viewResumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('open');
    });
  });

  // Download Resume button helper
  const downloadResumeBtns = document.querySelectorAll('.trigger-download-resume');
  downloadResumeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Check if file exists by fetching head
      fetch('resume.pdf', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            window.location.href = 'resume.pdf';
          } else {
            // Open resume guidance modal
            if (resumeModal) resumeModal.classList.add('open');
            showToast('Notice: Place "resume.pdf" in root folder for direct file download.');
          }
        })
        .catch(() => {
          if (resumeModal) resumeModal.classList.add('open');
          showToast('Notice: Place "resume.pdf" in root folder for direct file download.');
        });
    });
  });

  // AirGuard Project Architecture Modal trigger
  const airguardModalBtn = document.getElementById('trigger-airguard-modal');
  const airguardModal = document.getElementById('airguard-modal');
  if (airguardModalBtn && airguardModal) {
    airguardModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      airguardModal.classList.add('open');
    });
  }

  // Shortcuts Modal trigger
  const triggerShortcutsBtn = document.getElementById('trigger-shortcuts-modal');
  const shortcutsModal = document.getElementById('shortcuts-modal');
  if (triggerShortcutsBtn && shortcutsModal) {
    triggerShortcutsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      shortcutsModal.classList.add('open');
    });
  }

  // Smooth Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

