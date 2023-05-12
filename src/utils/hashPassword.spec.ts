import { hashPassword } from './hashPassword';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(() => 'salt'),
  hash: jest.fn(() => 'hash'),
}));

describe('hashPassword', () => {
  beforeEach(() => {
    // Limpa as chamadas anteriores das funções mocks
    jest.clearAllMocks();
  });

  it('deve gerar um hash válido para a senha fornecida', async () => {
    const password = 'mysecretpassword';
    const salt = await bcrypt.genSalt(10);
    const expectedHash = await bcrypt.hash(password, salt);

    const resultHash = await hashPassword(password);

    expect(resultHash).toBe(expectedHash);
  });

  it('deve chamar o genSalt e o hash do bcrypt com os argumentos corretos', async () => {
    const password = 'mysecretpassword';

    await hashPassword(password);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
  });
});
