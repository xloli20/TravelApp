import { handleSubmit } from './formHandler';


describe('Is there a main function defined?', () => {
  test('Return true', () => {
    expect(handleSubmit).toBeDefined();
  });
});