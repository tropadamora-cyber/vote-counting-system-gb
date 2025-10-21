import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Submit voting data
router.post('/', authenticateToken, authorizeRole(['DELEGATE']), async (req: AuthRequest, res: Response) => {
  try {
    const { votingAssemblyId, registeredVoters, actualVoters, unusedBallots, nullVotes, blankVotes, votes, minutesPhotoUrl } = req.body;

    if (!votingAssemblyId || registeredVoters === undefined || actualVoters === undefined) {
      return res.status(400).json({ error: 'votingAssemblyId, registeredVoters e actualVoters são obrigatórios' });
    }

    // Validate voting assembly exists
    const votingAssembly = await prisma.votingAssembly.findUnique({
      where: { id: votingAssemblyId },
    });

    if (!votingAssembly) {
      return res.status(404).json({ error: 'Assembleia de voto não encontrada' });
    }

    // Check if submission already exists for this assembly
    const existingSubmission = await prisma.dataSubmission.findUnique({
      where: { votingAssemblyId },
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'Já existe uma submissão para esta assembleia de voto' });
    }

    // Create data submission
    const submission = await prisma.dataSubmission.create({
      data: {
        userId: req.user!.id,
        votingAssemblyId,
        registeredVoters: parseInt(registeredVoters),
        actualVoters: parseInt(actualVoters),
        unusedBallots: parseInt(unusedBallots) || 0,
        nullVotes: parseInt(nullVotes) || 0,
        blankVotes: parseInt(blankVotes) || 0,
        minutesPhotoUrl: minutesPhotoUrl || null,
        status: 'PENDING',
      },
    });

    // Add votes for each party
    if (votes && Array.isArray(votes)) {
      for (const vote of votes) {
        if (vote.partyId && vote.voteCount !== undefined) {
          await prisma.vote.create({
            data: {
              dataSubmissionId: submission.id,
              partyId: vote.partyId,
              voteCount: parseInt(vote.voteCount),
            },
          });
        }
      }
    }

    // Fetch the complete submission with votes
    const completeSubmission = await prisma.dataSubmission.findUnique({
      where: { id: submission.id },
      include: {
        votes: {
          include: { party: true },
        },
        votingAssembly: true,
      },
    });

    res.status(201).json(completeSubmission);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all submissions
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const submissions = await prisma.dataSubmission.findMany({
      include: {
        votes: {
          include: { party: true },
        },
        votingAssembly: {
          include: { circle: true },
        },
        user: true,
      },
    });

    res.json(submissions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get submission by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const submission = await prisma.dataSubmission.findUnique({
      where: { id },
      include: {
        votes: {
          include: { party: true },
        },
        votingAssembly: {
          include: { circle: true },
        },
        user: true,
      },
    });

    if (!submission) {
      return res.status(404).json({ error: 'Submissão não encontrada' });
    }

    res.json(submission);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify submission (admin only)
router.put('/:id/verify', authenticateToken, authorizeRole(['ADMIN', 'PARTY_LEADER']), async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido. Deve ser VERIFIED ou REJECTED' });
    }

    const submission = await prisma.dataSubmission.update({
      where: { id },
      data: { status },
      include: {
        votes: {
          include: { party: true },
        },
      },
    });

    res.json(submission);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

