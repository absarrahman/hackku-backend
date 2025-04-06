const express = require('express');
const { createRecord, readRecord, readRecords, createDummyRecords } = require('../chaincode/patient');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { id, hash, metadata, owner } = req.body;
    await createRecord(id, hash, metadata, owner);
    res.status(201).json({ message: 'Record created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/dummy', async (req, res) => {
  try {
    await createDummyRecords();
    res.status(201).json({ message: 'Dummy Records created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    console.log("I AM RUNNING");
    const result = await readRecords();
    res.status(200).json(result);
  } catch (err) {
    // res.status(404).json({ error: `${err}`});
    res.status(404).json({error: "No records found"});
  }
});


router.get('/:id', async (req, res) => {
  try {
    const result = await readRecord(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: 'Recot found' });
  }
});

module.exports = router;

