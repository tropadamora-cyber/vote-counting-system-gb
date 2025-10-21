import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Assign delegate to circle
router.post('/assign', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER', 'REGIONAL_COORDINATOR']), async (req: AuthRequest, res: Response) => {
  try {
    const { userId, circleId } = req.body;

    if (!userId || !circleId) {
      return res.status(400).json({ error: 'userId e circleId são obrigatórios' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }

    // Check if circle exists
    const circle = await prisma.electoralCircle.findUnique({ where: { id: circleId } });
    if (!circle) {
      return res.status(404).json({ error: 'Círculo não encontrado' });
    }

    const assignment = await prisma.delegateAssignment.create({
      data: {
        userId,
        circleId,
      },
    });

    res.status(201).json(assignment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get delegates for a circle
router.get('/circle/:circleId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { circleId } = req.params;

    const assignments = await prisma.delegateAssignment.findMany({
      where: { circleId },
      include: {
        user: true,
        circle: true,
      },
    });

    res.json(assignments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get circles assigned to a delegate
router.get('/user/:userId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const assignments = await prisma.delegateAssignment.findMany({
      where: { userId },
      include: {
        user: true,
        circle: true,
      },
    });

    res.json(assignments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Remove delegate assignment
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.delegateAssignment.delete({ where: { id } });
    res.json({ message: 'Atribuição de delegado removida com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

