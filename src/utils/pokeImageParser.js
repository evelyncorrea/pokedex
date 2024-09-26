/**
 * 
 * @param {*} url 
 * @returns last part of received URL, which contains the Pokemon's ID.
 */
export const parsePokemonId = (url) => {
    if(url) {
        const splittedUrl = url.split('/').filter(res => !!res)
        
        return splittedUrl[splittedUrl.length - 1]
    }
}