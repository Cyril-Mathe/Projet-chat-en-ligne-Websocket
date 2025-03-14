app.get('/logs', async (req, res) => {
    try {
        const logs = await Message.find(); // Récupère tous les messages
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des logs' });
    }
});
