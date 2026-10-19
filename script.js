document.addEventListener('DOMContentLoaded', () => {
  // Configuración de Supabase
  const SUPABASE_URL = 'https://dcdvscthslbszetogkuv.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZHZzY3Roc2xic3pldG9na3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyOTU2NDIsImV4cCI6MjEwNzg3MTY0Mn0.vmTxZqdm6_FuD_g8EKAVvbvaKkROMlRPXdcc9O7HYko';
 
  let supabase = null;
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // Vistas principales
  const loginView = document.getElementById('loginView');
  const signupView = document.getElementById('signupView');
  const dashboardView = document.getElementById('dashboardView');

  // Enlaces y Botones de Navegación
  const goToSignupLink = document.getElementById('goToSignupLink');
  const goToLoginLink = document.getElementById('goToLoginLink');
  const navSignupBtn = document.getElementById('navSignupBtn');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const brandNav = document.getElementById('brandNav');
  const logoutBtn = document.getElementById('logoutBtn');
  const navGuestLinks = document.getElementById('navGuestLinks');
  const navGuestLogin = document.getElementById('navGuestLogin');
  const navUserLogout = document.getElementById('navUserLogout');

  // Formulario y Modal de Alertas
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const customModal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const forgotPassLink = document.getElementById('forgotPassLink');

  // Elementos del Dashboard / Bitácora
  const dashUsernameText = document.getElementById('dashUsernameText');
  const dashUrlText = document.getElementById('dashUrlText');
  const dashTagsContainer = document.getElementById('dashTagsContainer');
  const dashEditBtn = document.getElementById('dashEditBtn');
  
  // Elementos de las secciones dinámicas
  const seccionTitulo = document.getElementById('seccion-titulo');
  const seccionSubtitulo = document.getElementById('seccion-subtitulo');
  const botonesPill = document.querySelectorAll('.pill-btn');
  const tabBlog = document.getElementById('tab-blog');
  const tabSobreMi = document.getElementById('tab-sobre-mi');
  const headerSpotifyCard = document.getElementById('headerSpotifyCard');

  // Elementos editables del espacio
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const modalEditTitle = document.getElementById('modalEditTitle');
  
  // Campos del modal Blog
  const editBannerFileInput = document.getElementById('editBannerFile');
  const editHeaderTitleInput = document.getElementById('editHeaderTitle');
  const editBioInput = document.getElementById('editBio');
  const editTagsInput = document.getElementById('editTags');
  const editSpotifyUrlInput = document.getElementById('editSpotifyUrl');
  const editFieldsBlog = document.querySelector('.edit-fields-blog');

  // Campos del modal Sobre Mí
  const editAboutBannerFileInput = document.getElementById('editAboutBannerFile');
  const editAboutBioInput = document.getElementById('editAboutBio');
  const editAboutFavoritesInput = document.getElementById('editAboutFavorites');
  const editAboutLinksInput = document.getElementById('editAboutLinks');
  const editFieldsSobreMi = document.querySelector('.edit-fields-sobremi');

  const cancelEditBtn = document.getElementById('cancelEditBtn');

  const bannerImg = document.getElementById('bannerImg');
  const aboutBannerImg = document.getElementById('aboutBannerImg');
  const nowStatusText = document.getElementById('nowStatusText');
  const aboutBioText = document.getElementById('aboutBioText');
  const aboutFavoritesList = document.getElementById('aboutFavoritesList');
  const aboutLinksList = document.getElementById('aboutLinksList');
  const spotifyWidgetFrame = document.getElementById('spotifyWidgetFrame');

  let currentUser = null;
  let tempBannerBase64 = null;
  let tempAboutBannerBase64 = null;
  let seccionActualActiva = 'blog';

  const seccionesInfo = {
    'blog': {
      titulo: 'Inicio / Blog',
      subtitulo: 'archivo cronológico // estado: activo'
    },
    'sobre-mi': {
      titulo: 'Sobre mí',
      subtitulo: 'perfil del autor // notas personales'
    },
    'galeria': {
      titulo: 'Galería',
      subtitulo: 'colección visual // fotografías y arte'
    },
    'visitas': {
      titulo: 'Libro de Visitas',
      subtitulo: 'mensajes de la comunidad // firmar'
    },
    'enlaces': {
      titulo: 'Enlaces',
      subtitulo: 'rincones recomendados de la web'
    }
  };

  // Manejo de pestañas del menú lateral
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

      if (claveSeccion === 'sobre-mi') {
        if (tabBlog) tabBlog.classList.add('hidden');
        if (tabSobreMi) tabSobreMi.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.add('hidden');
      } else {
        if (tabSobreMi) tabSobreMi.classList.add('hidden');
        if (tabBlog) tabBlog.classList.remove('hidden');
        if (headerSpotifyCard) headerSpotifyCard.classList.remove('hidden');
      }
    });
  });

  function switchView(viewName) {
    if (loginView) loginView.classList.add('hidden');
    if (signupView) signupView.classList.add('hidden');
    if (dashboardView) dashboardView.classList.add('hidden');

    if (viewName === 'signup' && signupView) {
      signupView.classList.remove('hidden');
    } else if (viewName === 'dashboard' && dashboardView) {
      dashboardView.classList.remove('hidden');
      renderDashboard();
    } else if (loginView) {
      loginView.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (goToSignupLink) goToSignupLink.addEventListener('click', (e) => { e.preventDefault(); switchView('signup'); });
  if (goToLoginLink) goToLoginLink.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });
  if (navSignupBtn) navSignupBtn.addEventListener('click', (e) => { e.preventDefault(); switchView('signup'); });
  if (navLoginBtn) navLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });
  
  if (brandNav) {
    brandNav.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentUser) switchView('dashboard');
      else switchView('login');
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
    
    // Recuperar respaldo local si existe
    const localData = localStorage.getItem(`sobre_mi_${currentUser.username}`);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        currentUser.about_bio = currentUser.about_bio || parsed.about_bio;
        currentUser.about_favorites = currentUser.about_favorites || parsed.about_favorites;
        currentUser.about_links = currentUser.about_links || parsed.about_links;
        currentUser.about_banner_url = currentUser.about_banner_url || parsed.about_banner_url;
      } catch(e) {}
    }

    if (dashUsernameText) dashUsernameText.textContent = currentUser.username;
    if (dashUrlText) dashUrlText.textContent = `${currentUser.username}.loop.org`;

    if (seccionTitulo) {
      seccionTitulo.textContent = currentUser.header_title || currentUser.headerTitle || "¡HOLA!";
    }

    if (nowStatusText) {
      const bioText = currentUser.bio || "Explorando nuevas ideas de diseño y construyendo este espacio.";
      nowStatusText.textContent = `"${bioText}"`;
    }

    if (bannerImg) {
      bannerImg.src = currentUser.banner_url || "https://picsum.photos/800/350";
    }

    if (aboutBannerImg) {
      aboutBannerImg.src = currentUser.about_banner_url || "https://picsum.photos/800/250";
    }

    if (aboutBioText) {
      aboutBioText.textContent = currentUser.about_bio || "¡Hola! Soy un creador digital navegando en la web...";
    }

    // Renderizar favoritos
    if (aboutFavoritesList) {
      aboutFavoritesList.innerHTML = '';
      const favs = currentUser.about_favorites || [
        "Momento del día: 10pm a medianoche",
        "Libro favorito: Indefenso Humano",
        "Género de cine: Terror & Suspenso",
        "Paleta de color: Café, Miel, Oliva, Beige"
      ];
      favs.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        if (parts.length > 1) {
          li.innerHTML = `<span class="star-icon">✶</span> <strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}`;
        } else {
          li.innerHTML = `<span class="star-icon">✶</span> ${item}`;
        }
        aboutFavoritesList.appendChild(li);
      });
    }

    // Renderizar enlaces de Encuéntrame en...
    if (aboutLinksList) {
      aboutLinksList.innerHTML = '';
      const links = currentUser.about_links || [
        "Perfil de Loop: https://loop.org",
        "GitHub / Código: https://github.com",
        "Galería de Arte: https://pinterest.com",
        "Spotify Playlist: https://spotify.com"
      ];
      
      links.forEach(item => {
        const li = document.createElement('li');
        const parts = item.split(':');
        if (parts.length > 1) {
          const name = parts[0].trim();
          const url = parts.slice(1).join(':').trim();
          li.innerHTML = `<span class="star-icon">✶</span> <a href="${url}" target="_blank" class="about-link">${name}</a>`;
        } else {
          li.innerHTML = `<span class="star-icon">✶</span> <a href="#" class="about-link">${item.trim()}</a>`;
        }
        aboutLinksList.appendChild(li);
      });
    }

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

  // Modal de edición dinámico
  if (dashEditBtn) {
    dashEditBtn.addEventListener('click', () => {
      if (!currentUser) return;
      tempBannerBase64 = null;
      tempAboutBannerBase64 = null;

      if (seccionActualActiva === 'sobre-mi') {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Sección 'Sobre Mí'";
        if (editFieldsBlog) editFieldsBlog.classList.add('hidden');
        if (editFieldsSobreMi) editFieldsSobreMi.classList.remove('hidden');

        if (editAboutBioInput) editAboutBioInput.value = currentUser.about_bio || "";
        if (editAboutFavoritesInput) {
          const favs = currentUser.about_favorites || [
            "Momento del día: 10pm a medianoche",
            "Libro favorito: Indefenso Humano",
            "Género de cine: Terror & Suspenso",
            "Paleta de color: Café, Miel, Oliva, Beige"
          ];
          editAboutFavoritesInput.value = favs.join('\n');
        }
        if (editAboutLinksInput) {
          const links = currentUser.about_links || [
            "Perfil de Loop: https://loop.org",
            "GitHub / Código: https://github.com",
            "Galería de Arte: https://pinterest.com",
            "Spotify Playlist: https://spotify.com"
          ];
          editAboutLinksInput.value = links.join('\n');
        }
      } else {
        if (modalEditTitle) modalEditTitle.textContent = "Personalizar Mi Espacio (Inicio)";
        if (editFieldsBlog) editFieldsBlog.classList.remove('hidden');
        if (editFieldsSobreMi) editFieldsSobreMi.classList.add('hidden');

        if (editHeaderTitleInput) editHeaderTitleInput.value = currentUser.header_title || "¡HOLA!";
        if (editBioInput) editBioInput.value = currentUser.bio || "";
        if (editTagsInput) editTagsInput.value = currentUser.tags ? currentUser.tags.join(', ') : '';
        if (editSpotifyUrlInput) editSpotifyUrlInput.value = currentUser.spotify_url || "";
      }
      
      if (editModal) editModal.classList.remove('hidden');
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      if (editModal) editModal.classList.add('hidden');
    });
  }

  // Conversiones a Base64 para imágenes
  if (editBannerFileInput) {
    editBannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => { tempBannerBase64 = event.target.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  if (editAboutBannerFileInput) {
    editAboutBannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => { tempAboutBannerBase64 = event.target.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  // Guardar cambios del formulario de edición
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let payload = {};

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

      } else {
        const nuevoTitulo = editHeaderTitleInput.value.trim() || "¡HOLA!";
        const nuevaBio = editBioInput.value.trim();
        const nuevasTagsStr = editTagsInput.value.trim();
        const nuevoSpotifyUrl = editSpotifyUrlInput ? editSpotifyUrlInput.value.trim() : "";
        const tagsArray = nuevasTagsStr ? nuevasTagsStr.split(',').map(t => t.trim()) : [];

        payload = {
          header_title: nuevoTitulo,
          bio: nuevaBio,
          tags: tagsArray,
          spotify_url: nuevoSpotifyUrl
        };

        if (tempBannerBase64) {
          payload.banner_url = tempBannerBase64;
          currentUser.banner_url = tempBannerBase64;
        }

        currentUser.header_title = nuevoTitulo;
        currentUser.bio = nuevaBio;
        currentUser.tags = tagsArray;
        currentUser.spotify_url = nuevoSpotifyUrl;
      }

      // Actualizar en Supabase (con respaldo local)
      if (supabase && currentUser) {
        const { error } = await supabase
          .from('espacios')
          .update(payload)
          .eq('username', currentUser.username);

        if (error) {
          console.warn('Advertencia al guardar en Supabase:', error);
          localStorage.setItem(`sobre_mi_${currentUser.username}`, JSON.stringify({
            about_bio: currentUser.about_bio,
            about_favorites: currentUser.about_favorites,
            about_links: currentUser.about_links,
            about_banner_url: currentUser.about_banner_url
          }));
        }
      }

      renderDashboard();
      if (editModal) editModal.classList.add('hidden');
      showModal('¡Actualizado!', 'Los cambios de tu espacio se han guardado con éxito.');
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

  function validarUsername(username) {
    return /^[a-z0-9\-]{3,30}$/.test(username);
  }

  function validarPassword(password) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  }

  if (forgotPassLink) {
    forgotPassLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = prompt('Ingresa tu correo registrado:');
      if (!email) return;

      if (supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) showModal('Error', error.message);
        else showModal('Correo enviado', 'Revisa tu correo para recuperar tu contraseña.');
      }
    });
  }

  // REGISTRO
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('regUsername').value.trim().toLowerCase();
      const tagsInput = document.getElementById('regTags').value.trim();
      const password = document.getElementById('regPassword').value;
      const email = document.getElementById('regEmail').value.trim();
      const captchaChecked = document.getElementById('captchaCheck').checked;

      if (!captchaChecked) {
        showModal('Verificación requerida', 'Por favor confirma que eres humano marcando la casilla.');
        return;
      }

      if (!validarUsername(username)) {
        showModal('Nombre inválido', 'El usuario debe ser en minúsculas, números y guiones (3-30 caracteres).');
        return;
      }

      if (!validarPassword(password)) {
        showModal('Contraseña débil', 'La contraseña debe tener al menos 8 caracteres con letras y números.');
        return;
      }

      const tagsArray = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['creatividad', 'loop'];

      if (supabase) {
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError) {
          showModal('Error de registro', authError.message);
          return;
        }

        const userId = authData.user.id;
        const { error: dbError } = await supabase
          .from('espacios')
          .insert([{ id: userId, username, email, tags: tagsArray, spotify_url: '' }]);

        if (dbError) {
          showModal('Error en el servidor', 'El nombre de usuario o correo ya existe.');
          return;
        }
      }

      currentUser = { username, email, tags: tagsArray, header_title: '¡HOLA!', bio: '', banner_url: '', spotify_url: '' };
      updateNavState();
      showModal('¡Espacio Creado!', `Felicidades, tu espacio "${username}.loop.org" está activo.`, () => {
        switchView('dashboard');
      });
    });
  }

  // INICIO DE SESIÓN
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('loginUsername').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      if (supabase) {
        const { data: perfil, error: perfilError } = await supabase
          .from('espacios')
          .select('*')
          .eq('username', usernameInput)
          .single();

        if (perfilError || !perfil) {
          showModal('Error de acceso', 'El usuario no existe en Loop.');
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: perfil.email,
          password: password
        });

        if (error) {
          showModal('Credenciales incorrectas', 'Contraseña no válida.');
          return;
        }

        currentUser = perfil;
      } else {
        currentUser = { username: usernameInput, email: `${usernameInput}@loop.org`, tags: ['creatividad'], spotify_url: '' };
      }

      updateNavState();
      showModal('¡Bienvenido!', `Accediendo a tu espacio ${currentUser.username}.loop.org...`, () => {
        switchView('dashboard');
      });
    });
  }

  // CERRAR SESIÓN
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (supabase) await supabase.auth.signOut();
      currentUser = null;
      updateNavState();
      showModal('Sesión Cerrada', 'Has salido de tu cuenta.', () => {
        switchView('login');
      });
    });
  }

  // Verificar sesión persistente al cargar
  async function verificarSesionActiva() {
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: perfil } = await supabase
          .from('espacios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (perfil) {
          currentUser = perfil;
          updateNavState();
          switchView('dashboard');
        }
      }
    }
  }

  verificarSesionActiva();
});