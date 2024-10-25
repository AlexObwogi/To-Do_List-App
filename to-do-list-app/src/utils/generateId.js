export const generateId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

