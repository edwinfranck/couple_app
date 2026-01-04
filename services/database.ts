import * as SQLite from 'expo-sqlite';

export interface Moment {
    id: number;
    title: string;
    location: string;
    context: string;
    date: string; // ISO date string
    companion: string;
    pleasureRating: number; // 1-10
    comfortRating: number; // 1-10
    audacityRating: number; // 1-10
    topTags: string; // JSON array of selected tags
    flopTags: string; // JSON array of selected tags
    personalNotes?: string;
    toRenew: 'yes' | 'no' | null;
    createdAt: string;
}

class DatabaseService {
    private db: SQLite.SQLiteDatabase | null = null;

    async init() {
        try {
            this.db = await SQLite.openDatabaseAsync('moments.db');
            await this.createTables();
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    private async createTables() {
        if (!this.db) throw new Error('Database not initialized');

        await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS moments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        context TEXT NOT NULL,
        date TEXT NOT NULL,
        companion TEXT NOT NULL,
        pleasureRating INTEGER NOT NULL CHECK(pleasureRating BETWEEN 1 AND 10),
        comfortRating INTEGER NOT NULL CHECK(comfortRating BETWEEN 1 AND 10),
        audacityRating INTEGER NOT NULL CHECK(audacityRating BETWEEN 1 AND 10),
        topTags TEXT NOT NULL DEFAULT '[]',
        flopTags TEXT NOT NULL DEFAULT '[]',
        personalNotes TEXT,
        toRenew TEXT CHECK(toRenew IN ('yes', 'no')),
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    }

    async getAllMoments(): Promise<Moment[]> {
        if (!this.db) throw new Error('Database not initialized');

        const result = await this.db.getAllAsync<Moment>(
            'SELECT * FROM moments ORDER BY date DESC, createdAt DESC'
        );
        return result;
    }

    async getMomentById(id: number): Promise<Moment | null> {
        if (!this.db) throw new Error('Database not initialized');

        const result = await this.db.getFirstAsync<Moment>(
            'SELECT * FROM moments WHERE id = ?',
            [id]
        );
        return result || null;
    }

    async addMoment(moment: Omit<Moment, 'id' | 'createdAt'>): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');

        const result = await this.db.runAsync(
            `INSERT INTO moments (title, location, context, date, companion, pleasureRating, comfortRating, audacityRating, topTags, flopTags, personalNotes, toRenew, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
            [
                moment.title,
                moment.location,
                moment.context,
                moment.date,
                moment.companion,
                moment.pleasureRating,
                moment.comfortRating,
                moment.audacityRating,
                moment.topTags,
                moment.flopTags,
                moment.personalNotes || null,
                moment.toRenew || null,
            ]
        );

        return result.lastInsertRowId;
    }

    async updateMoment(id: number, moment: Partial<Omit<Moment, 'id' | 'createdAt'>>): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const updates: string[] = [];
        const values: any[] = [];

        if (moment.title !== undefined) {
            updates.push('title = ?');
            values.push(moment.title);
        }
        if (moment.location !== undefined) {
            updates.push('location = ?');
            values.push(moment.location);
        }
        if (moment.context !== undefined) {
            updates.push('context = ?');
            values.push(moment.context);
        }
        if (moment.date !== undefined) {
            updates.push('date = ?');
            values.push(moment.date);
        }
        if (moment.companion !== undefined) {
            updates.push('companion = ?');
            values.push(moment.companion);
        }
        if (moment.pleasureRating !== undefined) {
            updates.push('pleasureRating = ?');
            values.push(moment.pleasureRating);
        }
        if (moment.comfortRating !== undefined) {
            updates.push('comfortRating = ?');
            values.push(moment.comfortRating);
        }
        if (moment.audacityRating !== undefined) {
            updates.push('audacityRating = ?');
            values.push(moment.audacityRating);
        }
        if (moment.topTags !== undefined) {
            updates.push('topTags = ?');
            values.push(moment.topTags);
        }
        if (moment.flopTags !== undefined) {
            updates.push('flopTags = ?');
            values.push(moment.flopTags);
        }
        if (moment.personalNotes !== undefined) {
            updates.push('personalNotes = ?');
            values.push(moment.personalNotes);
        }
        if (moment.toRenew !== undefined) {
            updates.push('toRenew = ?');
            values.push(moment.toRenew);
        }

        if (updates.length === 0) return;

        values.push(id);
        await this.db.runAsync(
            `UPDATE moments SET ${updates.join(', ')} WHERE id = ?`,
            values
        );
    }

    async deleteMoment(id: number): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');
        await this.db.runAsync('DELETE FROM moments WHERE id = ?', [id]);
    }

    async getStats() {
        if (!this.db) throw new Error('Database not initialized');

        const stats = await this.db.getFirstAsync<{
            total: number;
            avgPleasure: number;
            avgComfort: number;
            avgAudacity: number;
        }>(`
      SELECT 
        COUNT(*) as total,
        AVG(pleasureRating) as avgPleasure,
        AVG(comfortRating) as avgComfort,
        AVG(audacityRating) as avgAudacity
      FROM moments
    `);

        const topLocations = await this.db.getAllAsync<{ location: string; count: number }>(`
      SELECT location, COUNT(*) as count
      FROM moments
      GROUP BY location
      ORDER BY count DESC
      LIMIT 3
    `);

        return {
            total: stats?.total || 0,
            avgPleasure: stats?.avgPleasure || 0,
            avgComfort: stats?.avgComfort || 0,
            avgAudacity: stats?.avgAudacity || 0,
            topLocations: topLocations || [],
        };
    }
}

export const database = new DatabaseService();
