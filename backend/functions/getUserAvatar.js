export const getUserAvatar = (firstname, lastname) => {
    const f = firstname.charAt(0).toUpperCase();
    const l = lastname.charAt(0).toUpperCase();
    const avatar = `${f}${l}`;
    return avatar;
}