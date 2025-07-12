const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/process_checkout', (req, res) => {
    const { command } = req.body;
    console.log('Received command:', command);

    if (command === 'confirm') {
        return res.json({ status: 'success', message: 'Order confirmed!' });
    } else if (command === 'cancel') {
        return res.json({ status: 'cancelled', message: 'Order cancelled.' });
    } else {
        return res.status(400).json({ status: 'error', message: 'Unknown command.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
