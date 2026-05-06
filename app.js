// ============================================
// CAFÉ AROMA - JAVASCRIPT PRINCIPAL
// Validaciones y funcionalidades interactivas
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SMOOTH SCROLL PARA NAVEGACIÓN
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo aplicar smooth scroll si el enlace apunta a un ancla
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // BOTÓN "LEER MÁS" EN SECCIÓN PRODUCTOS
    // ============================================
    const leerMasBtn = document.getElementById('leer-mas-btn');
    const extraText = document.getElementById('extra-text');
    
    if (leerMasBtn && extraText) {
        leerMasBtn.addEventListener('click', function() {
            if (extraText.style.display === 'none') {
                // Mostrar texto extra
                extraText.style.display = 'block';
                leerMasBtn.textContent = 'Leer menos';
                
                // Animación suave
                extraText.style.opacity = '0';
                setTimeout(() => {
                    extraText.style.transition = 'opacity 0.5s ease';
                    extraText.style.opacity = '1';
                }, 10);
            } else {
                // Ocultar texto extra
                extraText.style.opacity = '0';
                setTimeout(() => {
                    extraText.style.display = 'none';
                    leerMasBtn.textContent = 'Leer más...';
                }, 500);
            }
        });
    }

    // ============================================
    // VALIDACIÓN DEL FORMULARIO DE RESERVAS
    // ============================================
    const form = document.getElementById('reservas-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar mensajes de error previos
            clearErrors();
            
            // Validar todos los campos
            let isValid = true;
            
            // 1. Validar Nombres Completos
            const nombre = document.getElementById('nombre');
            if (!validarNombre(nombre.value)) {
                mostrarError('nombre-error', 'Por favor ingrese un nombre válido (mínimo 3 caracteres, solo letras)');
                isValid = false;
            }
            
            // 2. Validar Sede
            const sede = document.getElementById('sede');
            if (!validarSede(sede.value)) {
                mostrarError('sede-error', 'Por favor seleccione su sede');
                isValid = false;
            }
            
            // 3. Validar Especialidad
            const especialidad = document.querySelectorAll('input[name="especialidad"]:checked');
            if (!validarEspecialidad(especialidad)) {
                mostrarError('especialidad-error', 'Seleccione al menos una especialidad');
                isValid = false;
            }
            
            // 4. Validar Tipo de Especialidad
            const tipoEspecialidad = document.querySelector('input[name="tipo-especialidad"]:checked');

            if (!validarTipoEspecialidad(tipoEspecialidad)) {
                mostrarError('tipo-especialidad-error', 'Seleccione el tipo de especialidad');
                isValid = false;
            }
            
            // Si todo es válido, enviar formulario
            if (isValid) {
                enviarFormulario();
            }
        });
        
        // Validación en tiempo real (opcional)
        document.getElementById('nombre').addEventListener('blur', function() {
            if (this.value && !validarNombre(this.value)) {
                mostrarError('nombre-error', 'Nombre inválido');
            } else {
                clearError('nombre-error');
            }
        });
        
        document.getElementById('sede').addEventListener('change', function() {
            if (this.value) {
                clearError('sede-error');
            }
        });
    }
    
    // ============================================
    // FUNCIONES DE VALIDACIÓN
    // ============================================
    
    /**
     * Valida el campo de nombre
     * Requisitos: No vacío, mínimo 3 caracteres, solo letras y espacios
     */
    function validarNombre(nombre) {
        // Eliminar espacios en blanco al inicio y final
        nombre = nombre.trim();
        
        // Verificar longitud mínima
        if (nombre.length < 3) {
            return false;
        }
        
        // Verificar que solo contenga letras y espacios (incluyendo acentos y ñ)
        const regex = /^[a-záéíóúñÁÉÍÓÚÑ\s]+$/i;
        return regex.test(nombre);
    }
    
    /**
     * Valida que se haya seleccionado una sede
     */
    function validarSede(sede) {
        return sede !== '' && sede !== null;
    }
    
    /**
     * Valida que se haya seleccionado al menos una especialidad
     */
    function validarEspecialidad(especialidad) {
        return especialidad.length > 0;
    }
    
    /**
     * Valida que se haya seleccionado un tipo de especialidad
     */
    function validarTipoEspecialidad(tipoEspecialidad) {
        return tipoEspecialidad !== null;
    }
    
    // ============================================
    // FUNCIONES DE MANEJO DE ERRORES
    // ============================================
    
    /**
     * Muestra un mensaje de error
     */
    function mostrarError(errorId, mensaje) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
            
            // Agregar clase de error al input correspondiente
            const inputId = errorId.replace('-error', '');
            const input = document.getElementById(inputId);
            if (input) {
                input.style.borderColor = '#FF6B6B';
            }
        }
    }
    
    /**
     * Limpia un mensaje de error específico
     */
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            
            // Quitar clase de error del input correspondiente
            const inputId = errorId.replace('-error', '');
            const input = document.getElementById(inputId);
            if (input) {
                input.style.borderColor = '#FF6B6B'; // Color original
            }
        }
    }
    
    /**
     * Limpia todos los mensajes de error
     */
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        // Restaurar bordes de inputs
        const inputs = form.querySelectorAll('.form-input, .form-select');
        inputs.forEach(input => {
            input.style.borderColor = '#FF6B6B';
        });
    }
    
    // ============================================
    // FUNCIÓN DE ENVÍO DEL FORMULARIO
    // ============================================
    
    /**
     * Procesa el envío del formulario
     */
    function enviarFormulario() {
        // Recopilar datos del formulario
        const nombre = document.getElementById('nombre').value;
        const sede = document.getElementById('sede').value;
        const especialidad = Array.from(document.querySelectorAll('input[name="especialidad"]:checked'))
            .map(checkbox => checkbox.value);
        const tipoEspecialidad = document.querySelector('input[name="tipo-especialidad"]:checked').value;
        
        // Mostrar mensaje de éxito
        alert('¡Reserva enviada exitosamente! 🎉\n\nNos comunicaremos contigo pronto.\n\nDatos recibidos:\n' +
              `• Nombre: ${nombre}\n` +
              `• Sede: ${sede}\n` +
              `• Especialidad: ${especialidad.join(', ')}\n` +
              `• Tipo de especialidad: ${tipoEspecialidad}`);
        
        // Limpiar formulario
        form.reset();
        
        // Scroll suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // En una aplicación real, aquí enviarías los datos a un servidor
        // Por ejemplo:
        // fetch('/api/reservas', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ nombre, pais, preferencias, tipoReserva })
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
    }
    
    // ============================================
    // ANIMACIONES AL HACER SCROLL
    // ============================================
    
    /**
     * Observador de intersección para animaciones
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animaciones a las secciones
    const sections = document.querySelectorAll('.section-menu, .section-productos, .section-reservas');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(1.875rem)'; /* 30px */
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // ============================================
    // EFECTO PARALLAX EN HERO (OPCIONAL)
    // ============================================
    
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // ============================================
    // MENSAJE DE BIENVENIDA EN CONSOLA
    // ============================================
    
    console.log('%c¡Bienvenido a Café Aroma! ☕', 
                'font-size: 20px; color: #FF8C42; font-weight: bold;');
    console.log('%cDesarrollado con ❤️ para IHC - UPC', 
                'font-size: 14px; color: #2C3E50;');
    
// ============================================
// CHATBOT MEDGRAPH
// ============================================

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotBox = document.getElementById('chatbot-box');
const chatbotBody = document.getElementById('chatbot-body');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');

if (chatbotToggle && chatbotBox) {
    chatbotToggle.addEventListener('click', function() {
        if (chatbotBox.style.display === 'block') {
            chatbotBox.style.display = 'none';
        } else {
            chatbotBox.style.display = 'block';
        }
    });
}

if (sendChat && chatInput && chatbotBody) {
    sendChat.addEventListener('click', function() {
        const userMessage = chatInput.value.toLowerCase().trim();

        if (userMessage === '') return;

        let response = '';

        if (userMessage.includes('consulta')) {
            response = 'Tu próxima consulta puede visualizarse desde el panel de seguimiento clínico.';
        } else if (userMessage.includes('diagnostico') || userMessage.includes('diagnóstico')) {
            response = 'MedGraph permite visualizar diagnósticos de manera clara y comprensible para médicos y pacientes.';
        } else if (userMessage.includes('resultado')) {
            response = 'Puedes revisar resultados clínicos y evolución médica en tiempo real desde la plataforma.';
        } else if (userMessage.includes('avance') || userMessage.includes('progreso')) {
            response = 'MedGraph ayuda a monitorear avances del paciente y detectar si el progreso no es óptimo.';
        } else if (userMessage.includes('alerta')) {
            response = 'La plataforma puede mostrar alertas cuando detecta riesgos o cambios importantes en la evolución del paciente.';
        } else if (userMessage.includes('beta')) {
            response = 'La versión beta permite probar funciones básicas de MedGraph Analytics.';
        } else if (userMessage.includes('demo')) {
            response = 'Puedes explorar la demo para conocer visualmente cómo funciona MedGraph Analytics.';
        } else {
            response = 'Lo siento, aún estoy aprendiendo. Prueba escribiendo: consulta, diagnóstico, resultados, avances, alertas, demo o beta.';
        }

        const userBubble = document.createElement('div');
        userBubble.classList.add('bot-message');
        userBubble.style.backgroundColor = '#2563EB';
        userBubble.style.color = 'white';
        userBubble.textContent = userMessage;
        chatbotBody.appendChild(userBubble);

        const botReply = document.createElement('div');
        botReply.classList.add('bot-message');
        botReply.textContent = response;
        chatbotBody.appendChild(botReply);

        chatbotBody.scrollTop = chatbotBody.scrollHeight;
        chatInput.value = '';
    });
}

});
// ============================================
// PREVENIR ENVÍO ACCIDENTAL DEL FORMULARIO
// ============================================

// Prevenir que Enter envíe el formulario en campos de texto
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type === 'text') {
        e.preventDefault();
    }
});

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================

window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.message);
    // En producción, aquí podrías enviar el error a un servicio de logging
});