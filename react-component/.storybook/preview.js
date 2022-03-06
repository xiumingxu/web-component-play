import { initialize, mswDecorator } from 'msw-storybook-addon';
import {rest} from "msw";
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: {
      test: [rest.post('/posts', (req, res, ctx) => {
        // Persist user's authentication in the session
        sessionStorage.setItem('posts', 'true')
        return res(
            // Respond with a 200 status code
            ctx.status(200),
        )
      }),
      rest.get('/user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated')
        if (!isAuthenticated) {
          // If not authenticated, respond with a 403 error
          return res(
              ctx.status(403),
              ctx.json({
                errorMessage: 'Not authorized',
              }),
          )
        }
        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
              username: 'admin',
            }),
        )
      })
      ],
    }
  }
}
export const decorators = [mswDecorator];
