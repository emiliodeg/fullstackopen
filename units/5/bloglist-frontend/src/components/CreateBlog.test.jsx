import { screen, render } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'


test('check if after create a new blog is getting the right params', async () => {
  const mockHandler = vi.fn()

  render(<CreateBlog addBlog={mockHandler} />)

  const user = userEvent.setup()
  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'Component testing')
  await user.type(inputs[1], 'stephen king')
  await user.type(inputs[2], 'https://king.test')

  const button = screen.getByText('create')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Component testing')
  expect(mockHandler.mock.calls[0][0].author).toBe('stephen king')
  expect(mockHandler.mock.calls[0][0].url).toBe('https://king.test')
})
