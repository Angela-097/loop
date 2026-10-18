document.addEventListener('DOMContentLoaded', () => {
  // Configuración de Supabase (Reemplaza con tus llaves reales)
  const SUPABASE_URL = 'https://dcdvscthslbszetogkuv.supabase.co'; // Reemplaza con tu URL
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZHZzY3Roc2xic3pldG9na3V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyOTU2NDIsImV4cCI6MjEwNzg3MTY0Mn0.vmTxZqdm6_FuD_g8EKAVvbvaKkROMlRPXdcc9O7HYko';        // Reemplaza con tu anon key
 
  
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

  // Formulario y Modal
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const customModal = document.getElementById('customModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const forgotPassLink = document.getElementById('forgotPassLink');

  // Elementos del Dashboard
  const dashUsernameText = document.getElementById('dashUsernameText');
  const dashUrlText = document.getElementById('dashUrlText');
  const dashTagsContainer = document.getElementById('dashTagsContainer');
  const dashEditBtn = document.getElementById('dashEditBtn');

  let currentUser = null;

  // FUNCIÓN PRINCIPAL DE CAMBIO DE PANTALLA
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

  // Asignar eventos de clic de forma segura
  if (goToSignupLink) {
    goToSignupLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('signup');
    });
  }

  if (goToLoginLink) {
    goToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('login');
    });
  }

  if (navSignupBtn) {
    navSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('signup');
    });
  }

  if (navLoginBtn) {
    navLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('login');
    });
  }

  if (brandNav) {
    brandNav.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentUser) switchView('dashboard');
      else switchView('login');
    });
  }

  // Actualizar la barra superior
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

  function renderDashboard() {
    if (!currentUser) return;
    if (dashUsernameText) dashUsernameText.textContent = `¡Hola, ${currentUser.username}!`;
    if (dashUrlText) dashUrlText.textContent = `${currentUser.username}.loop.org`;

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
    const regex = /^[a-z0-9\-]{3,30}$/;
    return regex.test(username);
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

  if (dashEditBtn) {
    dashEditBtn.addEventListener('click', () => {
      showModal('Editor de Espacio', 'Próximamente podrás editar tus plantillas desde aquí.');
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
          .insert([{ id: userId, username, email, tags: tagsArray }]);

        if (dbError) {
          showModal('Error en el servidor', 'El nombre de usuario o correo ya existe.');
          return;
        }
      }

      currentUser = { username, email, tags: tagsArray };
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
          .select('email, username, tags')
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

        currentUser = { username: perfil.username, email: perfil.email, tags: perfil.tags };
      } else {
        currentUser = { username: usernameInput, email: `${usernameInput}@loop.org`, tags: ['creatividad'] };
      }

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

  // Verificar sesión persistente
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