export interface Wizard {
  WizardID: number;
  name: string;
  image?: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface Group {
  GroupID: number;
  WizardID?: number;
  price?: number;
  species?: string;
  size?: string;
  color?: string;
  pattern?: string;
  personality?: string;
  rarity?: string;
  typing?: any; // JSON/JSONB type
}

export interface Customer {
  CustomerID: number;
  GroupID?: number;
  name: string;
  image?: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface Familiar {
  FamiliarID: number;
  GroupID?: number;
  image?: string;
  name: string;
  species?: string;
  size?: string;
  color?: string;
  pattern?: string;
  personality?: string;
  rarity?: string;
  typing?: any; // JSON/JSONB type
}

export interface Contract {
  ContractID: number;
  CustomerID: number;
  FamiliarID: number;
  status?: string;
  created_at: Date;
  updated_at: Date;
}