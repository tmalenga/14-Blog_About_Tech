const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {        
        user_id: req.session.user_id
      },
      attributes: ['id', 'post_text', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(PostData => {        
        const posts = PostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
  attributes: ['id', 'post_text', 'title', 'created_at'],
  include: [
  {
      model: User,
      attributes: ['username']
  },
  {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
      model: User,
      attributes: ['username']
      }
  }
  ]
})
    .then(PostData => {
    const post = PostData.get({ plain: true });
    res.render('edit-posts', { post , loggedIn: true }); 
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// rendering newpost page 
router.get('/newpost', (req, res) => {
  res.render('new-posts');
});

module.exports = router;

