import response from '../lib/util/response';
import errorHandler from '../lib/util/error-handler';

/*-------------------------------------
 * Métodos invocado pelo Lambda
 *-------------------------------------*/

/**
 * Endpoint para listar dados do usuario.
 *
 * @param {*} event evento
 * @param {*} context contexto
 * @param {*} callback callback
 */
export async function exampleHttp(event) {
  try {
    console.log('EVENT:', event);
    return response(200, {
      message: 'Hello World'
    });
  } catch (error) {
    return errorHandler(error);
  }
}
