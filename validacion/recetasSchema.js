import { number, z } from "zod"

//***************************************************************
//      Estudiar de vuelta todo el codigo para entenderlo 
//***************************************************************

export const recetaSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),

    tipo: z.string()
    .min(1, "Selecciona un tipo de receta")
    .refine(v => ["entrada", "plato principal", "postre"].includes(v), {
        message: "Selecciona un tipo de receta",
    }),

    descripcion: z.string().min(1, "La descripción es obligatoria"),

    tiempo: z.coerce.number().min(1, "El tiempo es obligatorio"),

    dificultad: z.string()
        .min(1,"Selecciona una dificultad")
        .refine(v => ["baja","media","alta"].includes(v),{
            message: "Selecciona una dificultad",

        }),
    valoracion: z.number().min(1, "Selecciona una valoración").max(5),
});