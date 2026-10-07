import { routes } from './app.routes';

describe('app routes', () => {
  it('lists the labelled demo pages shown in the navigation', () => {
    const labelled = routes.filter(({ data }) => data !== undefined && 'label' in data).map((route) => route.path);

    expect(labelled).toEqual([
      'get-started',
      'cheat-sheet',
      'syntax-highlight',
      'bindings',
      'plugins',
      're-render',
      'playground',
    ]);
  });

  it('redirects the root path to get-started', () => {
    const root = routes.find((route) => route.path === '');

    expect(root?.redirectTo).toBe('get-started');
    expect(root?.pathMatch).toBe('full');
  });
});
