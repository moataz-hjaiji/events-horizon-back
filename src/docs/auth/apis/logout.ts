/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout
 *     tags: [Access]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                      default: Logout success
 *
 *     security:
 *      - bearerAuth: []
 *
 */
