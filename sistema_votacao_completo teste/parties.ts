import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all parties
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const parties = await prisma.party.findMany({
      include: {
        candidates: true,
      },
    });
    res.json(parties);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get party by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const party = await prisma.party.findUnique({
      where: { id },
      include: {
        candidates: true,
        votes: true,
      },
    });
    if (!party) {
      return res.status(404).json({ error: 'Partido não encontrado' });
    }
    res.json(party);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create party
router.post('/', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { name, acronym } = req.body;

    if (!name || !acronym) {
      return res.status(400).json({ error: 'Name e acronym são obrigatórios' });
    }

    const party = await prisma.party.create({
      data: {
        name,
        acronym,
      },
    });

    res.status(201).json(party);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update party
router.put('/:id', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, acronym } = req.body;

    const party = await prisma.party.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(acronym && { acronym }),
      },
    });

    res.json(party);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete party
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.party.delete({ where: { id } });
    res.json({ message: 'Partido eliminado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

