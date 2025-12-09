const IMAGE_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPBDvnGr8LIznhiF3rc_hBusaOh5WLTwJCA&s"

const URL_API = "http://192.168.0.12:8080"

//LLamando a la api 
const getRecetas = (token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas`, {
        })
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
const agregarReceta = (receta, token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            //Agregar un COMPONENTE DE IMAGENES (EXPO IMAGEN PICKER)
            body: JSON.stringify({ ...receta, imagen: IMAGE_URL })
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

const getRecetaById = (id, token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
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

const eliminarReceta = (id, token) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL_API}/recetas/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    resolve(true)
                } else {
                    throw new Error("Error al eliminar una receta")
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

const editarReceta = (id, data) => {
    return new Promise((resolve, reject) => {
        console.log(" ENVIANDO AL BACKEND:", data);
        fetch(`${URL_API}/recetas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error al editar una receta")
                }
            })
            .then(date => {
                resolve(data)
            })
            .catch(error => {
                console.log("Error: ", error)
                reject(error)
            })
    })
}

export {
    getRecetas,
    agregarReceta,
    getRecetaById,
    eliminarReceta,
    editarReceta
}