//import Cookies from 'js-cookie'
const createTag = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken
    }
    const response = await window.electronAPI.createTags(allValues)
    return response
}

const getTags = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getAllTags(allValues)
    return response
}

const updateTags = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateTags(allValues)
    return response
}
let tagService = { createTag, getTags, updateTags }

export default tagService
