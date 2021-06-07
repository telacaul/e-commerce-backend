const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(categoryData => {
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(idData => {
    if (!idData) {
      res.status(404).json({ message: 'no category with that id!' });
      return;
    }
    res.json(idData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(nameData => res.json(nameData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(putData => {
    if (!putData) {
      res.status(404).json({ message: 'no category found with this id!' })
    }
    res.json(putData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(destoryData => {
    if (!destoryData) {
      res.status(404).json({ message: 'Category id does not exists' })
    }
    res.json(destoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;