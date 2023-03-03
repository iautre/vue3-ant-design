
const setTitle = (title?: string) => {
    title = title ? title + ' - 有风小站' : '有风小站'
    window.document.title = title
}

export default {
    setTitle
}