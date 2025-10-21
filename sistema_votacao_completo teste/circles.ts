import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all electoral circles
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const circles = await prisma.electoralCircle.findMany({
      include: {
        votingAssemblies: true,
      },
    });
    res.json(circles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get circle by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const circle = await prisma.electoralCircle.findUnique({
      where: { id },
      include: {
        votingAssemblies: true,
        circleResults: {
          include: { circle: true },
        },
      },
    });
    if (!circle) {
      return res.status(404).json({ error: 'Círculo não encontrado' });
    }
    res.json(circle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create electoral circle
router.post('/', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { name, region, deputies } = req.body;

    if (!name || !region || deputies === undefined) {
      return res.status(400).json({ error: 'Name, region e deputies são obrigatórios' });
    }

    const circle = await prisma.electoralCircle.create({
      data: {
        name,
        region,
        deputies: parseInt(deputies),
      },
    });

    res.status(201).json(circle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update electoral circle
router.put('/:id', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, region, deputies } = req.body;

    const circle = await prisma.electoralCircle.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(region && { region }),
        ...(deputies !== undefined && { deputies: parseInt(deputies) }),
      },
    });

    res.json(circle);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete electoral circle
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.electoralCircle.delete({ where: { id } });
    res.json({ message: 'Círculo eliminado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

