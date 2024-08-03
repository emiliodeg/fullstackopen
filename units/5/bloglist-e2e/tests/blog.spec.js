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

    test('a new blog can be liked', async ({ page }) => {
      const blog = {
        title: 'to be liked',
        author: 'author i love',
        url: 'http://love.url',
      }

      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill(blog.title)
      await page.getByTestId('author').fill(blog.author)
      await page.getByTestId('url').fill(blog.url)

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText(`new blog added: ${blog.title}`),
      ).toBeVisible()
      page
        .getByTestId('blogs')
        .getByText(blog.title, { exact: true })
        .locator('..')
        .getByRole('button', { name: 'view' })
        .click(),
      page.getByTestId('blogs').getByRole('button', { name: 'like' }).click(),
      await expect(page.getByText('like saved')).toBeVisible()
    })

    test('create and delete a blog', async ({ page }) => {
      const blog = {
        title: 'to be deleted',
        author: 'author i do not like',
        url: 'http://dontlike.url',
      }

      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill(blog.title)
      await page.getByTestId('author').fill(blog.author)
      await page.getByTestId('url').fill(blog.url)

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText(`new blog added: ${blog.title}`),
      ).toBeVisible()

      await page
        .getByTestId('blogs')
        .getByText(blog.title, { exact: true })
        .locator('..')
        .getByRole('button', { name: 'view' })
        .click(),
      page.on('dialog', (dialog) => dialog.accept())

      await page
        .getByTestId('blogs')
        .getByRole('button', { name: 'remove' })
        .click(),
      await expect(
        page.getByTestId('blogs').getByText(blog.title),
      ).not.toBeVisible()
      await expect(page.getByText('blog deleted')).toBeVisible()
    })

    test('not able to delete a blog that you did not create', async ({
      page,
      request,
    }) => {
      const blog = {
        title: 'blog created by another user',
        author: 'author',
        url: 'http://another.url',
      }

      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill(blog.title)
      await page.getByTestId('author').fill(blog.author)
      await page.getByTestId('url').fill(blog.url)

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText(`new blog added: ${blog.title}`),
      ).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()

      const user = {
        username: 'other',
        name: 'other',
        password: 'other',
      }

      await request.post('/api/users', { data: user })
      loginWith(page, user.username, user.password)

      await expect(
        page.getByTestId('blogs').getByText(blog.title),
      ).toBeVisible()

      await page
        .getByTestId('blogs')
        .getByText(blog.title)
        .locator('..')
        .getByRole('button', { name: 'view' })
        .click()

      await expect(
        page
          .getByTestId('blogs')
          .getByText(blog.title)
          .getByRole('button', { name: 'remove' }),
      ).not.toBeVisible()
    })

    test('blogs sorted by likes', async ({ page }) => {
      const blogs = [
        {
          title: 'empty liquid review exactly money',
          author: 'John Logan',
          url: 'http://another.url',
        },
        {
          title: 'aloud sure there perfectly surface',
          author: 'Dennis Daniels',
          url: 'http://love.url',
        },
        {
          title: 'gate pale almost pair instrument two dead',
          author: 'Olga Holt',
          url: 'http://dontlike.url',
        },
      ]

      for (const blog of blogs) {
        await page.getByRole('button', { name: 'new blog' }).click()

        await page.getByTestId('title').fill(blog.title)
        await page.getByTestId('author').fill(blog.author)
        await page.getByTestId('url').fill(blog.url)

        await page.getByRole('button', { name: 'create' }).click()
        await page.waitForResponse(
          (res) => res.url().includes('/api/blogs') && res.status() === 201,
        )
      }

      await page
        .locator('li')
        .filter({ hasText: blogs[0].title })
        .getByRole('button')
        .click()

      await page
        .locator('li')
        .filter({ hasText: blogs[1].title })
        .getByRole('button')
        .click()

      await page
        .locator('li')
        .filter({ hasText: blogs[2].title })
        .getByRole('button')
        .click()

      const second = page.getByRole('button', { name: 'like' }).nth(1)

      await second.click()
      await second.click()

      const last = page.getByRole('button', { name: 'like' }).last()

      await last.click()

      expect(page.locator('li').first()).toContainText(blogs[1].title)
      expect(page.locator('li').nth(1)).toContainText(blogs[2].title)
      expect(page.locator('li').last()).toContainText(blogs[0].title)
    })
  })
})
