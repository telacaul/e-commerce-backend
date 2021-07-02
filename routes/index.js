
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Think this is going to display "wrong route" in html if user hits localhost:3001/
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;