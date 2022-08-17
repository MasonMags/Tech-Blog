const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
 try{
    const userData = await User.findAll({
        attributes: { exclude: ['password']}
    })
    res.status(200).json(userData);
} catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
 try {
    const userData = User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
        ]
    })
    res.status(200).json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
});

// creating a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
        console.log(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: { email: req.body.email }  });

        if (!userData) {
            res
            .status(400)
            .json({ message: 'User not found!'});
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password! Please try again.'})
            return;
        }

        // console.log(correctPassword.password)

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = dbUserData.username;
            req.session.logged_in = true;

            res
            .status(200)
            .json({ user: userData, message: 'you are now logged in'});
            console.log(chalk.blue('you are logged in'))
            console.log(userData)
        });
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
            console.log("you are logged out")
        });
    } else {
        console.log("could not log out")
        res.status(404).end();
    }
});

// updating a user by id
router.put('/:id', withAuth, (req, res) => {
 try {
    const userData = await User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    if (!userData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
 } catch(err) {
    console.log(err)
    res.status(500).json(err);
}
});

module.exports = router;