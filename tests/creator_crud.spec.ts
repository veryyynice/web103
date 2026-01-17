import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173'; // Ensure this matches your running Vite port

test('Full CRUD Flow: Create, Read, Update, and Delete a Creator', async ({ page }) => {
  // Generate a random name so we don't confuse this with existing data
  const testName = `Test User ${Date.now()}`;
  const updatedName = `${testName} - EDITED`;

  // --------------------------------------------------------
  // 1. CREATE (Add a new creator)
  // --------------------------------------------------------
  console.log('Step 1: Navigating to Add Creator page...');
  await page.goto(LOCALHOST_URL);
  
  // Find the "Add Creator" button and click it
  // We use getByRole for better accessibility, but getByText works too
  await page.getByRole('link', { name: /Add.*Creator/i }).click();

  // Ensure we are on the /new page
  await expect(page).toHaveURL(/.*\/new/);

  // Fill out the form
  console.log(`Step 1b: Creating creator named "${testName}"...`);
  await page.getByLabel('Name').fill(testName);  await page.getByLabel('Channel URL').fill('https://playwright.dev');
  await page.getByLabel('Description').fill('This is a test creator created by an automated robot 🤖');  
  // Submit
  await page.getByRole('button', { name: /Submit/i }).click();

  // --------------------------------------------------------
  // 2. READ (Verify it appears on Home)
  // --------------------------------------------------------
  console.log('Step 2: Verifying creator is on the home page...');
  
  // Wait for redirect to home
  await expect(page).toHaveURL(LOCALHOST_URL + '/');
  
  // Check if our new card is visible
  // We verify the text matches the unique name we just made
  await expect(page.getByText(testName)).toBeVisible();

  // --------------------------------------------------------
  // 3. UPDATE (Edit the creator)
  // --------------------------------------------------------
  console.log('Step 3: Editing the creator...');
  
  // Click the "Edit" button specifically for our new card
  // We first find the card by text, then find the Edit button inside/near it
  // (Simplest way: click the 'Edit' link that points to the ID)
  
  // Strategy: Click the "Edit" button inside the card that contains our text
  // This locates the card containing 'testName', then finds the 'Edit' button inside it
  await page.locator('.Card', { hasText: testName }).getByRole('link', { name: 'Edit' }).click();

  // Change the name
  await page.getByLabel(/Name/i).fill(updatedName);
  
  // Click Update
  await page.getByRole('button', { name: /Update/i }).click();

  // Verify we are back home and the name changed
  await expect(page).toHaveURL(LOCALHOST_URL + '/');
  await expect(page.getByText(updatedName)).toBeVisible();
  await expect(page.getByText(testName)).not.toBeVisible(); // Old name should be gone

  // --------------------------------------------------------
  // 4. DELETE (Remove the creator)
  // --------------------------------------------------------
  console.log('Step 4: Deleting the creator...');
  
  // Go back to the Edit page for this user
  await page.locator('.Card', { hasText: updatedName }).getByRole('link', { name: 'Edit' }).click();

  // Listen for the "window.confirm" dialog and accept it automatically
  page.on('dialog', dialog => dialog.accept());

  // Click Delete
  await page.getByRole('button', { name: /Delete/i }).click();

  // Verify it's gone from home
  await expect(page).toHaveURL(LOCALHOST_URL + '/');
  await expect(page.getByText(updatedName)).not.toBeVisible();
  
  console.log('✅ Test Passed: Creator was successfully created, read, updated, and deleted.');
});