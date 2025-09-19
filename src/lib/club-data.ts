/**
 * @fileoverview Single source of truth for all Club Del Lago data.
 * This file contains structured data for sports, food & beverages, event rentals, and staff directory.
 */

export const Deportes = {
  spinning: {
    lugar: "Sala de spinning",
    grupos: [
      {
        instructor: "Nelia Guerra",
        horarios: [
          { dias: "Lunes, Miércoles, Jueves", hora: "6:00 - 7:00 am" },
          { dias: "Lunes, Miércoles, Jueves", hora: "7:00 - 8:00 am" },
          { dias: "Lunes y Miércoles", hora: "8:00 - 9:00 am" },
          { dias: "Martes y Jueves", hora: "6:30 - 7:30 pm" },
        ],
      },
      {
        instructor: "Emilio Cabrales",
        horarios: [
          { dias: "Lunes y Viernes", hora: "6:00 - 7:00 am" },
          { dias: "Lunes y Viernes", hora: "7:00 - 8:00 am" },
        ],
      },
      {
        instructor: "Paty Fernández",
        horarios: [
          { dias: "Lunes, Miércoles, Viernes", hora: "9:00 - 10:00 am" },
          { dias: "Lunes y Miércoles", hora: "6:15 - 7:15 pm" },
        ],
      },
    ],
    contacto: {
      nombre: "Cristina Manzanares",
      puesto: "Asistente de Deportes",
      tel: "8183575500",
      ext: "140",
    },
  },
  frontenis: {
    lugar: "Cancha de Frontón",
    grupos: [
      {
        instructor: "Antonio Domínguez",
        horarios: [{ dias: "Martes y Jueves", hora: "16:00 - 19:00 hrs" }],
      },
    ],
    notas: "Mixto Infantil, mayores de 6 años.",
    contacto: {
      nombre: "Cristina Manzanares",
      puesto: "Asistente de Deportes",
      tel: "8183575500",
      ext: "140",
    },
  },
  futbol: {
    lugar: "Canchas de Fútbol 5 y 7",
    grupos: [
      {
        instructor: "Oscar Sandoval",
        categoria: "Mixto Infantil (2010-2011)",
        horarios: [{ dias: "L-J", hora: "18:00-19:00 hrs" }],
        cancha: "Fútbol 7",
      },
      {
        instructor: "Diego Manzanares",
        categoria: "Mixto Infantil (2012-2013)",
        horarios: [{ dias: "L-J", hora: "18:00-19:00 hrs" }],
        cancha: "Fútbol 7",
      },
      {
        instructor: "Oscar Sandoval",
        categoria: "Mixto Infantil (2014)",
        horarios: [{ dias: "L-J", hora: "17:00-18:00 hrs" }],
        cancha: "Fútbol 7",
      },
      {
        instructor: "Oscar Sandoval",
        categoria: "Adultos (Mayores de 15 años)",
        horarios: [{ dias: "L-J", hora: "19:00-20:00 hrs" }],
        cancha: "Fútbol 7",
      },
      {
        instructor: "Diego Manzanares",
        categoria: "Femenil Infantil (2016-2018)",
        horarios: [{ dias: "L-J", hora: "17:00-18:00 hrs" }],
        cancha: "Fútbol 7",
      },
      {
        instructor: "Daniel de León",
        categoria: "Mixto Infantil (2015-2017)",
        horarios: [{ dias: "L-J", hora: "18:00-19:00 hrs" }],
        cancha: "Fútbol 5",
      },
      {
        instructor: "Daniel de León",
        categoria: "Mixto Infantil (2018)",
        horarios: [{ dias: "L-J", hora: "17:00-18:00 hrs" }],
        cancha: "Fútbol 5",
      },
      {
        instructor: "Diego Manzanares",
        categoria: "Mixto Infantil (2019-2021)",
        horarios: [{ dias: "L-J", hora: "16:00-17:00 hrs" }],
        cancha: "Fútbol 5",
      },
    ],
    contacto: {
      nombre: "Cristina Manzanares",
      puesto: "Asistente de Deportes",
      tel: "8183575500",
      ext: "140",
    },
  },
  zumba: {
    lugar: "Salón de Zumba",
    grupos: [
      {
        instructor: "Martha Vázquez",
        horarios: [{ dias: "Lunes y Miércoles", hora: "6:15 pm - 7:15 pm" }],
      },
    ],
    notas: "Mayores de 18 años.",
    contacto: {
      nombre: "Cristina Manzanares",
      puesto: "Asistente de Deportes",
      tel: "8183575500",
      ext: "140",
    },
  },
} as const;

export const AyB = {
  "Las Palmas": {
    Desayunos: [
      ["Plato de Fruta", "$80"],
      ["Hot Cakes Gluten Free", "$77"],
      ["Hot Cakes Americanos", "$90"],
      ["Molletes (Tradicional / Lago)", "$70 / $115"],
      ["Enchiladas Suizas", "$105"],
      ["Entomatadas", "$105"],
      ["Huevos al Gusto", "$85"],
      ["Machacado", "$120"],
      ["Omelette (Fit / Al Gusto)", "$90 / $105"],
      ["Chilaquiles", "$90"],
      ["Tacos Mineros", "$95"],
    ],
    "Comidas y Cenas": [
      ["Sopa del día", "$58"],
      ["Tlalpeño", "$90"],
      ["Pastas (Mamma Rossa / Bianca / Pesto)", "$86"],
      ["Ensalada (Capresse / César)", "$90"],
      ["Milanesa de Pollo", "$150"],
      ["Milanesa de Res", "$120"],
      ["Filete de Pescado", "$110"],
      ["Salmón (Jamaica / En Salsa)", "$250 / $275"],
      ["Tacos de Bistec", "$110"],
      ["Club Sándwich", "$95"],
      ["Hamburguesas (Del Lago / Luisiana)", "$115"],
      ["Nachos Club", "$120"],
    ],
    Infantil: [
      ["Hamburguesa Jr.", "$78"],
      ["Chicken Strips", "$86"],
    ],
  },
  "Terraza Bar": {
    "Tacos y Tostadas": [
      ["Taco de Rib Eye", "$79"],
      ["Tostada Coqueta", "$75"],
      ["Taco Gobernador", "$72"],
      ["Taco de Pescado", "$55"],
      ["Quesabirrias", "$160"],
    ],
    "Botanas y Principales": [
      ["Carpaccio de Betabel", "$87"],
      ["Queso Fundido", "$85"],
      ["Alitas Colorado", "$110"],
      ["Shawarma Kebab", "$105"],
      ["Hamburguesas", "$115"],
      ["Nachos Club", "$120"],
      ["Papas Fritas", "$66"],
    ],
    Rollos: [
      ["Ebi Roll", "$135"],
      ["Damen Roll", "$130"],
    ],
  },
  "Snack Brasas": {
    Desayunos: [
      ["Gordita de Guiso", "$28"],
      ["Omelette al Gusto", "$105"],
      ["Machacado", "$120"],
      ["Taco de Guiso", "$23"],
    ],
    Principales: [
      ["Tacos de Bistec", "$110"],
      ["Enchiladas Regias", "$125"],
      ["Pirata", "$96"],
      ["Hamburguesas", "$115"],
      ["Alitas Colorado", "$110"],
      ["Percherón", "$148"],
    ],
    Adicionales: [
      ["Hot Dog", "$48"],
      ["Papas Fritas", "$66"],
      ["Chicken Strips", "$86"],
      ["Dedos de Queso", "$110"],
    ],
  },
} as const;

export const Renta = {
    contacto: {
        nombre: "Ana Karen Rincón",
        puesto: "Coordinadora de Eventos",
        email: "eventos@clubdelago.com.mx",
        tel: "8183575500",
        ext: "120",
        whatsapp: "+528123870840",
        nota: "Costo de montaje y servicios para eventos: $520.00"
    },
    areas: [
        { nombre: "Laguito 1", precio: "$4,200.00", capacidad: "20 a 100", duracion: "5 horas", dias: "L-D" },
        { nombre: "Laguito 2", precio: "$4,200.00", capacidad: "50", duracion: "5 horas", dias: "L-D" },
        { nombre: "Restaurante", precio: "$4,200.00", capacidad: "90", duracion: "5 horas (8:30pm-1:30am)", dias: "L-D" },
        { nombre: "Bar", precio: "$5,900.00", capacidad: "90", duracion: "10am a 3pm", dias: "L-D" },
        { nombre: "Palapa de Juegos", precio: "$2,700.00", capacidad: "50", duracion: "5 horas", dias: "L-D" },
        { nombre: "Asadores", precio: "$2,500.00", capacidad: "20", duracion: "5 horas", dias: "L-Mié" },
        { nombre: "Palapa 4", precio: "$3,200.00", capacidad: "60", duracion: "5 horas", dias: "L-D" },
        { nombre: "Evento solo socios", precio: "Sin Costo", capacidad: "Sin invitados", duracion: "5 horas", dias: "L-D", nota: "No incluye montaje." },
    ]
} as const;


export const Directorio = {
  "Gerente General": { name: "Erika de la Fuente", email: "gerenciagral@clubdelago.com.mx", ext: "111" },
  "Atención a Asociados": { name: "Sandra Arévalo", email: "atencionaasociados@clubdelago.com.mx", ext: "116" },
  "Gerente Administrativo": { name: "Mayra Sánchez", email: "msanchez@clubdelago.com.mx", ext: "112" },
  "Gerente de Operaciones": { name: "Víctor Zurita", email: "gerenciaoperaciones@clubdelago.com.mx" },
  "Gerente de Alimentos y Bebidas": { name: "Julián Obregón", email: "gerenciaayb@clubdelago.com.mx" },
  "Sistemas y Comunicación": { name: "Juan Andrade", email: "sistemas@clubdelago.com.mx", ext: "109" },
  "Capital Humano": { name: "Carlos Merlín", email: "recursoshumanos@clubdelago.com.mx", ext: "113" },
  "Coordinadora de Eventos": { name: "Ana Karen Rincón", email: "eventos@clubdelago.com.mx", ext: "120", whatsapp: "+528123870840" },
  "Comunicación": { name: "Leidy Rodríguez", email: "edicion@clubdelago.com.mx", ext: "109" },
  "Asistente de Deportes": { name: "Cristina Manzanares", email: "cmanzanares@clubdelago.com.mx", ext: "140" },
} as const;

export const MisionVisionValores = {
    mision: "Ser el mejor club deportivo social y familiar, fomentando la integración y el desarrollo de nuestros socios.",
    vision: "Consolidarnos como un club de excelencia, reconocido por su calidad en servicios e instalaciones.",
    valores: "Respeto, honestidad, compromiso, y trabajo en equipo."
};
