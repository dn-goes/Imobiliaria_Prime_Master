import { TestBed } from '@angular/core/testing'; // Importa utilitários para testes no Angular
import { CanActivateFn } from '@angular/router'; // Tipo usado para funções de guarda de rota

import { corretorGuard } from './corretor.guard'; // Importa o guard que será testado

// Início da suíte de testes para o corretorGuard
describe('corretorGuard', () => {
  // Cria uma função auxiliar para executar o guard no contexto de injeção do Angular
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => corretorGuard(...guardParameters));

  // Antes de cada teste, configura o ambiente de testes do Angular
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // Teste básico que verifica se o guard foi criado/executado corretamente
  it('should be created', () => {
    expect(executeGuard).toBeTruthy(); // Confirma que a função executeGuard existe e retorna algo válido
  });
});
