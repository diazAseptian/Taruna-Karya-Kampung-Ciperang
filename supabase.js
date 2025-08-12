const SUPABASE_URL = 'https://poogckcmpbipeqfvaczq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2dja2NtcGJpcGVxZnZhY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5Nzc5NzIsImV4cCI6MjA3MDU1Mzk3Mn0.v9H3oHBRoqGUptKPnUjOG205ri2fsMmfGi313wf0SzI';

class SupabaseClient {
    constructor() {
        this.url = SUPABASE_URL;
        this.key = SUPABASE_ANON_KEY;
        this.initializeTable();
    }

    async initializeTable() {
        try {
            // Check if table exists by trying to select from it
            await this.select('articles', '*', '?limit=1');
        } catch (error) {
            console.log('Table might not exist, will use localStorage fallback');
        }
    }

    async request(endpoint, options = {}) {
        const url = `${this.url}/rest/v1/${endpoint}`;
        const headers = {
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
            ...options.headers
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async select(table, columns = '*', params = '') {
        return this.request(`${table}?select=${columns}${params}`);
    }

    async insert(table, data) {
        return this.request(table, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async update(table, id, data) {
        return this.request(`${table}?id=eq.${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    async delete(table, id) {
        return this.request(`${table}?id=eq.${id}`, {
            method: 'DELETE'
        });
    }
}

const supabase = new SupabaseClient();