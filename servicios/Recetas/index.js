import random from "../../utils/lib.js"

const MAX_RECETAS = 2
const IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPBDvnGr8LIznhiF3rc_hBusaOh5WLTwJCA&s"

const recetasBase = {
    "MIlanesa con pure": {
        tipo: "plato principal",
        descripcion: "Un clásico argentino: milanesa crocante con puré cremoso.",
        tiempo: 10,
        dificultad: "BAJA",
        valoracion: 5,
        imagen: IMAGE_URL
    },
    "Ensalada César": {
        tipo: "entrada",
        descripcion: "Una ensalada fresca con pollo, crutones y aderezo suave.",
        tiempo: 5,
        dificultad: "MEDIA",
        valoracion: 2,
        imagen: IMAGE_URL
    }
}

const tipo = ["entrada", "plato principal", "postre"]
const dificultad = ["BAJA", "MEDIA", "ALTA"]

//Obtenemos un ARRAY con las KEYS (nombres) de mis recetas
const nombres = Object.keys(recetasBase)

const getRandomNombre = () => {
    console.log(nombres)
    return nombres[random(0, nombres.length - 1)]
}

const getTipo = (nombre) => {
    //VALIDAR que nombre exista
    return recetasBase[nombre].tipo
}

const getDesripcion = (nombre) => {
    //VALIDAR 
    return recetasBase[nombre].descripcion
}

const getRandomTiempo = () => {
    return random(1, 60)
}

const getRandomDificultad = () => {
    return dificultad[random(0, dificultad.length - 1)]
}

const getRandomValoracion = () => {
    return random(1, 5)
}

const generarRecetas = () => {
    const nombre = getRandomNombre()
    const tipo = getTipo(nombre)
    const descripcion = getDesripcion(nombre)
    const tiempo = getRandomTiempo()
    const dificultad = getRandomDificultad()
    const valoracion = getRandomValoracion()
    const imagen = IMAGE_URL
    return {
        nombre,
        tipo,
        descripcion,
        tiempo,
        dificultad,
        valoracion,
        imagen
    }
}

//Genero array de RECETAS
let recetas = Array.from(
    { length: MAX_RECETAS },
    generarRecetas
).map((receta, index) => {
    return { ...receta, id: index + 1 }
})

//Simulo llamada a la API
const getRecetas = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(recetas)
        }, 1000)
    })
}

const agregarReceta = (receta) => {
    return new Promise((resolve, reject) => {
        console.log("Agregando receta...")
        setTimeout(() => {
            const newReceta = { ...receta, id: recetas.length + 1, imagen: IMAGE_URL}
            recetas.push(newReceta)
            resolve(newReceta)
        }, 1000)
    })
}

const getRecetaById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve((recetas.find((receta) => receta.id === id)))
        }, 1000)
    })
}

const eliminarReceta = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            recetas = recetas.filter((receta) => receta.id !== id)
            resolve(true)
        }, 1000)
    })
}

const editarReceta = (id, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let encontrada = false
            console.log("Editando receta")

            recetas = recetas.map((r) => {
                if (r.id === id) {
                    encontrada = true
                    return { ...r, ...data }
                }
                return r
            })

            encontrada ? resolve(true) : resolve(false)
        }, 1000)
    })
}

export {
    getRecetas,
    agregarReceta,
    getRecetaById,
    eliminarReceta,
    editarReceta
}