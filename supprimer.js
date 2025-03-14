app.delete('/logs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du log' });
    }
});
