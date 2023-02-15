const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let allCategories = await Category.findAll({
    include:[{
      model: Product
    }]
  });
  res.status(200).json(allCategories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  let singleCategory = await Category.findByPk(id, {
    include:[{
      model: Product
    }]
  });
  res.status(200).json(singleCategory);
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body;
  let newCategory = await Category.create({
    category_name: category_name,
  });

  res.status(200).json(newCategory);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  const { category_name } = req.body;
  let updatedCategory = await Category.findByPk(id);
  await updatedCategory.update({
    category_name: category_name,
  })

  res.status(200).json(`ID ${id}'s category name updated to ${category_name}`)
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  let deleted = await Category.destroy({
    where: {
      id: id
    }
  });
  res.status(200).json(`Id ${id} deleted.`);
});

module.exports = router;
