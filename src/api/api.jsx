const API = {
    fetchItems: async () => {
        // Replace with actual API endpoint
        const response = await fetch('/api/items');
        const data = await response.json();
        return data;
    },
    initiateTrade: async () => {
        // Replace with actual API endpoint
        const response = await fetch('/api/trade', { method: 'POST' });
        const data = await response.json();
        return data;
    }
};

export default API;
