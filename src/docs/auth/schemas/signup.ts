/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserSignup:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The username
 *         lastname:
 *           type: string
 *           description: The last name
 *         email:
 *           type: string
 *           description: Email address
 *         phoneNumber:
 *           type: string
 *           description: Phone number
 *         password:
 *           type: string
 *           description: Minimum of 8 characters long
 *         profilePicUrl:
 *           type: string
 *           description: user picture profile
 *           format: binary
 *         brandPicUrl:
 *           type: string
 *           description: user brand picture
 *           format: binary
 */
