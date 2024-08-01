import { render, screen } from '@testing-library/react'
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
