document.addEventListener('DOMContentLoaded', () => {
  const SUPABASE_URL = 'https://dcdvscthslbszetogkuv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZHZzY3Roc2xic3pldG9na3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyOTU2NDIsImV4cCI6MjEwNzg3MTY0Mn0.vmTxZqdm6_FuD_g8EKAVvbvaKkROMlRPXdcc9O7HYko';
 
  let supabase = null;
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  const landingView = document.getElementById('landingView');
  const loginView = document.getElementById('loginView');
  const signupView = document.getElementById('signupView');
  const dashboardView = document.getElementById('dashboardView');

  const goToSignupLink = document.getElementById('goToSignupLink');
  const goToLoginLink = document.getElementById('goToLoginLink');
  const navSignupBtn = document.getElementById('navSignupBtn');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  const finalCtaBtn = document.getElementById('finalCtaBtn');
  const quickLoginBtn = document.getElementById('quickLoginBtn');
  const brandNav = document.getElementById('brandNav');
  const logoutBtn = document.getElementById('logoutBtn');
  const navGuestLinks = document.getElementById('navGuestLinks');
  const navGuestLogin = document.getElementById('navGuestLogin');
  const navUserLogout = document.getElementById('navUserLogout');

  const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
  const donateCoffeeBtn = document.getElementById('donateCoffeeBtn');
  const feedbackBtn = document.getElementById('feedbackBtn');

  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  const customModal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const dashUsernameText = document.getElementById('dashUsernameText');
  const dashUrlText = document.getElementById('dashUrlText');
  const dashTagsContainer = document.getElementById('dashTagsContainer');
  const dashEditBtn = document.getElementById('dashEditBtn');
  
  const seccionTitulo = document.getElementById('seccion-titulo');
  const seccionSubtitulo = document.getElementById('seccion-subtitulo');
  const botonesPill = document.querySelectorAll('.pill-btn');
  const tabBlog = document.getElementById('tab-blog');
  const tabSobreMi = document.getElementById('tab-sobre-mi');
  const tabGaleria = document.getElementById('tab-galeria');
  const headerSpotifyCard = document.getElementById('headerSpotifyCard');

  const toggleCarouselView = document.getElementById('toggleCarouselView');
  const toggleCalendarView = document.getElementById('toggleCalendarView');
  const photosCarouselViewMode = document.getElementById('photosCarouselViewMode');
  const photosCalendarViewMode = document.getElementById('photosCalendarViewMode');
  const deleteCurrentPhotoBtn = document.getElementById('deleteCurrentPhotoBtn');

  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const modalEditTitle = document.getElementById('modalEditTitle');
  
  const editFieldsBlog = document.querySelector('.edit-fields-blog');
  const editFieldsSobreMi = document.querySelector('.edit-fields-sobremi');
  const editFieldsGaleria = document.querySelector('.edit-fields-galeria');

  const editBannerFileInput = document.getElementById('editBannerFile');
  const editHeaderTitleInput = document.getElementById('editHeaderTitle');
  const editBioInput = document.getElementById('editBio');
  const editTagsInput = document.getElementById('editTags');
  const editSpotifyUrlInput = document.getElementById('editSpotifyUrl');

  const editAboutBannerFileInput = document.getElementById('editAboutBannerFile');
  const editAboutBioInput = document.getElementById('editAboutBio');
  const editAboutFavoritesInput = document.getElementById('editAboutFavorites');
  const editAboutLinksInput = document.getElementById('editAboutLinks');

  const editGalleryFileInput = document.getElementById('editGalleryFile');
  const editGalleryPhotoTitle = document.getElementById('editGalleryPhotoTitle');
  const editGalleryPhotoStory = document.getElementById('editGalleryPhotoStory');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  const bannerImg = document.getElementById('bannerImg');
  const aboutBannerImg = document.getElementById('aboutBannerImg');
  const nowStatusText = document.getElementById('nowStatusText');
  const aboutBioText = document.getElementById('aboutBioText');
  const aboutFavoritesList = document.getElementById('aboutFavoritesList');
  const aboutLinksList = document.getElementById('aboutLinksList');
  const spotifyWidgetFrame = document.getElementById('spotifyWidgetFrame');
  const updatesList = document.getElementById('updatesList');

  let currentUser = null;
  let tempBannerBase64 = null;
  let tempAboutBannerBase64 = null;
  let tempGalleryBase64 = null;
  let seccionActualActiva = 'blog';

  let currentPhotoSlideIndex = 0;
  let photosStoriesList = [];
  let updatesHistoryList = [];

  const seccionesInfo = {
    'blog': { titulo: 'Inicio / Blog', subtitulo: 'archivo cronologico // estado: activo' },
    'sobre-mi': { titulo: 'Sobre mi', subtitulo: 'perfil del autor // notas personales' },
    'galeria': { titulo: 'Galeria', subtitulo: 'historias fotograficas // photo corner' },
    'visitas': { titulo: 'Libro de Visitas', subtitulo: 'mensajes de la comunidad // firmar' },
    'enlaces': { titulo: 'Enlaces', subtitulo: 'rincones recomendados de la web' }
  };

  botonesPill.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      botonesPill.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const claveSeccion = btn.getAttribute('data-seccion');
      seccionActualActiva = claveSeccion;

      if (seccionesInfo[claveSeccion] && seccionTitulo && seccionSubtitulo) {
        seccionTitulo.textContent = seccionesInfo[claveSeccion].titulo;
        seccionSubtitulo.textContent = seccionesInfo[claveSeccion].subtitulo;
      }

      if (tabBlog) tabBlog.classList.add('hidden');
      if (tabSobreMi) tabSobreMi.classList.add('hidden');
      if (tabGaleria) tabGaleria.classList.add('hidden');

      if (claveSeccion === 'blog') {
        if (tabBlog) tabBlog.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.remove('hidden');
      } else if (claveSeccion === 'sobre-mi') {
        if (tabSobreMi) tabSobreMi.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
      } else if (claveSeccion === 'galeria') {
        if (tabGaleria) tabGaleria.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
      }
    });
  });

  if (toggleCarouselView && toggleCalendarView) {
    toggleCarouselView.addEventListener('click', () => {
      toggleCarouselView.classList.add('active');
      toggleCalendarView.classList.remove('active');
      photosCarouselViewMode.classList.remove('hidden');
      photosCalendarViewMode.classList.add('hidden');
    });
    toggleCalendarView.addEventListener('click', () => {
      toggleCalendarView.classList.add('active');
      toggleCarouselView.classList.remove('active');
      photosCalendarViewMode.classList.remove('hidden');
      photosCarouselViewMode.classList.add('hidden');
      renderLocketCalendar();
    });
  }

  function switchView(viewName) {
    if (landingView) landingView.classList.add('hidden');
    if (loginView) loginView.classList.add('hidden');
    if (signupView) signupView.classList.add('hidden');
    if (dashboardView) dashboardView.classList.add('hidden');

    if (viewName === 'signup' && signupView) {
      signupView.classList.remove('hidden');
    } else if (viewName === 'login' && loginView) {
      loginView.classList.remove('hidden');
    } else if (viewName === 'dashboard' && dashboardView) {
      dashboardView.classList.remove('hidden');
      renderDashboard();
    } else if (landingView) {
      landingView.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (goToSignupLink) goToSignupLink.addEventListener('click', (e) => { e.preventDefault(); switchView('signup'); });
  if (goToLoginLink) goToLoginLink.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });
  if (navSignupBtn) navSignupBtn.addEventListener('click', (e) => { e.preventDefault(); switchView('signup'); });
  if (navLoginBtn) navLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });
  if (heroCtaBtn) heroCtaBtn.addEventListener('click', () => switchView('signup'));
  if (finalCtaBtn) finalCtaBtn.addEventListener('click', () => switchView('signup'));
  if (quickLoginBtn) quickLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });

  selectPlanBtns.forEach(btn => {
    btn.addEventListener('click', () => switchView('signup'));
  });

  if (donateCoffeeBtn) {
    donateCoffeeBtn.addEventListener('click', () => {
      showModal('Apoyo al Proyecto', '¡Muchas gracias! En el despliegue final aquí se abrirá tu enlace de Ko-fi / Patreon.');
    });
  }

  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
      showModal('Feedback & Ideas', 'Puedes enviar tus sugerencias o reportes a nuestro correo oficial: loopangela05@gmail.com');
    });
  }
  
  if (brandNav) {
    brandNav.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentUser) switchView('dashboard');
      else switchView('landing');
    });
  }

  function updateNavState() {
    if (currentUser) {
      if (navGuestLinks) navGuestLinks.classList.add('hidden');
      if (navGuestLogin) navGuestLogin.classList.add('hidden');
      if (navUserLogout) navUserLogout.classList.remove('hidden');
    } else {
      if (navGuestLinks) navGuestLinks.classList.remove('hidden');
      if (navGuestLogin) navGuestLogin.classList.remove('hidden');
      if (navUserLogout) navUserLogout.classList.add('hidden');
    }
  }

  function actualizarReproductorSpotify(url) {
    if (!spotifyWidgetFrame) return;
    let embedUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0";
    if (url && url.includes("spotify.com/")) {
      let cleanUrl = url.split("?")[0];
      let parts = cleanUrl.split("/");
      let type = parts[parts.length - 2];
      let id = parts[parts.length - 1];
      if (id && (type === "playlist" || type === "album" || type === "track")) {
        embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
      }
    }
    spotifyWidgetFrame.src = embedUrl;
  }

  function renderDashboard() {
    if (!currentUser) return;

    if (dashUsernameText) dashUsernameText.textContent = currentUser.username;
    if (dashUrlText) dashUrlText.textContent = `${currentUser.username}.loop.org`;
    if (seccionTitulo) seccionTitulo.textContent = currentUser.header_title || "¡HOLA!";
    if (nowStatusText) nowStatusText.textContent = `"${currentUser.bio || "Explorando nuevas ideas de diseño y construyendo este espacio."}"`;

    if (bannerImg) {
      if (currentUser.banner_url) { bannerImg.src = currentUser.banner_url; bannerImg.style.display = 'block'; }
      else { bannerImg.removeAttribute('src'); }
    }
    if (aboutBannerImg) {
      if (currentUser.about_banner_url) { aboutBannerImg.src = currentUser.about_banner_url; aboutBannerImg.style.display = 'block'; }
      else { aboutBannerImg.removeAttribute('src'); }
    }
    if (aboutBioText) aboutBioText.textContent = currentUser.about_bio || "¡Hola! Soy un creador digital navegando en la web...";

    if (aboutFavoritesList) {
      aboutFavoritesList.innerHTML = '';
      const favs = currentUser.about_favorites || [];
      favs.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        li.innerHTML = parts.length > 1 ? `<span class="star-icon">✶</span> <strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}` : `<span class="star-icon">✶</span> ${item}`;
        aboutFavoritesList.appendChild(li);
      });
    }

    if (aboutLinksList) {
      aboutLinksList.innerHTML = '';
      const links = currentUser.about_links || [];
      links.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        li.innerHTML = parts.length > 1 ? `<span class="star-icon">✶</span> <a href="${parts.slice(1).join(':').trim()}" target="_blank" class="about-link">${parts[0].trim()}</a>` : `<span class="star-icon">✶</span> <a href="#" class="about-link">${item.trim()}</a>`;
        aboutLinksList.appendChild(li);
      });
    }

    photosStoriesList = Array.isArray(currentUser.photos_stories) ? currentUser.photos_stories : [];
    renderPhotosSlideshow();

    updatesHistoryList = Array.isArray(currentUser.updates_history) ? currentUser.updates_history : [];
    renderUpdatesList();

    actualizarReproductorSpotify(currentUser.spotify_url);

    if (dashTagsContainer) {
      dashTagsContainer.innerHTML = '';
      if (currentUser.tags && currentUser.tags.length > 0) {
        currentUser.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag-chip';
          span.textContent = `#${tag.trim()}`;
          dashTagsContainer.appendChild(span);
        });
      } else {
        dashTagsContainer.innerHTML = '<span class="tag-chip">#creatividad</span>';
      }
    }
  }

  function renderUpdatesList() {
    if (!updatesList) return;
    updatesList.innerHTML = '';

    if (updatesHistoryList.length === 0) {
      updatesList.innerHTML = `<p style="opacity: 0.7; font-style: italic; font-size: 0.85rem;">Sin actualizaciones recientes.</p>`;
      return;
    }

    updatesHistoryList.forEach((updateObj) => {
      const titleText = typeof updateObj === 'string' ? updateObj : (updateObj.title || "Actualización");
      const dateSource = typeof updateObj === 'object' && updateObj.date ? updateObj.date : new Date();

      const itemDiv = document.createElement('div');
      itemDiv.className = 'update-item-block';

      const dateObj = new Date(dateSource);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const formattedDate = `${dateObj.getFullYear()} ${months[dateObj.getMonth()]} ${String(dateObj.getDate()).padStart(2, '0')}`;

      itemDiv.innerHTML = `
        <span class="update-date-label">${formattedDate}</span>
        <a href="#" class="update-link-title">${titleText}</a>
      `;

      const linkEl = itemDiv.querySelector('a');
      linkEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof updateObj === 'object' && updateObj.type === 'galeria') {
          const galeriaPill = document.querySelector('[data-seccion="galeria"]');
          if (galeriaPill) galeriaPill.click();
          if (toggleCarouselView) toggleCarouselView.click();
          
          const targetIndex = photosStoriesList.findIndex(p => p.url === updateObj.photoUrl);
          if (targetIndex !== -1) {
            currentPhotoSlideIndex = targetIndex;
            updateSlidePosition();
          }
        }
      });

      updatesList.appendChild(itemDiv);
    });
  }

  function renderPhotosSlideshow() {
    const photosSlideshowTrack = document.getElementById('photosSlideshowTrack');
    const photoStoryDisplayText = document.getElementById('photoStoryDisplayText');
    const photoCounterIndicator = document.getElementById('photoCounterIndicator');
    if (!photosSlideshowTrack) return;
    
    photosSlideshowTrack.innerHTML = '';

    if (photosStoriesList.length === 0) {
      photosSlideshowTrack.innerHTML = `<div class="slide-card-large"><p style="font-style:italic; padding:40px; text-align:center;">Sin fotografías registradas</p></div>`;
      if (photoStoryDisplayText) photoStoryDisplayText.textContent = "Sube tu primera fotografía con historia desde el menú de edición.";
      if (photoCounterIndicator) photoCounterIndicator.textContent = "0 / 0";
      if (deleteCurrentPhotoBtn) deleteCurrentPhotoBtn.classList.add('hidden');
      return;
    }

    if (deleteCurrentPhotoBtn) deleteCurrentPhotoBtn.classList.remove('hidden');

    photosStoriesList.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'slide-card-large';
      card.innerHTML = `<img src="${item.url}" alt="Fotografía">`;
      photosSlideshowTrack.appendChild(card);
    });
    updateSlidePosition();
  }

  function updateSlidePosition() {
    const photosSlideshowTrack = document.getElementById('photosSlideshowTrack');
    const photoStoryDisplayText = document.getElementById('photoStoryDisplayText');
    const photoCounterIndicator = document.getElementById('photoCounterIndicator');
    if (!photosSlideshowTrack) return;

    photosSlideshowTrack.style.transform = `translateX(-${currentPhotoSlideIndex * 100}%)`;

    if (photosStoriesList.length > 0) {
      if (currentPhotoSlideIndex >= photosStoriesList.length) {
        currentPhotoSlideIndex = photosStoriesList.length - 1;
      }
      const currentItem = photosStoriesList[currentPhotoSlideIndex];
      if (photoStoryDisplayText) {
        photoStoryDisplayText.textContent = `"${currentItem.story || "Recuerdo especial"}"`;
      }
      if (photoCounterIndicator) {
        photoCounterIndicator.textContent = `${currentPhotoSlideIndex + 1} / ${photosStoriesList.length}`;
      }
    }
  }

  if (deleteCurrentPhotoBtn) {
    deleteCurrentPhotoBtn.addEventListener('click', async () => {
      if (photosStoriesList.length === 0) return;
      if (!confirm('¿Seguro que deseas eliminar esta fotografía y su historia?')) return;

      photosStoriesList.splice(currentPhotoSlideIndex, 1);
      if (currentPhotoSlideIndex >= photosStoriesList.length) {
        currentPhotoSlideIndex = Math.max(0, photosStoriesList.length - 1);
      }

      currentUser.photos_stories = photosStoriesList;
      renderPhotosSlideshow();

      if (supabase && currentUser) {
        await supabase.from('espacios').update({ photos_stories: photosStoriesList }).eq('username', currentUser.username);
      }
      showModal('Eliminado', 'La fotografía ha sido borrada.');
    });
  }

  const prevPhotoSlide = document.getElementById('prevPhotoSlide');
  const nextPhotoSlide = document.getElementById('nextPhotoSlide');
  if (prevPhotoSlide) {
    prevPhotoSlide.addEventListener('click', () => {
      if (photosStoriesList.length === 0) return;
      currentPhotoSlideIndex--;
      if (currentPhotoSlideIndex < 0) currentPhotoSlideIndex = photosStoriesList.length - 1;
      updateSlidePosition();
    });
  }
  if (nextPhotoSlide) {
    nextPhotoSlide.addEventListener('click', () => {
      if (photosStoriesList.length === 0) return;
      currentPhotoSlideIndex++;
      if (currentPhotoSlideIndex >= photosStoriesList.length) currentPhotoSlideIndex = 0;
      updateSlidePosition();
    });
  }

  function renderLocketCalendar() {
    const locketCalendarContainer = document.getElementById('locketCalendarContainer');
    if (!locketCalendarContainer) return;
    locketCalendarContainer.innerHTML = '';

    if (photosStoriesList.length === 0) {
      locketCalendarContainer.innerHTML = `<p style="font-style:italic; text-align:center; padding:20px;">Sin fotos en el calendario.</p>`;
      return;
    }

    const grouped = {};
    photosStoriesList.forEach((item, index) => {
      const dateObj = item.date ? new Date(item.date) : new Date();
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const monthYearStr = `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

      if (!grouped[monthYearStr]) grouped[monthYearStr] = [];
      grouped[monthYearStr].push({ item, index });
    });

    for (const [monthKey, photosArr] of Object.entries(grouped)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'locket-month-group';
      groupDiv.innerHTML = `
        <h4>${monthKey}</h4>
        <div class="locket-grid" id="grid_${monthKey.replace(/\s+/g, '_')}"></div>
      `;
      locketCalendarContainer.appendChild(groupDiv);

      const gridContent = groupDiv.querySelector('.locket-grid');
      photosArr.forEach(({ item, index }) => {
        const thumb = document.createElement('div');
        thumb.className = 'locket-thumb';
        thumb.innerHTML = `<img src="${item.url}" alt="Recuerdo">`;
        thumb.addEventListener('click', () => {
          toggleCarouselView.click();
          currentPhotoSlideIndex = index;
          updateSlidePosition();
        });
        gridContent.appendChild(thumb);
      });
    }
  }

  function comprimirImagen(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (dashEditBtn) {
    dashEditBtn.addEventListener('click', () => {
      if (!currentUser) return;
      tempBannerBase64 = null;
      tempAboutBannerBase64 = null;
      tempGalleryBase64 = null;

      if (editFieldsBlog) editFieldsBlog.classList.add('hidden');
      if (editFieldsSobreMi) editFieldsSobreMi.classList.add('hidden');
      if (editFieldsGaleria) editFieldsGaleria.classList.add('hidden');

      if (seccionActualActiva === 'sobre-mi') {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Sección 'Sobre Mí'";
        if (editFieldsSobreMi) editFieldsSobreMi.classList.remove('hidden');
        if (editAboutBioInput) editAboutBioInput.value = currentUser.about_bio || "";
        if (editAboutFavoritesInput) editAboutFavoritesInput.value = (currentUser.about_favorites || []).join('\n');
        if (editAboutLinksInput) editAboutLinksInput.value = (currentUser.about_links || []).join('\n');
      } else if (seccionActualActiva === 'galeria') {
        if (modalEditTitle) modalEditTitle.textContent = "Añadir Fotografía al Photo Corner";
        if (editFieldsGaleria) editFieldsGaleria.classList.remove('hidden');
        if (editGalleryPhotoTitle) editGalleryPhotoTitle.value = "";
        if (editGalleryPhotoStory) editGalleryPhotoStory.value = "";
      } else {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Mi Espacio (Inicio)";
        if (editFieldsBlog) editFieldsBlog.classList.remove('hidden');
        if (editHeaderTitleInput) editHeaderTitleInput.value = currentUser.header_title || "¡HOLA!";
        if (editBioInput) editBioInput.value = currentUser.bio || "";
        if (editTagsInput) editTagsInput.value = currentUser.tags ? currentUser.tags.join(', ') : '';
        if (editSpotifyUrlInput) editSpotifyUrlInput.value = currentUser.spotify_url || "";
      }
      if (editModal) editModal.classList.remove('hidden');
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => { if (editModal) editModal.classList.add('hidden'); });
  }

  if (editBannerFileInput) {
    editBannerFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) tempBannerBase64 = await comprimirImagen(file, 900, 0.75);
    });
  }

  if (editAboutBannerFileInput) {
    editAboutBannerFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) tempAboutBannerBase64 = await comprimirImagen(file, 900, 0.75);
    });
  }

  if (editGalleryFileInput) {
    editGalleryFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) tempGalleryBase64 = await comprimirImagen(file, 800, 0.7);
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let payload = {};
      let updateItem = null;

      if (seccionActualActiva === 'sobre-mi') {
        const nuevaAboutBio = editAboutBioInput.value.trim();
        const favsArray = editAboutFavoritesInput.value.trim() ? editAboutFavoritesInput.value.split('\n').map(f => f.trim()).filter(f => f) : [];
        const linksArray = editAboutLinksInput.value.trim() ? editAboutLinksInput.value.split('\n').map(l => l.trim()).filter(l => l) : [];

        payload.about_bio = nuevaAboutBio;
        payload.about_favorites = favsArray;
        payload.about_links = linksArray;

        if (tempAboutBannerBase64) {
          payload.about_banner_url = tempAboutBannerBase64;
          currentUser.about_banner_url = tempAboutBannerBase64;
        }

        currentUser.about_bio = nuevaAboutBio;
        currentUser.about_favorites = favsArray;
        currentUser.about_links = linksArray;

      } else if (seccionActualActiva === 'galeria') {
        const photoTitle = editGalleryPhotoTitle.value.trim() || "Nueva fotografía";
        const photoStory = editGalleryPhotoStory.value.trim() || "Recuerdo especial";
        const imgUrl = tempGalleryBase64;

        if (!imgUrl) {
          showModal('Imagen requerida', 'Por favor selecciona un archivo de imagen para subir.');
          return;
        }

        photosStoriesList.push({ url: imgUrl, title: photoTitle, story: photoStory, date: new Date().toISOString() });
        currentUser.photos_stories = photosStoriesList;
        payload.photos_stories = photosStoriesList;
        currentPhotoSlideIndex = photosStoriesList.length - 1;
        renderPhotosSlideshow();
        
        updateItem = { title: photoTitle, type: 'galeria', photoUrl: imgUrl, date: new Date().toISOString() };

      } else {
        const nuevoTitulo = editHeaderTitleInput.value.trim() || "¡HOLA!";
        const nuevaBio = editBioInput.value.trim();
        const nuevasTagsStr = editTagsInput.value.trim();
        const nuevoSpotifyUrl = editSpotifyUrlInput ? editSpotifyUrlInput.value.trim() : "";
        const tagsArray = nuevasTagsStr ? nuevasTagsStr.split(',').map(t => t.trim()) : [];

        payload = { header_title: nuevoTitulo, bio: nuevaBio, tags: tagsArray, spotify_url: nuevoSpotifyUrl };

        if (tempBannerBase64) {
          payload.banner_url = tempBannerBase64;
          currentUser.banner_url = tempBannerBase64;
        }

        currentUser.header_title = nuevoTitulo;
        currentUser.bio = nuevaBio;
        currentUser.tags = tagsArray;
        currentUser.spotify_url = nuevoSpotifyUrl;
      }

      if (updateItem) {
        updatesHistoryList.unshift(updateItem);
        if (updatesHistoryList.length > 5) updatesHistoryList.pop();
        currentUser.updates_history = updatesHistoryList;
        payload.updates_history = updatesHistoryList;
        renderUpdatesList();
      }

      if (supabase && currentUser) {
        const { error } = await supabase.from('espacios').update(payload).eq('username', currentUser.username);
        if (error) {
          showModal('Error', 'No se pudieron guardar los cambios en Supabase.');
          return;
        }
      }

      renderDashboard();
      if (editModal) editModal.classList.add('hidden');
      showModal('¡Actualizado!', 'Los cambios se han guardado con éxito en la nube.');
    });
  }

  function showModal(title, message, callback) {
    if (!customModal) return;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    customModal.classList.remove('hidden');
    
    const closeHandler = () => {
      customModal.classList.add('hidden');
      modalCloseBtn.removeEventListener('click', closeHandler);
      if (callback) callback();
    };
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeHandler);
  }

  function validarUsername(username) { return /^[a-z0-9\-]{3,30}$/.test(username); }
  function validarPassword(password) { return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password); }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('regUsername').value.trim().toLowerCase();
      const tagsInput = document.getElementById('regTags').value.trim();
      const password = document.getElementById('regPassword').value;
      const email = document.getElementById('regEmail').value.trim().toLowerCase();
      const captchaChecked = document.getElementById('captchaCheck').checked;

      if (!captchaChecked) { showModal('Verificación requerida', 'Por favor confirma que eres humano.'); return; }
      if (!validarUsername(username)) { showModal('Nombre inválido', 'El usuario debe tener entre 3 y 30 caracteres (letras minúsculas, números y guiones).'); return; }
      if (!validarPassword(password)) { showModal('Contraseña débil', 'La contraseña debe tener mínimo 8 caracteres e incluir letras y números.'); return; }

      const tagsArray = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['creatividad', 'loop'];

      if (supabase) {
        const { data: existeUser } = await supabase.from('espacios').select('username').eq('username', username).maybeSingle();
        if (existeUser) {
          showModal('Usuario no disponible', 'Ese nombre de usuario ya está ocupado. Por favor elige otro.');
          return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) { 
          if (authError.message.includes('already registered')) {
            showModal('Correo registrado', 'Este correo ya tiene una cuenta activa. Intenta iniciar sesión.');
          } else {
            showModal('Error de autenticación', authError.message);
          }
          return; 
        }

        const userId = authData.user ? authData.user.id : null;
        
        if (userId) {
          const { error: dbError } = await supabase.from('espacios').insert([{ 
            id: userId, 
            username, 
            email, 
            tags: tagsArray, 
            spotify_url: '', 
            photos_stories: [], 
            updates_history: [] 
          }]);

          if (dbError) { 
            showModal('Error en el servidor', dbError.message); 
            return; 
          }
        }
      }

      currentUser = { username, email, tags: tagsArray, header_title: '¡HOLA!', bio: '', banner_url: '', spotify_url: '', photos_stories: [], updates_history: [] };
      updateNavState();
      
      showModal(
        '¡Espacio Creado con Éxito!', 
        `Lo que estás a punto de probar es solo un prototipo, se está preparando la versión final, espero les guste.\n\nBienvenido a tu espacio: ${username}.loop.org`, 
        () => { switchView('dashboard'); }
      );
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('loginUsername').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      if (supabase) {
        const { data: perfil, error: perfilError } = await supabase.from('espacios').select('*').eq('username', usernameInput).single();
        if (perfilError || !perfil) { showModal('Error de acceso', 'El usuario no existe en Loop.'); return; }
        const { error } = await supabase.auth.signInWithPassword({ email: perfil.email, password: password });
        if (error) { showModal('Credenciales incorrectas', 'Contraseña no válida.'); return; }
        currentUser = perfil;
      } else {
        currentUser = { username: usernameInput, email: `${usernameInput}@loop.org`, tags: ['creatividad'], spotify_url: '', photos_stories: [], updates_history: [] };
      }

      updateNavState();
      
      showModal('¡Bienvenido de nuevo!', `Lo que estás a punto de probar es solo un prototipo, se está preparando la versión final, espero les guste.\n\nAccediendo a: ${currentUser.username}.loop.org...`, () => { switchView('dashboard'); });
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabase) await supabase.auth.signOut();
      currentUser = null;
      updateNavState();
      showModal('Sesión Cerrada', 'Has salido de tu cuenta.', () => { switchView('landing'); });
    });
  }

  async function verificarSesionActiva() {
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: perfil } = await supabase.from('espacios').select('*').eq('id', session.user.id).single();
        if (perfil) {
          currentUser = perfil;
          updateNavState();
          switchView('dashboard');
          return;
        }
      }
    }
    switchView('landing');
  }

  verificarSesionActiva();
});