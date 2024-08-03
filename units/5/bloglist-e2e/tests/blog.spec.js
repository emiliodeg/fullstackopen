const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helpers')

describe('Blog app', () => {
  const userDTO = {
    username: 'test',
    name: 'test',
    password: 'test',
  }

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    const response = await request.post('/api/users', { data: userDTO })
    expect(response.ok()).toBeTruthy()
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, userDTO.username, userDTO.password)

      await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(
        page,
        userDTO.username + 'incorrect',
        userDTO.password + 'incorrect',
      )

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, userDTO.username, userDTO.password)
      await expect(page.getByText(`${userDTO.name} logged in`)).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'new title blog',
        author: 'new author',
        url: 'http://new.url',
      }

      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill(blog.title)
      await page.getByTestId('author').fill(blog.author)
      await page.getByTestId('url').fill(blog.url)

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText(`new blog added: ${blog.title}`),
      ).toBeVisible()
      await expect(
        page.getByTestId('blogs').getByText(blog.title, { exact: true }),
      ).toBeVisible()
      await expect(page.getByText(blog.author, { exact: true })).toBeVisible()
    })
  })
})
