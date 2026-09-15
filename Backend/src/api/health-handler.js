export const healthHandler = (message) => (req, res) => {
    res.json({ success: true, message });
};