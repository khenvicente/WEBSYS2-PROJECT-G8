module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/seeders/**',
    '!src/db/supabase.ts'
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000,
  setupFiles: ['<rootDir>/jest.setup.js']  
};