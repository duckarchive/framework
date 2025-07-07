export const sortNumeric = (a, b) => parseInt(a) - parseInt(b);
export const sortText = (a, b) => a.localeCompare(b);
export const sortDate = (a, b) => new Date(b).valueOf() - new Date(a).valueOf();
const groups = ["П", "Р", ""];
export const sortCode = (a, b) => {
    const upA = a.toUpperCase();
    const upB = b.toUpperCase();
    const idxA = groups.findIndex((group) => upA.startsWith(group));
    const idxB = groups.findIndex((group) => upB.startsWith(group));
    const qA = idxA - 1;
    const qB = idxB - 1;
    const pureA = upA.replace(/[^0-9]/g, "");
    const pureB = upB.replace(/[^0-9]/g, "");
    if (pureA === pureB)
        return qB - qA;
    return sortNumeric(pureA, pureB);
};
