import { TestBed } from '@angular/core/testing'; // Importa as ferramentas de teste do Angular
import { CanActivateFn } from '@angular/router'; // Tipo usado para funções de guarda de rota

import { authGuard } from './auth.guard'; // Importa o guarda de autenticação que será testado

// Início da suíte de testes para o authGuard
describe('authGuard', () => {
  // Cria uma função auxiliar para executar o guard dentro do contexto de injeção do Angular
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  // Antes de cada teste, inicializa o ambiente de testes do Angular
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // Teste básico que verifica se o guard foi criado corretamente
  it('should be created', () => {
    expect(executeGuard).toBeTruthy(); // Verifica se a função executeGuard existe e retorna algo válido
  });
});
