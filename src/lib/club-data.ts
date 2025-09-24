/**
 * @fileoverview Single source of truth for all Club Del Lago data.
 * This file contains structured data for sports, food & beverages, event rentals, and staff directory.
 */

export const ClubData = {
  directorio: [
    {
      area: "general",
      nombre: "Erika de la Fuente",
      puesto: "Gerente General",
      email: "gerenciagral@clubdelago.com.mx",
      ext: "111",
      palabrasClave: ["gerente general", "directora"],
    },
    {
      area: "asociados",
      nombre: "Sandra Arévalo",
      puesto: "Atención a Asociados",
      email: "atencionaasociados@clubdelago.com.mx",
      ext: "116",
      palabrasClave: ["socio", "membresía", "afiliación", "asociados", "inscripción"],
    },
    {
      area: "administracion",
      nombre: "Mayra Sánchez",
      puesto: "Gerente Administrativo",
      email: "msanchez@clubdelago.com.mx",
      ext: "112",
      palabrasClave: ["factura", "pago", "caja", "administración", "cobranza"],
    },
    {
      area: "operaciones",
      nombre: "Víctor Zurita",
      puesto: "Gerente de Operaciones",
      email: "gerenciaoperaciones@clubdelago.com.mx",
      palabrasClave: ["operaciones", "mantenimiento", "limpieza", "seguridad", "alberca"],
    },
    {
      area: "alimentos",
      nombre: "Julián Obregón",
      puesto: "Gerente de Alimentos y Bebidas",
      email: "gerenciaayb@clubdelago.com.mx",
      palabrasClave: ["menú", "restaurante", "comida", "bar", "snack", "bebidas", "alimentos"],
    },
    {
      area: "sistemas",
      nombre: "Juan Andrade",
      puesto: "Jefe de Sistemas y Comunicación",
      email: "sistemas@clubdelago.com.mx",
      ext: "109",
      palabrasClave: ["sistemas", "ti", "wifi", "internet", "correo", "delagoapp", "aplicación"],
    },
    {
      area: "rh",
      nombre: "Carlos Merlín",
      puesto: "Gerente de Capital Humano",
      email: "recursoshumanos@clubdelago.com.mx",
      ext: "113",
      palabrasClave: ["recursos humanos", "rh", "vacantes"],
    },
    {
      area: "eventos",
      nombre: "Ana Karen Rincón",
      puesto: "Coordinadora de Eventos",
      email: "eventos@clubdelago.com.mx",
      ext: "120",
      whatsapp: "+528123870840",
      palabrasClave: ["evento", "salón", "palapa", "renta", "laguito", "asadores", "fiesta"],
    },
    {
      area: "comunicacion",
      nombre: "Leidy Rodríguez",
      puesto: "Comunicación",
      email: "edicion@clubdelago.com.mx",
      ext: "109",
      palabrasClave: ["comunicación", "redes sociales", "prensa", "revista"],
    },
    {
      area: "deportes",
      nombre: "Cristina Manzanares",
      puesto: "Asistente de Deportes",
      email: "cmanzanares@clubdelago.com.mx",
      ext: "140",
      palabrasClave: ["deporte", "futbol", "soccer", "zumba", "spinning", "frontenis", "clases"],
    },
  ],

  deportes: {
    spinning: {
      lugar: "Sala de Spinning",
      grupos: [
        {
          instructor: "Nelia Guerra",
          horarios: [
            { dias: "Lun, Mié, Jue", hora: "6:00–7:00 am" },
            { dias: "Lun, Mié, Jue", hora: "7:00–8:00 am" },
          ],
        },
        {
          instructor: "Paty Fernández",
          horarios: [{ dias: "Lun, Mié", hora: "6:15–7:15 pm" }],
        },
      ],
    },
    futbol: {
      lugar: "Canchas de Fútbol",
      categorias: [
        {
          nombre: "Infantil 2014",
          horario: "Lun–Jue 17:00–18:00",
          instructor: "Oscar Sandoval",
          cancha: "Fútbol 7",
        },
        {
          nombre: "Adultos (15+)",
          horario: "Lun–Jue 19:00–20:00",
          instructor: "Oscar Sandoval",
          cancha: "Fútbol 7",
        },
      ],
    },
    zumba: {
      lugar: "Salón Zumba",
      grupos: [
        {
          instructor: "Martha Vázquez",
          horarios: [{ dias: "Lun, Mié", hora: "6:15–7:15 pm" }],
        },
      ],
    },
    frontenis: {
      lugar: "Cancha de Frontón",
      grupos: [
        {
          instructor: "Antonio Domínguez",
          horarios: [{ dias: "Mar, Jue", hora: "16:00–19:00" }],
        },
      ],
    },
  },

  eventos: {
    palapa4: {
      nombre: "Palapa 4",
      precio: "$3,200",
      capacidad: "60",
      duracion: "5h",
      dias: "L–D",
    },
    laguito1: {
      nombre: "Laguito 1",
      precio: "$4,200",
      capacidad: "20–100",
      duracion: "5h",
      dias: "L–D",
    },
    restaurante: {
      nombre: "Restaurante",
      precio: "$4,200",
      capacidad: "90",
      duracion: "5h (8:30–1:30)",
      dias: "L–D",
    },
  },

  ayb: {
    menus: [
      {
        name: "Restaurante Las Palmas - Desayunos",
        description: "El sabor de la mañana, servido con una sonrisa.",
        image: "/images/Palmas.jpg",
        hint: "restaurant interior",
        imageUrls: [
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0001.jpg",
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0002.jpg",
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0003.jpg",
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0004.jpg",
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0005.jpg",
            "/images/MenuRestaurantePalmasDesayunos/LAS PALMAS DESAYUNOS (A4) (1)_page-0006.jpg"
        ],
      },
      {
        name: "Restaurante Las Palmas - Comidas",
        description: "Una deliciosa pausa en tu día.",
        image: "/images/Palmas.jpg",
        hint: "restaurant dining",
        imageUrls: Array.from({ length: 4 }, (_, i) => `/images/MenuRestaurantePalmasComida/${i + 1}.jpg`),
      },
      {
        name: "Restaurante Terraza Bar",
        description: "Disfruta del aire libre con nuestras especialidades.",
        image: "/images/bar.jpg",
        hint: "terrace bar",
        imageUrls: Array.from({ length: 2 }, (_, i) => `/images/MenuBarTerraza/${i + 1}.jpg`),
      },
      {
        name: "Snack Brasas",
        description: "Bocadillos perfectos para disfrutar junto a la alberca.",
        image: "/images/brasas.jpg",
        hint: "grill snack bar",
        imageUrls: Array.from({ length: 2 }, (_, i) => `/images/MenuSnackBrasas/${i + 1}.jpg`),
      },
    ],
  },


  institucional: {
      mision: "Ser el mejor club deportivo social y familiar, fomentando la integración y el desarrollo de nuestros socios.",
      vision: "Consolidarnos como un club de excelencia, reconocido por su calidad en servicios e instalaciones.",
      valores: "Respeto, honestidad, compromiso, y trabajo en equipo."
  }
};
