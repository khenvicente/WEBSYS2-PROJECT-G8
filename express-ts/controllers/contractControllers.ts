// contractController.ts
import { Request, Response } from 'express';
import { Contract } from '../models/contract';
import { Customer } from '../models/customer';
import { Familiar } from '../models/familiar';
import { Group } from '../models/group';

export const ContractController = {
  // ---------------------------------------------------------
  // GET ALL CONTRACTS
  // ---------------------------------------------------------
  async getContracts(req: Request, res: Response) {
    try {
      const contracts = await Contract.findAll({
      include: [
        { model: Customer, as: 'customer' },
        { model: Familiar, as: 'familiar' }
      ]
      });

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
      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }

      // 2. Ensure customer has assigned group
      if (!customer.GroupID) {
        return res.status(400).json({ message: 'Customer has no assigned group.' });
      }

      // 3. Ensure customer has NO ACTIVE CONTRACT
      const existingContract = await Contract.findOne({
        where: { CustomerID: customerId, status: 'active' }
      });

      if (existingContract) {
        return res.status(400).json({ message: 'Customer already has an active contract.' });
      }

      // 4. Fetch familiars in the customer's group
      const familiars = await Familiar.findAll({
        where: { GroupID: customer.GroupID }
      });

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
          const newContract = await Contract.create({
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
