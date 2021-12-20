export const sendRefreshToken = (response, token) => {
    response.cookie('qbid', token, {
        domain: 'https://quiz-buddy.vercel.app/',
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        path: '/'
    });
}