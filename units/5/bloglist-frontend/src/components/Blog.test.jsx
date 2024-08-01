import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author',
    url: 'https://url.test',
    likes: 13,
  }

  render(<Blog blog={blog} />)

  screen.getByText(blog.title)
  screen.getByText(blog.author)
})

test('show url and number of likes', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author',
    url: 'https://url.test',
    likes: 13,
  }

  render(<Blog blog={blog} />)

  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(blog.likes)

  expect(url).toBeNull()
  expect(likes).toBeNull()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText(blog.url)
  screen.getByText(blog.likes, { exact: false })
})
