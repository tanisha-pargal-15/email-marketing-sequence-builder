const express = require('express');
const auth = require('../middleware/auth');

module.exports = (agenda) => {
  const router = express.Router();

  router.post('/save-flow', auth, async (req, res) => {
    const { nodes, edges } = req.body;

    try {
      const nodeMap = new Map(nodes.map(n => [n.id, n]));
      const adjacencyMap = new Map();

      // Build graph connections
      for (let edge of edges) {
        if (!adjacencyMap.has(edge.source)) {
          adjacencyMap.set(edge.source, []);
        }
        adjacencyMap.get(edge.source).push(edge.target);
      }

      // Find the starting node
      const leadNode = nodes.find((n) => n.type === 'leadSource');
      if (!leadNode) {
        return res.status(400).json({ message: 'Flow must start with a Lead Source node.' });
      }

      const leadEmail = leadNode.data.leadEmail;
      if (!leadEmail) {
        return res.status(400).json({ message: 'Lead email is required.' });
      }

      const traverseAndSchedule = async (nodeId, accumulatedDelay = 0) => {
        const node = nodeMap.get(nodeId);
        if (!node) return;

        if (node.type === 'coldEmail') {
          const { subject, body } = node.data;
          await agenda.schedule(`${accumulatedDelay} minutes`, 'send-email', {
            to: leadEmail,
            subject,
            text: body,
          });
        }

        const nextIds = adjacencyMap.get(nodeId) || [];
        for (let nextId of nextIds) {
          const nextNode = nodeMap.get(nextId);
          if (!nextNode) continue;

          if (nextNode.type === 'delay') {
            const delayMinutes = parseInt(nextNode.data.delay || '0');
            const afterDelay = adjacencyMap.get(nextId) || [];
            for (let childId of afterDelay) {
              await traverseAndSchedule(childId, accumulatedDelay + delayMinutes);
            }
          } else {
            await traverseAndSchedule(nextId, accumulatedDelay);
          }
        }
      };

      const firstTarget = edges.find(e => e.source === leadNode.id)?.target;
      if (!firstTarget) {
        return res.status(400).json({ message: 'Lead Source must connect to another node.' });
      }

      await traverseAndSchedule(firstTarget, 0);

      res.status(200).json({ message: '✅ Flow scheduled successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '❌ Failed to schedule flow' });
    }
  });

  return router;
};
