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
  const bodyThemeRoot = document.getElementById('bodyThemeRoot');

  const goToSignupLink = document.getElementById('goToSignupLink');
  const goToLoginLink = document.getElementById('goToLoginLink');
  const navSignupBtn = document.getElementById('navSignupBtn');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const heroCtaBtn = document.getElementById('heroCtaBtn');
  const finalCtaBtn = document.getElementById('finalCtaBtn');
  const quickLoginBtn = document.getElementById('quickLoginBtn');
  const brandNav = document.getElementById('brandNav');
  const logoutBtn = document.getElementById('logoutBtn');

  // NAVEGACIÓN SUPERIOR Y BUSCADOR DE USUARIOS
  const guestNavLinks = document.getElementById('guestNavLinks');
  const loggedTopBarOptions = document.getElementById('loggedTopBarOptions');
  const topSearchUserInput = document.getElementById('topSearchUserInput');
  const topSearchUserBtn = document.getElementById('topSearchUserBtn');
  const backToMySpaceBtn = document.getElementById('backToMySpaceBtn');
  const exploreSitesBtn = document.getElementById('exploreSitesBtn');
  const searchSuggestionsBox = document.getElementById('searchSuggestionsBox');

  // MODAL EXPLORAR ESPACIOS
  const exploreModal = document.getElementById('exploreModal');
  const closeExploreModalBtn = document.getElementById('closeExploreModalBtn');
  const exploreModalGrid = document.getElementById('exploreModalGrid');

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
  const sidebarEditBoxContainer = document.getElementById('sidebarEditBoxContainer');
  const themeSelectorSidebarBox = document.getElementById('themeSelectorSidebarBox');
  const sidebarThemeSelect = document.getElementById('sidebarThemeSelect');
  
  const seccionTitulo = document.getElementById('seccion-titulo');
  const currentPathText = document.getElementById('currentPathText');
  const homeBreadcrumb = document.getElementById('homeBreadcrumb');
  const botonesPill = document.querySelectorAll('.neo-link');
  const tabBlog = document.getElementById('tab-blog');
  const tabSobreMi = document.getElementById('tab-sobre-mi');
  const tabGaleria = document.getElementById('tab-galeria');
  const tabReviews = document.getElementById('tab-reviews');
  const tabBitacora = document.getElementById('tab-bitacora');
  const tabGuestbook = document.getElementById('tab-guestbook');
  const headerSpotifyCard = document.getElementById('headerSpotifyCard');

  const toggleCarouselView = document.getElementById('toggleCarouselView');
  const toggleCalendarView = document.getElementById('toggleCalendarView');
  const photosCarouselViewMode = document.getElementById('photosCarouselViewMode');
  const photosCalendarViewMode = document.getElementById('photosCalendarViewMode');
  const deleteCurrentPhotoBtn = document.getElementById('deleteCurrentPhotoBtn');
  const reviewMonthFilter = document.getElementById('reviewMonthFilter');

  // GUESTBOOK DOM
  const guestbookFormContainer = document.getElementById('guestbookFormContainer');
  const guestSignerName = document.getElementById('guestSignerName');
  const guestSignerMessage = document.getElementById('guestSignerMessage');
  const submitGuestbookBtn = document.getElementById('submitGuestbookBtn');
  const guestbookMessagesList = document.getElementById('guestbookMessagesList');

  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const modalEditTitle = document.getElementById('modalEditTitle');
  
  const editFieldsBlog = document.querySelector('.edit-fields-blog');
  const editFieldsSobreMi = document.querySelector('.edit-fields-sobremi');
  const editFieldsGaleria = document.querySelector('.edit-fields-galeria');
  const editFieldsReviews = document.querySelector('.edit-fields-reviews');
  const editFieldsBitacora = document.querySelector('.edit-fields-bitacora');

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

  const editReviewFileInput = document.getElementById('editReviewFile');
  const editReviewTitle = document.getElementById('editReviewTitle');
  const editReviewSub = document.getElementById('editReviewSub');
  const editReviewSinopsis = document.getElementById('editReviewSinopsis');
  const editReviewOpinion = document.getElementById('editReviewOpinion');

  const editMoodboardQuoteInput = document.getElementById('editMoodboardQuote');
  const editMoodboardColorsInput = document.getElementById('editMoodboardColors');
  const editBitacoraPostTitleInput = document.getElementById('editBitacoraPostTitle');
  const editBitacoraPostContentInput = document.getElementById('editBitacoraPostContent');

  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const cropContainer = document.getElementById('cropContainer');
  const cropImagePreview = document.getElementById('cropImagePreview');

  const bannerImg = document.getElementById('bannerImg');
  const aboutBannerImg = document.getElementById('aboutBannerImg');
  const nowStatusText = document.getElementById('nowStatusText');
  const aboutBioText = document.getElementById('aboutBioText');
  const aboutFavoritesList = document.getElementById('aboutFavoritesList');
  const aboutLinksList = document.getElementById('aboutLinksList');
  const spotifyWidgetFrame = document.getElementById('spotifyWidgetFrame');
  const updatesList = document.getElementById('updatesList');
  const reviewsGridContainer = document.getElementById('reviewsGridContainer');

  const moodboardQuoteDisplay = document.getElementById('moodboardQuoteDisplay');
  const moodboardPaletteContainer = document.getElementById('moodboardPaletteContainer');
  const bitacoraPostsList = document.getElementById('bitacoraPostsList');

  let currentUser = null;          
  let viewedUser = null;           
  let cropperInstance = null;
  let seccionActualActiva = 'blog';
  let uploadedMediaBase64 = null;
  let uploadedMediaType = 'image';

  let currentPhotoSlideIndex = 0;
  let photosStoriesList = [];
  let updatesHistoryList = [];
  let reviewsList = [];
  let bitacoraEntriesList = [];
  let guestbookList = [];

  const seccionesInfo = {
    'blog': { titulo: 'HELLO', path: 'inicio' },
    'sobre-mi': { titulo: 'ABOUT ME', path: 'sobre mí' },
    'galeria': { titulo: 'GALLERY', path: 'galería' },
    'reviews': { titulo: 'REVIEWS', path: 'reseñas' },
    'bitacora': { titulo: 'BITÁCORA', path: 'bitácora & moodboard' },
    'guestbook': { titulo: 'VISITORS', path: 'libro de visitas' }
  };

  // NAVEGACIÓN EN PESTAÑAS
  botonesPill.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      botonesPill.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const claveSeccion = btn.getAttribute('data-seccion');
      seccionActualActiva = claveSeccion;

      if (seccionesInfo[claveSeccion]) {
        if (seccionTitulo) seccionTitulo.textContent = seccionesInfo[claveSeccion].titulo;
        if (currentPathText) currentPathText.textContent = seccionesInfo[claveSeccion].path;
      }

      if (tabBlog) tabBlog.classList.add('hidden');
      if (tabSobreMi) tabSobreMi.classList.add('hidden');
      if (tabGaleria) tabGaleria.classList.add('hidden');
      if (tabReviews) tabReviews.classList.add('hidden');
      if (tabBitacora) tabBitacora.classList.add('hidden');
      if (tabGuestbook) tabGuestbook.classList.add('hidden');

      if (claveSeccion === 'blog') {
        if (tabBlog) tabBlog.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.remove('hidden');
      } else if (claveSeccion === 'sobre-mi') {
        if (tabSobreMi) tabSobreMi.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
      } else if (claveSeccion === 'galeria') {
        if (tabGaleria) tabGaleria.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
        renderPhotosSlideshow();
      } else if (claveSeccion === 'reviews') {
        if (tabReviews) tabReviews.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
        poblarFiltroMesesReseñas();
        renderReviewsGrid();
      } else if (claveSeccion === 'bitacora') {
        if (tabBitacora) tabBitacora.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
        renderBitacoraSection();
      } else if (claveSeccion === 'guestbook') {
        if (tabGuestbook) tabGuestbook.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
        const esMiPropioEspacio = currentUser && viewedUser && viewedUser.username === currentUser.username;
        renderGuestbookSection(esMiPropioEspacio);
      }
    });
  });

  if (homeBreadcrumb) {
    homeBreadcrumb.addEventListener('click', (e) => {
      e.preventDefault();
      const firstPill = document.querySelector('[data-seccion="blog"]');
      if (firstPill) firstPill.click();
    });
  }

  // BUSCAR USUARIOS
  async function buscarYVisitarUsuario(nombreUsuario) {
    const query = nombreUsuario.trim().toLowerCase();
    if (!query) return;

    if (!supabase) {
      showModal('Aviso', 'Modo local: no hay base de datos conectada para buscar.');
      return;
    }

    const { data: encontrado, error } = await supabase.from('espacios').select('*').eq('username', query).maybeSingle();
    if (error || !encontrado) {
      showModal('Usuario no encontrado', `No existe ningún espacio con el nombre "${query}".`);
      return;
    }

    viewedUser = encontrado;
    if (searchSuggestionsBox) searchSuggestionsBox.classList.add('hidden');
    if (topSearchUserInput) topSearchUserInput.value = '';
    switchView('dashboard');
  }

  if (topSearchUserInput && searchSuggestionsBox) {
    topSearchUserInput.addEventListener('input', async () => {
      const val = topSearchUserInput.value.trim().toLowerCase();
      if (!val) {
        searchSuggestionsBox.innerHTML = '';
        searchSuggestionsBox.classList.add('hidden');
        return;
      }

      if (!supabase) return;

      const { data: matches, error } = await supabase
        .from('espacios')
        .select('username, tags')
        .ilike('username', `%${val}%`)
        .limit(5);

      if (error || !matches || matches.length === 0) {
        searchSuggestionsBox.innerHTML = `<div class="suggestion-item" style="color:#888;">Sin coincidencias</div>`;
        searchSuggestionsBox.classList.remove('hidden');
        return;
      }

      searchSuggestionsBox.innerHTML = '';
      matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `<strong>${item.username}</strong><span style="display:block; font-size:0.7rem; color:var(--olive-harvest);">${item.username}.loop.org</span>`;
        div.addEventListener('click', () => {
          buscarYVisitarUsuario(item.username);
        });
        searchSuggestionsBox.appendChild(div);
      });
      searchSuggestionsBox.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!topSearchUserInput.contains(e.target) && !searchSuggestionsBox.contains(e.target)) {
        searchSuggestionsBox.classList.add('hidden');
      }
    });
  }

  if (topSearchUserBtn && topSearchUserInput) {
    topSearchUserBtn.addEventListener('click', () => {
      buscarYVisitarUsuario(topSearchUserInput.value);
    });
    topSearchUserInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        buscarYVisitarUsuario(topSearchUserInput.value);
      }
    });
  }

  if (backToMySpaceBtn) {
    backToMySpaceBtn.addEventListener('click', () => {
      if (currentUser) {
        viewedUser = currentUser;
        switchView('dashboard');
      }
    });
  }

  async function abrirModalExplorarSitios() {
    if (!exploreModal || !exploreModalGrid) return;
    exploreModalGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding:20px;">Cargando espacios...</p>';
    exploreModal.classList.remove('hidden');

    if (!supabase) {
      exploreModalGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Modo local: no hay conexión con Supabase.</p>';
      return;
    }

    const { data: espacios, error } = await supabase.from('espacios').select('username, tags, bio, banner_url').limit(12);
    if (error || !espacios || espacios.length === 0) {
      exploreModalGrid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">No se encontraron espacios públicos aún.</p>';
      return;
    }

    exploreModalGrid.innerHTML = '';
    espacios.forEach(esp => {
      const card = document.createElement('div');
      card.className = 'showcase-card';
      card.style.cssText = 'background: #fff; border: 1px solid var(--olive-harvest); border-radius: 6px; padding: 10px; cursor: pointer;';
      card.innerHTML = `
        <div style="height: 70px; background: var(--golden-batter); border-radius: 4px; overflow: hidden; margin-bottom: 6px; display: flex; align-items: center; justify-content: center;">
          ${esp.banner_url ? `<img src="${esp.banner_url}" style="width:100%; height:100%; object-fit:cover;">` : `<span style="font-family:'Pacifico', cursive; color:var(--spiced-wine);">loop</span>`}
        </div>
        <h4 style="font-size: 0.9rem; color: var(--spiced-wine);">${esp.username}.loop.org</h4>
        <p style="font-size: 0.75rem; color: #555; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px;">"${esp.bio || 'Bitácora personal'}"</p>
      `;

      card.addEventListener('click', () => {
        exploreModal.classList.add('hidden');
        buscarYVisitarUsuario(esp.username);
      });

      exploreModalGrid.appendChild(card);
    });
  }

  if (exploreSitesBtn) {
    exploreSitesBtn.addEventListener('click', () => {
      abrirModalExplorarSitios();
    });
  }

  if (closeExploreModalBtn) {
    closeExploreModalBtn.addEventListener('click', () => {
      if (exploreModal) exploreModal.classList.add('hidden');
    });
  }

  if (sidebarThemeSelect) {
    sidebarThemeSelect.addEventListener('change', async () => {
      if (!currentUser || viewedUser.username !== currentUser.username) return;
      const nuevoTema = sidebarThemeSelect.value;
      
      currentUser.site_theme = nuevoTema;
      viewedUser.site_theme = nuevoTema;
      if (bodyThemeRoot) bodyThemeRoot.className = nuevoTema;

      if (supabase) {
        await supabase.from('espacios').update({ site_theme: nuevoTema }).eq('username', currentUser.username);
      }
    });
  }

  if (submitGuestbookBtn) {
    submitGuestbookBtn.addEventListener('click', async () => {
      const nameVal = guestSignerName.value.trim() || "Anónimo";
      const msgVal = guestSignerMessage.value.trim();

      if (!msgVal) {
        showModal('Mensaje vacío', 'Por favor escribe un mensaje para firmar el libro de visitas.');
        return;
      }

      const newEntry = {
        name: nameVal,
        message: msgVal,
        date: new Date().toISOString(),
        replies: []
      };

      guestbookList.unshift(newEntry);
      viewedUser.guestbook_entries = guestbookList;

      if (currentUser && viewedUser.username === currentUser.username) {
        currentUser.guestbook_entries = guestbookList;
      }

      if (supabase && viewedUser) {
        await supabase.from('espacios').update({ guestbook_entries: guestbookList }).eq('username', viewedUser.username);
      }

      guestSignerName.value = "";
      guestSignerMessage.value = "";
      const esMiPropioEspacio = currentUser && viewedUser && viewedUser.username === currentUser.username;
      renderGuestbookSection(esMiPropioEspacio);
      showModal('Firmado', 'Tu mensaje se ha agregado al libro de visitas.');
    });
  }

  function renderGuestbookSection(esMiPropioEspacio) {
    if (!guestbookMessagesList) return;
    guestbookMessagesList.innerHTML = '';

    if (guestbookFormContainer) {
      if (esMiPropioEspacio) {
        guestbookFormContainer.classList.add('hidden');
      } else {
        guestbookFormContainer.classList.remove('hidden');
      }
    }

    if (guestbookList.length === 0) {
      guestbookMessagesList.innerHTML = `<p class="empty-note" style="text-align:center; padding:15px; font-style:italic;">Aún no hay mensajes en este libro de visitas. ¡Sé el primero en firmar!</p>`;
      return;
    }

    guestbookList.forEach((entry, index) => {
      if (!entry.replies) entry.replies = [];

      const card = document.createElement('div');
      card.className = 'guestbook-item-card';
      const dateObj = new Date(entry.date);
      const formattedDate = dateObj.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });

      card.innerHTML = `
        ${esMiPropioEspacio ? '<button type="button" class="delete-guestbook-btn" title="Eliminar mensaje">✕</button>' : ''}
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-family: 'Newsreader', serif; font-size: 0.95rem; color: var(--spiced-wine);">${entry.name}</strong>
          <span style="font-family: 'Space Mono', monospace; font-size: 0.68rem; color: var(--olive-harvest);">${formattedDate}</span>
        </div>
        <p style="font-size: 0.85rem; color: #444; word-break: break-word; margin-bottom: 8px;">${entry.message}</p>
        
        <div class="guestbook-replies-container" id="repliesContainer_${index}"></div>

        <div class="reply-input-box" style="margin-top: 8px; display: flex; gap: 6px;">
          <input type="text" id="replyName_${index}" placeholder="Tu nombre" value="${currentUser ? currentUser.username : ''}" style="width: 110px; padding: 4px 6px; border: 1px solid var(--olive-harvest); border-radius: 4px; font-size: 0.78rem;">
          <input type="text" id="replyMsg_${index}" placeholder="Escribe una respuesta..." style="flex: 1; padding: 4px 6px; border: 1px solid var(--olive-harvest); border-radius: 4px; font-size: 0.78rem;">
          <button type="button" id="submitReplyBtn_${index}" class="submit-btn" style="padding: 4px 10px; font-size: 0.75rem; margin-top:0;">Responder</button>
        </div>
      `;

      if (esMiPropioEspacio) {
        const delBtn = card.querySelector('.delete-guestbook-btn');
        delBtn.addEventListener('click', async () => {
          if (!confirm('¿Eliminar este mensaje del libro de visitas?')) return;
          guestbookList.splice(index, 1);
          currentUser.guestbook_entries = guestbookList;
          viewedUser.guestbook_entries = guestbookList;
          renderGuestbookSection(true);

          if (supabase) {
            await supabase.from('espacios').update({ guestbook_entries: guestbookList }).eq('username', currentUser.username);
          }
          showModal('Eliminado', 'El mensaje ha sido borrado.');
        });
      }

      const repliesContainer = card.querySelector(`#repliesContainer_${index}`);
      const submitReplyBtn = card.querySelector(`#submitReplyBtn_${index}`);
      const replyNameInput = card.querySelector(`#replyName_${index}`);
      const replyMsgInput = card.querySelector(`#replyMsg_${index}`);

      function renderReplies() {
        repliesContainer.innerHTML = '';
        if (entry.replies.length === 0) {
          repliesContainer.style.display = 'none';
          return;
        }
        repliesContainer.style.display = 'flex';

        entry.replies.forEach((rep, rIndex) => {
          const repDiv = document.createElement('div');
          repDiv.className = 'guestbook-reply-item';
          const canDeleteReply = esMiPropioEspacio || (currentUser && rep.name === currentUser.username);

          repDiv.innerHTML = `
            ${canDeleteReply ? `<button type="button" class="delete-reply-btn" title="Eliminar respuesta">✕</button>` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="color: var(--spiced-wine); font-size: 0.8rem;">${rep.name}</strong>
              <span style="font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--olive-harvest);">${new Date(rep.date).toLocaleDateString('es-MX', {month:'short', day:'numeric'})}</span>
            </div>
            <p style="color: #444; word-break: break-word;">${rep.message}</p>
          `;

          if (canDeleteReply) {
            const delRepBtn = repDiv.querySelector('.delete-reply-btn');
            delRepBtn.addEventListener('click', async () => {
              if (!confirm('¿Eliminar esta respuesta?')) return;
              entry.replies.splice(rIndex, 1);
              currentUser.guestbook_entries = guestbookList;
              viewedUser.guestbook_entries = guestbookList;
              renderGuestbookSection(esMiPropioEspacio);

              if (supabase) {
                await supabase.from('espacios').update({ guestbook_entries: guestbookList }).eq('username', viewedUser.username);
              }
            });
          }

          repliesContainer.appendChild(repDiv);
        });
      }

      renderReplies();

      submitReplyBtn.addEventListener('click', async () => {
        const rName = replyNameInput.value.trim() || (currentUser ? currentUser.username : "Anónimo");
        const rMsg = replyMsgInput.value.trim();

        if (!rMsg) return;

        entry.replies.push({
          name: rName,
          message: rMsg,
          date: new Date().toISOString()
        });

        currentUser.guestbook_entries = guestbookList;
        viewedUser.guestbook_entries = guestbookList;
        renderGuestbookSection(esMiPropioEspacio);

        if (supabase) {
          await supabase.from('espacios').update({ guestbook_entries: guestbookList }).eq('username', viewedUser.username);
        }
        replyMsgInput.value = "";
      });

      guestbookMessagesList.appendChild(card);
    });
  }

  if (toggleCarouselView && toggleCalendarView) {
    toggleCarouselView.addEventListener('click', () => {
      toggleCarouselView.classList.add('active');
      toggleCalendarView.classList.remove('active');
      if (photosCarouselViewMode) photosCarouselViewMode.classList.remove('hidden');
      if (photosCalendarViewMode) photosCalendarViewMode.classList.add('hidden');
    });
    toggleCalendarView.addEventListener('click', () => {
      toggleCalendarView.classList.add('active');
      toggleCarouselView.classList.remove('active');
      if (photosCalendarViewMode) photosCalendarViewMode.classList.remove('hidden');
      if (photosCarouselViewMode) photosCarouselViewMode.classList.add('hidden');
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
      if (currentUser) {
        viewedUser = currentUser;
        switchView('dashboard');
      } else {
        switchView('landing');
      }
    });
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
    const targetUser = viewedUser || currentUser;
    if (!targetUser) return;

    const userTheme = targetUser.site_theme || 'theme-default';
    if (bodyThemeRoot) {
      bodyThemeRoot.className = userTheme;
    }

    const esMiPropioEspacio = currentUser && targetUser.username === currentUser.username;
    
    if (sidebarEditBoxContainer) {
      if (esMiPropioEspacio) sidebarEditBoxContainer.classList.remove('hidden');
      else sidebarEditBoxContainer.classList.add('hidden');
    }

    if (themeSelectorSidebarBox) {
      if (esMiPropioEspacio) {
        themeSelectorSidebarBox.classList.remove('hidden');
        if (sidebarThemeSelect) sidebarThemeSelect.value = userTheme;
      } else {
        themeSelectorSidebarBox.classList.add('hidden');
      }
    }

    if (backToMySpaceBtn) {
      if (esMiPropioEspacio) backToMySpaceBtn.classList.add('hidden');
      else backToMySpaceBtn.classList.remove('hidden');
    }

    if (dashUsernameText) dashUsernameText.textContent = targetUser.username;
    if (dashUrlText) dashUrlText.textContent = `${targetUser.username}.loop.org`;
    if (seccionTitulo) seccionTitulo.textContent = targetUser.header_title || "HELLO";
    if (nowStatusText) nowStatusText.textContent = `"${targetUser.bio || "Explorando nuevas ideas de diseño y construyendo este espacio."}"`;

    if (bannerImg) {
      if (targetUser.banner_url) { bannerImg.src = targetUser.banner_url; bannerImg.style.display = 'block'; }
      else { bannerImg.removeAttribute('src'); }
    }
    if (aboutBannerImg) {
      if (targetUser.about_banner_url) { aboutBannerImg.src = targetUser.about_banner_url; aboutBannerImg.style.display = 'block'; }
      else { aboutBannerImg.removeAttribute('src'); }
    }
    if (aboutBioText) aboutBioText.textContent = targetUser.about_bio || "¡Hola! Soy un creador digital navegando en la web...";

    if (aboutFavoritesList) {
      aboutFavoritesList.innerHTML = '';
      const favs = targetUser.about_favorites || [];
      favs.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        li.innerHTML = parts.length > 1 ? `<span style="color:var(--toasted-caramel);">✶</span> <strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}` : `<span style="color:var(--toasted-caramel);">✶</span> ${item}`;
        aboutFavoritesList.appendChild(li);
      });
    }

    if (aboutLinksList) {
      aboutLinksList.innerHTML = '';
      const links = targetUser.about_links || [];
      links.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        li.innerHTML = parts.length > 1 ? `<span style="color:var(--toasted-caramel);">✶</span> <a href="${parts.slice(1).join(':').trim()}" target="_blank" style="color:var(--spiced-wine);">${parts[0].trim()}</a>` : `<span style="color:var(--toasted-caramel);">✶</span> ${item.trim()}`;
        aboutLinksList.appendChild(li);
      });
    }

    photosStoriesList = Array.isArray(targetUser.photos_stories) ? targetUser.photos_stories : [];
    renderPhotosSlideshow(esMiPropioEspacio);

    updatesHistoryList = Array.isArray(targetUser.updates_history) ? targetUser.updates_history : [];
    renderUpdatesList();

    reviewsList = Array.isArray(targetUser.reviews_list) ? targetUser.reviews_list : [];
    poblarFiltroMesesReseñas();
    renderReviewsGrid(esMiPropioEspacio);

    bitacoraEntriesList = Array.isArray(targetUser.bitacora_posts) ? targetUser.bitacora_posts : (Array.isArray(targetUser.bitacora_entries) ? targetUser.bitacora_entries : []);
    renderBitacoraSection(esMiPropioEspacio);

    guestbookList = Array.isArray(targetUser.guestbook_entries) ? targetUser.guestbook_entries : [];
    renderGuestbookSection(esMiPropioEspacio);

    actualizarReproductorSpotify(targetUser.spotify_url);

    if (dashTagsContainer) {
      dashTagsContainer.innerHTML = '';
      if (targetUser.tags && targetUser.tags.length > 0) {
        targetUser.tags.forEach(tag => {
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

  function renderPhotosSlideshow(esMiPropioEspacio) {
    const photosSlideshowTrack = document.getElementById('photosSlideshowTrack');
    const photoStoryDisplayText = document.getElementById('photoStoryDisplayText');
    const photoCounterIndicator = document.getElementById('photoCounterIndicator');
    if (!photosSlideshowTrack) return;
    
    photosSlideshowTrack.innerHTML = '';

    if (photosStoriesList.length === 0) {
      photosSlideshowTrack.innerHTML = `<div class="slide-card-large"><p style="font-style:italic; padding:40px; text-align:center;">Sin fotos ni videos registrados</p></div>`;
      if (photoStoryDisplayText) photoStoryDisplayText.textContent = "Este espacio aún no tiene fotos o videos con historia.";
      if (photoCounterIndicator) photoCounterIndicator.textContent = "0 / 0";
      if (deleteCurrentPhotoBtn) deleteCurrentPhotoBtn.classList.add('hidden');
      return;
    }

    if (deleteCurrentPhotoBtn) {
      if (esMiPropioEspacio) deleteCurrentPhotoBtn.classList.remove('hidden');
      else deleteCurrentPhotoBtn.classList.add('hidden');
    }

    photosStoriesList.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'slide-card-large';
      if (item.type === 'video') {
        card.innerHTML = `<video src="${item.url}" controls style="width:100%; height:100%; object-fit:cover; border-radius:4px;"></video>`;
      } else {
        card.innerHTML = `<img src="${item.url}" alt="${item.title || 'Foto'}">`;
      }
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
      if (!currentUser || viewedUser.username !== currentUser.username) return;
      if (photosStoriesList.length === 0) return;
      if (!confirm('¿Seguro que deseas eliminar este elemento?')) return;

      photosStoriesList.splice(currentPhotoSlideIndex, 1);
      if (currentPhotoSlideIndex >= photosStoriesList.length) {
        currentPhotoSlideIndex = Math.max(0, photosStoriesList.length - 1);
      }

      currentUser.photos_stories = photosStoriesList;
      viewedUser.photos_stories = photosStoriesList;
      renderPhotosSlideshow(true);
      renderLocketCalendar();

      if (supabase) {
        await supabase.from('espacios').update({ photos_stories: photosStoriesList }).eq('username', currentUser.username);
      }
      showModal('Eliminado', 'El elemento ha sido borrado.');
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
      locketCalendarContainer.innerHTML = `<p style="font-style:italic; text-align:center; padding:20px;">Sin fotos ni videos en el álbum.</p>`;
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
        <h4 style="font-family:'Newsreader', serif; font-style:italic; font-size:1rem; color:var(--spiced-wine); margin-bottom:8px; border-bottom:1px dashed var(--olive-harvest); padding-bottom:4px;">✦ ${monthKey}</h4>
        <div class="locket-grid" id="grid_${monthKey.replace(/\s+/g, '_')}" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px;"></div>
      `;
      locketCalendarContainer.appendChild(groupDiv);

      const gridContent = groupDiv.querySelector('.locket-grid');
      photosArr.forEach(({ item, index }) => {
        const thumb = document.createElement('div');
        thumb.className = 'locket-thumb';
        thumb.style.cssText = 'width: 100%; height: 130px; overflow: hidden; border-radius: 6px; border: 1px solid var(--olive-harvest); cursor: pointer; background: #000; position: relative;';
        
        if (item.type === 'video') {
          thumb.innerHTML = `
            <video src="${item.url}" style="width:100%; height:100%; object-fit:cover; opacity: 0.85;"></video>
            <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.6); color: #fff; font-size: 0.65rem; padding: 2px 5px; border-radius: 3px;">▶ VIDEO</span>
          `;
        } else {
          thumb.innerHTML = `<img src="${item.url}" alt="Recuerdo" style="width:100%; height:100%; object-fit:cover;">`;
        }

        thumb.addEventListener('click', () => {
          if (toggleCarouselView) toggleCarouselView.click();
          currentPhotoSlideIndex = index;
          updateSlidePosition();
        });
        gridContent.appendChild(thumb);
      });
    }
  }

  function poblarFiltroMesesReseñas() {
    if (!reviewMonthFilter) return;
    
    const selectedVal = reviewMonthFilter.value;
    reviewMonthFilter.innerHTML = '<option value="all">Todos los meses</option>';

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const mesesDisponibles = new Set();

    reviewsList.forEach(rev => {
      const d = rev.date ? new Date(rev.date) : new Date();
      const mStr = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      mesesDisponibles.add(mStr);
    });

    mesesDisponibles.forEach(mKey => {
      const opt = document.createElement('option');
      opt.value = mKey;
      opt.textContent = mKey;
      reviewMonthFilter.appendChild(opt);
    });

    reviewMonthFilter.value = selectedVal || 'all';
  }

  if (reviewMonthFilter) {
    reviewMonthFilter.addEventListener('change', () => {
      const esMiPropioEspacio = currentUser && viewedUser && viewedUser.username === currentUser.username;
      renderReviewsGrid(esMiPropioEspacio);
    });
  }

  function renderReviewsGrid(esMiPropioEspacio) {
    if (!reviewsGridContainer) return;
    reviewsGridContainer.innerHTML = '';

    const filtroMes = reviewMonthFilter ? reviewMonthFilter.value : 'all';
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const filteredReviews = reviewsList.filter(rev => {
      if (filtroMes === 'all') return true;
      const d = rev.date ? new Date(rev.date) : new Date();
      const mStr = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      return mStr === filtroMes;
    });

    if (filteredReviews.length === 0) {
      reviewsGridContainer.innerHTML = `<p class="empty-note" style="grid-column: 1/-1; padding: 20px; text-align: center;">No hay reseñas registradas para este filtro.</p>`;
      return;
    }

    filteredReviews.forEach((rev) => {
      const realIndex = reviewsList.findIndex(r => r === rev);

      const card = document.createElement('div');
      card.className = 'review-card-item';
      card.innerHTML = `
        ${esMiPropioEspacio ? '<button type="button" class="delete-review-btn" title="Eliminar reseña">✕</button>' : ''}
        <div class="review-poster-box">
          <img src="${rev.url}" alt="${rev.title}">
        </div>
        <h4 class="review-title">${rev.title}</h4>
        <div class="review-sub">${rev.sub || ''}</div>
        <div class="review-body-scroll">
          ${rev.sinopsis ? `<p class="sinopsis-text">${rev.sinopsis}</p>` : ''}
          <p class="opinion-text">${rev.opinion || ''}</p>
        </div>
      `;

      if (esMiPropioEspacio) {
        const delBtn = card.querySelector('.delete-review-btn');
        delBtn.addEventListener('click', async () => {
          if (!confirm(`¿Eliminar la reseña de "${rev.title}"?`)) return;
          reviewsList.splice(realIndex, 1);
          currentUser.reviews_list = reviewsList;
          viewedUser.reviews_list = reviewsList;
          poblarFiltroMesesReseñas();
          renderReviewsGrid(true);

          if (supabase) {
            await supabase.from('espacios').update({ reviews_list: reviewsList }).eq('username', currentUser.username);
          }
          showModal('Eliminado', 'La reseña ha sido borrada.');
        });
      }

      reviewsGridContainer.appendChild(card);
    });
  }

  function renderBitacoraSection(esMiPropioEspacio) {
    const targetUser = viewedUser || currentUser;
    const moodboardData = targetUser.moodboard_data || { frase: "", paleta: [], imagenes: [] };

    if (moodboardQuoteDisplay) {
      moodboardQuoteDisplay.textContent = moodboardData.frase ? `"${moodboardData.frase}"` : '"Creando pequeñas cosas con gran significado."';
    }

    if (moodboardPaletteContainer) {
      moodboardPaletteContainer.innerHTML = '';
      let colors = (moodboardData.paleta && moodboardData.paleta.length > 0) 
        ? moodboardData.paleta 
        : ['#743014', '#84592B', '#9D9167', '#E8D1A7'];

      colors.forEach(hex => {
        let cleanHex = hex.toString().replace(/['"]/g, '').trim();
        if (cleanHex && !cleanHex.startsWith('#')) {
          cleanHex = '#' + cleanHex;
        }

        if (cleanHex) {
          const circle = document.createElement('div');
          circle.className = 'palette-circle';
          circle.style.setProperty('background-color', cleanHex, 'important');
          circle.title = cleanHex;
          moodboardPaletteContainer.appendChild(circle);
        }
      });
    }

    if (!bitacoraPostsList) return;
    bitacoraPostsList.innerHTML = '';

    if (bitacoraEntriesList.length === 0) {
      bitacoraPostsList.innerHTML = `<p class="empty-note" style="text-align:center; padding:20px;">Aún no hay entradas en esta bitácora.</p>`;
      return;
    }

    bitacoraEntriesList.forEach((entry, index) => {
      const card = document.createElement('div');
      card.className = 'bitacora-post-card';
      const dateObj = new Date(entry.date);
      const formattedDate = dateObj.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

      card.innerHTML = `
        ${esMiPropioEspacio ? '<button type="button" class="delete-post-btn" title="Eliminar entrada">✕</button>' : ''}
        <div class="bitacora-post-header">
          <h4 class="bitacora-post-title">${entry.title}</h4>
          <span class="bitacora-post-date">${formattedDate}</span>
        </div>
        <div class="bitacora-post-content">${entry.content}</div>
      `;

      if (esMiPropioEspacio) {
        const delBtn = card.querySelector('.delete-post-btn');
        delBtn.addEventListener('click', async () => {
          if (!confirm(`¿Eliminar la entrada "${entry.title}"?`)) return;
          bitacoraEntriesList.splice(index, 1);
          currentUser.bitacora_posts = bitacoraEntriesList;
          viewedUser.bitacora_posts = bitacoraEntriesList;
          renderBitacoraSection(true);

          if (supabase) {
            await supabase.from('espacios').update({ bitacora_posts: bitacoraEntriesList }).eq('username', currentUser.username);
          }
          showModal('Eliminado', 'La entrada ha sido borrada.');
        });
      }

      bitacoraPostsList.appendChild(card);
    });
  }

  function renderUpdatesList() {
    if (!updatesList) return;
    updatesList.innerHTML = '';

    if (updatesHistoryList.length === 0) {
      updatesList.innerHTML = `<p class="empty-note">Sin actualizaciones recientes.</p>`;
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
        } else if (typeof updateObj === 'object' && updateObj.type === 'reviews') {
          const reviewsPill = document.querySelector('[data-seccion="reviews"]');
          if (reviewsPill) reviewsPill.click();
        } else if (typeof updateObj === 'object' && updateObj.type === 'bitacora') {
          const bitacoraPill = document.querySelector('[data-seccion="bitacora"]');
          if (bitacoraPill) bitacoraPill.click();
        }
      });

      updatesList.appendChild(itemDiv);
    });
  }

  function inicializarCropper(file, aspectRatio = NaN) {
    uploadedMediaBase64 = null;
    
    if (file && file.type.startsWith('video/')) {
      uploadedMediaType = 'video';
      if (cropperInstance) { cropperInstance.destroy(); cropperInstance = null; }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedMediaBase64 = e.target.result;
        if (cropContainer) cropContainer.classList.add('hidden');
      };
      reader.readAsDataURL(file);
      return;
    }

    uploadedMediaType = 'image';
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      cropImagePreview.src = e.target.result;
      cropContainer.classList.remove('hidden');

      cropperInstance = new Cropper(cropImagePreview, {
        aspectRatio: aspectRatio,
        viewMode: 1,
        autoCropArea: 0.9,
        background: false,
      });
    };
    reader.readAsDataURL(file);
  }

  function obtenerImagenRecortadaBase64(maxWidth = 900) {
    return new Promise((resolve) => {
      if (uploadedMediaType === 'video') {
        resolve(uploadedMediaBase64);
        return;
      }

      if (!cropperInstance) { 
        resolve(null); 
        return; 
      }

      try {
        const canvas = cropperInstance.getCroppedCanvas({
          maxWidth: maxWidth,
          imageSmoothingQuality: 'medium',
        });

        if (!canvas) { 
          resolve(null); 
          return; 
        }
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } catch (err) {
        console.warn("Error al recortar imagen:", err);
        resolve(null);
      }
    });
  }

  function limpiarCropper() {
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }
    uploadedMediaBase64 = null;
    uploadedMediaType = 'image';
    if (cropContainer) cropContainer.classList.add('hidden');
    if (cropImagePreview) cropImagePreview.src = '';
    if (editBannerFileInput) editBannerFileInput.value = '';
    if (editAboutBannerFileInput) editAboutBannerFileInput.value = '';
    if (editGalleryFileInput) editGalleryFileInput.value = '';
    if (editReviewFileInput) editReviewFileInput.value = '';
  }

  if (dashEditBtn) {
    dashEditBtn.addEventListener('click', () => {
      if (!currentUser || viewedUser.username !== currentUser.username) return;
      limpiarCropper();

      if (editFieldsBlog) editFieldsBlog.classList.add('hidden');
      if (editFieldsSobreMi) editFieldsSobreMi.classList.add('hidden');
      if (editFieldsGaleria) editFieldsGaleria.classList.add('hidden');
      if (editFieldsReviews) editFieldsReviews.classList.add('hidden');
      if (editFieldsBitacora) editFieldsBitacora.classList.add('hidden');

      if (seccionActualActiva === 'sobre-mi') {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Sección 'Sobre Mí'";
        if (editFieldsSobreMi) editFieldsSobreMi.classList.remove('hidden');
        if (editAboutBioInput) editAboutBioInput.value = currentUser.about_bio || "";
        if (editAboutFavoritesInput) editAboutFavoritesInput.value = (currentUser.about_favorites || []).join('\n');
        if (editAboutLinksInput) editAboutLinksInput.value = (currentUser.about_links || []).join('\n');
      } else if (seccionActualActiva === 'galeria') {
        if (modalEditTitle) modalEditTitle.textContent = "Añadir Foto o Video a la Galería";
        if (editFieldsGaleria) editFieldsGaleria.classList.remove('hidden');
        if (editGalleryPhotoTitle) editGalleryPhotoTitle.value = "";
        if (editGalleryPhotoStory) editGalleryPhotoStory.value = "";
      } else if (seccionActualActiva === 'reviews') {
        if (modalEditTitle) modalEditTitle.textContent = "Añadir Reseña (Película o Libro)";
        if (editFieldsReviews) editFieldsReviews.classList.remove('hidden');
        if (editReviewTitle) editReviewTitle.value = "";
        if (editReviewSub) editReviewSub.value = "";
        if (editReviewSinopsis) editReviewSinopsis.value = "";
        if (editReviewOpinion) editReviewOpinion.value = "";
      } else if (seccionActualActiva === 'bitacora') {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Bitácora & Moodboard";
        if (editFieldsBitacora) editFieldsBitacora.classList.remove('hidden');
        
        const currentMdata = currentUser.moodboard_data || { frase: "", paleta: [], imagenes: [] };
        if (editMoodboardQuoteInput) editMoodboardQuoteInput.value = currentMdata.frase || "";
        if (editMoodboardColorsInput) editMoodboardColorsInput.value = currentMdata.paleta ? currentMdata.paleta.join(', ') : "#743014, #84592B, #9D9167, #E8D1A7";
        
        if (editBitacoraPostTitleInput) editBitacoraPostTitleInput.value = "";
        if (editBitacoraPostContentInput) editBitacoraPostContentInput.value = "";
      } else {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Mi Espacio (Inicio)";
        if (editFieldsBlog) editFieldsBlog.classList.remove('hidden');
        if (editHeaderTitleInput) editHeaderTitleInput.value = currentUser.header_title || "HELLO";
        if (editBioInput) editBioInput.value = currentUser.bio || "";
        if (editTagsInput) editTagsInput.value = currentUser.tags ? currentUser.tags.join(', ') : '';
        if (editSpotifyUrlInput) editSpotifyUrlInput.value = currentUser.spotify_url || "";
      }
      if (editModal) editModal.classList.remove('hidden');
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      limpiarCropper();
      if (editModal) editModal.classList.add('hidden');
    });
  }

  if (editBannerFileInput) {
    editBannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) inicializarCropper(file, 16 / 7);
    });
  }

  if (editAboutBannerFileInput) {
    editAboutBannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) inicializarCropper(file, 16 / 6);
    });
  }

  if (editGalleryFileInput) {
    editGalleryFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) inicializarCropper(file, NaN);
    });
  }

  if (editReviewFileInput) {
    editReviewFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) inicializarCropper(file, 3 / 4);
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentUser || viewedUser.username !== currentUser.username) return;
      
      let payload = {};
      let updateItem = null;

      let croppedBase64 = await obtenerImagenRecortadaBase64();

      try {
        if (seccionActualActiva === 'sobre-mi') {
          const nuevaAboutBio = editAboutBioInput ? editAboutBioInput.value.trim() : "";
          const favsArray = (editAboutFavoritesInput && editAboutFavoritesInput.value.trim()) 
            ? editAboutFavoritesInput.value.split('\n').map(f => f.trim()).filter(f => f) : [];
          const linksArray = (editAboutLinksInput && editAboutLinksInput.value.trim()) 
            ? editAboutLinksInput.value.split('\n').map(l => l.trim()).filter(l => l) : [];

          payload.about_bio = nuevaAboutBio;
          payload.about_favorites = favsArray;
          payload.about_links = linksArray;

          if (croppedBase64) {
            payload.about_banner_url = croppedBase64;
            currentUser.about_banner_url = croppedBase64;
          }

          currentUser.about_bio = nuevaAboutBio;
          currentUser.about_favorites = favsArray;
          currentUser.about_links = linksArray;

        } else if (seccionActualActiva === 'galeria') {
          const photoTitle = (editGalleryPhotoTitle && editGalleryPhotoTitle.value.trim()) || "Nuevo recuerdo";
          const photoStory = (editGalleryPhotoStory && editGalleryPhotoStory.value.trim()) || "Recuerdo especial";
          const mediaUrl = croppedBase64;

          if (!mediaUrl) {
            showModal('Archivo requerido', 'Por favor selecciona una foto o video para subir.');
            return;
          }

          photosStoriesList.push({ 
            url: mediaUrl, 
            title: photoTitle, 
            story: photoStory, 
            type: uploadedMediaType, 
            date: new Date().toISOString() 
          });

          currentUser.photos_stories = photosStoriesList;
          payload.photos_stories = photosStoriesList;
          currentPhotoSlideIndex = photosStoriesList.length - 1;
          renderPhotosSlideshow(true);
          renderLocketCalendar();
          
          updateItem = { title: photoTitle, type: 'galeria', photoUrl: mediaUrl, date: new Date().toISOString() };

        } else if (seccionActualActiva === 'reviews') {
          const revTitle = (editReviewTitle && editReviewTitle.value.trim()) || "Nueva Reseña";
          const revSub = editReviewSub ? editReviewSub.value.trim() : "";
          const revSinopsis = editReviewSinopsis ? editReviewSinopsis.value.trim() : "";
          const revOpinion = editReviewOpinion ? editReviewOpinion.value.trim() : "";
          const imgUrl = croppedBase64;

          if (!imgUrl) {
            showModal('Poster requerido', 'Por favor selecciona la foto del poster o portada.');
            return;
          }

          reviewsList.unshift({ url: imgUrl, title: revTitle, sub: revSub, sinopsis: revSinopsis, opinion: revOpinion, date: new Date().toISOString() });
          currentUser.reviews_list = reviewsList;
          payload.reviews_list = reviewsList;
          poblarFiltroMesesReseñas();
          renderReviewsGrid(true);

          updateItem = { title: `Reseña: ${revTitle}`, type: 'reviews', date: new Date().toISOString() };

        } else if (seccionActualActiva === 'bitacora') {
          const quoteVal = editMoodboardQuoteInput ? editMoodboardQuoteInput.value.trim() : "";
          const colorsValStr = editMoodboardColorsInput ? editMoodboardColorsInput.value.trim() : "";
          const postTitle = editBitacoraPostTitleInput ? editBitacoraPostTitleInput.value.trim() : "";
          const postContent = editBitacoraPostContentInput ? editBitacoraPostContentInput.value.trim() : "";

          const colorsArr = colorsValStr ? colorsValStr.split(',').map(c => c.trim()) : [];

          const newMoodboardData = {
            frase: quoteVal,
            paleta: colorsArr,
            imagenes: currentUser.moodboard_data?.imagenes || []
          };

          currentUser.moodboard_data = newMoodboardData;
          payload.moodboard_data = newMoodboardData;

          if (postTitle && postContent) {
            if (!Array.isArray(bitacoraEntriesList)) {
              bitacoraEntriesList = [];
            }

            const nuevaEntrada = {
              title: postTitle,
              content: postContent,
              date: new Date().toISOString()
            };

            bitacoraEntriesList.unshift(nuevaEntrada);
            currentUser.bitacora_posts = bitacoraEntriesList;
            payload.bitacora_posts = bitacoraEntriesList;

            updateItem = { title: `Nota: ${postTitle}`, type: 'bitacora', date: new Date().toISOString() };
          }

          renderBitacoraSection(true);

        } else {
          const nuevoTitulo = (editHeaderTitleInput && editHeaderTitleInput.value.trim()) || "HELLO";
          const nuevaBio = editBioInput ? editBioInput.value.trim() : "";
          const nuevasTagsStr = editTagsInput ? editTagsInput.value.trim() : "";
          const nuevoSpotifyUrl = editSpotifyUrlInput ? editSpotifyUrlInput.value.trim() : "";
          const tagsArray = nuevasTagsStr ? nuevasTagsStr.split(',').map(t => t.trim()) : [];

          payload = { header_title: nuevoTitulo, bio: nuevaBio, tags: tagsArray, spotify_url: nuevoSpotifyUrl };

          if (croppedBase64) {
            payload.banner_url = croppedBase64;
            currentUser.banner_url = croppedBase64;
          }

          currentUser.header_title = nuevoTitulo;
          currentUser.bio = nuevaBio;
          currentUser.tags = tagsArray;
          currentUser.spotify_url = nuevoSpotifyUrl;
        }

        if (updateItem) {
          if (!Array.isArray(updatesHistoryList)) {
            updatesHistoryList = [];
          }
          updatesHistoryList.unshift(updateItem);
          if (updatesHistoryList.length > 5) updatesHistoryList.pop();
          currentUser.updates_history = updatesHistoryList;
          payload.updates_history = updatesHistoryList;
          renderUpdatesList();
        }

        viewedUser = currentUser;

        if (supabase) {
          const { error } = await supabase.from('espacios').update(payload).eq('username', currentUser.username);
          if (error) {
            console.error("Error al actualizar en Supabase:", error);
            showModal('Error', 'No se pudieron guardar algunos cambios en Supabase.');
          }
        }

        renderDashboard();
        limpiarCropper();
        if (editModal) editModal.classList.add('hidden');
        showModal('¡Actualizado!', 'Los cambios se han guardado con éxito.');

      } catch (err) {
        console.error("Error durante el guardado:", err);
        limpiarCropper();
        if (editModal) editModal.classList.add('hidden');
        showModal('Aviso', 'Se guardaron los cambios locales.');
      }
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
        // 1. Validar primero si el usuario ya existe en la tabla antes de tocar Auth
        const { data: existeUser } = await supabase.from('espacios').select('username').eq('username', username).maybeSingle();
        if (existeUser) {
          showModal('Usuario no disponible', 'Ese nombre de usuario ya está ocupado. Por favor elige otro.');
          return;
        }

        // 2. Validar si el correo ya existe en la tabla de espacios antes de hacer signUp
        const { data: existeEmail } = await supabase.from('espacios').select('email').eq('email', email).maybeSingle();
        if (existeEmail) {
          showModal('Correo registrado', 'Este correo ya tiene una cuenta activa en Loop. Intenta iniciar sesión.');
          return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) { 
          showModal('Error de autenticación', authError.message);
          return; 
        }

        const userId = authData.user ? authData.user.id : null;
        
        if (userId) {
          // 3. Inserción estricta respetando solo las columnas existentes de tu tabla
          const { error: dbError } = await supabase.from('espacios').insert([{ 
            id: userId, 
            username, 
            email, 
            tags: tagsArray,
            spotify_url: '', 
            photos_stories: [], 
            updates_history: [],
            reviews_list: [],
            bitacora_posts: [],
            guestbook_entries: [],
            moodboard_data: { frase: "", paleta: ["#743014", "#84592B", "#9D9167", "#E8D1A7"], imagenes: [] }
          }]);

          if (dbError) { 
            showModal('Error en el servidor', dbError.message); 
            return; 
          }
        }
      }

      currentUser = { 
        username, 
        email, 
        tags: tagsArray, 
        site_theme: 'theme-default',
        header_title: 'HELLO', 
        bio: '', 
        banner_url: '', 
        spotify_url: '', 
        photos_stories: [], 
        updates_history: [], 
        reviews_list: [], 
        bitacora_posts: [], 
        guestbook_entries: [],
        moodboard_data: { frase: "", paleta: ["#743014", "#84592B", "#9D9167", "#E8D1A7"], imagenes: [] } 
      };
      viewedUser = currentUser;
      
      if (guestNavLinks) guestNavLinks.classList.add('hidden');
      if (loggedTopBarOptions) loggedTopBarOptions.classList.remove('hidden');

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
        currentUser = { username: usernameInput, email: `${usernameInput}@loop.org`, tags: ['creatividad'], site_theme: 'theme-default', spotify_url: '', photos_stories: [], updates_history: [], reviews_list: [], bitacora_posts: [], guestbook_entries: [], moodboard_data: { frase: "", paleta: [], imagenes: [] } };
      }
      
      viewedUser = currentUser;

      if (guestNavLinks) guestNavLinks.classList.add('hidden');
      if (loggedTopBarOptions) loggedTopBarOptions.classList.remove('hidden');

      showModal('¡Bienvenido de nuevo!', `Lo que estás a punto de probar es solo un prototipo, se está preparando la versión final, espero les guste.\n\nAccediendo a: ${currentUser.username}.loop.org...`, () => { switchView('dashboard'); });
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabase) await supabase.auth.signOut();
      currentUser = null;
      viewedUser = null;

      if (guestNavLinks) guestNavLinks.classList.remove('hidden');
      if (loggedTopBarOptions) loggedTopBarOptions.classList.add('hidden');

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
          viewedUser = perfil;
          if (guestNavLinks) guestNavLinks.classList.add('hidden');
          if (loggedTopBarOptions) loggedTopBarOptions.classList.remove('hidden');
          switchView('dashboard');
          return;
        }
      }
    }
    if (guestNavLinks) guestNavLinks.classList.remove('hidden');
    if (loggedTopBarOptions) loggedTopBarOptions.classList.add('hidden');
    switchView('landing');
  }

  verificarSesionActiva();
});