export const sendRefreshToken = (response, token) => {
    response.cookie('qbid', token, {
        httpOnly: true,
        sameSite: true,
        path: '/'
    });
}