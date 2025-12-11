
export interface Wizard {
  WizardID: number;
  name: string;
}

export interface FamiliarGroup {
  GroupID: number;
  WizardID: number; // FK -> Wizard.WizardID
  price: number;
  species_type: string;
  size_range: string;
  color_theme: string;
  pattern_type: string;
  personality_type: string;
  rarity_tier: string;
  primary_typing: string;
  secondary_typing?: string | null;
}

export interface Customer {
  CustomerID: number;
  GroupID?: number | null; // FK -> Group.GroupID
  name: string;
  email?: string; // optional if you want to keep it
}

export interface Familiar {
  FamiliarID: number;
  GroupID: number; // FK -> Group.GroupID
  name: string;
  species: string;
  size: string;
  color: string;
  pattern: string;
  personality: string;
  rarity: string;
  typing: string;
  typing2?: string | null;
}

export interface Contract {
  ContractID: number;
  CustomerID: number; // FK -> Customer.CustomerID
  FamiliarID: number; // FK -> Familiar.FamiliarID
  status: string;
  created_at: string | Date;
  updated_at?: string | Date;
}
