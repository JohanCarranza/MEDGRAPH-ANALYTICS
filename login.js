// ============================================
// CAFÉ AROMA - JAVASCRIPT DE LOGIN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ELEMENTOS DEL DOM
    // ============================================
    const loginForm = document.getElementById('login-form');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const recordarmeCheckbox = document.getElementById('recordarme');
    
    // ============================================
    // MOSTRAR/OCULTAR CONTRASEÑA
    // ============================================
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type');
            
            if (type === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.setAttribute('type', 'password');
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
    
    // ============================================
    // CARGAR DATOS GUARDADOS (SI EXISTE)
    // ============================================
    window.addEventListener('load', function() {
        const usuarioGuardado = localStorage.getItem('cafearoma_usuario');
        const recordarme = localStorage.getItem('cafearoma_recordarme');
        
        if (recordarme === 'true' && usuarioGuardado) {
            usuarioInput.value = usuarioGuardado;
            recordarmeCheckbox.checked = true;
        }
    });
    
    // ============================================
    // VALIDACIÓN DEL FORMULARIO
    // ============================================
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar errores previos
            clearErrors();
            
            let isValid = true;
            
            // 1. Validar usuario/email
            const usuario = usuarioInput.value.trim();
            if (!validarUsuario(usuario)) {
                mostrarError('usuario-error', 'Por favor ingrese un email válido');
                usuarioInput.classList.add('error');
                isValid = false;
            }
            
            // 2. Validar contraseña
            const password = passwordInput.value;
            if (!validarPassword(password)) {
                mostrarError('password-error', 'La contraseña debe tener al menos 6 caracteres');
                passwordInput.classList.add('error');
                isValid = false;
            }
            
            // Si todo es válido, procesar login
            if (isValid) {
                procesarLogin(usuario, password);
            }
        });
        
        // Validación en tiempo real
        usuarioInput.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError('usuario-error');
                this.classList.remove('error');
            }
        });
        
        passwordInput.addEventListener('input', function() {
            if (this.value) {
                clearError('password-error');
                this.classList.remove('error');
            }
        });
    }
    
    // ============================================
    // FUNCIONES DE VALIDACIÓN
    // ============================================
    
    /**
     * Valida formato de email
     */
    function validarUsuario(usuario) {
        // Verificar que no esté vacío
        if (!usuario || usuario.length === 0) {
            return false;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(usuario);
    }
    
    /**
     * Valida contraseña (mínimo 6 caracteres)
     */
    function validarPassword(password) {
        return password && password.length >= 6;
    }
    
    // ============================================
    // MANEJO DE ERRORES
    // ============================================
    
    function mostrarError(errorId, mensaje) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
        }
    }
    
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        // Quitar clase de error de inputs
        usuarioInput.classList.remove('error');
        passwordInput.classList.remove('error');
    }
    
    // ============================================
    // PROCESAMIENTO DEL LOGIN
    // ============================================
    
    function procesarLogin(usuario, password) {
        // Simular autenticación (en producción, esto sería una llamada a API)
        
        // Mostrar indicador de carga
        const submitBtn = loginForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        submitBtn.disabled = true;
        
        // Simular delay de red
        setTimeout(() => {
            // Guardar datos si "Recordarme" está marcado
            if (recordarmeCheckbox.checked) {
                localStorage.setItem('cafearoma_usuario', usuario);
                localStorage.setItem('cafearoma_recordarme', 'true');
            } else {
                localStorage.removeItem('cafearoma_usuario');
                localStorage.removeItem('cafearoma_recordarme');
            }
            
            // Guardar sesión (simulado)
            sessionStorage.setItem('cafearoma_logged_in', 'true');
            sessionStorage.setItem('cafearoma_user_email', usuario);
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito(usuario);
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html#reservas';
            }, 2000);
            
        }, 1500); // 1.5 segundos de delay simulado
    }
    
    function mostrarMensajeExito(usuario) {
        // Crear overlay de éxito
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        const successBox = document.createElement('div');
        successBox.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 400px;
            animation: slideIn 0.5s ease;
        `;
        
        successBox.innerHTML = `
            <div style="font-size: 4rem; color: #46C766; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="color: #2C3E50; margin-bottom: 1rem;">¡Login exitoso!</h2>
            <p style="color: #555; margin-bottom: 0.5rem;">Bienvenido de vuelta</p>
            <p style="color: #FF8C42; font-weight: bold;">${usuario}</p>
            <p style="color: #888; font-size: 0.9rem; margin-top: 1rem;">
                Redirigiendo a reservas...
            </p>
        `;
        
        overlay.appendChild(successBox);
        document.body.appendChild(overlay);
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // MANEJO DE ENLACES
    // ============================================
    
    // Enlace "¿Olvidaste tu contraseña?"
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de recuperación de contraseña.\n\nEn una aplicación real, aquí se enviaría un email de recuperación.');
        });
    }
    
    // Enlace "Regístrate aquí"
    const signupLinks = document.querySelectorAll('.link-highlight');
    signupLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Funcionalidad de registro.\n\nEn una aplicación real, aquí se abriría un formulario de registro.');
        });
    });
    
    // ============================================
    // EFECTOS VISUALES
    // ============================================
    
    // Efecto de focus en inputs
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // PREVENIR MÚLTIPLES ENVÍOS
    // ============================================
    let isSubmitting = false;
    
    loginForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        isSubmitting = true;
        
        // Resetear después de 5 segundos
        setTimeout(() => {
            isSubmitting = false;
        }, 5000);
    });
    
    // ============================================
    // MENSAJE EN CONSOLA
    // ============================================
    console.log('%cCafé Aroma - Sistema de Login', 
                'font-size: 18px; color: #FF8C42; font-weight: bold;');
    console.log('%cCredenciales de prueba:', 
                'font-size: 14px; color: #2C3E50;');
    console.log('Email: test@cafearoma.com');
    console.log('Contraseña: 123456');
    
});

// ============================================
// VERIFICAR SI YA ESTÁ LOGUEADO
// ============================================
window.addEventListener('load', function() {
    const isLoggedIn = sessionStorage.getItem('cafearoma_logged_in');
    
    if (isLoggedIn === 'true') {
        const userEmail = sessionStorage.getItem('cafearoma_user_email');
        
        // Mostrar opción de cerrar sesión
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.innerHTML = `
                <i class="fas fa-home"></i> Volver al inicio (${userEmail})
            `;
        }
    }
});
