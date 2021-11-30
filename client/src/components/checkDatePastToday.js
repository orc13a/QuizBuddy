export const checkDatePastToday = (AssignmentDate) => {
    let diff = new Date().getTime() - new Date(AssignmentDate).getTime();

    if (diff > 0) {
        return true;
    } else {
        return false;
    }
}