import express, { Request, Response } from 'express';
import { prisma } from '../server';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Calculate and get national results
router.get('/national', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    // Get all verified submissions
    const submissions = await prisma.dataSubmission.findMany({
      where: { status: 'VERIFIED' },
      include: {
        votes: {
          include: { party: true },
        },
        votingAssembly: {
          include: { circle: true },
        },
      },
    });

    // Calculate totals by party
    const partyTotals: { [key: string]: { name: string; acronym: string; votes: number } } = {};

    for (const submission of submissions) {
      for (const vote of submission.votes) {
        if (!partyTotals[vote.partyId]) {
          partyTotals[vote.partyId] = {
            name: vote.party.name,
            acronym: vote.party.acronym,
            votes: 0,
          };
        }
        partyTotals[vote.partyId].votes += vote.voteCount;
      }
    }

    // Calculate total votes and percentages
    const totalVotes = Object.values(partyTotals).reduce((sum, party) => sum + party.votes, 0);

    const results = Object.entries(partyTotals).map(([partyId, data]) => ({
      partyId,
      name: data.name,
      acronym: data.acronym,
      totalVotes: data.votes,
      percentage: totalVotes > 0 ? ((data.votes / totalVotes) * 100).toFixed(2) : '0.00',
    }));

    // Sort by votes descending
    results.sort((a, b) => b.totalVotes - a.totalVotes);

    res.json({
      totalVotes,
      submissionsCount: submissions.length,
      results,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get results by circle
router.get('/circle/:circleId', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { circleId } = req.params;

    // Get all verified submissions for this circle
    const submissions = await prisma.dataSubmission.findMany({
      where: {
        status: 'VERIFIED',
        votingAssembly: {
          circleId,
        },
      },
      include: {
        votes: {
          include: { party: true },
        },
        votingAssembly: true,
      },
    });

    // Calculate totals by party
    const partyTotals: { [key: string]: { name: string; acronym: string; votes: number } } = {};

    for (const submission of submissions) {
      for (const vote of submission.votes) {
        if (!partyTotals[vote.partyId]) {
          partyTotals[vote.partyId] = {
            name: vote.party.name,
            acronym: vote.party.acronym,
            votes: 0,
          };
        }
        partyTotals[vote.partyId].votes += vote.voteCount;
      }
    }

    // Calculate total votes and percentages
    const totalVotes = Object.values(partyTotals).reduce((sum, party) => sum + party.votes, 0);

    const results = Object.entries(partyTotals).map(([partyId, data]) => ({
      partyId,
      name: data.name,
      acronym: data.acronym,
      totalVotes: data.votes,
      percentage: totalVotes > 0 ? ((data.votes / totalVotes) * 100).toFixed(2) : '0.00',
    }));

    // Sort by votes descending
    results.sort((a, b) => b.totalVotes - a.totalVotes);

    // Get circle info
    const circle = await prisma.electoralCircle.findUnique({
      where: { id: circleId },
    });

    res.json({
      circle: circle ? { id: circle.id, name: circle.name, deputies: circle.deputies } : null,
      totalVotes,
      submissionsCount: submissions.length,
      results,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get coverage statistics
router.get('/coverage/stats', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    // Total voting assemblies
    const totalAssemblies = await prisma.votingAssembly.count();

    // Submitted assemblies
    const submittedAssemblies = await prisma.dataSubmission.count();

    // Verified submissions
    const verifiedSubmissions = await prisma.dataSubmission.count({
      where: { status: 'VERIFIED' },
    });

    // Pending submissions
    const pendingSubmissions = await prisma.dataSubmission.count({
      where: { status: 'PENDING' },
    });

    // Rejected submissions
    const rejectedSubmissions = await prisma.dataSubmission.count({
      where: { status: 'REJECTED' },
    });

    const coverage = totalAssemblies > 0 ? ((submittedAssemblies / totalAssemblies) * 100).toFixed(2) : '0.00';

    res.json({
      totalAssemblies,
      submittedAssemblies,
      verifiedSubmissions,
      pendingSubmissions,
      rejectedSubmissions,
      coveragePercentage: coverage,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

