const createTag = async (values) => {
    const response = await window.electronAPI.createTags(values)
    return response
}

const getTags = async (values) => {
    const response = await window.electronAPI.getAllTags()
    return response
}

const updateTags = async (values) => {
    const response = await window.electronAPI.updateTags(values)
    return response
}
let tagService = { createTag, getTags, updateTags }

export default tagService
