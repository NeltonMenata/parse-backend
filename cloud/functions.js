const Post = Parse.Object.extend("Post")

Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hello Parse Server';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', async (req) => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

Parse.Cloud.define("mundo", (req) => {
  return { "result": "Resultado da Função" };

});

Parse.Cloud.define("addPost", async (req) => {
  const post = new Post();
  const postContent = req.params.content;
  const postFile = req.params.file;

  post.set("post", postContent);
  post.set("photo", postFile);

  try {
    await post.save(null, { useMasterKey: true });
    return post;
  } catch (error) {
    new Error(error);
  }


});