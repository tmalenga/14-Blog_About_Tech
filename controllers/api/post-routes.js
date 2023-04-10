const router = require('express').Router();
const { Post, User, Comments } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      include: [{ model: User}],
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
router.get('/', async (req, res) => {
  try{
      const postData = await Post.findAll({
          include: [ Comments, User ]
      });
      res.status(200).json(postData);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.get('/user', async (req, res) => {
  try{
      const UserPostData = await Post.findAll({
          include: [{ model: User}],
          where:{
              user_id: req.session.user_id
          }
      });
      res.status(200).json(UserPostData);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
      const { id, title, content } = req.body;
      const post = await Post.findByPk(req.params.id);
      const postData = await post.update(
          {
              id: id,
              title: title,
              content: content
          });
          res.status(200).json(postData)
  } catch (err){
      res.status(500).json(err)
  }
});

router.get('/:id', async (req,res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
        include:[
          {
            model: Comments, include: {
              model: User,
              attributes: ['id', 'username']
            }
          },
          {
            model: User,
            attributes: ['id','username']
          }
        ]
      });

      if (!postData) {
          res.status(500).json({message: 'No post entry found with that id!'});
          return;
      }
      res.status(200).json(postData);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
