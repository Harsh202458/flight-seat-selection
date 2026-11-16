import type { LayoutConfig } from '../types';

export const layout32: LayoutConfig = {
  id: '3-2',
  name: '3–2 Configuration',
  groups: [
    { columns: ['A', 'B', 'C'] },
    { columns: ['D', 'E'] },
  ],
  totalRows: 12,
};

export const layout232: LayoutConfig = {
  id: '2-3-2',
  name: '2–3–2 Configuration',
  groups: [
    { columns: ['A', 'B'] },
    { columns: ['D', 'E', 'F'] },
    { columns: ['G', 'H'] },
  ],
  totalRows: 12,
};

export const layouts: LayoutConfig[] = [layout32, layout232];
