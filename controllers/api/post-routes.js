const router = require('express').Router();
const { Post, User, Comments} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    console.log('*********');
    Post.findAll({
      attributes: ['id', 
                   'post_text',
                   'title',
                   'created_at'
                ],      
      order: [['created_at', 'DESC']],      
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
          },
      ]
    }) 
    .then(PostData => res.json(PostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  
});

// GET a single post by id 
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','post_text','title','created_at'],    
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
        if (!PostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(PostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// CREATE a new post
router.post('/', withAuth, (req, res) => {
    Post.create({ 
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(PostData => res.json(PostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
    })
    .then(PostData => {
        if (!PostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(PostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    })
    .then(PostData => {
        if (!PostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(PostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;