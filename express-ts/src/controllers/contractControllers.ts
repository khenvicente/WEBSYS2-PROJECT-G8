// contractController.ts
import { Request, Response } from 'express';
import { contractQueries, customerQueries, familiarQueries } from '../db/queries';
import { Customer, Familiar } from '../db/types';

export const ContractController = {
  // ---------------------------------------------------------
  // GET ALL CONTRACTS
  // ---------------------------------------------------------
  async getContracts(req: Request, res: Response) {
    try {
      const contracts = await contractQueries.findAllWithDetails();

      res.status(200).json(contracts);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch contracts.' });
    }
  },

  // ---------------------------------------------------------
  // CREATE CONTRACT
  // ---------------------------------------------------------
  async createContract(req: Request, res: Response) {
    const { customerId } = req.body;

    try {
      // 1. Check if customer exists
      let customer;
      try {
        customer = await customerQueries.findById(customerId);
      } catch (err) {
        return res.status(404).json({ message: 'Customer not found.' });
      }

      // 2. Ensure customer has assigned group
      if (!customer.GroupID) {
        return res.status(400).json({ message: 'Customer has no assigned group.' });
      }

      // 3. Ensure customer has NO ACTIVE CONTRACT
      const existingContracts = await contractQueries.findByCustomer(customerId);
      const activeContract = existingContracts.find(c => c.status === 'active');

      if (activeContract) {
        return res.status(400).json({ message: 'Customer already has an active contract.' });
      }

      // 4. Fetch familiars in the customer's group
      const familiars = await familiarQueries.findByGroup(customer.GroupID);

      if (familiars.length === 0) {
        return res.status(400).json({ message: 'No familiars available in this group.' });
      }

      // -------------------------------------------------------
      // CONTRACT FORMATION ATTEMPT
      // -------------------------------------------------------
      for (const familiar of familiars) {
        const accepted = rollContractChance(customer, familiar);

        if (accepted) {
          // Create contract
          const newContract = await contractQueries.create({
            CustomerID: customerId,
            FamiliarID: familiar.FamiliarID,
            status: 'active'
          });

          return res.status(201).json({
            message: `Contract formed successfully with familiar: ${familiar.name}`,
            contract: newContract
          });
        }
      }

      // If loop ends → NO familiar accepted the contract
      return res.status(200).json({
        message: 'No familiars accepted the contract. No contract formed.',
        contract: null
      });

    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create contract.' });
    }
  },

  // ---------------------------------------------------------
  // GET CONTRACT BY ID
  // ---------------------------------------------------------
  async getContractById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const contract = await contractQueries.findWithDetails(parseInt(id));
      res.status(200).json(contract);
    } catch (error: any) {
      console.error(error);
      res.status(404).json({ message: 'Contract not found.' });
    }
  },

  // ---------------------------------------------------------
  // UPDATE CONTRACT STATUS
  // ---------------------------------------------------------
  async updateContract(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedContract = await contractQueries.update(parseInt(id), { status });
      res.status(200).json({
        message: 'Contract updated successfully',
        contract: updatedContract
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update contract.' });
    }
  },

  // ---------------------------------------------------------
  // DELETE CONTRACT
  // ---------------------------------------------------------
  async deleteContract(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await contractQueries.delete(parseInt(id));
      res.status(200).json({ message: 'Contract deleted successfully' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete contract.' });
    }
  }
};

// ---------------------------------------------------------
// CONTRACT CHANCE FUNCTION
// (Modify logic however you prefer)
// ---------------------------------------------------------
function rollContractChance(customer: Customer, familiar: Familiar): boolean {
  // Basic example: 50% acceptance chance
  const chance = 0.5;

  return Math.random() < chance;
}

export default ContractController;