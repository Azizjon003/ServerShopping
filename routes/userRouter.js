const router = require("express").Router();
const userController = require("../controllers/userController");
const { upload } = require("../utility/upload");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - first_name
 *        - last_name
 *        - username
 *        - email
 *        - password
 *        - phone
 *        - location_id
 *        - role
 *        - passwordConfirm
 *       properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        first_name:
 *          type: string
 *          description: The first name of the user
 *        last_name:
 *          type: string
 *          description: The last name of the user
 *        username:
 *          type: string
 *          description: The username of the user
 *        email:
 *          type: string
 *          description: The email of the user(Userning emaili kiritiladi)
 *        phone:
 *          type: bigint
 *          description: The phone number of the user(Uzbekiston nomeri katta holatlarda)
 *        location_id:
 *          type: string
 *          description: The location id of the user(Bu ma'lumotga userning locatsiya sxemadagi Idsi kiritiladi)
 *        role:
 *          type: string
 *          description: The role of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        passwordConfirm:
 *          type: string
 *          description: The password confirmation of the user
 *       example:
 *        id: 1
 *        first_name: John
 *        last_name: Doe
 *        username: JohnDoe
 *        phone: 998901234567
 *        location_id: 1
 *        role: admin
 *        password: 12345678
 *        passwordConfirm: 12345678
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API(User uchun API faqat admin uchun)
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *   summary: Returns the list of all the users
 *   tags: [Users]
 *   responses:
 *    200:
 *      description: The list of the users(Userlanrning ro'yxati)
 *      content:
 *        schema:
 *         type: array
 *         items:
 *         $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *    summary: Get the user by id(Userni idsi bilan get so'rovini berib chaqirish)
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    responses:
 *      200:
 *        description: The user by id
 *        content:
 *          schema:
 *            $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new User(permission admins)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The users was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *  patch:
 *    summary: Update the users by the id(Adminlar uchun ro'yhat ochib beriladi)
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Remove the Users by id(faqat adminlar uchun)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Users id
 *
 *     responses:
 *       200:
 *         description: The Users was deleted
 *       404:
 *         description: The Users was not found
 */
router
  .route("/")
  .post(upload.single("photo"), userController.add)
  .get(userController.getAll);
router
  .route("/:id")
  .patch(userController.update)
  .get(userController.getOne)
  .delete(userController.delete1);

module.exports = router;
