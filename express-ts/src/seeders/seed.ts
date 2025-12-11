import dotenv from 'dotenv';
dotenv.config(); // Load .env file FIRST

import { supabase } from '../db/supabase';
import bcrypt from 'bcrypt';

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await supabase.from('contracts').delete().neq('ContractID', 0);
    await supabase.from('familiars').delete().neq('FamiliarID', 0);
    await supabase.from('customers').delete().neq('CustomerID', 0);
    await supabase.from('groups').delete().neq('GroupID', 0);
    await supabase.from('wizards').delete().neq('WizardID', 0);

    // Seed Wizards
    console.log('🧙 Creating wizards...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const { data: wizards, error: wizardError } = await supabase
      .from('wizards')
      .insert([
        {
          name: 'Merlin the Wise',
          email: 'merlin@magic.com',
          username: 'merlin',
          password: hashedPassword,
          role: 'wizard',
          image: 'https://i.pravatar.cc/150?img=1'
        },
        {
          name: 'Gandalf the Grey',
          email: 'gandalf@magic.com',
          username: 'gandalf',
          password: hashedPassword,
          role: 'wizard',
          image: 'https://i.pravatar.cc/150?img=2'
        },
        {
          name: 'Hermione Granger',
          email: 'hermione@magic.com',
          username: 'hermione',
          password: hashedPassword,
          role: 'wizard',
          image: 'https://i.pravatar.cc/150?img=3'
        },
        {
          name: 'Doctor Strange',
          email: 'strange@magic.com',
          username: 'drstrange',
          password: hashedPassword,
          role: 'wizard',
          image: 'https://i.pravatar.cc/150?img=4'
        }
      ])
      .select();

    if (wizardError) throw wizardError;
    console.log(`✅ Created ${wizards.length} wizards`);

    // Seed Groups
    console.log('👥 Creating groups...');
    const { data: groups, error: groupError } = await supabase
      .from('groups')
      .insert([
        {
          WizardID: wizards[0].WizardID,
          price: 100.00,
          species: 'Dragon',
          size: 'Large',
          color: 'Red',
          pattern: 'Scales',
          personality: 'Fierce',
          rarity: 'Legendary',
          typing: ['Fire', 'Flying']
        },
        {
          WizardID: wizards[0].WizardID,
          price: 50.00,
          species: 'Phoenix',
          size: 'Medium',
          color: 'Orange',
          pattern: 'Feathers',
          personality: 'Noble',
          rarity: 'Rare',
          typing: ['Fire', 'Healing']
        },
        {
          WizardID: wizards[1].WizardID,
          price: 75.00,
          species: 'Griffin',
          size: 'Large',
          color: 'Gold',
          pattern: 'Mixed',
          personality: 'Proud',
          rarity: 'Epic',
          typing: ['Flying', 'Normal']
        },
        {
          WizardID: wizards[2].WizardID,
          price: 30.00,
          species: 'Cat',
          size: 'Small',
          color: 'Orange',
          pattern: 'Striped',
          personality: 'Mischievous',
          rarity: 'Common',
          typing: ['Normal']
        },
        {
          WizardID: wizards[3].WizardID,
          price: 150.00,
          species: 'Unicorn',
          size: 'Large',
          color: 'White',
          pattern: 'Sparkles',
          personality: 'Gentle',
          rarity: 'Mythic',
          typing: ['Light', 'Magic']
        }
      ])
      .select();

    if (groupError) throw groupError;
    console.log(`✅ Created ${groups.length} groups`);

    // Seed Familiars
    console.log('🐉 Creating familiars...');
    const { data: familiars, error: familiarError } = await supabase
      .from('familiars')
      .insert([
        // Dragons (Group 1)
        {
          GroupID: groups[0].GroupID,
          name: 'Smaug',
          species: 'Dragon',
          size: 'Large',
          color: 'Red',
          pattern: 'Scales',
          personality: 'Fierce',
          rarity: 'Legendary',
          typing: ['Fire', 'Flying'],
          image: 'https://picsum.photos/200/200?random=1'
        },
        {
          GroupID: groups[0].GroupID,
          name: 'Drogon',
          species: 'Dragon',
          size: 'Large',
          color: 'Black',
          pattern: 'Scales',
          personality: 'Aggressive',
          rarity: 'Legendary',
          typing: ['Fire', 'Flying'],
          image: 'https://picsum.photos/200/200?random=2'
        },
        // Phoenix (Group 2)
        {
          GroupID: groups[1].GroupID,
          name: 'Fawkes',
          species: 'Phoenix',
          size: 'Medium',
          color: 'Orange',
          pattern: 'Feathers',
          personality: 'Noble',
          rarity: 'Rare',
          typing: ['Fire', 'Healing'],
          image: 'https://picsum.photos/200/200?random=3'
        },
        {
          GroupID: groups[1].GroupID,
          name: 'Ember',
          species: 'Phoenix',
          size: 'Medium',
          color: 'Red',
          pattern: 'Feathers',
          personality: 'Wise',
          rarity: 'Rare',
          typing: ['Fire', 'Healing'],
          image: 'https://picsum.photos/200/200?random=4'
        },
        // Griffin (Group 3)
        {
          GroupID: groups[2].GroupID,
          name: 'Buckbeak',
          species: 'Griffin',
          size: 'Large',
          color: 'Gold',
          pattern: 'Mixed',
          personality: 'Proud',
          rarity: 'Epic',
          typing: ['Flying', 'Normal'],
          image: 'https://picsum.photos/200/200?random=5'
        },
        // Cats (Group 4)
        {
          GroupID: groups[3].GroupID,
          name: 'Crookshanks',
          species: 'Cat',
          size: 'Small',
          color: 'Orange',
          pattern: 'Striped',
          personality: 'Mischievous',
          rarity: 'Common',
          typing: ['Normal'],
          image: 'https://picsum.photos/200/200?random=6'
        },
        {
          GroupID: groups[3].GroupID,
          name: 'Luna',
          species: 'Cat',
          size: 'Small',
          color: 'Black',
          pattern: 'Solid',
          personality: 'Curious',
          rarity: 'Common',
          typing: ['Normal'],
          image: 'https://picsum.photos/200/200?random=7'
        },
        // Unicorns (Group 5)
        {
          GroupID: groups[4].GroupID,
          name: 'Stardust',
          species: 'Unicorn',
          size: 'Large',
          color: 'White',
          pattern: 'Sparkles',
          personality: 'Gentle',
          rarity: 'Mythic',
          typing: ['Light', 'Magic'],
          image: 'https://picsum.photos/200/200?random=8'
        },
        {
          GroupID: groups[4].GroupID,
          name: 'Moonbeam',
          species: 'Unicorn',
          size: 'Large',
          color: 'Silver',
          pattern: 'Shimmer',
          personality: 'Serene',
          rarity: 'Mythic',
          typing: ['Light', 'Magic'],
          image: 'https://picsum.photos/200/200?random=9'
        }
      ])
      .select();

    if (familiarError) throw familiarError;
    console.log(`✅ Created ${familiars.length} familiars`);

    // Seed Customers
    console.log('👤 Creating customers...');
    const { data: customers, error: customerError } = await supabase
      .from('customers')
      .insert([
        {
          name: 'Harry Potter',
          email: 'harry@hogwarts.com',
          username: 'harry',
          password: hashedPassword,
          role: 'customer',
          GroupID: groups[0].GroupID,
          image: 'https://i.pravatar.cc/150?img=11'
        },
        {
          name: 'Ron Weasley',
          email: 'ron@hogwarts.com',
          username: 'ron',
          password: hashedPassword,
          role: 'customer',
          GroupID: groups[3].GroupID,
          image: 'https://i.pravatar.cc/150?img=12'
        },
        {
          name: 'Luna Lovegood',
          email: 'luna@hogwarts.com',
          username: 'luna',
          password: hashedPassword,
          role: 'customer',
          GroupID: groups[4].GroupID,
          image: 'https://i.pravatar.cc/150?img=13'
        },
        {
          name: 'Neville Longbottom',
          email: 'neville@hogwarts.com',
          username: 'neville',
          password: hashedPassword,
          role: 'customer',
          GroupID: groups[1].GroupID,
          image: 'https://i.pravatar.cc/150?img=14'
        },
        {
          name: 'Draco Malfoy',
          email: 'draco@hogwarts.com',
          username: 'draco',
          password: hashedPassword,
          role: 'customer',
          GroupID: groups[2].GroupID,
          image: 'https://i.pravatar.cc/150?img=15'
        }
      ])
      .select();

    if (customerError) throw customerError;
    console.log(`✅ Created ${customers.length} customers`);

    // Seed Contracts
    console.log('📜 Creating contracts...');
    const { data: contracts, error: contractError } = await supabase
      .from('contracts')
      .insert([
        {
          CustomerID: customers[0].CustomerID,
          FamiliarID: familiars[0].FamiliarID,
          status: 'active'
        },
        {
          CustomerID: customers[1].CustomerID,
          FamiliarID: familiars[5].FamiliarID,
          status: 'active'
        },
        {
          CustomerID: customers[2].CustomerID,
          FamiliarID: familiars[7].FamiliarID,
          status: 'active'
        },
        {
          CustomerID: customers[3].CustomerID,
          FamiliarID: familiars[2].FamiliarID,
          status: 'pending'
        },
        {
          CustomerID: customers[4].CustomerID,
          FamiliarID: familiars[4].FamiliarID,
          status: 'rejected'
        }
      ])
      .select();

    if (contractError) throw contractError;
    console.log(`✅ Created ${contracts.length} contracts`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${wizards.length} wizards`);
    console.log(`   - ${groups.length} groups`);
    console.log(`   - ${familiars.length} familiars`);
    console.log(`   - ${customers.length} customers`);
    console.log(`   - ${contracts.length} contracts`);
    console.log('\n🔑 Login credentials:');
    console.log('   Email: merlin@magic.com (wizard)');
    console.log('   Email: harry@hogwarts.com (customer)');
    console.log('   Password: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });