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

  // Elementos editables del espacio (Banner, Frase Ahora, Spotify)
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const editBannerFileInput = document.getElementById('editBannerFile');
  const editHeaderTitleInput = document.getElementById('editHeaderTitle');
  const editBioInput = document.getElementById('editBio');
  const editTagsInput = document.getElementById('editTags');
  const editSpotifyUrlInput = document.getElementById('editSpotifyUrl');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  const bannerImg = document.getElementById('bannerImg');
  const nowStatusText = document.getElementById('nowStatusText');
  const spotifyWidgetFrame = document.getElementById('spotifyWidgetFrame');

  let currentUser = null;
  let tempBannerBase64 = null;

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
      if (seccionesInfo[claveSeccion] && seccionTitulo && seccionSubtitulo) {
        seccionTitulo.textContent = currentUser?.headerTitle || seccionesInfo[claveSeccion].titulo;
        seccionSubtitulo.textContent = seccionesInfo[claveSeccion].subtitulo;
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

  // Función para transformar y actualizar el reproductor de Spotify
  function actualizarReproductorSpotify(url) {
    if (!spotifyWidgetFrame) return;

    let embedUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"; // Default

    if (url && url.includes("spotify.com/")) {
      let cleanUrl = url.split("?")[0];
      let parts = cleanUrl.split("/");
      let type = parts[parts.length - 2]; // playlist, album, track
      let id = parts[parts.length - 1];

      if (id && (type === "playlist" || type === "album" || type === "track")) {
        embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
      }
    }

    spotifyWidgetFrame.src = embedUrl;
  }

  // Renderizar datos del usuario actual en el dashboard
  function renderDashboard() {
    if (!currentUser) return;
    
    if (dashUsernameText) dashUsernameText.textContent = currentUser.username;
    if (dashUrlText) dashUrlText.textContent = `${currentUser.username}.loop.org`;

    // Título de cabecera personalizado
    if (seccionTitulo) {
      seccionTitulo.textContent = currentUser.header_title || currentUser.headerTitle || "¡HOLA!";
    }

    // Frase del apartado "Ahora"
    if (nowStatusText) {
      const bioText = currentUser.bio || "Explorando nuevas ideas de diseño y construyendo este espacio.";
      nowStatusText.textContent = `"${bioText}"`;
    }

    // Imagen del Banner
    if (bannerImg) {
      if (currentUser.banner_url || currentUser.bannerUrl) {
        bannerImg.src = currentUser.banner_url || currentUser.bannerUrl;
      } else {
        bannerImg.src = "https://picsum.photos/800/350";
      }
    }

    // Actualizar Reproductor de Spotify con la URL del usuario
    actualizarReproductorSpotify(currentUser.spotify_url);

    // Etiquetas dinámicas
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

  // Modal de edición de espacio
  if (dashEditBtn) {
    dashEditBtn.addEventListener('click', () => {
      if (!currentUser) return;
      if (editHeaderTitleInput) editHeaderTitleInput.value = currentUser.header_title || currentUser.headerTitle || "¡HOLA!";
      if (editBioInput) editBioInput.value = currentUser.bio || "";
      if (editTagsInput) editTagsInput.value = currentUser.tags ? currentUser.tags.join(', ') : '';
      if (editSpotifyUrlInput) editSpotifyUrlInput.value = currentUser.spotify_url || "";
      
      tempBannerBase64 = null;
      if (editModal) editModal.classList.remove('hidden');
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      if (editModal) editModal.classList.add('hidden');
    });
  }

  // Convertir imagen de galería a Base64
  if (editBannerFileInput) {
    editBannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          tempBannerBase64 = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Guardar cambios de edición
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nuevoTitulo = editHeaderTitleInput.value.trim() || "¡HOLA!";
      const nuevaBio = editBioInput.value.trim();
      const nuevasTagsStr = editTagsInput.value.trim();
      const nuevoSpotifyUrl = editSpotifyUrlInput ? editSpotifyUrlInput.value.trim() : "";
      const tagsArray = nuevasTagsStr ? nuevasTagsStr.split(',').map(t => t.trim()) : [];

      const payload = {
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

      // Actualizar en Supabase
      if (supabase && currentUser) {
        const { error } = await supabase
          .from('espacios')
          .update(payload)
          .eq('username', currentUser.username);

        if (error) {
          showModal('Error', 'No se pudieron guardar los cambios en el servidor.');
          return;
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