/**
 * @fileoverview Set de 70 preguntas para pruebas del chatbot Laguito.
 * El objetivo es validar la robustez, precisión y el manejo de casos de borde.
 */

export const testQuestions = [
    // =========== 1. Directorio (20 preguntas) ===========
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

    // =========== 2. Deportes (25 preguntas) ===========
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
    
    // Disciplinas no existentes
    "¿Hay clases de tenis?",
    "Quiero jugar basketball",

    // Preguntas ambiguas de deportes
    "quiero clases para mi hijo",
    "¿hay algo para hacer ejercicio en la tarde?",
    "clases en la mañana",

    // =========== 3. Eventos (10 preguntas) ===========
    // Pregunta general
    "Quiero rentar un espacio para un evento",
    "¿cuánto cuesta rentar un salón?",
    "información de renta de áreas",

    // Pregunta específica
    "precio de la palapa 4",
    "capacidad del laguito 1",
    "¿puedo rentar el restaurante para una cena?",
    "¿Cuántas personas caben en la Palapa 4?",
    
    // Fallback de eventos
    "¿puedo rentar la cancha de futbol?",
    "rentar la alberca",
    "necesito un lugar para 200 personas",

    // =========== 4. Alimentos y Bebidas (5 preguntas) ===========
    // Pregunta general
    "¿cuál es el menú?",
    "quiero ver la carta",
    "comida",

    // Pregunta específica
    "menú de Las Palmas",
    "¿qué tacos tienen en el Terraza Bar?",

    // =========== 5. Institucional y Fallback (10 preguntas) ===========
    // Institucional
    "¿cuál es la misión del club?",
    "visión y valores",

    // Saludos y conversación
    "hola",
    "gracias",
    "buenos días",

    // Preguntas sin sentido o fuera de alcance
    "¿de qué color es el cielo?",
    "¿venden carros?",
    "cuéntame un chiste",

    // Preguntas ambiguas
    "información",
    "ayuda"
];
