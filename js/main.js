// Main JavaScript file for EDDY website
document.addEventListener('DOMContentLoaded', function () {
  // Global state variables
  let selectedLocation = 'budva';
  let dropdownOpen = false;
  let navbarDropdownOpen = false;
  let isMobileMenuOpen = false;

  // Initialize all components
  initHeader();
  initHero();
  initNavCards();
  initRental();
  initTours();
  initJournal();
  initCorporate();
  // Reviews now handled by slider.js
  initContactTabs();
  initFooter();

  // Header functionality
  function initHeader() {
    const header = document.getElementById('eddyHeader');
    const dropdownTrigger = document.getElementById('dropdownTrigger');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const navbarDropdownTrigger = document.getElementById('navbarDropdownTrigger');
    const navbarDropdownMenu = document.getElementById('navbarDropdownMenu');
    const selectedLocationSpan = document.getElementById('selectedLocation');
    const navbarSelectedLocationSpan = document.getElementById('navbarSelectedLocation');
    const contactsLink = document.getElementById('contactsLink');
    const contactsBtn = document.getElementById('contactsBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closeOverlay = document.getElementById('closeOverlay');
    const overlayContactsLink = document.getElementById('overlayContactsLink');
    const logoEl = document.getElementById('logo');
    const menuEl = document.getElementById('mainMenu');

    // Header visibility logic
    function updateHeaderVisibility() {
      const scrollY = window.scrollY;
      const width = window.innerWidth;

      if (width <= 425) {
        header.classList.add('show-navbar');
        header.classList.remove('show-desktop');
      } else if (scrollY >= 425) {
        header.classList.add('show-navbar');
        header.classList.remove('show-desktop');
      } else {
        header.classList.remove('show-navbar');
        header.classList.add('show-desktop');
      }

      if (width > 425) {
        const shouldHide = scrollY > 375;
        const shouldHideMenu = scrollY > 375;

        if (logoEl) {
          logoEl.style.display = shouldHide ? 'none' : 'flex';
        }

        if (menuEl) {
          menuEl.style.display = shouldHideMenu ? 'none' : 'flex';
        }
      }
    }

    // Desktop dropdown
    if (dropdownTrigger) {
      dropdownTrigger.addEventListener('click', function () {
        dropdownOpen = !dropdownOpen;
        dropdownMenu.classList.toggle('open', dropdownOpen);
      });
    }

    // Navbar dropdown
    if (navbarDropdownTrigger) {
      navbarDropdownTrigger.addEventListener('click', function () {
        navbarDropdownOpen = !navbarDropdownOpen;
        navbarDropdownMenu.classList.toggle('open', navbarDropdownOpen);
      });
    }

    // Location selection
    const allDropdownOptions = document.querySelectorAll('.eddy-dropdown-option');
    allDropdownOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        const location = option.getAttribute('data-location');
        selectedLocation = location;

        // Обновляем текст в dropdown'ах
        if (selectedLocationSpan) {
          selectedLocationSpan.textContent = location.toUpperCase();
        }
        if (navbarSelectedLocationSpan) {
          navbarSelectedLocationSpan.textContent = location.toUpperCase();
        }

        // Закрываем dropdown'ы
        dropdownOpen = false;
        navbarDropdownOpen = false;
        dropdownMenu.classList.remove('open');
        navbarDropdownMenu.classList.remove('open');

        // НОВОЕ: Синхронизируем с картой в контактах
        updateContactTabLocation(location);

        // Скроллим к футеру
        scrollToFooter();
      });
    });
    function updateContactTabLocation(location) {
      // Находим соответствующую вкладку
      const targetTab = location === 'budva' ? 'budva' : 'skadar';

      // Симулируем клик по нужной вкладке
      const tabButton = document.querySelector(`[data-tab="${targetTab}"]`);
      if (tabButton && typeof window.updateActiveTab === 'function') {
        // Если функция updateActiveTab доступна глобально
        window.updateActiveTab(targetTab);
      } else if (tabButton) {
        // Иначе симулируем клик
        tabButton.click();
      }
    }

    // Contacts functionality
    if (contactsLink) {
      contactsLink.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToFooter();
      });
    }

    if (contactsBtn) {
      contactsBtn.addEventListener('click', function () {
        scrollToFooter();
      });
    }

    if (overlayContactsLink) {
      overlayContactsLink.addEventListener('click', function () {
        closeMobileOverlay();
        scrollToFooter();
      });
    }

    // Mobile menu
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function () {
        isMobileMenuOpen = true;
        mobileOverlay.classList.add('open');
      });
    }

    const moreMenuTrigger = document.getElementById('moreMenuTrigger');
    if (moreMenuTrigger) {
      moreMenuTrigger.addEventListener('click', function () {
        isMobileMenuOpen = true;
        mobileOverlay.classList.add('open');
      });
    }

    if (closeOverlay) {
      closeOverlay.addEventListener('click', function () {
        closeMobileOverlay();
      });
    }

    function closeMobileOverlay() {
      isMobileMenuOpen = false;
      mobileOverlay.classList.remove('open');
    }

    // Click outside to close dropdowns
    document.addEventListener('mousedown', function (e) {
      if (!e.target.closest('.eddy-custom-dropdown')) {
        dropdownOpen = false;
        navbarDropdownOpen = false;
        if (dropdownMenu) dropdownMenu.classList.remove('open');
        if (navbarDropdownMenu) navbarDropdownMenu.classList.remove('open');
      }
    });

    // Close overlay on link click
    const overlayLinks = document.querySelectorAll('.eddy-navbar__overlay-menu a');
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileOverlay();
      });
    });

    window.addEventListener('scroll', updateHeaderVisibility);
    window.addEventListener('resize', updateHeaderVisibility);

    updateHeaderVisibility();
  }

  // Hero section functionality
  function initHero() {
    const heroLink = document.querySelector('.eddy-hero__link');

    if (heroLink) {
      heroLink.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    }
  }

  // NavCards functionality
  function initNavCards() {
    const cardLinks = document.querySelectorAll('.eddy-card-square');

    cardLinks.forEach(function (link) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    });
  }

  // Rental section functionality
  function initRental() {
    const rentalCards = document.querySelectorAll('.eddy-home-rental-card-item');
    const rentalButton = document.querySelector('.eddy-home-rental__btn');
    const rentalLogo = document.querySelector('.eddy-home-rental__logo');

    rentalCards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    });

    if (rentalButton) {
      rentalButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = this.closest('a');
          if (link) {
            window.location.href = link.getAttribute('href');
          }
        }
      });
    }

    if (rentalLogo) {
      rentalLogo.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    }
  }

  // Tours section functionality
  function initTours() {
    const tourCards = document.querySelectorAll('.eddy-tour-card');
    const toursButton = document.querySelector('.eddy-tours__button');
    const toursTitle = document.querySelector('.eddy-tours__title');

    tourCards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    });

    if (toursButton) {
      toursButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = this.closest('a');
          if (link) {
            window.location.href = link.getAttribute('href');
          }
        }
      });
    }

    if (toursTitle) {
      toursTitle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = this.closest('a');
          if (link) {
            window.location.href = link.getAttribute('href');
          }
        }
      });
    }
  }

  // Journal section functionality
  function initJournal() {
    const journalCards = document.querySelectorAll('.eddy-journal-card a');
    const journalButton = document.querySelector('.eddy-journal-button');
    const journalTitleIcon = document.querySelector('.eddy-journal__title-icon').closest('a');

    journalCards.forEach(function (card) {
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    });

    if (journalButton) {
      journalButton.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    }

    if (journalTitleIcon) {
      journalTitleIcon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = this.getAttribute('href');
        }
      });
    }
  }

  // Corporate section functionality
  function initCorporate() {
    let isMobile = window.innerWidth <= 768;

    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const corporateForm = document.getElementById('corporateForm');
    const corporateFormMob = document.getElementById('corporateFormMob');

    function checkScreenSize() {
      isMobile = window.innerWidth <= 768;
    }

    function showModal() {
      modalOverlay.classList.add('show');
    }

    function hideModal() {
      modalOverlay.classList.remove('show');
    }

    function handleSubmit(e, form) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('mail'),
        phone: formData.get('phone')
      };

      console.log('Form submitted:', data);
      showModal();
      form.reset();
    }

    if (corporateForm) {
      corporateForm.addEventListener('submit', function (e) {
        handleSubmit(e, this);
      });
    }

    if (corporateFormMob) {
      corporateFormMob.addEventListener('submit', function (e) {
        handleSubmit(e, this);
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', hideModal);
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          hideModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        hideModal();
      }
    });

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
  }

  // Contact Tabs functionality
  function initContactTabs() {
    let map;
    let activeTab = 'budva';

    const contactData = {
      budva: {
        phone: "+382 (69) 71-99-04",
        email: "eddyletspaddle@gmail.com",
        address: `
          <p><strong>Rentals</strong> Azzuro Beach, Budva 85310, Montenegro</p>
          <p><strong>Tours</strong> Slovenska Plaža, Budva 85310, Montenegro</p>
        `,
        hours: "We operate daily from 8 AM to 8 PM",
        coordinates: [42.2847531, 18.8456055],
        markers: [
          [42.2847531, 18.8456055],
          [42.2839554, 18.8409819]
        ]
      },
      skadar: {
        phone: "+382 (69) 71-99-04",
        email: "eddyletspaddle@gmail.com",
        address: `<p>Naselje, Vranjina 81000, Montenegro</p>`,
        hours: "We operate daily from 8 AM to 8 PM",
        coordinates: [42.2786938, 19.130431],
        markers: [
          [42.2786938, 19.130431]
        ]
      }
    };

    const budvaTab = document.getElementById('budvaTab');
    const skadarTab = document.getElementById('skadarTab');
    const contactPhone = document.getElementById('contactPhone');
    const contactEmail = document.getElementById('contactEmail');
    const contactAddress = document.getElementById('contactAddress');
    const contactHours = document.getElementById('contactHours');
    const mapContainer = document.getElementById('eddyMap');

    function initMap() {
      if (!mapContainer) return;

      try {
        map = L.map('eddyMap', {
          scrollWheelZoom: false,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(map);

        updateMap();

      } catch (error) {
        console.error('Error initializing map:', error);
        mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-family: Inter, sans-serif;">Map could not be loaded</div>';
      }
    }

    function updateMap() {
      if (!map) return;

      const data = contactData[activeTab];

      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      const customIcon = L.icon({
        iconUrl: '/images/icons/anchor.png',
        iconSize: [25, 30],
        iconAnchor: [12, 30],
        popupAnchor: [1, -34]
      });

      data.markers.forEach(function (coords) {
        L.marker(coords, { icon: customIcon })
          .addTo(map)
          .bindPopup(`EDDY ${activeTab.toUpperCase()} Location`);
      });

      map.setView(data.coordinates, 16);
    }

    function updateContactInfo() {
      const data = contactData[activeTab];

      if (contactPhone) {
        contactPhone.textContent = data.phone;
        contactPhone.href = `tel:${data.phone.replace(/\s+/g, '')}`;
      }

      if (contactEmail) {
        contactEmail.textContent = data.email;
        contactEmail.href = `mailto:${data.email}`;
      }

      if (contactAddress) {
        contactAddress.innerHTML = data.address;
      }

      if (contactHours) {
        contactHours.textContent = data.hours;
      }
    }

    function updateActiveTab(newTab) {
      document.querySelectorAll('.eddy-contact-tabs__tab').forEach(function (tab) {
        tab.classList.remove('active');
      });

      const selectedTab = document.querySelector(`[data-tab="${newTab}"]`);
      if (selectedTab) {
        selectedTab.classList.add('active');
      }

      const iconLocation = document.querySelector('.eddy-icon-location');
      if (iconLocation) {
        if (newTab === 'budva') {
          budvaTab.appendChild(iconLocation);
        } else {
          if (iconLocation.parentNode) {
            iconLocation.parentNode.removeChild(iconLocation);
          }
        }
      }

      activeTab = newTab;
      updateContactInfo();
      updateMap();
    }
    window.updateActiveTab = updateActiveTab;

    if (budvaTab) {
      budvaTab.addEventListener('click', function () {
        updateActiveTab('budva');
      });
    }

    if (skadarTab) {
      skadarTab.addEventListener('click', function () {
        updateActiveTab('skadar');
      });
    }

    try {
      initMap();
      updateContactInfo();
    } catch (error) {
      console.error('Error during initialization:', error);
    }

    window.addEventListener('resize', function () {
      if (map) {
        setTimeout(function () {
          map.invalidateSize();
        }, 100);
      }
    });
  }

  // Footer functionality
  function initFooter() {
    const contactsFooterLink = document.getElementById('contactsFooterLink');

    if (contactsFooterLink) {
      contactsFooterLink.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToFooter();
      });
    }

    const socialLinks = document.querySelectorAll('.eddy-footer__socials a');
    socialLinks.forEach(function (link) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(this.getAttribute('href'), '_blank');
        }
      });
    });

    const navLinks = document.querySelectorAll('.eddy-footer__nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-1px)';
      });

      link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Utility function to scroll to footer
  function scrollToFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
});