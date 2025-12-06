const login = async (email, contrasenia) => {
    return new Promise((resolve, reject) => {
        //Llamada a la API de autenticacion
        setTimeout(() => {
            if (email === "admin" && contrasenia === "123456") {
                resolve({
                    access_token: `1234567890`,
                    expires_in: 3600,
                    user: {
                        id: 1,
                        fullname: `Jose Madrid`,
                        email: `admin@gmail.com`,
                        role: `admin`,
                        permissions: [`read`,`write`,`delete`]
                    }
                })
            } else {
                reject(new Error("Credenciales incorrectas"))
            }
        })

    })
}

export default {login}

//**ACA ES DONDE SE SUPONE QUE DEBE IR LA CONEXION CON LA API DEL BACKEND (FECTH) 
//Implementar un endpoint de con MockAip, FireBase o SupaBase para conectar con una api  
//*/