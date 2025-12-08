import random from "../../utils/lib.js"

const MAX_RECETAS = 2
const IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPBDvnGr8LIznhiF3rc_hBusaOh5WLTwJCA&s"

const URL_API = "http://192.168.0.12:8080"

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
//SIMULANDO
// const getRecetas = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(recetas)
//         }, 1000)
//     })
// }

//LLamando a la api 
const getRecetas = () => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error al obtener las recetas")
                }
            })
            .then(data => {
                // console.log("data", data)
                resolve(data)
            })
            .catch(error => {
                // console.error("Error", error)
                reject(error)
            })
    })
}

//Em el caso del POST debemos pasarle 3 datos al fetch para que sepa que tipo 
//de metodo es. 1- Json 2-Encabezado y cuerpo 3- header de autorizacion (si la tiene)  
const agregarReceta = (receta) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(receta) 
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al agregar una receta");
            }
        })
        .then(data => resolve(data))
        .catch(error => {
            console.log("Error", error);
            reject(error);
        });
    });
};


const getRecetaById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error al obtener la receta")
                }
            })
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                console.log("Error", error)
                reject(error)
            })
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

    })
}

export {
    getRecetas,
    agregarReceta,
    getRecetaById,
    eliminarReceta,
    editarReceta
}