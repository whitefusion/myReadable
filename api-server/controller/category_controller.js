exports.getCategories = async (ctx) => {
  const cats = await require('../data/category_data')
  ctx.body = cats
}