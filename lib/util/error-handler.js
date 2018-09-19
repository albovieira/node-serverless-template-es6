import response from '../util/response';

export default function errorHandler(error) {
  switch (error.name) {
    case 'ErrorGettingUser':
    case 'ErrorUpdatingUser':
    case 'ErrorInsertingUser':
      error.status = 422;
  }

  switch (error.status) {
    case 409:
      return response(409, {
        type: error.name,
        message: error.message,
        details: error.details
      });
    case 401:
      return response(401, {
        type: error.name,
        message: error.message,
        details: error.details
      });
    case 422:
      return response(422, {
        type: error.name,
        message: error.message,
        details: error.details
      });
    case 400:
      return response(400, {
        type: error.name,
        message: error.message || 'Erro ao realizar a operação',
        details: error.details
      });
    default:
      return response(error.status || 500, {
        type: error.name,
        message: error.message || 'Serviço indisponivel',
        details: error.details
      });
  }
}
