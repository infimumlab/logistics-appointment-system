import { Router, Response } from 'express';
import pool from '../config/database';
import { AuthRequest, authMiddleware, roleMiddleware } from '../middleware/auth';
import { InventoryItem } from '../types';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_items ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, roleMiddleware('admin', 'warehouse_staff'), async (req: AuthRequest, res: Response) => {
  try {
    const { name, quantity } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Item name required' });
      return;
    }

    const result = await pool.query(
      'INSERT INTO inventory_items (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, roleMiddleware('admin', 'warehouse_staff'), async (req: AuthRequest, res: Response) => {
  try ​{
    const { id } = req.params;
    const { name, quantity } = req.body;

    const result = await pool.query(
      'UPDATE inventory_items SET name = COALESCE($1, name), quantity = COALESCE($2, quantity), updated_at = NOW() WHERE id = $3 RETURNING *',
      [name || null, quantity !== undefined ? quantity : null, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
