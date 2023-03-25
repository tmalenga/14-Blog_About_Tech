const router = require('express').Router();
const { Post, User, Comments} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');