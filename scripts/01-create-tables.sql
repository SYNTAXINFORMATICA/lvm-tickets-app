-- DoctuxDB - Schema for Technical Support System
-- PostgreSQL Database Schema

-- Users table with authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('administrador', 'analista', 'ingeniero')),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  application VARCHAR(50) NOT NULL CHECK (application IN ('SharePoint Online', 'Facturador')),
  area VARCHAR(100) NOT NULL,
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('Urgente', 'Media', 'Normal')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('abierto', 'cerrado')),
  support_level INTEGER NOT NULL DEFAULT 1 CHECK (support_level IN (1, 2)),
  created_by INTEGER NOT NULL REFERENCES users(id),
  assigned_to INTEGER REFERENCES users(id),
  resolution TEXT,
  ai_analysis TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP,
  closed_by INTEGER REFERENCES users(id)
);

-- Ticket history for audit trail
CREATE TABLE IF NOT EXISTS ticket_history (
  id SERIAL PRIMARY KEY,
  ticket_id INTEGER NOT NULL REFERENCES tickets(id),
  action VARCHAR(100) NOT NULL,
  changed_by INTEGER NOT NULL REFERENCES users(id),
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_by ON tickets(created_by);
CREATE INDEX IF NOT EXISTS idx_tickets_application ON tickets(application);
CREATE INDEX IF NOT EXISTS idx_tickets_area ON tickets(area);
CREATE INDEX IF NOT EXISTS idx_ticket_history_ticket_id ON ticket_history(ticket_id);
