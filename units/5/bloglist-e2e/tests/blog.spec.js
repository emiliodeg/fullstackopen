const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/user', {
      data: {
        username: 'test',
        name: 'test',
        password: 'test',
      },
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('test')
      await page.getByRole('textbox').last().fill('test')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('test logged in')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('user name is wrong')
      await page.getByRole('textbox').last().fill('wrong password')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
})
