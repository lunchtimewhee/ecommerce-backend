const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let allTags = await Tag.findAll({
    include:[{
      model: Product
    }]
  });
  res.status(200).json(allTags);

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;

  let singleTag = await Tag.findByPk(id, {
    include:[{
      model: Product
    }]
  });
  res.status(200).json(singleTag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const { tag_name } = req.body;
  let newTag = await Tag.create({
    tag_name: tag_name,
  });

  res.status(200).json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  const { tag_name } = req.body;
  let updatedTag = await Tag.findByPk(id);
  await updatedTag.update({
    tag_name: tag_name,
  })

  res.status(200).json(`ID ${id}'s category name updated to ${tag_name}`)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  let deleted = await Tag.destroy({
    where: {
      id: id
    }
  });
  res.status(200).json(`Id ${id} deleted.`);
});

module.exports = router;
