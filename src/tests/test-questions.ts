/**
 * @fileoverview Set de 100 preguntas para pruebas exhaustivas del chatbot Laguito.
 * El objetivo es validar la robustez, precisión y el manejo de casos de borde.
 */

export const testQuestions = [
    // =========== 1. Directorio (25 preguntas) ===========
    // Búsqueda directa por área
    "¿Quién es el contacto de sistemas?",
    "Necesito hablar con alguien de eventos",
    "Información de atención a asociados",
    "¿Con quién veo lo de una factura?",
    "Contacto para comunicación",
    "Gerente de operaciones",
    "¿Quién se encarga de los alimentos y bebidas?",
    "Quiero información sobre deportes",
    "¿Quién es el gerente general?",
    "Recursos Humanos",

    // Búsqueda por palabras clave
    "Tengo un problema con el wifi",
    "Quiero pagar mi membresía",
    "Necesito rentar una palapa para una fiesta",
    "¿Dónde puedo ver el menú?",
    "Problemas con la app del club",
    "¿Cómo puedo hacerme socio?",
    "Quiero reportar un problema de mantenimiento en la alberca",

    // Búsqueda por nombre o puesto
    "¿Cuál es el correo de Sandra Arévalo?",
    "Pásame la extensión de Julián Obregón",
    "¿Quién es el Gerente Administrativo?",
    "Necesito el contacto de Cristina Manzanares",

    // Casos con typos o lenguaje natural
    "sitemas", // typo
    "kiero ablar con eventos", // typo + lenguaje natural
    "¿Quién es el mero mero del club?", // Lenguaje natural para Gerente General
    "la persona de las cuotas", // Lenguaje natural para Asociados/Admin

    // =========== 2. Deportes (35 preguntas) ===========
    // Resumen general
    "deportes",
    "¿Qué clases deportivas hay?",
    "actividades deportivas",

    // Disciplina específica (sin filtro)
    "horarios de spinning",
    "¿A qué hora es la zumba?",
    "información de frontenis",
    "clases de futbol",

    // Filtro simple
    "clases de futbol para niños 2014",
    "spinning en la mañana",
    "horarios de zumba con martha vázquez",
    "¿Hay futbol para adultos?",
    "frontenis los martes",
    "¿Quién da clases de futbol?",
    "¿En qué cancha es el futbol de adultos?",

    // Filtro compuesto
    "spinning con Nelia Guerra a las 6 am",
    "futbol para adultos en la cancha 7",

    // Typos en disciplina
    "clases de spining",
    "informes de zunba",
    "fronton",
    "fútbol", // con tilde

    // Disciplinas no existentes (Fallback a Deportes/Asociados)
    "¿Hay clases de tenis?",
    "Quiero jugar basketball",
    "¿Tienen clases de natación?",
    "¿Hay boxeo?",

    // Preguntas ambiguas de deportes
    "quiero clases para mi hijo",
    "¿hay algo para hacer ejercicio en la tarde?",
    "clases en la mañana",

    // Preguntas sobre el instructor
    "¿Qué clases da Oscar Sandoval?",
    "horarios de Paty Fernández",
    "¿Nelia Guerra da clases de spinning?",
    "Quiero una clase con Antonio Domínguez",

    // Preguntas por día/hora
    "¿Qué deportes hay los lunes?",
    "clases a las 6 pm",
    "deportes los fines de semana",
    
    // =========== 3. Eventos (15 preguntas) ===========
    // Pregunta general (debe pedir slot)
    "Quiero rentar un espacio para un evento",
    "¿cuánto cuesta rentar un salón?",
    "información de renta de áreas",

    // Pregunta específica
    "precio de la palapa 4",
    "capacidad del laguito 1",
    "¿puedo rentar el restaurante para una cena?",
    "¿Cuántas personas caben en la Palapa 4?",
    "¿Qué días puedo rentar el Restaurante?",

    // Preguntas con contexto implícito
    "quiero hacer una carne asada", // Debería sugerir Asadores o Palapas
    "una fiesta para 100 personas", // Debería sugerir Laguito 1
    
    // Fallback de eventos
    "¿puedo rentar la cancha de futbol?",
    "rentar la alberca",
    "¿se puede rentar el gimnasio?",
    "¿cuánto cuesta una boda en el club?",
    "necesito un lugar para 200 personas",

    // =========== 4. Alimentos y Bebidas (10 preguntas) ===========
    // Pregunta general (debe pedir slot)
    "¿cuál es el menú?",
    "quiero ver la carta",
    "comida",
    "restaurante",
    "¿qué hay de comer?",

    // Pregunta específica (asumiendo que el modelo puede responder)
    "menú de Las Palmas",
    "¿qué tacos tienen en el Terraza Bar?",
    "menú de desayunos",
    "¿tienen bebidas en el bar?",
    "precios del snack brasas",

    // =========== 5. Institucional y Fallback (15 preguntas) ===========
    // Institucional
    "¿cuál es la misión del club?",
    "visión",
    "valores del club",

    // Saludos y conversación
    "hola",
    "gracias",
    "buenos días",

    // Preguntas sin sentido o fuera de alcance
    "¿de qué color es el cielo?",
    "¿venden carros?",
    "cuéntame un chiste",
    "historia del club",
    "¿cuál es el precio de la acción?",

    // Preguntas ambiguas que deben llevar a fallback
    "información",
    "ayuda",
    "tengo una duda",
    "necesito soporte"
];
