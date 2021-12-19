export const sendRefreshToken = (response, token) => {
    response.cookie('qbid', token, {
        httpOnly: false,
        sameSite: false,
        path: '/'
    });
}