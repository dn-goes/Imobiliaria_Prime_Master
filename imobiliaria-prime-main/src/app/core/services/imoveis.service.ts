import { Injectable } from '@angular/core'; // Permite que o serviço seja injetado em outros lugares
import { HttpClient } from '@angular/common/http'; // Usado para chamadas HTTP (GET, POST, PUT, DELETE)
import { Observable } from 'rxjs'; // Trabalha com programação reativa (stream de dados)

// Serviço disponível em toda a aplicação
@Injectable({
  providedIn: 'root',
})
export class ImoveisService {
  private apiUrl = 'http://localhost:3000/imoveis'; // URL do JSON Server (API fake)

  constructor(private http: HttpClient) {}

  // Retorna todos os imóveis
  getImoveis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Retorna um imóvel específico pelo ID
  getImovel(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Cria um novo imóvel
  createImovel(imovel: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      ...imovel, // Pega todos os atributos recebidos
      id: Number(imovel.id) || undefined, // Se não tiver ID, deixa undefined para o JSON Server gerar automaticamente
      corretorId: Number(imovel.corretorId), // Garante que o corretorId seja um número
    });
  } 

  // Atualiza os dados de um imóvel existente
  updateImovel(id: number, imovel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, imovel);
  }

  // Exclui um imóvel pelo ID
  deleteImovel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
