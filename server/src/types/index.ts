export interface ExaggerateRequest {
  description: string;
}

export interface ExaggerationStyles {
  basico: string;
  corporativo: string;
  mamador: string;
  consultor_mckinsey: string;
}

export interface ExaggerateResponse {
  exaggerations: ExaggerationStyles;
}

export interface ErrorResponse {
  error: string;
}
