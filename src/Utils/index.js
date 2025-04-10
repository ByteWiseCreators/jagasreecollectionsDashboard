
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : false;
}