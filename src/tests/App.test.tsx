import { fireEvent, screen } from '@testing-library/dom';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o funcionamento da página de login', () => {
  const emailTest = 'gabriel@mail.com';

  test('Testa se os elementos são renderizados corretamente na rota "/"', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput && passwordInput && loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  test('Testa a validação dos campos de login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'TesteEmail@' } });
    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'Teste' } });
    expect(emailInput.value).toBe('TesteEmail@');
    expect(passwordInput.value).toBe('Teste');
    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: emailTest } });
    expect(emailInput.value).toBe(emailTest);
    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'TesteS' } });
    expect(loginButton).not.toBeDisabled();
  });
  test('Testa se o botão entrar redireciona para a rota "/carteira" e mostra o email digitado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: emailTest } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);

    const virtualWalletHeading = screen.getByRole('heading', { name: /virtual/i });
    const userEmail = screen.getByText('gabriel@mail.com');

    expect(virtualWalletHeading && userEmail).toBeInTheDocument();
  });
});
