import { Op } from 'sequelize';

import Avatar from '../models/Avatar';
import HelpOrder from '../models/HelpOrder';
import Registration from '../models/Registration';
import Student from '../models/Student';
import User from '../models/User';

class StudentAskController {
  async index(req, res) {
    const { id: student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id,
      },
      include: [
        {
          model: User,
          as: 'replier',
          include: [
            {
              model: Avatar,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
          attributes: ['name'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'alternative_id'],
        },
      ],
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id: student_id } = req.params;
    const { question } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: "student don't exists" });
    }

    const haveActiveRegistration = await Registration.findOne({
      where: {
        student_id,
        end_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!haveActiveRegistration) {
      return res
        .status(400)
        .json({ error: "student don't have active registration" });
    }

    const help_order = await HelpOrder.create(
      {
        question,
        student_id,
      },
      {
        include: [
          {
            model: User,
            as: 'replier',
            include: [
              {
                model: Avatar,
                as: 'avatar',
                attributes: ['id', 'name', 'path', 'url'],
              },
            ],
            attributes: ['name'],
          },
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email', 'alternative_id'],
          },
        ],
      }
    );
    return res.json(help_order);
  }
}

export default new StudentAskController();
