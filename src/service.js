import axios from 'axios'
import { toast } from "react-toastify"

export const fetchCategories = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get('http://api.ozinshe.com/core/V1/categories', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const postAddCategory = (name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .post("http://api.ozinshe.com/core/V1/categories", {
            "name" : name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
        
    return result
}

export const putCategory = (id, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .put(`http://api.ozinshe.com/core/V1/categories/${id}`, {
            "name" : name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так"); 
        })

    return result
}

export const deleteCategoryById = (id) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .delete(`http://api.ozinshe.com/core/V1/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result;
}

export const fetchJenres = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get("http://api.ozinshe.com/core/V1/genres", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const fetchJenreById = (id) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const CreateUploadFileService = (formDate) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .post("http://api.ozinshe.com/core/V1/files/upload", formDate, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })

    return result
}

export const putEditJenreService = (id, fileId, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .put(`http://api.ozinshe.com/core/V1/genres/${id}`, {
            "fileId" : fileId,
            "name" : name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result 
}

export const postCreateJenreService = (fileId, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .post("http://api.ozinshe.com/core/V1/genres", {
            fileId,
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result
}

export const HandleDeleteJenreService = (id) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .delete(`http://api.ozinshe.com/core/V1/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result;
}

export const handleSubmitClickedService = (email, password) => {
    const result = axios
        .post("http://api.ozinshe.com/auth/V1/signin", {
            email,
            password,
        })
        .then(result => result.data)
        .catch(error => {
            toast.error("Неверный пароль или логин")
        })
    
    return result
}


export const getMainProjectsService = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get("http://api.ozinshe.com/core/V1/movies_main", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })

    return result;
}

export const handleDeleteMainProjectService = (id) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .delete(`http://api.ozinshe.com/core/V1/movies_main/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result
}

export const getMoviesService = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/movies`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result;
}

export const postCreateMainMoviesService = (fileId, movieId, sortOrder) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .post("http://api.ozinshe.com/core/V1/movies_main", {
            fileId,
            movieId,
            sortOrder
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result
}

export const putEditMainProjectService = (id, fileId, movieId, sortOrder) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .put(`http://api.ozinshe.com/core/V1/movies_main/${id}`, {
            fileId,
            movieId,
            sortOrder,              
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result
}

export const getRolesService = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get("http://api.ozinshe.com/core/V1/admin/?hasMoreRoles=true&size=20", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })

    return result
}

export const postCreateRoleService = (email, role) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .put("http://api.ozinshe.com/core/V1/admin/roles", {
            email,
            role
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result
}

export const deleteRolesByIdService = (id, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .delete(`http://api.ozinshe.com/core/V1/admin/${id}`, {
            id,
            name,
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result
}

export const getInformationSearchedService = (searchWord) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/movies/search?search=${searchWord}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })

    return result
}

export const getAgeCategoryByIdService = (id) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/category-ages/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const postCreateAgeCategoryService = (fileId, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .post("http://api.ozinshe.com/core/V1/category-ages", {
            fileId,
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result
}

export const getAgeCategoryService = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get("http://api.ozinshe.com/core/V1/category-ages", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })

    return result
}

export const putEditAgeCategoryService = (id, fileId, name) => {
    const token = localStorage.getItem("ozinshe_token")

    const result = axios
        .put(`http://api.ozinshe.com/core/V1/category-ages/${id}`, {
            fileId,
            name
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    return result
}

export const handleDeleteAgeCategoryService = (id) => {
    const token = localStorage.getItem("ozinshe_token")

    const result =axios
        .delete(`http://api.ozinshe.com/core/V1/category-ages/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

    return result
}

export const getUsersService = (sortField, direction) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/admin/?size=20&direction=${direction}&sortField=${sortField}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const getYearsControllerService = () => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get("http://api.ozinshe.com/core/V1/year/list", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const fetchMoviesService = (year, categoryId,type,sortField) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/movies/page?year=${year}&categoryId=${categoryId}&type=${type}&sortField=${sortField}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}


export const getProjectByIdService = (id) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/movies/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data)
        .catch(error => {
            console.log(error)
        })
    return result
}

export const getVideoService = (id) => {
    const token = localStorage.getItem("ozinshe_token")
    const result = axios
        .get(`http://api.ozinshe.com/core/V1/seasons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => result.data[0])
        .catch(error => {
            console.log(error)
        })
    return result
}