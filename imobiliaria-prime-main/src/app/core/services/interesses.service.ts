import { Injectable } from '@angular/core'; // Para marcar a classe como injetável
import { HttpClient } from '@angular/common/http'; // Cliente HTTP do Angular para fazer requisições
import { Observable } from 'rxjs'; // Trabalhar com streams de dados assíncronos

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class InteresseService {
  private apiUrl = 'http://localhost:3000/interesses'; // Endpoint do JSON Server

  constructor(private http: HttpClient) {}

  // Registra um interesse de um cliente em um imóvel
  registrarInteresse(clienteId: number, imovelId: number): Observable<any> {
    return this.http.post(this.apiUrl, { clienteId, imovelId });
  }

  // Retorna todos os interesses de um cliente específico
  getInteressesPorCliente(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?clienteId=${clienteId}`);
  }

  // Busca interesses de um cliente em um imóvel específico (mas aqui ainda não deleta)
  removerInteressePorImovel(clienteId: number, imovelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?clienteId=${clienteId}&imovelId=${imovelId}`);
  }

  // Deleta um interesse pelo ID do interesse (registro específico no JSON Server)
  deletarInteressePorId(interesseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${interesseId}`);
  }
}
