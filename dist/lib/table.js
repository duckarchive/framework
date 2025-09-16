export const sortNumeric = (a, b) => parseInt(a) - parseInt(b);
export const sortText = (a, b) => a.localeCompare(b);
export const sortDate = (a, b) => new Date(b).valueOf() - new Date(a).valueOf();
const PREFIX_ORDER = { "": 0, "Р": 1, "П": 2 };
const POSTFIX_ORDER = { "Т": 0, "Д": 1 };
export const sortCode = (a, b) => {
    // returns the comparison tuple for a code
    const key = (str) => {
        str = str.toUpperCase();
        // 1️⃣ prefix
        const prefix = (str[0] === "Р" || str[0] === "П") ? str[0] : "";
        const rest = str.slice(prefix.length);
        // 2️⃣ numeric part + whole postfix
        const [, numTxt = "", postfix = ""] = rest.match(/^(\d+)(.*)$/) || [];
        const num = +numTxt;
        // 3️⃣ hasPost flag (0: none, 1: has postfix)
        const hasPost = postfix ? 1 : 0;
        // 4️⃣ first letter of postfix, then its digits
        const [, letters = "", digitsTxt = ""] = postfix.match(/^([^\d]*)(\d*)$/) || [];
        const letterRank = letters ? (POSTFIX_ORDER[letters[0]] ?? 99) : 99;
        const digitRank = digitsTxt ? +digitsTxt : -1; // -1 ⇒ “no digits”
        return [num, PREFIX_ORDER[prefix], hasPost, letterRank, letters, digitRank];
    };
    const A = key(a), B = key(b);
    for (let i = 0; i < A.length; i++) {
        if (A[i] < B[i])
            return -1;
        if (A[i] > B[i])
            return 1;
    }
    return 0;
};
