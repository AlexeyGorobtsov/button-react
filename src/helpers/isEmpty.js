// eslint-disable-next-line consistent-return
export const isEmpty = (value) => {
    if (value === null || value === undefined || value === '') {
        return true;
    }
    if (Array.isArray(value)) {
        return !value.length;
    }
    if (value) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in value) {
            // eslint-disable-next-line no-prototype-builtins
            if (value.hasOwnProperty(key)) {
                return false;
            }
        }
        return JSON.stringify(value) === JSON.stringify({});
    }
};