
import { test, expect, Page } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

const EMAIL = process.env.TEST_EMAIL!
const PASSWORD = process.env.TEST_PASSWORD!

async function login(page: Page) {

  await page.goto('/login')

  await page.getByPlaceholder('Email').fill(EMAIL)
  await page.getByPlaceholder('Password').fill(PASSWORD)

  await page.getByRole('button', { name: /login/i }).click()

  await page.waitForLoadState('networkidle')

  await expect(
    page.getByRole('heading', { name: 'Add Transaction' })
  ).toBeVisible({ timeout: 10000 })

}

/* -----------------------------
   AUTH TESTS
-------------------------------- */

test.describe('Authentication pages', () => {

  test('login page loads', async ({ page }) => {

    await page.goto('/login')

    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()

  })

  test('dashboard redirects to login when user is not authenticated', async ({ page }) => {

    await page.goto('/')

    await expect(page).toHaveURL(/login/)

  })

  test('login form fields are visible', async ({ page }) => {

    await page.goto('/login')

    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toBeVisible()

  })

})

/* -----------------------------
   ADD TRANSACTION
-------------------------------- */

test('user can add transaction', async ({ page }) => {

  await login(page)

  await page.getByPlaceholder('Amount').fill('500')

  await page.getByRole('button', { name: 'Add Transaction' }).click()

  await expect(
     page.locator('tbody tr').first()
).toContainText('₹500')
})

/* -----------------------------
   EDIT TRANSACTION
-------------------------------- */

test('user can edit transaction', async ({ page }) => {

  await login(page)

  await page.locator('button:has-text("✏️")').first().click()

  const amountInput = page.locator('input').first()

  await amountInput.fill('700')

  await page.getByRole('button', { name: 'Save' }).click()

  await expect(
    page.getByRole('cell', { name: '₹700' })
  ).toBeVisible()

})

/* -----------------------------
   DELETE TRANSACTION
-------------------------------- */

test('user can delete transaction', async ({ page }) => {

  await login(page)

  const firstRow = page.locator('tbody tr').first()

  const amountText = await firstRow.locator('td').nth(3).innerText()

  page.once('dialog', dialog => dialog.accept())

  await firstRow.locator('button:has-text("🗑")').click()

  // wait for reload triggered by delete
  await page.waitForLoadState('networkidle')

  // verify the deleted amount is no longer present
  await expect(page.locator(`tbody >> text=${amountText}`)).toHaveCount(0)

})

/* -----------------------------
   LOGOUT SECURITY TEST
-------------------------------- */

test('user logout blocks dashboard access', async ({ page }) => {

  await login(page)

  await page.getByRole('button', { name: /logout/i }).click()

  await page.waitForTimeout(1000)

  await page.goto('/')

  await expect(page).toHaveURL(/login/)

})

